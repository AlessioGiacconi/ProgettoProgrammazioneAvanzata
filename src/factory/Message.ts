/**
 * @file Message.ts
 * @description Questo file contiene le definizioni delle interfacce, enumerazioni e classi astratte per la gestione dei messaggi di risposta del server.
*/

/**
 * @interface Response
 * @description Interfaccia per rappresentare una risposta del server.
 * @property {string} message - Messaggio della risposta.
 * @property {number} status - Codice di stato HTTP.
 * @property {string} [data] - Dati opzionali da restituire nella risposta.
 * @property {string} type - Tipo di Content-Type da impostare nell'intestazione della risposta.
 */
export interface Response {
    message: string; // message of the response
    status: number; // HTTP status code
    data?: string; // data to return in the response
    type: string; // type of Content-Type to set into header response
  }

/**
 * @interface Message
 * @description Interfaccia per rappresentare un messaggio con un metodo per ottenere la risposta.
 */
  export interface Message {
    getResponse(): Response;
  }
  
/**
 * @enum SuccessEnum
 * @description Enumerazione dei tipi di messaggi di successo.
 */
  export enum SuccessEnum {
    LoginSuccess,
    UserRegisteredSuccess,
    UserRetrievedSuccess,
    UserUpdatedSuccess,
    UserDeletedSuccess,
    UserActivatedSuccess,
    UsersSuspendedSuccess,
    PassageCreatedSuccess,
    PassageRetrievedSuccess,
    PassageUpdatedSuccess,
    PassageDeletedSuccess,
    TransitRetrievedSuccess,
    TransitCreatedSuccess,
    TransitUpdatedSuccess,
    TransitDeletedSuccess,
    AccessStatsRetrievedSuccess,
    ReportGeneratedSuccess,
    AuthorizationCreatedSuccess,
    AuthorizationDeletedSuccess,
    DefaultSuccess
  }
  
/**
 * @enum ErrorEnum
 * @description Enumerazione dei tipi di messaggi di errore.
 */
  export enum ErrorEnum {
    LoginFailed,
    UserRegistrationFailed,
    UserNotFound,
    UserUpdateFailed,
    UserDeletionFailed,
    PassageCreationFailed,
    PassageNotFound,
    PassageUpdateFailed,
    PassageDeletionFailed,
    TransitNotFound,
    TransitUpdateFailed,
    TransitDeletionFailed,
    TransitCreationFailed,
    AccessStatsRetrieveFailed,
    Unauthorized,
    Forbidden,
    ValidationError,
    InternalServerError,
    EmailNotValidAddress,
    LoginBadRequest,
    JwtNotValid,
    TokenChargeBadRequest,
    ForbiddenAdminRole,
    ForbiddenAdminOrPassageRole,
    ForbiddenSuspended,
    PassageRoleNotValid,
    RoleNotValid,
    ForbiddenRole,
    AuthorizationNotFound,
    InvalidDateRange,
    StartDateGreaterThanEndDate,
    InvalidFormat,
    PassageReferenceRequired,
    AuthorizationCreationFailed,
    DefaultError,
    UniqueConstraintViolation,
    ForeignKeyConstraintViolation
  }
  
  /**
  * @enum HttpStatusEnum
  * @description Enumerazione dei codici di stato HTTP.
  */
  export enum HttpStatusEnum {
    // Risposte informative (100–199)
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    EARLY_HINTS = 103,
  
    // Risposte di successo (200–299)
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226,
  
    // Messaggi di redirezione (300–399)
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    SWITCH_PROXY = 306,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
  
    // Risposte di errore del client (400–499)
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    IM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    TOO_EARLY = 425,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  
    // Risposte di errore del server (500–599)
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511
  }
  
  /**
 * @abstract class MessageFactory
 * @description Classe astratta per la creazione di messaggi, utilizzata da ErrorFactory e SuccessFactory.
 */
  export abstract class MessageFactory {
    constructor() {}
    
    /**
     * @abstract getMessage
     * @description Metodo astratto per ottenere un messaggio.
     * @param {number} type - Tipo di messaggio da ottenere.
     * @returns {Message} Messaggio richiesto.
     */
    abstract getMessage(type: number): Message;
  }