
export const logFormatter = (key: String, logType: String, payload: any) => {
    return {
        key,
        logType,
        payload
    }
}

export const approvalBodyFormatter = (moduleName:string, itemId:number, creator:number, type:string, body:any|null, previousId:number|null)=>{
    return {
        moduleName: moduleName,
        itemId: itemId,
        createdBy: creator,
        approvalType: type,
        body: JSON.stringify(body),
        previousId: previousId
    }

}