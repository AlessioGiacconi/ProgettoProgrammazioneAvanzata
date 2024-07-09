import { Message, Response, ErrorEnum, MessageFactory, HttpStatusEnum } from "./Message";

class LoginFailed implements Message{
    getResponse(): Response {
        return {
            status: HttpStatusEnum.UNAUTHORIZED,
            message: "Login Failed",
            type: "application/json"
        }
    }
}

class UserRegistrationFailed implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.BAD_REQUEST,
            message: "User Registration Failed",
            type: "application/json"
        };
    }
}

class UserNotFound implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.NOT_FOUND,
            message: "User Not Found",
            type: "application/json"
        };
    }
}

class UserUpdateFailed implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.BAD_REQUEST,
            message: "User Update Failed",
            type: "application/json"
        };
    }
}

class UserDeletionFailed implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.BAD_REQUEST,
            message: "User Deletion Failed",
            type: "application/json"
        };
    }
}

class PassageCreationFailed implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.BAD_REQUEST,
            message: "Passage Creation Failed",
            type: "application/json"
        };
    }
}

class PassageNotFound implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.NOT_FOUND,
            message: "Passage Not Found",
            type: "application/json"
        };
    }
}

class PassageUpdateFailed implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.BAD_REQUEST,
            message: "Passage Update Failed",
            type: "application/json"
        };
    }
}

class PassageDeletionFailed implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.BAD_REQUEST,
            message: "Passage Deletion Failed",
            type: "application/json"
        };
    }
}

class TransitNotFound implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.NOT_FOUND,
            message: "Transit Not Found",
            type: "application/json"
        };
    }
}

class TransitUpdateFailed implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.BAD_REQUEST,
            message: "Transit Update Failed",
            type: "application/json"
        };
    }
}

class TransitDeletionFailed implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.BAD_REQUEST,
            message: "Transit Deletion Failed",
            type: "application/json"
        };
    }
}

class Unauthorized implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.UNAUTHORIZED,
            message: "Unauthorized",
            type: "application/json"
        };
    }
}

class Forbidden implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.FORBIDDEN,
            message: "Forbidden",
            type: "application/json"
        };
    }
}

class ValidationError implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.BAD_REQUEST,
            message: "Validation Error",
            type: "application/json"
        };
    }
}

class InternalServerError implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            type: "application/json"
        };
    }
}

class DefaultError implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
            message: "An error occurred",
            type: "application/json"
        };
    }
}
