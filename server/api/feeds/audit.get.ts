export default defineEventHandler(async (event)=> {

    const authorized: any = await $fetch("/api/users", {method: "POST", body: { Session: getCookie(event, 'token') }})

    if(authorized.Status == 200){
        if(authorized.response.Role == 'Admin') {
            const audit: string[] = await Audit.find()

            if(audit.length > 0) {
                if(getQuery(event).count)
                    return { status: 200, message: "The requested resource was authorized", audit: audit.slice(Number(`-${getQuery(event).count}`)).reverse() }
                return { status: 200, message: "The requested resource was authorized", audit: audit.reverse()}
            } return { status: 404, message: "The requested resource could not be found", audit}
        } deleteCookie(event, 'token')
        return { status: 401, message: "Access to the requested resource is unauthorized", audit: []}
    }

    if(authorized.Status == 401)
        return { status: 401, message: authorized.message, audit: []}
    
})

