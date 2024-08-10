import type { IAuthStrategy } from "../types";

export default class EmptyAuthStrategy implements IAuthStrategy {
    public async getAccessToken(): Promise<string> {
        return "";
    }
}
