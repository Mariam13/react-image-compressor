import { NextApiRequest, NextApiResponse } from "next";

import ApiMethod from "@utils/request-method";
import attachments from "data/attachments.json";
import type { IAttachment } from "@interfaces/IAttachment";

/**
 * Class to handle attachment item data fatching
 *
 * @extends class - ApiMethod
 *
 */
class AttachmentItem extends ApiMethod {
  /**
   * Function to get attachment by id
   *
   * @query id { string } - attachment id
   *
   * @return { IAttachment } - Via promise
   */
  protected async get(): Promise<void> {
    try {
      const id: string = this.req.query.id as string;
      const data: IAttachment = attachments.find((item) => item.id === id);
      if (!data) {
        throw Error(`Attachment '${id}' no found`);
      }
      this.res.status(200).json({ data });
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
  const attachment: AttachmentItem = new AttachmentItem(req, res);
  attachment.handleRequest();
};

export default handler;
