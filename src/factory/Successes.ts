/**
 * @file Successes.ts
 * @description Definisce le classi di messaggi di successo e una factory per crearli.
 */

import { Message, Response, SuccessEnum, MessageFactory, HttpStatusEnum } from "./Message";

/**
 * @class LoginSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per il login.
 */
class LoginSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per il login.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Login successful",
            type: "application/json"
        };
    }
}

/**
 * @class UserRegisteredSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per la registrazione dell'utente.
 */
class UserRegisteredSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per la registrazione dell'utente.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.CREATED,
            message: "User registered successfully",
            type: "application/json"
        };
    }
}

/**
 * @class UserRetrievedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per il recupero dell'utente.
 */
class UserRetrievedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per il recupero dell'utente.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "User retrieved successfully",
            type: "application/json"
        };
    }
}

/**
 * @class UserUpdatedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per l'aggiornamento dell'utente.
 */
class UserUpdatedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per l'aggiornamento dell'utente.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "User updated successfully",
            type: "application/json"
        };
    }
}

/**
 * @class UserActivatedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per l'attivazione dell'utente.
 */
class UserActivatedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per l'attivazione dell'utente.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "User activated successfully",
            type: "application/json"
        };
    }
}

/**
 * @class UsersSuspendedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per il recupero degli utenti sospesi.
 */
class UsersSuspendedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per il recupero degli utenti sospesi.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Suspended users returned successfully",
            type: "application/json"
        };
    }
}

/**
 * @class UserDeletedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per la cancellazione dell'utente.
 */
class UserDeletedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per la cancellazione dell'utente.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "User deleted successfully",
            type: "application/json"
        };
    }
}

/**
 * @class PassageCreatedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per la creazione del varco.
 */
class PassageCreatedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per la creazione del varco.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.CREATED,
            message: "Passage created successfully",
            type: "application/json"
        };
    }
}

/**
 * @class PassageRetrievedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per il recupero del varco.
 */
class PassageRetrievedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per il recupero del varco.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Passage retrieved successfully",
            type: "application/json"
        };
    }
}

/**
 * @class PassageUpdatedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per l'aggiornamento del varco.
 */
class PassageUpdatedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per l'aggiornamento del varco.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Passage updated successfully",
            type: "application/json"
        };
    }
}

/**
 * @class PassageDeletedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per la cancellazione del varco.
 */
class PassageDeletedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per la cancellazione del varco.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Passage deleted successfully",
            type: "application/json"
        };
    }
}

/**
 * @class TransitRetrievedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per il recupero del transito.
 */
class TransitRetrievedSuccess implements Message {

     /**
     * @method getResponse
     * @description Restituisce la risposta di successo per il recupero del transito.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Transit retrieved successfully",
            type: "application/json"
        };
    }
}

/**
 * @class TransitUpdatedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per l'aggiornamento del transito.
 */
class TransitUpdatedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per l'aggiornamento del transito.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Transit updated successfully",
            type: "application/json"
        };
    }
}

/**
 * @class TransitCreatedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per la creazione del transito.
 */
class TransitCreatedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per la creazione del transito.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Transit created successfully",
            type: "application/json"
        };
    }
}

/**
 * @class TransitDeletedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per la cancellazione del transito.
 */
class TransitDeletedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per la cancellazione del transito.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Transit deleted successfully",
            type: "application/json"
        };
    }
}

/**
 * @class AccessStatsRetrievedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per il recupero delle statistiche di accesso.
 */
class AccessStatsRetrievedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per il recupero delle statistiche di accesso.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Access statistics retrieved successfully",
            type: "application/json"
        };
    }
}

/**
 * @class ReportGeneratedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per la generazione del report.
 */
class ReportGeneratedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per la generazione del report.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Report generated successfully",
            type: "application/json"
        };
    }
}

/**
 * @class AuthorizationCreatedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per la creazione dell'autorizzazione.
 */
class AuthorizationCreatedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per la creazione dell'autorizzazione.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.CREATED,
            message: "Authorization created successfully",
            type: "application/json"
        };
    }
}

/**
 * @class AuthorizationDeletedSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo per la cancellazione dell'autorizzazione.
 */
class AuthorizationDeletedSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo per la cancellazione dell'autorizzazione.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Authorization deleted successfully",
            type: "application/json"
        };
    }
}

/**
 * @class DefaultSuccess
 * @implements Message
 * @description Classe per rappresentare un messaggio di successo di default.
 */
class DefaultSuccess implements Message {

    /**
     * @method getResponse
     * @description Restituisce la risposta di successo di default.
     * @returns {Response} La risposta di successo.
     */
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Operation successful",
            type: "application/json"
        };
    }
}

/**
 * @class SuccessFactory
 * @extends MessageFactory
 * @description Classe per la creazione di messaggi di successo.
 */
export class SuccessFactory extends MessageFactory {
    constructor() {super()}

    /**
     * @method getMessage
     * @description Restituisce un'istanza della classe di successo appropriata in base al tipo fornito.
     * @param {SuccessEnum} type - Il tipo di successo.
     * @returns {Message} Il messaggio di successo corrispondente.
     */
    getMessage(type: SuccessEnum): Message {

        let successClass: Message | null = null;
        switch (type) {
            case SuccessEnum.LoginSuccess:
                successClass = new LoginSuccess();
                break;
            case SuccessEnum.UserRegisteredSuccess:
                successClass = new UserRegisteredSuccess();
                break;
            case SuccessEnum.UserRetrievedSuccess:
                successClass = new UserRetrievedSuccess();
                break;
            case SuccessEnum.UserUpdatedSuccess:
                successClass = new UserUpdatedSuccess();
                break;
            case SuccessEnum.UserActivatedSuccess:
                successClass = new UserActivatedSuccess();
                break;
            case SuccessEnum.UserDeletedSuccess:
                successClass = new UserDeletedSuccess();
                break;
            case SuccessEnum.UsersSuspendedSuccess:
                successClass = new UsersSuspendedSuccess();
                break;
            case SuccessEnum.PassageCreatedSuccess:
                successClass = new PassageCreatedSuccess();
                break;
            case SuccessEnum.PassageRetrievedSuccess:
                successClass = new PassageRetrievedSuccess();
                break;
            case SuccessEnum.PassageUpdatedSuccess:
                successClass = new PassageUpdatedSuccess();
                break;
            case SuccessEnum.PassageDeletedSuccess:
                successClass = new PassageDeletedSuccess();
                break;
            case SuccessEnum.TransitRetrievedSuccess:
                successClass = new TransitRetrievedSuccess();
                break;
            case SuccessEnum.TransitCreatedSuccess:
                successClass = new TransitCreatedSuccess();
                break;
            case SuccessEnum.TransitUpdatedSuccess:
                successClass = new TransitUpdatedSuccess();
                break;
            case SuccessEnum.TransitDeletedSuccess:
                successClass = new TransitDeletedSuccess();
                break;
            case SuccessEnum.AccessStatsRetrievedSuccess:
                successClass = new AccessStatsRetrievedSuccess();
                break;
            case SuccessEnum.ReportGeneratedSuccess:
                successClass = new ReportGeneratedSuccess();
                break;
            case SuccessEnum.AuthorizationCreatedSuccess:
                successClass = new AuthorizationCreatedSuccess();
                break;
            case SuccessEnum.AuthorizationDeletedSuccess:
                successClass = new AuthorizationDeletedSuccess();
                break;

            default:
                successClass = new DefaultSuccess()
        }
    return successClass;
    }
}