import fs from "fs";
import { NextApiRequest } from "next";
import { IncomingForm } from "formidable";

import type { IAttachmentResult } from "@interfaces/IFileUpload";

/**
   * Function to collect binary files from request via formidable
   *
   * @param req { NextApiRequest } - request
   *
   * @return Promise<IAttachmentResult> - IAttachmentResult type object
   */
const getFiles = (req: NextApiRequest) => new Promise<IAttachmentResult>((resolve, reject) => {
    const form = new IncomingForm({
        uploadDir: "./",
        keepExtensions: true
    });
    form.parse(req, (error, fields, files) => {
        if (error) {
            return reject(error);
        }
        const path = (files.file as any).filepath;
        const file: Buffer = fs.readFileSync(path)
        fs.unlinkSync(path);
        return resolve({fields, file} as IAttachmentResult);
    });
});

export default getFiles;
