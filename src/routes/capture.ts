import {Request, Response} from "express";
import {decodeProto, encodeProto} from "../utils/proto";
import {hasPropertyInResponses, getResponseIndex} from "../utils/json";
import fs from "fs";


if (!fs.existsSync("./traffic")) {
  fs.mkdirSync("./traffic");
}

export default function capture(req: Request, res: Response) {
    /* console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body type:", typeof req.body);
    console.log("Body is Buffer:", Buffer.isBuffer(req.body));
    console.log("Body length:", req.body?.length);
    console.log("Body hex:", req.body?.toString("hex")?.slice(0, 64));
    var base64 = req.body?.toString("base64")
    console.log(decodeProto(base64, true)) */
    res.send("ok");
    //var proto = req.body
    //console.log(req)
    //var decodedProto = decodeProto(proto,true);
    
    /* fs.writeFileSync(
        `./traffic/${req.body.meta.method}_${req.body.meta.name}_${fs.readdirSync("./traffic").filter(file => file.startsWith(`${req.body.meta.method}_${req.body.meta.name}_`)).length}.json`,
        JSON.stringify(decodedProto.toJSON())
    ); */
    //return res.send(new Buffer(proto)); // echo original back unmodified
}