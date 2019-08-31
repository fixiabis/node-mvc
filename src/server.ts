import path from "path";
import express from "express";
import routes from "./config/routes";

const PORT = 3000 || process.env.PORT;
let staticServer = express();

staticServer.set("view engine", "ejs");
staticServer.set("views", path.resolve(__dirname, "../src/views"));
staticServer.use(express.urlencoded({ extended: true }));

for (let route of routes) {
    let [path, httpMethods, Controller, method, params] = route;

    for (let httpMethod of httpMethods) {
        staticServer[httpMethod](path, function (request, response) {
            (new Controller(request, response)[method] as Function)(...params.map(
                (param: string) => request.params[param]
            ));
        });
    }
}

staticServer.listen(PORT, () => console.log(`listen in ${PORT}`));