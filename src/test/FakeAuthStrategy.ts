import { type IAuthStrategy } from "../auth/IAuthStrategy";

export class FakeAuthStrategy implements IAuthStrategy {
    public static readonly FAKE_AUTH_TOKEN = "fake-auth-token";

    constructor(
        protected accessToken: string = FakeAuthStrategy.FAKE_AUTH_TOKEN
    ) {}

    public async getAccessToken(): Promise<string | null> {
        return this.accessToken;
    }
}
