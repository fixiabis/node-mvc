import express from "express";
import { Nested } from "../config/generic";

class Controller {
    constructor(
        public request: express.Request,
        public response: express.Response
    ) { }

    public get ip() { return this.request.ip; }
    public get body() { return this.request.body; }
    public get query() { return this.request.query; }

    public render(path: string, data: Nested<any>) {
        return this.response.render(path, data);
    }
}

export default Controller;