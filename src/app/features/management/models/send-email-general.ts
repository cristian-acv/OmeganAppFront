export interface SendEmailGeneral {
    to?: string,
    subject?: string,
    title?: string,
    emailBody?: string,
}

import { IResponse } from "src/app/core/models";

export interface SendEmailResponse extends IResponse {
    result: SendEmailSuccess;
}

export interface SendEmailSuccess {
    value: string,
    formatters: string,
    contentTypes: string;
    declaredType: number,
    statusCode: number
}