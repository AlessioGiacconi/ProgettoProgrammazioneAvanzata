/**
 * @file Errors.ts
 * @description Definisce le classi di messaggi di errore e una factory per crearli.
 */

import { Message, Response, ErrorEnum, MessageFactory, HttpStatusEnum } from './Message';

/**
 * @class LoginFailed
 * @implements Message
 * @description Classe per rappresentare un errore di login fallito.
 */
class LoginFailed implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un login fallito.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.UNAUTHORIZED,
      message: 'Login Failed: incorrect email or password ',
      type: 'application/json'
    };
  }
}

/**
 * @class UserRegistrationFailed
 * @implements Message
 * @description Classe per rappresentare un errore di registrazione utente fallita.
 */
class UserRegistrationFailed implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per una registrazione utente fallita.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'User Registration Failed',
      type: 'application/json'
    };
  }
}

/**
 * @class UserNotFound
 * @implements Message
 * @description Classe per rappresentare un errore di utente non trovato.
 */
class UserNotFound implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un utente non trovato.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.NOT_FOUND,
      message: 'User Not Found',
      type: 'application/json'
    };
  }
}

/**
 * @class UserUpdateFailed
 * @implements Message
 * @description Classe per rappresentare un errore di aggiornamento utente fallito.
 */
class UserUpdateFailed implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un aggiornamento utente fallito.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'User Update Failed',
      type: 'application/json'
    };
  }
}

/**
 * @class UserDeletionFailed
 * @implements Message
 * @description Classe per rappresentare un errore di eliminazione utente fallita.
 */
class UserDeletionFailed implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un'eliminazione utente fallita.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'User Deletion Failed',
      type: 'application/json'
    };
  }
}

/**
 * @class PassageCreationFailed
 * @implements Message
 * @description Classe per rappresentare un errore di creazione di un varco fallita.
 */
class PassageCreationFailed implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per una creazione di un varco fallita.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Passage Creation Failed',
      type: 'application/json'
    };
  }
}

/**
 * @class PassageNotFound
 * @implements Message
 * @description Classe per rappresentare un errore di varco non trovato.
 */
class PassageNotFound implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un varco non trovato.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.NOT_FOUND,
      message: 'Passage Not Found',
      type: 'application/json'
    };
  }
}

/**
 * @class PassageUpdateFailed
 * @implements Message
 * @description Classe per rappresentare un errore di aggiornamento di un varco fallito.
 */
class PassageUpdateFailed implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un aggiornamento di un varco fallito.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Passage Update Failed',
      type: 'application/json'
    };
  }
}

/**
 * @class PassageDeletionFailed
 * @implements Message
 * @description Classe per rappresentare un errore di eliminazione di un varco fallito.
 */
class PassageDeletionFailed implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un'eliminazione di un varco fallito.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Passage Deletion Failed',
      type: 'application/json'
    };
  }
}

/**
 * @class TransitNotFound
 * @implements Message
 * @description Classe per rappresentare un errore di transito non trovato.
 */
class TransitNotFound implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un transito non trovato.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.NOT_FOUND,
      message: 'Transit Not Found',
      type: 'application/json'
    };
  }
}

/**
 * @class TransitCreationFailed
 * @implements Message
 * @description Classe per rappresentare un errore di creazione di un transito fallita.
 */
class TransitCreationFailed implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per una creazione di un transito fallita.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Transit creation Failed',
      type: 'application/json'
    };
  }
}

/**
 * @class TransitUpdateFailed
 * @implements Message
 * @description Classe per rappresentare un errore di aggiornamento di un transito fallito.
 */
class TransitUpdateFailed implements Message {

   /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un aggiornamento di un transito fallito.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Transit Update Failed',
      type: 'application/json'
    };
  }
}

/**
 * @class TransitDeletionFailed
 * @implements Message
 * @description Classe per rappresentare un errore di eliminazione di un transito fallito.
 */
class TransitDeletionFailed implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un'eliminazione di un transito fallito.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Transit Deletion Failed',
      type: 'application/json'
    };
  }
}

/**
 * @class AccessStatsRetrieveFailed
 * @implements Message
 * @description Classe per rappresentare un errore di recupero delle statistiche di accesso fallito.
 */
class AccessStatsRetrieveFailed implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un recupero delle statistiche di accesso fallito.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Access stats Failed',
      type: 'application/json'
    };
  }
}

/**
 * @class Unauthorized
 * @implements Message
 * @description Classe per rappresentare un errore di non autorizzato.
 */
class Unauthorized implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per una richiesta non autorizzata.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.UNAUTHORIZED,
      message: 'Unauthorized',
      type: 'application/json'
    };
  }
}

/**
 * @class Forbidden
 * @implements Message
 * @description Classe per rappresentare un errore di accesso vietato.
 */
class Forbidden implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un accesso vietato.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.FORBIDDEN,
      message: 'Forbidden',
      type: 'application/json'
    };
  }
}

/**
 * @class ForbiddenAdminRole
 * @implements Message
 * @description Classe per rappresentare un errore di accesso vietato per ruolo admin.
 */
class ForbiddenAdminRole implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un accesso vietato ai soli amministratori.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.FORBIDDEN,
      message: 'Access denied. Admin privileges are required.',
      type: 'application/json'
    };
  }
}

/**
 * @class ForbiddenAdminOrPassageRole
 * @implements Message
 * @description Classe per rappresentare un errore di accesso vietato per ruolo admin o varco.
 */
class ForbiddenAdminOrPassageRole implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un accesso vietato agli amministratori o agli utenti del varco.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.FORBIDDEN,
      message: 'Access denied. Admin or passage user privileges are required.',
      type: 'application/json'
    };
  }
}

/**
 * @class ForbiddenSuspended
 * @implements Message
 * @description Classe per rappresentare un errore di accesso vietato per utente sospeso.
 */
class ForbiddenSuspended implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un accesso vietato a causa di sospensione dell'utente.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.FORBIDDEN,
      message: 'Access denied. User suspended.',
      type: 'application/json'
    };
  }
}

/**
 * @class ValidationError
 * @implements Message
 * @description Classe per rappresentare un errore di validazione.
 */
class ValidationError implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per una validazione fallita.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Validation Error',
      type: 'application/json'
    };
  }
}

/**
 * @class InternalServerError
 * @implements Message
 * @description Classe per rappresentare un errore interno del server.
 */
class InternalServerError implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un errore interno del server.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      type: 'application/json'
    };
  }
}

/**
 * @class DefaultError
 * @implements Message
 * @description Classe per rappresentare un errore generico.
 */
class DefaultError implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un errore generico.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
      message: 'An error occurred',
      type: 'application/json'
    };
  }
}

/**
 * @class EmailNotValidAddress
 * @implements Message
 * @description Classe per rappresentare un errore di indirizzo email non valido.
 */
class EmailNotValidAddress implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un indirizzo email non valido.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Email Not Valid Address',
      type: 'application/json'
    };
  }
}

/**
 * @class LoginBadRequest
 * @implements Message
 * @description Classe per rappresentare un errore di richiesta di login non valida.
 */
class LoginBadRequest implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per una richiesta di login non valida.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Login Bad Request',
      type: 'application/json'
    };
  }
}

/**
 * @class JwtNotValid
 * @implements Message
 * @description Classe per rappresentare un errore di JWT non valido.
 */
class JwtNotValid implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un JWT non valido.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.UNAUTHORIZED,
      message: 'JWT Not Valid',
      type: 'application/json'
    };
  }
}

/**
 * @class TokenChargeBadRequest
 * @implements Message
 * @description Classe per rappresentare un errore di richiesta di addebito di token non valida.
 */
class TokenChargeBadRequest implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per una richiesta di addebito di token non valida.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Token Charge Bad Request',
      type: 'application/json'
    };
  }
}

/**
 * @class PassageRoleNotValid
 * @implements Message
 * @description Classe per rappresentare un errore di ruolo di varco non valido.
 */
class PassageRoleNotValid implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un ruolo di varco non valido.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Passage role not valid.',
      type: 'application/json'
    };
  }
}

/**
 * @class AuthorizationNotFound
 * @implements Message
 * @description Classe per rappresentare un errore di autorizzazione non trovata.
 */
class AuthorizationNotFound implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un'autorizzazione non trovata.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.NOT_FOUND,
      message: 'Authorization not Found.',
      type: 'application/json'
    };
  }
}

/**
 * @class RoleNotValid
 * @implements Message
 * @description Classe per rappresentare un errore di ruolo non valido.
 */
class RoleNotValid implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un ruolo non valido.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Role not valid.',
      type: 'application/json'
    };
  }
}

/**
 * @class InvalidDateRange
 * @implements Message
 * @description Classe per rappresentare un errore di intervallo di date non valido.
 */
class InvalidDateRange implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un intervallo di date non valido.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Invalid date range.',
      type: 'application/json'
    };
  }
}

/**
 * @class StartDateGreaterThanEndDate
 * @implements Message
 * @description Classe per rappresentare un errore di data di inizio maggiore della data di fine.
 */
class StartDateGreaterThanEndDate implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per una data di inizio maggiore della data di fine.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Start date greater than end date.',
      type: 'application/json'
    };
  }
}

/**
 * @class InvalidFormat
 * @implements Message
 * @description Classe per rappresentare un errore di formato non valido.
 */
class InvalidFormat implements Message {

  /**
   * @method getResponse
   * @description Restituisce la risposta di errore per un formato richiesto non valido.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Invalid format requested.',
      type: 'application/json'
    };
  }
}

/**
 * @class PassageReferenceRequired
 * @implements Message
 * @description Classe per rappresentare un errore nel caso in cui il riferimento ad un passaggio non sia stato inserito.
 */
class PassageReferenceRequired implements Message {

    /**
   * @method getResponse
   * @description Restituisce la risposta di errore nel caso in cui il riferimento ad un passaggio non sia stato inserito.
   * @returns {Response} La risposta di errore.
   */
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Passage reference required.',
      type: 'application/json'
    };
  }
}

/**
 * @class ErrorFactory
 * @extends MessageFactory
 * @description Factory per creare istanze di messaggi di errore.
 */
export class ErrorFactory extends MessageFactory {
  constructor() {
    super();
  }

  /**
   * @method getMessage
   * @description Restituisce un messaggio di errore basato sul tipo di errore fornito.
   * @param {ErrorEnum} type - Tipo di errore.
   * @returns {Message} Il messaggio di errore corrispondente.
   */
  getMessage(type: ErrorEnum): Message {
    let errorClass: Message | null = null;
    switch (type) {
      case ErrorEnum.LoginFailed:
        errorClass = new LoginFailed();
        break;
      case ErrorEnum.UserRegistrationFailed:
        errorClass = new UserRegistrationFailed();
        break;
      case ErrorEnum.UserNotFound:
        errorClass = new UserNotFound();
        break;
      case ErrorEnum.UserUpdateFailed:
        errorClass = new UserUpdateFailed();
        break;
      case ErrorEnum.UserDeletionFailed:
        errorClass = new UserDeletionFailed();
        break;
      case ErrorEnum.PassageCreationFailed:
        errorClass = new PassageCreationFailed();
        break;
      case ErrorEnum.PassageNotFound:
        errorClass = new PassageNotFound();
        break;
      case ErrorEnum.PassageUpdateFailed:
        errorClass = new PassageUpdateFailed();
        break;
      case ErrorEnum.PassageDeletionFailed:
        errorClass = new PassageDeletionFailed();
        break;
      case ErrorEnum.TransitNotFound:
        errorClass = new TransitNotFound();
        break;
      case ErrorEnum.TransitUpdateFailed:
        errorClass = new TransitUpdateFailed();
        break;
      case ErrorEnum.TransitCreationFailed:
        errorClass = new TransitCreationFailed();
        break;
      case ErrorEnum.TransitDeletionFailed:
        errorClass = new TransitDeletionFailed();
        break;
      case ErrorEnum.AccessStatsRetrieveFailed:
        errorClass = new AccessStatsRetrieveFailed();
        break;
      case ErrorEnum.Unauthorized:
        errorClass = new Unauthorized();
        break;
      case ErrorEnum.Forbidden:
        errorClass = new Forbidden();
        break;
      case ErrorEnum.ValidationError:
        errorClass = new ValidationError();
        break;
      case ErrorEnum.InternalServerError:
        errorClass = new InternalServerError();
        break;
      case ErrorEnum.EmailNotValidAddress:
        errorClass = new EmailNotValidAddress();
        break;
      case ErrorEnum.LoginBadRequest:
        errorClass = new LoginBadRequest();
        break;
      case ErrorEnum.JwtNotValid:
        errorClass = new JwtNotValid();
        break;
      case ErrorEnum.TokenChargeBadRequest:
        errorClass = new TokenChargeBadRequest();
        break;
      case ErrorEnum.ForbiddenAdminRole:
        errorClass = new ForbiddenAdminRole();
        break;
      case ErrorEnum.ForbiddenAdminOrPassageRole:
        errorClass = new ForbiddenAdminOrPassageRole();
        break;
      case ErrorEnum.ForbiddenSuspended:
        errorClass = new ForbiddenSuspended();
        break;
      case ErrorEnum.PassageRoleNotValid:
        errorClass = new PassageRoleNotValid();
        break;
      case ErrorEnum.RoleNotValid:
        errorClass = new RoleNotValid();
        break;
      case ErrorEnum.AuthorizationNotFound:
        errorClass = new AuthorizationNotFound();
        break;
      case ErrorEnum.InvalidDateRange:
        errorClass = new InvalidDateRange();
        break;
      case ErrorEnum.StartDateGreaterThanEndDate:
        errorClass = new StartDateGreaterThanEndDate();
        break;
      case ErrorEnum.InvalidFormat:
        errorClass = new InvalidFormat();
        break;
      case ErrorEnum.PassageReferenceRequired:
        errorClass = new PassageReferenceRequired();
        break;
      default:
        errorClass = new DefaultError();
    }
    return errorClass;
  }
}