export interface IAttachment {
    id: string;
    resized: IAttachmentFile;
    original: IAttachmentFile;
}

export interface IAttachmentFile {
    url: string;
    size: number;
    type: string;
    name: string;
}
