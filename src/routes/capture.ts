import {Request, Response} from "express";
import {decodeProto, encodeProto} from "../utils/proto";
import {hasPropertyInResponses, getResponseIndex} from "../utils/json";
import fs from "fs";
import {getHandler} from "../handler";

export default function capture(req: Request, res: Response) {
    var proto = req.body.proto;
    var method = req.body.meta.method;
    var decodedProto = decodeProto(proto, req.body.meta.method === "REQUEST");
    fs.writeFileSync(
        `./traffic/${req.body.meta.method}_${req.body.meta.name}_${fs.readdirSync("./traffic").filter(file => file.startsWith(`${req.body.meta.method}_${req.body.meta.name}_`)).length}.json`,
        JSON.stringify(decodedProto.toJSON())
    );
    var jsonProto = decodedProto.toJSON();
    console.log(`Captured ${req.body.meta.method} ${req.body.meta.name}, saved to traffic folder.`);
    if (req.body.meta.method === "RESPONSE") {

        if(jsonProto.responses && hasPropertyInResponses(jsonProto, "userLoginRsp")) {
            jsonProto.responses[getResponseIndex(jsonProto, "userLoginRsp")].userLoginRsp.user.tutorialStepUid = 4083678829;
            console.log("Modified userLoginRsp response to set tutorialStepUid to 4083678829");
             proto = encodeProto(JSON.stringify(jsonProto), false);
        } else if (jsonProto.responses && hasPropertyInResponses(jsonProto, "tutorialProgressRsp")) {
            jsonProto.responses[getResponseIndex(jsonProto, "tutorialProgressRsp")].tutorialProgressRsp.user.tutorialStepUid = 4083678829;
            console.log("Modified tutorialProgressRsp response to set tutorialStepUid to 4083678829");
            proto = encodeProto(JSON.stringify(jsonProto), false);
        }

        /* const handler = getHandler(jsonProto);
        if (handler) {
            const modifiedResponse = handler(jsonProto);
            if (modifiedResponse) {
                proto = encodeProto(JSON.stringify(modifiedResponse), false);
            }
        } */
    }


    /* if (req.body.meta.method === "RESPONSE" && hasPropertyInResponses(jsonProto, "userLoginRsp")) {
        console.log("Captured a userLoginRsp response");
        /* jsonProto.responses[getResponseIndex(jsonProto, "userLoginRsp")].userLoginRsp.userCharacters[0].characterUid = 3635880444;
        jsonProto.responses[getResponseIndex(jsonProto, "userLoginRsp")].userLoginRsp.userCharacters[1].characterUid = 872417181;
        jsonProto.responses[getResponseIndex(jsonProto, "userLoginRsp")].userLoginRsp.userCharacters[2].characterUid = 49713881; 
        jsonProto.responses[getResponseIndex(jsonProto, "userLoginRsp")].userLoginRsp.userGifts[0].giftUid = 0;
        jsonProto.responses[getResponseIndex(jsonProto, "userLoginRsp")].userLoginRsp.userGifts[0].giftAmount = 30000;
        proto = encodeProto(JSON.stringify(jsonProto), false);
    } */
    return res.json({ proto: proto, method: method }); // echo original back unmodified
}