import { UserService } from '@loopback/authentication'
import { repository } from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { securityId, UserProfile } from '@loopback/security'
import { compare } from 'bcryptjs'
import { UserRepository } from '../../repositories'
import { User } from '../../models'

/**
 * A pre-defined type for user credentials. It assumes a user logs in
 * using the email and password. You can modify it if your app has different credential fields
 */
export type Credentials = {
  username: string
  password: string
}

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Invalid email or password.'

    const foundUser = await this.userRepository.findOne({
      where: { username: credentials.username },
    })
    console.log({ foundUser })
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError)
    }

    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id,
    )
    console.log({ credentialsFound })
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError)
    }

    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    )

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError)
    }

    return foundUser
  }

  convertToUserProfile(user: User): UserProfile {
    return {
      [securityId]: user.id?.toString() ?? '',
      name: user.username,
      id: user.id,
      email: user.email,
    }
  }
}
