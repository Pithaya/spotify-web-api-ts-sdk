export interface IAuthStrategy {
    getAccessToken: () => Promise<string | null>;
}
