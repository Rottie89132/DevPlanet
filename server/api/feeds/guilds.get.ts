export default defineEventHandler(async (event)=> {

    const authorized: any = await $fetch("/api/users", {method: "POST", body: { Session: getCookie(event, 'token') }})

    if(authorized.Status == 200){
        if(authorized.response.Role == 'Admin') {
            const server: Record<string, any> | null = await Servers.find()

            return { status: 200, message: "The requested resource was authorized", server: server, totalitems: server.length }
            
        }
        return { status: 401, message: "Access to the requested resource is unauthorized"}
    }
    return { status: 401, message: authorized.message}





})

