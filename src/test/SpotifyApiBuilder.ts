import { SpotifyApi } from "../SpotifyApi";
import { FakeAuthStrategy } from "./FakeAuthStrategy";
import { FetchApiMock } from "./FetchApiMock";
import { FetchApiSpy } from "./FetchApiSpy";
import type { IAuthStrategy } from "../auth/IAuthStrategy";

import dotenv from "dotenv";
import type { SdkOptions } from "../types";
dotenv.config();

class AccessTokenAuthStrategy implements IAuthStrategy {
    private readonly accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    public async getAccessToken(): Promise<string | null> {
        return this.accessToken;
    }
}

export function buildIntegrationTestSdkInstance(
    logResults: boolean = false
): [SpotifyApi, FetchApiSpy] {
    // We'll load the access token from the .env file, so if it's not provided
    // all the integration tests will deliberately fail and not hit
    // the Spotify API

    const token = process.env.INTEGRATION_TESTS_SPOTIFY_ACCESS_TOKEN;

    if (!token) {
        throw new Error(
            "No token provided. Please provide a valid Spotify token in the /.env file as: INTEGRATION_TESTS_SPOTIFY_ACCESS_TOKEN"
        );
    }

    const authStrat = new AccessTokenAuthStrategy(token);

    const fetchSpy = new FetchApiSpy(logResults);
    const sdkConfig = {
        fetch: async (
            input: RequestInfo | URL,
            init?: RequestInit | undefined
        ) => {
            return await fetchSpy.fetch(input, init);
        }
    };

    const sdkInstance = new SpotifyApi(authStrat, sdkConfig);

    return [sdkInstance, fetchSpy];
}

export function buildUnitTestSdkInstance(): [SpotifyApi, FetchApiMock] {
    const authStrat = new FakeAuthStrategy();
    const fetchMock = new FetchApiMock();
    const sdkConfig: SdkOptions = {
        fetch: async (
            input: RequestInfo | URL,
            init?: RequestInit | undefined
        ) => {
            return await fetchMock.fetch(input, init);
        }
    };

    const sdkInstance = new SpotifyApi(authStrat, sdkConfig);

    return [sdkInstance, fetchMock];
}
