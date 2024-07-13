import { SpotifyApi } from "./SpotifyApi.js";
import { type IAuthStrategy } from "./auth/IAuthStrategy.js";
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
