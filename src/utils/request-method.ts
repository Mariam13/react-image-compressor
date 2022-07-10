import { NextApiRequest, NextApiResponse } from "next";

import { HTTPRequestTypeEnum } from "@enums/http.enum";

export default abstract class ApiMethod {
    protected req: NextApiRequest;
    protected res: NextApiResponse<any>;

    constructor(req: NextApiRequest, res: NextApiResponse<any>) {
        this.req = req;
        this.res = res;
    }

    protected get?(): Promise<void>;
    protected put?(): Promise<void>;
    protected post?(): Promise<void>;
    protected delete?(): Promise<void>;

    protected notFound(): void {
        this.res.status(405).end(`Method ${this.req.method} Not Allowed`)
    }

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
