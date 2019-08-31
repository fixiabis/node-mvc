import { Route } from "./generic";
import MainController from "../controllers/MainController";

const routes = [
    ["/", ["get"], MainController, "index", []] as Route<MainController>
];

export default routes;