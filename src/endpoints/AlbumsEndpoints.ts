import type { Market, Album, Albums, MaxInt, Page, SimplifiedTrack } from "../types.js";
import { validateLength } from "../validation/validators.js";
import EndpointsBase from "./EndpointsBase.js";

export const MAX_GET_MULTIPLE_ALBUMS_IDS = 20;

export default class AlbumsEndpoints extends EndpointsBase {
    public async get(id: string, market?: Market): Promise<Album | null>;
    public async get(ids: string[], market?: Market): Promise<Album[]>;
    public async get(idOrIds: string | string[], market?: Market) {
        if (typeof idOrIds === "string") {
            const params = this.paramsFor({ market });
            const album = await this.getRequest<Album>(`albums/${idOrIds}${params}`);
            return album;
        }

        validateLength("ids", idOrIds, 1, MAX_GET_MULTIPLE_ALBUMS_IDS);
        const params = this.paramsFor({ ids: idOrIds, market });
        const response = await this.getRequest<Albums>(`albums${params}`);
        return response?.albums ?? [];
    }

    public async tracks(albumId: string, market?: Market, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ market, limit, offset });
        return await this.getRequest<Page<SimplifiedTrack>>(`albums/${albumId}/tracks${params}`);
    }
}
