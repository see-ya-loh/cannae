import {Request, Response} from "express";
import {decodeProto, encodeProto} from "../utils/proto";
import fs from "fs";
if (!fs.existsSync("./traffic")) {
  fs.mkdirSync("./traffic");
}

export default function capture(req: Request, res: Response) {
    var proto = req.body.proto;
    var decodedProto = decodeProto(proto, req.body.meta.method === "REQUEST");
    fs.writeFileSync(
        `./traffic/${req.body.meta.method}_${req.body.meta.name}_${fs.readdirSync("./traffic").length}.json`,
        JSON.stringify(decodedProto.toJSON())
    );

    if (decodedProto.toJSON().responses && decodedProto.toJSON().responses.find((r: any) => r.userLoginRsp)) {
        console.log("Captured userLoginRsp, modifying response...");
        var userLoginRspIndex = decodedProto.toJSON().responses.findIndex((r: any) => r.userLoginRsp);
        if (userLoginRspIndex === -1) {
            console.error("userLoginRsp not found in responses!");
            return res.json({ proto: proto }); // echo original back unmodified
        }
        var jsonObject = decodedProto.toJSON();
        //fs.writeFileSync(`premodify_response.json`, JSON.stringify(jsonObject, null, 2));
        //jsonObject.userLoginRsp.user.name = "REDACTED";
        jsonObject.responses[userLoginRspIndex].userLoginRsp.user.name = "HeyGuys";
        jsonObject.responses[userLoginRspIndex].userLoginRsp.user.gold = 123456789;
        var encodedProto = encodeProto(JSON.stringify(jsonObject), false);
        
        /*jsonObject.userLoginRsp.user.gold = 1; */
        //console.log("Modified JSON object:", JSON.stringify(jsonObject));
        
        const base64Proto = Buffer.isBuffer(encodedProto)
            ? encodedProto.toString("base64")
            : encodedProto;

        var redecodedProto = decodeProto(base64Proto, false);
        fs.writeFileSync(`postmodify_response.json`, JSON.stringify(redecodedProto.toJSON(), null, 2));
        console.log("Modified response, sending back...");
        return res.json({ proto: base64Proto });
    }

    
    return res.json({ proto: proto }); // echo original back unmodified
}
