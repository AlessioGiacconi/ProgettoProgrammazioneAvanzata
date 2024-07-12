import { Message, Response, SuccessEnum, MessageFactory, HttpStatusEnum } from "./Message";

class LoginSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Login successful",
            type: "application/json"
        };
    }
}

class UserRegisteredSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.CREATED,
            message: "User registered successfully",
            type: "application/json"
        };
    }
}

class UserRetrievedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "User retrieved successfully",
            type: "application/json"
        };
    }
}

class UserUpdatedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "User updated successfully",
            type: "application/json"
        };
    }
}

class UserActivatedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "User activated successfully",
            type: "application/json"
        };
    }
}

class UsersSuspendedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Suspended users returned successfully",
            type: "application/json"
        };
    }
}

class UserDeletedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "User deleted successfully",
            type: "application/json"
        };
    }
}

class PassageCreatedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.CREATED,
            message: "Passage created successfully",
            type: "application/json"
        };
    }
}

class PassageRetrievedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Passage retrieved successfully",
            type: "application/json"
        };
    }
}

class PassageUpdatedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Passage updated successfully",
            type: "application/json"
        };
    }
}

class PassageDeletedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Passage deleted successfully",
            type: "application/json"
        };
    }
}

class TransitRetrievedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Transit retrieved successfully",
            type: "application/json"
        };
    }
}

class TransitUpdatedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Transit updated successfully",
            type: "application/json"
        };
    }
}

class TransitDeletedSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Transit deleted successfully",
            type: "application/json"
        };
    }
}

class DefaultSuccess implements Message {
    getResponse(): Response {
        return {
            status: HttpStatusEnum.OK,
            message: "Operation successful",
            type: "application/json"
        };
    }
}

export class SuccessFactory extends MessageFactory {
    constructor() {super()}

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
            case SuccessEnum.TransitUpdatedSuccess:
                successClass = new TransitUpdatedSuccess();
                break;
            case SuccessEnum.TransitDeletedSuccess:
                successClass = new TransitDeletedSuccess();
                break;

            default:
                successClass = new DefaultSuccess()
        }
    return successClass;
    }
}