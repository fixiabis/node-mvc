import Model from "../core/Model";
import { Nested } from "../config/generic";

class MemberModel extends Model {
    public search(fields: string[], query: Nested<string>) {
        return this.query([
            "SELECT", fields,
            "FROM", "drive.member",
            "WHERE", query
        ]);
    }
}

export default MemberModel;