import { TokenService, UserService } from '@loopback/authentication'
import { inject } from '@loopback/core'
import { post, requestBody, SchemaObject } from '@loopback/rest'
import {
  Credentials,
  TokenServiceBindings,
  UserServiceBindings,
} from '../jwt-authentication'
import { User } from '../models'
import { model, property } from '@loopback/repository'
import { genSalt, hash } from 'bcryptjs'
import { UserRepository } from '../repositories'

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'username', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
}

const LoginCredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
}

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string
}

const CredentialsRequestBody = {
  description: 'The input of signup function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
}
const LoginCredentialsRequestBody = {
  description: 'The input of Login function',
  required: true,
  content: {
    'application/json': { schema: LoginCredentialsSchema },
  },
}

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @inject(UserServiceBindings.USER_REPOSITORY)
    public userRepository: UserRepository,
  ) {}

  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: CredentialsSchema,
        },
      },
    })
    { password: unhashedPassword, ...newUserRequest }: NewUserRequest,
  ): Promise<User> {
    const password = await hash(unhashedPassword, await genSalt())

    const savedUser = await this.userRepository.create({
      ...newUserRequest,
      password,
    })

    await this.userRepository.userCredentials(savedUser.id).create({ password })

    return savedUser
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(LoginCredentialsRequestBody) credentials: Credentials,
  ): Promise<{ token: string }> {
    console.log('hit', { credentials })
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials)

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user)

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile)

    return { token }
  }
}
