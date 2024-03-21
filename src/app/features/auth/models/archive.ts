export interface Archive{
    name: string,
    base64: string,
    type: string,
    state : boolean,
    nameVali? : string,
    group?: number,
}


export interface ArchiveOne{
    name: string,
    base64: string,
    type: string;
    state : boolean,
    companyId: number,
    group?: number,
}


export interface ArchiveTwo{
    name: string,
    base64: string,
    type: string;
    state : boolean,
    announcementId: number,
    group?: number,
}