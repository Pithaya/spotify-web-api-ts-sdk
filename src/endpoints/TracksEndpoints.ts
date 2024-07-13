import type { Market, Track, Tracks, AudioFeatures, AudioFeaturesCollection, AudioAnalysis } from "../types.js";
import { validateLength } from "../validation/validators.js";
import EndpointsBase from "./EndpointsBase.js";

export const MAX_GET_MULTIPLE_TRACKS_IDS = 50;

export default class TracksEndpoints extends EndpointsBase {
    public get(id: string, market?: Market): Promise<Track | null>;
    public get(ids: string[], market?: Market): Promise<Track[]>;
    public async get(idOrIds: string | string[], market?: Market) {
        if (typeof idOrIds === "string") {
            const params = this.paramsFor({ market });
            return await this.getRequest<Track>(`tracks/${idOrIds}${params}`);
        }

        validateLength("ids", idOrIds, 1, MAX_GET_MULTIPLE_TRACKS_IDS);
        const params = this.paramsFor({ ids: idOrIds, market });
        const response = await this.getRequest<Tracks>(`tracks${params}`);
        return response?.tracks ?? [];
    }

    public audioFeatures(id: string): Promise<AudioFeatures | null>;
    public audioFeatures(ids: string[]): Promise<AudioFeatures[]>;
    public async audioFeatures(idOrIds: string | string[]) {
        if (typeof idOrIds === "string") {
            return await this.getRequest<AudioFeatures>(`audio-features/${idOrIds}`);
        }
        const params = this.paramsFor({ ids: idOrIds });
        const response = await this.getRequest<AudioFeaturesCollection>(`audio-features${params}`);
        return response?.audio_features ?? [];
    }

    public async audioAnalysis(id: string) {
        return await this.getRequest<AudioAnalysis>(`audio-analysis/${id}`);
    }
}
