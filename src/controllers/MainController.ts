import Controller from "../core/Controller";
import MemberModel from "../models/MemberModel";
import { LoginNeeded } from "../middlewares/LoginNeeded";

class MainController extends Controller {
    @LoginNeeded
    public async index() {
        this.render("index.ejs", {
            title: "Hello",
            name: this.query["name"] || "somebody",
            data: await new MemberModel().search(
                ["uid", "name", "account", "password"],
                this.query["query"] || {}
            )
        });
    }
}

export default MainController;