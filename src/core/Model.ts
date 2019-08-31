import mysql from "mysql";
import database from "../config/database";
import { DatabaseConfig, Nested } from "../config/generic";

type queryValue<T = string | number> = T | T[] | Nested<T>;

class Model {
    public db!: mysql.Connection;
    public config!: DatabaseConfig;

    constructor(configName?: string) {
        this.connectTo(configName || "default");
    }

    public connectTo(configName: string) {
        this.config = database[configName];
        this.db = mysql.createConnection(this.config);
    }

    public query(query: string | queryValue[], callback?: (data: any[]) => void) {
        let promise = new Promise<any[]>((resolve, reject) => {
            this.db.query(this.parseQuery(query), function (error, result) {
                if (error) return reject(error);
                else resolve(result);
            });
        });

        if (callback) promise.then(callback);

        return promise;
    }

    public parseQuery(query: string | queryValue[]): string {
        if (typeof query === "string") return query;
        let result: string[] = [];

        query.forEach(function (part, i) {
            if (typeof part === "string") result.push(`${part}`);
            else switch (true) {
                case query[i - 1] && ["SELECT", "SELECT DISTINCT", "GROUP BY", "ORDER BY"].indexOf((query[i - 1] as string).toUpperCase()) > -1:
                    result.push((part as (number | string)[]).join(", "));
                    break;

                case query[i + 1] && ["VALUES"].indexOf((query[i + 1] as string).toUpperCase()) > -1:
                    result.push(`(${(part as (number | string)[]).join(", ")})`);
                    break;

                case query[i - 1] && ["VALUES"].indexOf((query[i - 1] as string).toUpperCase()) > -1:
                    result.push(`(${(part as (number | string)[]).map(
                        part => typeof part === "string" ? `'${part}'` : part
                    ).join(", ")})`);
                    break;

                case query[i - 1] && ["SET"].indexOf((query[i - 1] as string).toUpperCase()) > -1:
                    result.push(Object.keys(part as Nested<string | number>).map(key => `${key} = ${
                        typeof (part as Nested<string | number>)[key] === "string"
                            ? `'${(part as Nested<string | number>)[key]}'`
                            : (part as Nested<string | number>)[key]}`
                    ).join(", "));
                    break;

                case query[i - 1] && ["WHERE", "ON"].indexOf((query[i - 1] as string).toUpperCase()) > -1:
                    result.push(Object.keys(part as Nested<string | number>).map(key => `${key} = ${
                        typeof (part as Nested<string | number>)[key] === "string"
                            ? `'${(part as Nested<string | number>)[key]}'`
                            : (part as Nested<string | number>)[key]}`
                    ).join(" AND ") || "1");
                    break;
            }
        });

        return result.join(" ");
    }
}

export default Model;
