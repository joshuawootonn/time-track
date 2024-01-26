import { Entity, model, property } from '@loopback/repository'

@model({ name: 'user_credentials', settings: { strict: false } })
export class UserCredentials extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number

  @property({
    type: 'string',
    required: true,
  })
  password: string

  @property({
    type: 'number',
    required: true,
  })
  user_id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any

  constructor(data?: Partial<UserCredentials>) {
    super(data)
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials &
  UserCredentialsRelations
