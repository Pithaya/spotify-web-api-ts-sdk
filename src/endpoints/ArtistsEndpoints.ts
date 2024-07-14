import type { Artist, Artists, Market, MaxInt, Page, SimplifiedAlbum, TopTracksResult } from "../types.js";
import { validateLength } from "../validation/validators.js";
import EndpointsBase from "./EndpointsBase.js";

export const MAX_GET_MULTIPLE_ARTISTS_IDS = 50;

export default class ArtistsEndpoints extends EndpointsBase {
    public async get(id: string): Promise<Artist | null>;
    public async get(ids: string[]): Promise<Artist[]>;
    public async get(idOrIds: string | string[]) {
        if (typeof idOrIds === "string") {
            const artist = await this.getRequest<Artist>(`artists/${idOrIds}`);
            return artist;
        }

        validateLength("ids", idOrIds, 1, MAX_GET_MULTIPLE_ARTISTS_IDS);
        const params = this.paramsFor({ ids: idOrIds });
        const response = await this.getRequest<Artists>(`artists${params}`);
        return response?.artists ?? [];
    }

    public async albums(
        id: string,
        includeGroups?: ("album" | "single" | "appears_on" | "compilation")[],
        market?: Market,
        limit?: MaxInt<50>,
        offset?: number
    ) {
        const params = this.paramsFor({
            include_groups: includeGroups,
            market,
            limit,
            offset
        });
        return await this.getRequest<Page<SimplifiedAlbum>>(`artists/${id}/albums${params}`);
    }

    public async topTracks(id: string, market?: Market) {
        const params = this.paramsFor({ market });
        return await this.getRequest<TopTracksResult>(`artists/${id}/top-tracks${params}`);
    }

    public async relatedArtists(id: string) {
        return await this.getRequest<Artists>(`artists/${id}/related-artists`);
    }
}
