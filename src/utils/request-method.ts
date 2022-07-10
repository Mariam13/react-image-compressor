import { NextApiRequest, NextApiResponse } from "next";

import { HTTPRequestTypeEnum } from "@enums/http.enum";

/**
   * Abstract class to help handle Api requests via request method
   * 
   * @constructor (req: NextApiRequest, res: NextApiResponse<any>) - request and response
   *
   */
export default abstract class ApiMethod {
    protected req: NextApiRequest;
    protected res: NextApiResponse<any>;

    constructor(req: NextApiRequest, res: NextApiResponse<any>) {
        this.req = req;
        this.res = res;
    }

    // For GET requests handling
    protected get?(): Promise<void>;

    // For PUT requests handling
    protected put?(): Promise<void>;

    // For POST requests handling
    protected post?(): Promise<void>;

    // For DELETE requests handling
    protected delete?(): Promise<void>;

    // Function to handle requests which absent for the specific Api
    protected notFound(): void {
        this.res.status(405).end(`Method ${this.req.method} Not Allowed`)
    }

    // Function to define which request should be triggered via request method
    public handleRequest(): void {
        try {
            switch(this.req.method) {
                case HTTPRequestTypeEnum.GET:
                    this.get();
                    return;
                case HTTPRequestTypeEnum.PUT:
                    this.put();
                    return;
                case HTTPRequestTypeEnum.POST:
                    this.post();
                    return;
                case HTTPRequestTypeEnum.DELETE:
                    this.delete();
                    return;
            }
        } catch(e) {}
        this.notFound();
    }
}
