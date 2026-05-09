import {Request, Response} from "express";
import {decodeProto, encodeProto} from "../utils/proto";
import {hasPropertyInResponses, getResponseIndex} from "../utils/json";
import fs from "fs";
import {getHandler} from "../handler";


if (!fs.existsSync("./traffic")) {
  fs.mkdirSync("./traffic");
}

export default function capture(req: Request, res: Response) {
    var proto = req.body.proto;
    var method = req.body.meta.method;
    var decodedProto = decodeProto(proto, req.body.meta.method === "REQUEST");
    fs.writeFileSync(
        `./traffic/${req.body.meta.method}_${req.body.meta.name}_${fs.readdirSync("./traffic").filter(file => file.startsWith(`${req.body.meta.method}_${req.body.meta.name}_`)).length}.json`,
        JSON.stringify(decodedProto.toJSON())
    );
    return res.json({ proto: proto, method: method }); // echo original back unmodified
}