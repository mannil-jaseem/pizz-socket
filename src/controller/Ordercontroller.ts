import {Controller, Req, Res, Post, UseBefore} from "routing-controllers";
// import { CONTACTS_SERVICE } from "../services";
// import { ContactValidation } from "./Contact.validation";
import { Request, Response } from "express";
import Order from "../services/Order";

@Controller("/order")
export class UserController{
    // @Post("/cooked")
    // async contactList(@Req() req: Request, @Res() res: Response) {
    //     try {
    //         // console.log(req)
    //         await new Order().cookingCompletion(req.body.order_id)
    //         return res.json({aaa:"aa"})

    //     } catch (err: any) {
    //         console.log(err);
    //         if (err.name = 'ZodError') {
    //             let i = err.issues[err.issues.length-1]
    //             return res
    //                 .status(400)
    //                 .json({ msg: i.message || 'something went wrong' });
    //         } else
    //             return res
    //                 .status(404)
    //                 .json({ msg: 'something went wrong' });
    //     }
    // }
    @Post("/prep-time")
    async getPreperationTime(@Req() req: Request, @Res() res: Response) {
        try {
            // console.log(req)
            let result = await new Order().getPreperationTime(req.body.order_id)
            return res.json({result})

        } catch (err: any) {
            console.log(err);
            if (err.name = 'ZodError') {
                let i = err.issues[err.issues.length-1]
                return res
                    .status(400)
                    .json({ msg: i.message || 'something went wrong' });
            } else
                return res
                    .status(404)
                    .json({ msg: 'something went wrong' });
        }
    }
    @Post("/placed")
    async orderConfirmation(@Req() req: Request, @Res() res: Response) {
        try {
            // console.log(req)
            let {status,data} = await new Order().orderConfirmation(req.sockIO,req.body.order_id)
            return res.status(status).json({data})

        } catch (err: any) {
            console.log(err);
            if (err.name = 'ZodError') {
                let i = err.issues[err.issues.length-1]
                return res
                    .status(400)
                    .json({ msg: i.message || 'something went wrong' });
            } else
                return res
                    .status(404)
                    .json({ msg: 'something went wrong' });
        }
    }
}