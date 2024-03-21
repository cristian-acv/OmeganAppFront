export interface SendEmail {
    to?: string,
    subject?: string,
    emailBody?: string,
}


import { IResponse } from "src/app/core/models";

export interface SendEmailGeneralResponse extends IResponse {
    result: SendEmailGeneralSuccess;
}

export interface SendEmailGeneralSuccess {
    value: string,
    formatters: string,
    contentTypes: string;
    declaredType: number,
    statusCode: number
}
