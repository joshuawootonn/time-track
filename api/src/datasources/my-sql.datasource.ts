import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core'
import { juggler } from '@loopback/repository'
import 'dotenv/config'

console.log(
  'Loopback 4 loaded with connection string: ',
  process.env.SQL_CONNECTION_STRING,
)

const config = {
  name: 'MySql',
  url: process.env.SQL_CONNECTION_STRING,
  connector: 'mysql',
}

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MySqlDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'MySql'
  static readonly defaultConfig = config

  constructor(
    @inject('datasources.config.MySql', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig)
  }
}
