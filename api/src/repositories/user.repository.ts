import { Getter, inject } from '@loopback/core'
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository'
import { MySqlDataSource } from '../datasources'
import { User, UserCredentials, UserRelations } from '../models'
import { UserCredentialsRepository } from './user-credentials.repository'

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >

  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource)
    console.log('u r constructor')
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    )
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    )
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    return this.userCredentials(userId)
      .get()
      .catch((err) => {
        if (err.code === 'ENTITY_NOT_FOUND') return undefined
        throw err
      })
  }
}
