import Controller from "../core/Controller";
import MemberModel from "../models/MemberModel";

class MainController extends Controller {
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