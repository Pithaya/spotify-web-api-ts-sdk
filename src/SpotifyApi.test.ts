import { beforeEach, describe, expect, it } from "vitest";
import type { SpotifyApi } from "./SpotifyApi";
import { buildUnitTestSdkInstance } from "./test/SpotifyApiBuilder";
import { FakeAuthStrategy } from "./test/FakeAuthStrategy";
import type { FetchApiMock } from "./test/FetchApiMock";
import { validAlbumResult } from "./test/data/validAlbumResult";

describe("SpotifyAPI Instance", () => {
    let sut: SpotifyApi;
    let fetchMock: FetchApiMock;
    beforeEach(() => {
        [sut, fetchMock] = buildUnitTestSdkInstance();
    });

    describe("uses provided authenticate strategy", () => {
        it("makes API requests with API token returned form auth strategy", async () => {
            fetchMock.queueResponseBody(200, validAlbumResult());

            await sut.albums.get("album-id-here");

            const [headers] = fetchMock.issuedRequestHeadersAndBody(0);
            expect((headers as any).Authorization).toBe(`Bearer ${FakeAuthStrategy.FAKE_AUTH_TOKEN}`);
        });
    });

    describe("has default handling or error codes", () => {
        it("401 errors throw bad or expired token Error", async () => {
            fetchMock.queueResponseBody(401, {});

            await expect(async () => {
                await sut.albums.get("album-id-here");
            }).rejects.toThrowError("Bad or expired token");
        });

        it("403 errors throw oAuth Error", async () => {
            fetchMock.queueResponseBody(403, {});

            await expect(async () => {
                await sut.albums.get("album-id-here");
            }).rejects.toThrowError("Bad OAuth request");
        });

        it("429 errors throw rate limit Error", async () => {
            fetchMock.queueResponseBody(429, {});

            await expect(async () => {
                await sut.albums.get("album-id-here");
            }).rejects.toThrowError("The app has exceeded its rate limits.");
        });

        it("204 returns null for no-content responses", async () => {
            fetchMock.queueResponseBody(204, null);

            const result = await sut.albums.get("album-id-here");

            expect(result).toBeNull();
        });

        it("other Non-200 other response codes throws unrecognised response code error", async () => {
            fetchMock.queueResponseBody(123, null);

            await expect(async () => {
                await sut.albums.get("album-id-here");
            }).rejects.toThrowError("Unrecognised response code: 123");
        });
    });
});
