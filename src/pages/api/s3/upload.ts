import S3, { ManagedUpload } from "aws-sdk/clients/s3";
import { NextApiRequest, NextApiResponse } from "next";

import ApiMethod from "@utils/request-method";
import getFiles from "@helpers/attachment-helper";
import type { IAttachmentResult } from "@interfaces/IFileUpload";

const s3: S3 = new S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

/**
 * Class to handle S3 attachment upload
 *
 * @extends class - ApiMethod
 *
 */
class S3Upload extends ApiMethod {
  /**
   * Private function to upload file directly to S3
   *
   * @param name { string } - file name
   * @param type { string } - file type
   * @param file { Buffer } - buffer of the file
   *
   * @return Promise<ManagedUpload.SendData>
   */
  private static saveToS3(
    name: string,
    type: string,
    file: Buffer
  ): Promise<ManagedUpload.SendData> {
    return new Promise<ManagedUpload.SendData>((resolve, reject) => {
      const params: S3.Types.PutObjectRequest = {
        Bucket: process.env.AWS_S3_BUCKET_NAME_ID,
        Key: name,
        Body: file,
        ContentType: type,
      };
      s3.upload(params, {}, (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      });
    });
  }

  /**
   * Function to handle and upload file directly to S3
   *
   * @body { IAttachmentResult } - attachment data
   *
   * @return { url: string } - Via promise
   */
  protected async post(): Promise<void> {
    try {
      const body: IAttachmentResult = await getFiles(this.req);
      const { name, type } = body.fields;
      const data: ManagedUpload.SendData = await S3Upload.saveToS3(
        name,
        type,
        body.file
      );
      this.res.status(200).json({ url: data.Location });
    } catch (err) {
      this.res.status(400).json({ message: err.message });
    }
  }
}

/**
 * Function to handle request via request method
 *
 * @param req { NextApiRequest } - request
 * @param res { NextApiResponse } - response
 *
 * @void
 */
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const s3Upload: S3Upload = new S3Upload(req, res);
  s3Upload.handleRequest();
};

/**
 * Api configs
 *
 * bodyParser disabled to allow pure file transfer
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
