import { NextApiRequest, NextApiResponse } from "next";

import { Utils } from "@utils/index";
import ApiMethod from "@utils/request-method";
import attachments from "data/attachments.json";
import type { IAttachment } from "@interfaces/IAttachment";
import type { IDataFilters, IDataResult } from "@interfaces/IDataHandling";

/**
 * Class to handle attachments data fatching
 *
 * @extends class - ApiMethod
 *
 */
class Attachment extends ApiMethod {
  /**
   * Function to get all attachments via offset and limit
   *
   * @query limit { number } - page size
   * @query offset { number } - current page
   *
   * @return { IDataResult } - Via promise
   */
  protected async get(): Promise<void> {
    try {
      const query: IDataFilters = this.req.query as any;
      const filters: IDataFilters = {
        limit: Number(query.limit) || 5,
        offset: Number(query.offset) || 0,
      } as IDataFilters;
      const result: IDataResult = {
        total: attachments.length,
        data: attachments.slice(filters.offset, filters.limit + filters.offset),
      } as IDataResult;
      this.res.status(200).json(result);
    } catch (err) {
      this.res.status(400).json({ message: err.message });
    }
  }

  /**
   * Function to save attachment
   *
   * @body { IAttachment } type object
   *
   * @return { IDataResult } - Via promise
   */
  protected async post(): Promise<void> {
    try {
      const data: IAttachment = this.req.body;
      if (!data) {
        throw Error("Required data is missing");
      }
      data.id = Utils.generateUniqueId();
      attachments.push(data);
      this.res.status(200).json({ data } as IDataResult);
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
  const attachment: Attachment = new Attachment(req, res);
  attachment.handleRequest();
};

export default handler;
