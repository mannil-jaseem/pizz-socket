import {Controller, Req, Res, Post, UseBefore} from "routing-controllers";
// import { CONTACTS_SERVICE } from "../services";
// import { ContactValidation } from "./Contact.validation";
import { Request, Response } from "express";
import { SignUp } from "../services/user/signUp";

@Controller("/user")
export class UserController{
    @Post("/sign-up")
    async contactList(@Req() req: Request, @Res() res: Response) {
        try {
            console.log(req)
            await new SignUp().init(req.body)
            return res.json({aaa:"aa"})

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