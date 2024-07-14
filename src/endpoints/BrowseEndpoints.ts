import type { MaxInt, Categories, Category, NewReleases, FeaturedPlaylists } from "../types.js";
import EndpointsBase from "./EndpointsBase.js";

export default class BrowseEndpoints extends EndpointsBase {
    public async getCategories(locale?: string, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ locale, limit, offset });

        return await this.getRequest<Categories>(`browse/categories${params}`);
    }

    public async getCategory(categoryId: string, locale?: string) {
        const params = this.paramsFor({ locale });

        return await this.getRequest<Category>(`browse/categories/${categoryId}${params}`);
    }

    public async getNewReleases(limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset });
        return await this.getRequest<NewReleases>(`browse/new-releases${params}`);
    }

    public async getFeaturedPlaylists(locale?: string, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({
            locale,
            limit,
            offset
        });
        return await this.getRequest<FeaturedPlaylists>(`browse/featured-playlists${params}`);
    }

    public async getPlaylistsForCategory(category_id: string, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset });
        return await this.getRequest<FeaturedPlaylists>(`browse/categories/${category_id}/playlists${params}`);
    }
}
