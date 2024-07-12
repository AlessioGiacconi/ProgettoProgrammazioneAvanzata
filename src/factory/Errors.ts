import { Message, Response, ErrorEnum, MessageFactory, HttpStatusEnum } from './Message';

class LoginFailed implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.UNAUTHORIZED,
      message: 'Login Failed: incorrect email or password ',
      type: 'application/json'
    };
  }
}

class UserRegistrationFailed implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'User Registration Failed',
      type: 'application/json'
    };
  }
}

class UserNotFound implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.NOT_FOUND,
      message: 'User Not Found',
      type: 'application/json'
    };
  }
}

class UserUpdateFailed implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'User Update Failed',
      type: 'application/json'
    };
  }
}

class UserDeletionFailed implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'User Deletion Failed',
      type: 'application/json'
    };
  }
}

class PassageCreationFailed implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Passage Creation Failed',
      type: 'application/json'
    };
  }
}

class PassageNotFound implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.NOT_FOUND,
      message: 'Passage Not Found',
      type: 'application/json'
    };
  }
}

class PassageUpdateFailed implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Passage Update Failed',
      type: 'application/json'
    };
  }
}

class PassageDeletionFailed implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Passage Deletion Failed',
      type: 'application/json'
    };
  }
}

class TransitNotFound implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.NOT_FOUND,
      message: 'Transit Not Found',
      type: 'application/json'
    };
  }
}

class TransitUpdateFailed implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Transit Update Failed',
      type: 'application/json'
    };
  }
}

class TransitDeletionFailed implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Transit Deletion Failed',
      type: 'application/json'
    };
  }
}

class Unauthorized implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.UNAUTHORIZED,
      message: 'Unauthorized',
      type: 'application/json'
    };
  }
}

class Forbidden implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.FORBIDDEN,
      message: 'Forbidden',
      type: 'application/json'
    };
  }
}

class ForbiddenAdminRole implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.FORBIDDEN,
      message: 'Access denied. Admin privileges are required.',
      type: 'application/json'
    };
  }
}

class ForbiddenAdminOrPassageRole implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.FORBIDDEN,
      message: 'Access denied. Admin or passage user privileges are required.',
      type: 'application/json'
    };
  }
}

class ForbiddenSuspended implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.FORBIDDEN,
      message: 'Access denied. User suspended.',
      type: 'application/json'
    };
  }
}

class ValidationError implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Validation Error',
      type: 'application/json'
    };
  }
}

class InternalServerError implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      type: 'application/json'
    };
  }
}

class DefaultError implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
      message: 'An error occurred',
      type: 'application/json'
    };
  }
}

// New Error Classes
class EmailNotValidAddress implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Email Not Valid Address',
      type: 'application/json'
    };
  }
}

class LoginBadRequest implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Login Bad Request',
      type: 'application/json'
    };
  }
}

class JwtNotValid implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.UNAUTHORIZED,
      message: 'JWT Not Valid',
      type: 'application/json'
    };
  }
}

class TokenChargeBadRequest implements Message {
  getResponse(): Response {
    return {
      status: HttpStatusEnum.BAD_REQUEST,
      message: 'Token Charge Bad Request',
      type: 'application/json'
    };
  }
}

export class ErrorFactory extends MessageFactory {
  constructor() {
    super();
  }

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
      case ErrorEnum.TransitDeletionFailed:
        errorClass = new TransitDeletionFailed();
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

      default:
        errorClass = new DefaultError();
    }
    return errorClass;
  }
}