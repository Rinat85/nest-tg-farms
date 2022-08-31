import { databaseConstants } from 'src/constants';
import { DataSource } from 'typeorm';

// const { DB_NAME, DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT } = process.env;

export const databaseProviders = [
  {
    provide: databaseConstants.dataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: `"${process.env.DB_TYPE}"`,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];