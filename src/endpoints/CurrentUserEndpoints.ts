import type { SpotifyApi } from "../SpotifyApi.js";
import type {
    Page,
    Artist,
    Track,
    MaxInt,
    FollowedArtists,
    Market,
    SavedAlbum,
    SimplifiedAudiobook,
    SimplifiedPlaylist,
    SavedEpisode,
    SavedShow,
    SavedTrack,
    UserProfile
} from "../types.js";
import EndpointsBase from "./EndpointsBase.js";

export default class CurrentUserEndpoints extends EndpointsBase {
    public albums: CurrentUserAlbumsEndpoints;
    public audiobooks: CurrentUserAudiobooksEndpoints;
    public episodes: CurrentUserEpisodesEndpoints;
    public playlists: CurrentUserPlaylistsEndpoints;
    public shows: CurrentUserShowsEndpoints;
    public tracks: CurrentUserTracksEndpoints;

    constructor(api: SpotifyApi) {
        super(api);

        this.albums = new CurrentUserAlbumsEndpoints(api);
        this.audiobooks = new CurrentUserAudiobooksEndpoints(api);
        this.episodes = new CurrentUserEpisodesEndpoints(api);
        this.playlists = new CurrentUserPlaylistsEndpoints(api);
        this.shows = new CurrentUserShowsEndpoints(api);
        this.tracks = new CurrentUserTracksEndpoints(api);
    }

    public async profile() {
        return await this.getRequest<UserProfile>("me");
    }

    public async topItems<T extends "artists" | "tracks">(
        type: T,
        time_range?: "short_term" | "medium_term" | "long_term",
        limit?: MaxInt<50>,
        offset?: number
    ) {
        const params = this.paramsFor({ time_range, limit, offset });
        return await this.getRequest<Page<T extends "artists" ? Artist : Track>>(`me/top/${type}${params}`);
    }

    public async followedArtists(after?: string, limit?: MaxInt<50>) {
        const params = this.paramsFor({ type: "artist", after, limit });
        return await this.getRequest<FollowedArtists>(`me/following${params}`);
    }

    public async followArtistsOrUsers(ids: string[], type: "artist" | "user") {
        const params = this.paramsFor({ type });
        await this.putRequest(`me/following${params}`, { ids });
    }

    public async unfollowArtistsOrUsers(ids: string[], type: "artist" | "user") {
        const params = this.paramsFor({ type });
        await this.deleteRequest(`me/following${params}`, { ids });
    }

    public async followsArtistsOrUsers(ids: string[], type: "artist" | "user") {
        const params = this.paramsFor({ ids, type });
        return await this.getRequest<boolean[]>(`me/following/contains${params}`);
    }
}

class CurrentUserAlbumsEndpoints extends EndpointsBase {
    public async savedAlbums(limit?: MaxInt<50>, offset?: number, market?: Market) {
        const params = this.paramsFor({ limit, offset, market });
        return await this.getRequest<Page<SavedAlbum>>(`me/albums${params}`);
    }

    public async saveAlbums(ids: string[]) {
        await this.putRequest("me/albums", ids);
    }

    public async removeSavedAlbums(ids: string[]) {
        await this.deleteRequest("me/albums", ids);
    }

    public async hasSavedAlbums(ids: string[]) {
        const params = this.paramsFor({ ids });
        return await this.getRequest<boolean[]>(`me/albums/contains${params}`);
    }
}

class CurrentUserAudiobooksEndpoints extends EndpointsBase {
    public async savedAudiobooks(limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset });
        return await this.getRequest<Page<SimplifiedAudiobook>>(`me/audiobooks${params}`);
    }

    public async saveAudiobooks(ids: string[]) {
        await this.putRequest("me/audiobooks", ids);
    }

    public async removeSavedAudiobooks(ids: string[]) {
        await this.deleteRequest("me/audiobooks", ids);
    }

    public async hasSavedAudiobooks(ids: string[]) {
        const params = this.paramsFor({ ids });
        return await this.getRequest<boolean[]>(`me/audiobooks/contains${params}`);
    }
}

class CurrentUserEpisodesEndpoints extends EndpointsBase {
    public async savedEpisodes(market?: Market, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ market, limit, offset });
        return await this.getRequest<Page<SavedEpisode>>(`me/episodes${params}`);
    }

    public async saveEpisodes(ids: string[]) {
        await this.putRequest(`me/episodes`, ids);
    }

    public async removeSavedEpisodes(ids: string[]) {
        await this.deleteRequest(`me/episodes`, ids);
    }

    public async hasSavedEpisodes(ids: string[]) {
        const params = this.paramsFor({ ids });
        return await this.getRequest<boolean[]>(`me/episodes/contains${params}`);
    }
}

class CurrentUserPlaylistsEndpoints extends EndpointsBase {
    public async playlists(limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset });
        return await this.getRequest<Page<SimplifiedPlaylist>>(`me/playlists${params}`);
    }

    public async follow(playlist_id: string) {
        await this.putRequest(`playlists/${playlist_id}/followers`);
    }

    public async unfollow(playlist_id: string) {
        await this.deleteRequest(`playlists/${playlist_id}/followers`);
    }

    public async isFollowing(playlistId: string, ids: string[]) {
        const params = this.paramsFor({ ids });
        return await this.getRequest<boolean[]>(`playlists/${playlistId}/followers/contains${params}`);
    }
}

class CurrentUserShowsEndpoints extends EndpointsBase {
    public async savedShows(limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset });
        return await this.getRequest<Page<SavedShow>>(`me/shows${params}`);
    }

    public async saveShows(ids: string[]) {
        const params = this.paramsFor({ ids });
        return await this.putRequest(`me/shows${params}`);
    }

    public async removeSavedShows(ids: string[], market?: Market) {
        const params = this.paramsFor({ ids, market });
        return await this.deleteRequest(`me/shows${params}`);
    }

    public async hasSavedShow(ids: string[]) {
        const params = this.paramsFor({ ids });
        return await this.getRequest<boolean[]>(`me/shows/contains${params}`);
    }
}

class CurrentUserTracksEndpoints extends EndpointsBase {
    public async savedTracks(limit?: MaxInt<50>, offset?: number, market?: Market) {
        const params = this.paramsFor({ limit, offset, market });
        return await this.getRequest<Page<SavedTrack>>(`me/tracks${params}`);
    }

    public async saveTracks(ids: string[]) {
        await this.putRequest("me/tracks", ids);
    }

    public async removeSavedTracks(ids: string[]) {
        await this.deleteRequest("me/tracks", ids);
    }

    public async hasSavedTracks(ids: string[]) {
        const params = this.paramsFor({ ids });
        return await this.getRequest<boolean[]>(`me/tracks/contains${params}`);
    }
}
