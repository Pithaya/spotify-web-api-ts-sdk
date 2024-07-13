import AlbumsEndpoints from "./endpoints/AlbumsEndpoints.js";
import ArtistsEndpoints from "./endpoints/ArtistsEndpoints.js";
import AudiobooksEndpoints from "./endpoints/AudiobooksEndpoints.js";
import BrowseEndpoints from "./endpoints/BrowseEndpoints.js";
import ChaptersEndpoints from "./endpoints/ChaptersEndpoints.js";
import EpisodesEndpoints from "./endpoints/EpisodesEndpoints.js";
import RecommendationsEndpoints from "./endpoints/RecommendationsEndpoints.js";
import MarketsEndpoints from "./endpoints/MarketsEndpoints.js";
import PlayerEndpoints from "./endpoints/PlayerEndpoints.js";
import PlaylistsEndpoints from "./endpoints/PlaylistsEndpoints.js";
import SearchEndpoints from "./endpoints/SearchEndpoints.js";
import ShowsEndpoints from "./endpoints/ShowsEndpoints.js";
import TracksEndpoints from "./endpoints/TracksEndpoints.js";
import type { IAuthStrategy } from "./auth/IAuthStrategy.js";
import UsersEndpoints from "./endpoints/UsersEndpoints.js";
import CurrentUserEndpoints from "./endpoints/CurrentUserEndpoints.js";
import DefaultResponseDeserializer from "./serialization/DefaultResponseDeserializer.js";
import DefaultResponseValidator from "./responsevalidation/DefaultResponseValidator.js";
import NoOpErrorHandler from "./errorhandling/NoOpErrorHandler.js";
import type { SdkConfiguration, SdkOptions } from "./types.js";

export class SpotifyApi {
    private readonly sdkConfig: SdkConfiguration;
    private static readonly rootUrl: string = "https://api.spotify.com/v1/";

    private readonly authenticationStrategy: IAuthStrategy;

    public albums: AlbumsEndpoints;
    public artists: ArtistsEndpoints;
    public audiobooks: AudiobooksEndpoints;
    public browse: BrowseEndpoints;
    public chapters: ChaptersEndpoints;
    public episodes: EpisodesEndpoints;
    public recommendations: RecommendationsEndpoints;
    public markets: MarketsEndpoints;
    public player: PlayerEndpoints;
    public playlists: PlaylistsEndpoints;
    public shows: ShowsEndpoints;
    public tracks: TracksEndpoints;
    public users: UsersEndpoints;
    public search: SearchEndpoints;

    public currentUser: CurrentUserEndpoints;

    public constructor(authentication: IAuthStrategy, config?: SdkOptions) {
        this.sdkConfig = this.initializeSdk(config);

        this.albums = new AlbumsEndpoints(this);
        this.artists = new ArtistsEndpoints(this);
        this.audiobooks = new AudiobooksEndpoints(this);
        this.browse = new BrowseEndpoints(this);
        this.chapters = new ChaptersEndpoints(this);
        this.episodes = new EpisodesEndpoints(this);
        this.recommendations = new RecommendationsEndpoints(this);
        this.markets = new MarketsEndpoints(this);
        this.player = new PlayerEndpoints(this);
        this.playlists = new PlaylistsEndpoints(this);
        this.shows = new ShowsEndpoints(this);
        this.tracks = new TracksEndpoints(this);
        this.users = new UsersEndpoints(this);
        this.currentUser = new CurrentUserEndpoints(this);
        this.search = new SearchEndpoints(this);

        this.authenticationStrategy = authentication;
    }

    public async makeRequest<TReturnType>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        url: string,
        body: any = undefined,
        contentType: string | undefined = undefined
    ): Promise<TReturnType | null> {
        try {
            const accessToken =
                await this.authenticationStrategy.getAccessToken();

            if (accessToken === null) {
                console.warn("No access token found.");
                return null;
            }

            const fullUrl = SpotifyApi.rootUrl + url;

            const opts: RequestInit = {
                method,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": contentType ?? "application/json"
                },
                body: body
                    ? typeof body === "string"
                        ? body
                        : JSON.stringify(body)
                    : undefined
            };

            this.sdkConfig.beforeRequest(fullUrl, opts);
            const result = await this.sdkConfig.fetch(fullUrl, opts);
            this.sdkConfig.afterRequest(fullUrl, opts, result);

            if (result.status === 204) {
                return null as TReturnType;
            }

            await this.sdkConfig.responseValidator.validateResponse(result);
            return await this.sdkConfig.deserializer.deserialize<TReturnType>(
                result
            );
        } catch (error) {
            const handled =
                await this.sdkConfig.errorHandler.handleErrors(error);
            if (!handled) {
                throw error;
            }
            return null;
        }
    }

    private initializeSdk(config: SdkOptions | undefined): SdkConfiguration {
        const defaultConfig: SdkConfiguration = {
            fetch: async (
                req: RequestInfo | URL,
                init: RequestInit | undefined
            ) => await fetch(req, init),
            beforeRequest: (url: string, options: RequestInit) => {},
            afterRequest: (
                url: string,
                options: RequestInit,
                reponse: Response
            ) => {},
            deserializer: new DefaultResponseDeserializer(),
            responseValidator: new DefaultResponseValidator(),
            errorHandler: new NoOpErrorHandler()
        };

        return { ...defaultConfig, ...config };
    }

    /**
     * @returns the current access token. null implies the SpotifyApi is not yet authenticated.
     */
    public async getAccessToken(): Promise<string | null> {
        return await this.authenticationStrategy.getAccessToken();
    }
}
