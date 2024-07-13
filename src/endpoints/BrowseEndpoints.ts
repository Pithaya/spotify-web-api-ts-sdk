import type { MaxInt, Categories, Category, NewReleases, FeaturedPlaylists } from "../types.js";
import EndpointsBase from "./EndpointsBase.js";

export default class BrowseEndpoints extends EndpointsBase {
    public getCategories(locale?: string, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ locale, limit, offset });

        return this.getRequest<Categories>(`browse/categories${params}`);
    }

    public getCategory(categoryId: string, locale?: string) {
        const params = this.paramsFor({ locale });

        return this.getRequest<Category>(`browse/categories/${categoryId}${params}`);
    }

    public getNewReleases(limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset });
        return this.getRequest<NewReleases>(`browse/new-releases${params}`);
    }

    public getFeaturedPlaylists(locale?: string, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({
            locale,
            limit,
            offset
        });
        return this.getRequest<FeaturedPlaylists>(`browse/featured-playlists${params}`);
    }

    public getPlaylistsForCategory(category_id: string, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset });
        return this.getRequest<FeaturedPlaylists>(`browse/categories/${category_id}/playlists${params}`);
    }
}
