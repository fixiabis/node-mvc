import mysql from "mysql";
import express from "express";

export type Nested<T> = { [name: string]: T };
export type DatabaseConfig = mysql.ConnectionConfig;
export type HttpMethod = "get" | "post" | "put" | "delete";

export type Route<C> = [
    string,
    HttpMethod[],
    { new(request: express.Request, response: express.Response): C },
    Exclude<Exclude<keyof C, "request">, "response">,
    string[]
];