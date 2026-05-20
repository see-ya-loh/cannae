// HTTP /api binary checkUserNameReq (protocolId=201). Sent by the game while
// the player types in the nickname input box — used as a real-time availability
// probe. Echoing the requested name back in RspCheckUserName.name is the
// signal the client treats as "name accepted". For the local dev server we
// always accept; profanity / length policies can be layered on later.
export function handleCheckUserName(req: any): any {
    const name: string = req?.checkUserNameReq?.name ?? "";
    return {
        protocolId: 201,
        checkUserNameRsp: { name },
    };
}
