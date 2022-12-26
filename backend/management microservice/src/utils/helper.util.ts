import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { hash } from 'bcryptjs';

export const REQUEST_MSG = "Request";
export const RESPONSE_MSG = "Response";
export const DATABASE_MSG = "Database";
export const ERROR_MSG = "Error";
export const APPROVAL_MSG = "Approval";
export const REJECT_MSG = "Reject";
export const APPROVAL_ENTRY_MSG = "Approval Created!";
export const SUCCESS = "Success";
export const FAILURE = "Failure";

//customize response class
export class customResponse {

    message: string;
    payload: any;

    constructor(message: string, payload: any) {

        this.message = message;
        this.payload = payload;
    }
}
export const response = (message: string, payload: any) => {
    return {

        message,
        payload
    }
}

//customize error class
export class customError {
    message: string;
    payload: any;
    status: number;

    constructor(payload: any) {
        this.payload = payload;

    }

    error() {
        this.status = HttpStatus.BAD_REQUEST;
        if (this.payload instanceof PrismaClientValidationError) {
            this.message = "Validation Error";

        } else if (this.payload instanceof PrismaClientKnownRequestError) {
            this.message = "Database Error";
        } else {
            this.message = "Internal Server Error";
            this.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        console.log(this.payload)
        throw new HttpException({
            statusCode: this.status,
            error: this.payload,
            message: this.message
        }, this.status);
    }
}

//hash the password by bcrypt library
export const hashPassword = async (password) => {
    return await hash(password, 10)
} 

//default permissions
export const defaultPermissions = [
    {
        name:"user",
        canView:false,
        canAdd:false,
        canUpdate:false,
        canDelete:false,
        
    },

    {
        name:"role",
        canView:false,
        canAdd:false,
        canUpdate:false,
        canDelete:false,
    },
    {
        name:"permission",
        canView:false,
        canAdd:false,
        canUpdate:false,
        canDelete:false,
    },
    {
        name:"assign_permission",
        canView:false,
        canAdd:false,
        canUpdate:false,
        canDelete:false,
    },
    {
        name:"department",
        canView:false,
        canAdd:false,
        canUpdate:false,
        canDelete:false,
    },
    {
        name:"approval",
        canView:false,
        canAdd:false,
        canUpdate:false,
        canDelete:false,
    },
    {
        name:"module",
        canView:false,
        canAdd:false,
        canUpdate:false,
        canDelete:false,
    },

]

//constant type messages
export const approvalTypes = {
    "Add":"ADD",
    "Update":"UPDATE"
}