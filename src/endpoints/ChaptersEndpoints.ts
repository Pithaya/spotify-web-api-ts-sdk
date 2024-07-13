import type { Chapter, Chapters } from "../types.js";
import EndpointsBase from "./EndpointsBase.js";
import { validateLength } from "../validation/validators.js";

// These are mandatory, and the only supported market codes for the Chapters API
export type ChapterMarket = "GB" | "US" | "IE" | "NZ" | "AU";

export default class ChaptersEndpoints extends EndpointsBase {
    public get(id: string, market: ChapterMarket): Promise<Chapter | null>;
    public get(ids: string[], market: ChapterMarket): Promise<(Chapter | null)[]>;
    public async get(idOrIds: string | string[], market: ChapterMarket) {
        if (typeof idOrIds === "string") {
            const params = this.paramsFor({ market });
            return this.getRequest<Chapter>(`chapters/${idOrIds}${params}`);
        }

        validateLength("ids", idOrIds, 1, 50);
        const params = this.paramsFor({ ids: idOrIds, market });
        const response = await this.getRequest<Chapters>(`chapters${params}`);
        return response?.chapters ?? [];
    }
}
