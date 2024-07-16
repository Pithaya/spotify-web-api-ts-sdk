// Configuration types

export type RequestImplementation = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export type SdkOptions = {
    fetch?: RequestImplementation;
    beforeRequest?: (url: string, options: RequestInit) => void;
    afterRequest?: (url: string, options: RequestInit, response: Response) => void;
    deserializer?: IResponseDeserializer;
    responseValidator?: IValidateResponses;
    errorHandler?: IHandleErrors;
};

export type SdkConfiguration = SdkOptions & {
    fetch: RequestImplementation;
    beforeRequest: (url: string, options: RequestInit) => void;
    afterRequest: (url: string, options: RequestInit, response: Response) => void;
    deserializer: IResponseDeserializer;
    responseValidator: IValidateResponses;
    errorHandler: IHandleErrors;
};

export interface IHandleErrors {
    handleErrors: (error: any) => Promise<boolean>;
}

export interface IValidateResponses {
    validateResponse: (response: Response) => Promise<void>;
}

export interface IResponseDeserializer {
    deserialize: <TReturnType>(response: Response) => Promise<TReturnType>;
}

// API return types

export type MaxInt<T extends number> = number extends T ? number : _Range<T, []>;
export type _Range<T extends number, R extends unknown[]> = R["length"] extends T
    ? R[number] | T
    : _Range<T, [R["length"], ...R]>;

export type ItemTypes = "artist" | "album" | "playlist" | "track" | "show" | "episode" | "audiobook";
export type Market =
    | "AD"
    | "AE"
    | "AG"
    | "AL"
    | "AM"
    | "AO"
    | "AR"
    | "AT"
    | "AU"
    | "AZ"
    | "BA"
    | "BB"
    | "BD"
    | "BE"
    | "BF"
    | "BG"
    | "BH"
    | "BI"
    | "BJ"
    | "BN"
    | "BO"
    | "BR"
    | "BS"
    | "BT"
    | "BW"
    | "BY"
    | "BZ"
    | "CA"
    | "CD"
    | "CG"
    | "CH"
    | "CI"
    | "CL"
    | "CM"
    | "CO"
    | "CR"
    | "CV"
    | "CW"
    | "CY"
    | "CZ"
    | "DE"
    | "DJ"
    | "DK"
    | "DM"
    | "DO"
    | "DZ"
    | "EC"
    | "EE"
    | "EG"
    | "ES"
    | "ET"
    | "FI"
    | "FJ"
    | "FM"
    | "FR"
    | "GA"
    | "GB"
    | "GD"
    | "GE"
    | "GH"
    | "GM"
    | "GN"
    | "GQ"
    | "GR"
    | "GT"
    | "GW"
    | "GY"
    | "HK"
    | "HN"
    | "HR"
    | "HT"
    | "HU"
    | "ID"
    | "IE"
    | "IL"
    | "IN"
    | "IQ"
    | "IS"
    | "IT"
    | "JM"
    | "JO"
    | "JP"
    | "KE"
    | "KG"
    | "KH"
    | "KI"
    | "KM"
    | "KN"
    | "KR"
    | "KW"
    | "KZ"
    | "LA"
    | "LB"
    | "LC"
    | "LI"
    | "LK"
    | "LR"
    | "LS"
    | "LT"
    | "LU"
    | "LV"
    | "LY"
    | "MA"
    | "MC"
    | "MD"
    | "ME"
    | "MG"
    | "MH"
    | "MK"
    | "ML"
    | "MN"
    | "MO"
    | "MR"
    | "MT"
    | "MU"
    | "MV"
    | "MW"
    | "MX"
    | "MY"
    | "MZ"
    | "NA"
    | "NE"
    | "NG"
    | "NI"
    | "NL"
    | "NO"
    | "NP"
    | "NR"
    | "NZ"
    | "OM"
    | "PA"
    | "PE"
    | "PG"
    | "PH"
    | "PK"
    | "PL"
    | "PS"
    | "PT"
    | "PW"
    | "PY"
    | "QA"
    | "RO"
    | "RS"
    | "RW"
    | "SA"
    | "SB"
    | "SC"
    | "SE"
    | "SG"
    | "SI"
    | "SK"
    | "SL"
    | "SM"
    | "SN"
    | "SR"
    | "ST"
    | "SV"
    | "SZ"
    | "TD"
    | "TG"
    | "TH"
    | "TJ"
    | "TL"
    | "TN"
    | "TO"
    | "TR"
    | "TT"
    | "TV"
    | "TW"
    | "TZ"
    | "UA"
    | "UG"
    | "US"
    | "UY"
    | "UZ"
    | "VC"
    | "VE"
    | "VN"
    | "VU"
    | "WS"
    | "XK"
    | "ZA"
    | "ZM"
    | "ZW";
export type CountryCodeA2 =
    | "AD"
    | "AE"
    | "AF"
    | "AG"
    | "AI"
    | "AL"
    | "AM"
    | "AO"
    | "AQ"
    | "AR"
    | "AS"
    | "AT"
    | "AU"
    | "AW"
    | "AX"
    | "AZ"
    | "BA"
    | "BB"
    | "BD"
    | "BE"
    | "BF"
    | "BG"
    | "BH"
    | "BI"
    | "BJ"
    | "BL"
    | "BM"
    | "BN"
    | "BO"
    | "BQ"
    | "BR"
    | "BS"
    | "BT"
    | "BV"
    | "BW"
    | "BY"
    | "BZ"
    | "CA"
    | "CC"
    | "CD"
    | "CF"
    | "CG"
    | "CH"
    | "CI"
    | "CK"
    | "CL"
    | "CM"
    | "CN"
    | "CO"
    | "CR"
    | "CU"
    | "CV"
    | "CW"
    | "CX"
    | "CY"
    | "CZ"
    | "DE"
    | "DJ"
    | "DK"
    | "DM"
    | "DO"
    | "DZ"
    | "EC"
    | "EE"
    | "EG"
    | "EH"
    | "ER"
    | "ES"
    | "ET"
    | "FI"
    | "FJ"
    | "FK"
    | "FM"
    | "FO"
    | "FR"
    | "GA"
    | "GB"
    | "GD"
    | "GE"
    | "GF"
    | "GG"
    | "GH"
    | "GI"
    | "GL"
    | "GM"
    | "GN"
    | "GP"
    | "GQ"
    | "GR"
    | "GS"
    | "GT"
    | "GU"
    | "GW"
    | "GY"
    | "HK"
    | "HM"
    | "HN"
    | "HR"
    | "HT"
    | "HU"
    | "ID"
    | "IE"
    | "IL"
    | "IM"
    | "IN"
    | "IO"
    | "IQ"
    | "IR"
    | "IS"
    | "IT"
    | "JE"
    | "JM"
    | "JO"
    | "JP"
    | "KE"
    | "KG"
    | "KH"
    | "KI"
    | "KM"
    | "KN"
    | "KP"
    | "KR"
    | "KW"
    | "KY"
    | "KZ"
    | "LA"
    | "LB"
    | "LC"
    | "LI"
    | "LK"
    | "LR"
    | "LS"
    | "LT"
    | "LU"
    | "LV"
    | "LY"
    | "MA"
    | "MC"
    | "MD"
    | "ME"
    | "MF"
    | "MG"
    | "MH"
    | "MK"
    | "ML"
    | "MM"
    | "MN"
    | "MO"
    | "MP"
    | "MQ"
    | "MR"
    | "MS"
    | "MT"
    | "MU"
    | "MV"
    | "MW"
    | "MX"
    | "MY"
    | "MZ"
    | "NA"
    | "NC"
    | "NE"
    | "NF"
    | "NG"
    | "NI"
    | "NL"
    | "NO"
    | "NP"
    | "NR"
    | "NU"
    | "NZ"
    | "OM"
    | "PA"
    | "PE"
    | "PF"
    | "PG"
    | "PH"
    | "PK"
    | "PL"
    | "PM"
    | "PN"
    | "PR"
    | "PS"
    | "PT"
    | "PW"
    | "PY"
    | "QA"
    | "RE"
    | "RO"
    | "RS"
    | "RU"
    | "RW"
    | "SA"
    | "SB"
    | "SC"
    | "SD"
    | "SE"
    | "SG"
    | "SH"
    | "SI"
    | "SJ"
    | "SK"
    | "SL"
    | "SM"
    | "SN"
    | "SO"
    | "SR"
    | "SS"
    | "ST"
    | "SV"
    | "SX"
    | "SY"
    | "SZ"
    | "TC"
    | "TD"
    | "TF"
    | "TG"
    | "TH"
    | "TJ"
    | "TK"
    | "TL"
    | "TM"
    | "TN"
    | "TO"
    | "TR"
    | "TT"
    | "TV"
    | "TW"
    | "TZ"
    | "UA"
    | "UG"
    | "UM"
    | "US"
    | "UY"
    | "UZ"
    | "VA"
    | "VC"
    | "VE"
    | "VG"
    | "VI"
    | "VN"
    | "VU"
    | "WF"
    | "WS"
    | "YE"
    | "YT"
    | "ZA"
    | "ZM"
    | "ZW";

export type {
    RecommendationsRequest,
    RecommendationsRequestRequiredArguments,
    RecommendationsResponse,
    RecommendationSeed
} from "./endpoints/RecommendationsEndpoints";

export type QueryAdditionalTypes = ["episode"];
export type TrackItem = Track | Episode;

type AlbumBase = {
    album_type: "album" | "single" | "compilation";
    available_markets: string[];
    copyrights: Copyright[];
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    label: string;
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: string;
    restrictions?: Restrictions;
    total_tracks: number;
    type: "album";
    uri: string;
};

export type SimplifiedAlbum = AlbumBase & {
    album_group: string;
    artists: SimplifiedArtist[];
};

export type SavedAlbum = {
    added_at: string;
    album: Album;
};

export type Album = AlbumBase & {
    artists: Artist[];
    tracks: Page<SimplifiedTrack>;
};

export type Albums = {
    albums: Album[];
};

export type NewReleases = {
    albums: Page<SimplifiedAlbum>;
};

export type Copyright = {
    text: string;
    type: string;
};

export type Page<TItemType> = {
    href: string;
    items: TItemType[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
};

export type PlaylistedTrack<Item extends TrackItem = TrackItem> = {
    added_at: string;
    added_by: AddedBy;
    is_local: boolean;
    primary_color: string;
    track: Item;
};

export type AddedBy = {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
};

export type LinkedFrom = {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
};

export type SimplifiedTrack = {
    artists: SimplifiedArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    preview_url: string | null;
    track: boolean;
    track_number: number;
    type: "track";
    uri: string;
    is_playable?: boolean;
    linked_from?: LinkedFrom;
    restrictions?: Restrictions;
};

export type SavedTrack = {
    added_at: string;
    track: Track;
};

export type ExternalIds = {
    isrc: string;
    ean: string;
    upc: string;
};

export type Track = SimplifiedTrack & {
    album: SimplifiedAlbum;
    external_ids: ExternalIds;
    popularity: number;
};

export type Tracks = {
    tracks: Track[];
};

export type SimplifiedArtist = {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
};

export type Artist = SimplifiedArtist & {
    followers: Followers;
    genres: string[];
    images: Image[];
    popularity: number;
};

export type Artists = {
    artists: Artist[];
};

export type FollowedArtists = {
    artists: Page<Artist>;
};

export type Followers = {
    href: string | null;
    total: number;
};

export type ExternalUrls = {
    spotify: string;
};

type ResourceTypeToResultKey = {
    album: "albums";
    artist: "artists";
    track: "tracks";
    playlist: "playlists";
    show: "shows";
    episode: "episodes";
    audiobook: "audiobooks";
};

type SearchResultsMap = {
    album: SimplifiedAlbum;
    artist: Artist;
    track: Track;
    playlist: SimplifiedPlaylist;
    show: SimplifiedShow;
    episode: SimplifiedEpisode;
    audiobook: SimplifiedAudiobook;
};

export type PartialSearchResult = {
    [K in ItemTypes as ResourceTypeToResultKey[K]]?: Page<K extends keyof SearchResultsMap ? SearchResultsMap[K] : any>;
};

/**
 * Makes all properties in SearchResults optional, unless the type T is a tuple (literal array / tuple) of SearchTypes.
 */
export type SearchResults<T extends readonly ItemTypes[]> = Pick<
    PartialSearchResult,
    ResourceTypeToResultKey[T[number]]
> extends infer R
    ? number extends T["length"]
        ? R
        : Required<R>
    : never;

export type ArtistSearchResult = {
    href: string;
    items: ArtistSearchResultItem[];
};

export type ArtistSearchResultItem = {
    id: string;
    name: string;
    popularity: number;
    genres: string[];
};

export type TopTracksResult = {
    tracks: Track[];
};

export type Image = {
    url: string;
    height: number;
    width: number;
};

export type SimplifiedAudiobook = {
    authors: Author[];
    available_markets: string[];
    copyrights: Copyright[];
    description: string;
    edition: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    html_description: string;
    id: string;
    images: Image[];
    languages: string[];
    media_type: string;
    name: string;
    narrators: Narrator[];
    publisher: string;
    total_chapters: number;
    type: string;
    uri: string;
};

export type Audiobook = SimplifiedAudiobook & {
    chapters: Page<SimplifiedChapter>;
};

export type Audiobooks = {
    audiobooks: (Audiobook | null)[];
};

export type Categories = {
    categories: Page<Category>;
};

export type Episodes = {
    episodes: Episode[];
};

export type Genres = {
    genres: string[];
};

export type Markets = {
    markets: string[];
};

export type Shows = {
    shows: Show[];
};

export type Category = {
    href: string;
    icons: Icon[];
    id: string;
    name: string;
};

export type Icon = {
    height?: number;
    url: string;
    width?: number;
};

export type Author = {
    name: string;
};

export type SimplifiedChapter = {
    id: string;
    description: string;
    chapter_number: number;
    duration_ms: number;
    explicit: boolean;
    images: Image[];
    languages: string[];
    name: string;
    audio_preview_url: string;
    release_date: string;
    release_date_precision: string;
    resume_point: ResumePoint;
    html_description: string;
    available_markets: Market[];
    type: string;
    uri: string;
    external_urls: ExternalUrls;
    href: string;
    is_playable: boolean;
    restrictions?: Restrictions;
};

export type Chapters = {
    chapters: (Chapter | null)[];
};

export type Chapter = SimplifiedChapter & {
    audiobook: SimplifiedAudiobook;
};

export type Restrictions = {
    reason: string;
};

export type ResumePoint = {
    fully_played: boolean;
    resume_position_ms: number;
};

export type Narrator = {
    name: string;
};

export type SimplifiedEpisode = {
    audio_preview_url: string;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    language: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point: ResumePoint;
    type: string;
    uri: string;
    restrictions: Restrictions;
};

export type Episode = SimplifiedEpisode & {
    show: SimplifiedShow;
};

export type SavedEpisode = {
    added_at: string;
    episode: Episode;
};

export type SimplifiedShow = {
    available_markets: string[];
    copyrights: Copyright[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: string;
    uri: string;
    total_episodes: number;
};

export type SavedShow = {
    added_at: string;
    show: SimplifiedShow;
};

export type Show = SimplifiedShow & {
    episodes: Page<SimplifiedEpisode>;
};

export type SnapshotReference = {
    snapshot_id: string;
};

type PlaylistBase = {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: UserReference;
    primary_color: string;
    public: boolean;
    snapshot_id: string;
    type: string;
    uri: string;
};

export type Playlist<Item extends TrackItem = TrackItem> = PlaylistBase & {
    tracks: Page<PlaylistedTrack<Item>>;
};

export type FeaturedPlaylists = {
    message: string;
    playlists: Page<SimplifiedPlaylist>;
};

export type SimplifiedPlaylist = PlaylistBase & {
    tracks: TrackReference | null;
};

export type TrackReference = {
    href: string;
    total: number;
};

export type UserReference = {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
};

export type User = {
    display_name: string;
    email: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    type: string;
    uri: string;
};

export type UserProfile = User & {
    country: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    product: string;
};

export type AudioFeatures = {
    danceability: number;
    energy: number;
    key: number;
    loudness: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number;
    type: string;
    id: string;
    uri: string;
    track_href: string;
    analysis_url: string;
    duration_ms: number;
    time_signature: number;
};

export type AudioFeaturesCollection = {
    audio_features: AudioFeatures[];
};

export type AudioAnalysis = {
    meta: Meta;
    track: TrackAnalysis;
    bars: Bar[];
    beats: Beat[];
    sections: Section[];
    segments: Segment[];
    tatums: Tatum[];
};

export type Meta = {
    analyzer_version: string;
    platform: string;
    detailed_status: string;
    status_code: number;
    timestamp: number;
    analysis_time: number;
    input_process: string;
};

export type TrackAnalysis = {
    num_samples: number;
    duration: number;
    sample_md5: string;
    offset_seconds: number;
    window_seconds: number;
    analysis_sample_rate: number;
    analysis_channels: number;
    end_of_fade_in: number;
    start_of_fade_out: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    codestring: string;
    code_version: number;
    echoprintstring: string;
    echoprint_version: number;
    synchstring: string;
    synch_version: number;
    rhythmstring: string;
    rhythm_version: number;
};

export type Bar = {
    start: number;
    duration: number;
    confidence: number;
};

export type Beat = {
    start: number;
    duration: number;
    confidence: number;
};

export type Section = {
    start: number;
    duration: number;
    confidence: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
};

export type Segment = {
    start: number;
    duration: number;
    confidence: number;
    loudness_start: number;
    loudness_max: number;
    loudness_max_time: number;
    loudness_end: number;
    pitches: number[];
    timbre: number[];
};

export type Tatum = {
    start: number;
    duration: number;
    confidence: number;
};

export type PlaybackState = {
    device: Device;
    repeat_state: string;
    shuffle_state: boolean;
    context: Context | null;
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item: TrackItem;
    currently_playing_type: string;
    actions: Actions;
};

export type Device = {
    id: string | null;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number | null;
};

export type Devices = {
    devices: Device[];
};

export type Context = {
    type: string;
    href: string;
    external_urls: ExternalUrls;
    uri: string;
};

export type Actions = {
    interrupting_playback?: boolean;
    pausing?: boolean;
    resuming?: boolean;
    seeking?: boolean;
    skipping_next?: boolean;
    skipping_prev?: boolean;
    toggling_repeat_context?: boolean;
    toggling_shuffle?: boolean;
    toggling_repeat_track?: boolean;
    transferring_playback?: boolean;
};

export type RecentlyPlayedTracksPage = {
    href: string;
    limit: number;
    next: string | null;
    cursors: {
        after: string;
        before: string;
    };
    total: number;
    items: PlayHistory[];
};

export type PlayHistory = {
    track: Track;
    played_at: string;
    context: Context;
};

export type Queue = {
    currently_playing: TrackItem | null;
    queue: TrackItem[];
};
