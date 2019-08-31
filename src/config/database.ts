import { Nested, DatabaseConfig } from "./generic";

const database: Nested<DatabaseConfig> = {
    "default": {
        host: 'localhost',
        user: 'root',
        password: '0000',
        database: 'drive'
    }
};

export default database;