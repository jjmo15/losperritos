import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'PostgresqlDS',
  connector: 'postgresql',
  //url: 'postgresql://postgres:123456789@localhost/dbPerritos',
  //url: 'postgresql://perritos.postgres.database.azure.com',
  url: '',
  host: 'perritos.postgres.database.azure.com',
  port: 5432,
  user: 'perritos',
  password: 'Pass123*',
  database: 'dbPerritos',
  ssl: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgresqlDsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'PostgresqlDS';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.PostgresqlDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
