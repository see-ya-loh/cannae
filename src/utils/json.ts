export function hasPropertyInResponses(obj: any, property: string): boolean {
    if (!obj.responses) return false;
    for (const response of obj.responses) {
        if (response.hasOwnProperty(property)) {
            return true;
        }
    }
    return false;
}

export function getResponseIndex(obj: any, property: string): number {
    if (!hasPropertyInResponses(obj, property)) return -1;
    for (let i = 0; i < obj.responses.length; i++) {
        if (obj.responses[i].hasOwnProperty(property)) {
            return i;
        }
    }
    return -1;
}
