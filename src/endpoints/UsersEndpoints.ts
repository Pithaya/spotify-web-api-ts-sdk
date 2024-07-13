import type { User } from "../types.js";
import EndpointsBase from "./EndpointsBase.js";

export default class UsersEndpoints extends EndpointsBase {
    public async profile(userId: string) {
        return await this.getRequest<User>(`users/${userId}`);
    }
}
