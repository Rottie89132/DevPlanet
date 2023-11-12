export default defineEventHandler(async (event: any)=> {

    const authorized: any = await $fetch("/api/users", {method: "POST", body: { Session: getCookie(event, 'token') }})

    if(authorized.Status == 200 && getRouterParams(event)){
        if(authorized.response.Role == 'Admin') {
            const audit: Record<string, any> | null = await Audit.find({"metadata.metaId": getRouterParams(event).id})

            if(audit.length < 1) 
                return { status: 404, message: "The requested resource could not be found", audit}
            return { status: 200, message: "The requested resource was authorized", audit}
        }
        return { status: 503, message: authorized.message, audit: []}
    }
    return { status: 401, message: authorized.message, audit: []}
})
