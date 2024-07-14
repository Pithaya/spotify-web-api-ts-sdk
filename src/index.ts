import { SpotifyApi } from "./SpotifyApi.js";
import { type IAuthStrategy } from "./auth/IAuthStrategy.js";
import { MAX_GET_MULTIPLE_ALBUMS_IDS } from "./endpoints/AlbumsEndpoints.js";
import { MAX_GET_MULTIPLE_TRACKS_IDS } from "./endpoints/TracksEndpoints.js";
import { MAX_GET_MULTIPLE_EPISODES_IDS } from "./endpoints/EpisodesEndpoints.js";
import { MAX_GET_MULTIPLE_ARTISTS_IDS } from "./endpoints/ArtistsEndpoints.js";
import { MAX_GET_MULTIPLE_SHOWS_IDS } from "./endpoints/ShowsEndpoints.js";
import ConsoleLoggingErrorHandler from "./errorhandling/ConsoleLoggingErrorHandler.js";
import NoOpErrorHandler from "./errorhandling/NoOpErrorHandler.js";
import DefaultResponseValidator from "./responsevalidation/DefaultResponseValidator.js";
import DefaultResponseDeserializer from "./serialization/DefaultResponseDeserializer.js";

export {
    SpotifyApi,
    ConsoleLoggingErrorHandler,
    NoOpErrorHandler,
    DefaultResponseValidator,
    DefaultResponseDeserializer
};

export type * from "./types.js";

export type { IAuthStrategy };
export {
    MAX_GET_MULTIPLE_ALBUMS_IDS,
    MAX_GET_MULTIPLE_TRACKS_IDS,
    MAX_GET_MULTIPLE_ARTISTS_IDS,
    MAX_GET_MULTIPLE_SHOWS_IDS,
    MAX_GET_MULTIPLE_EPISODES_IDS
};
