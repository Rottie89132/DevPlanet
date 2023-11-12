export default defineEventHandler(async (event)=> {

    const authorized: any = await $fetch("/api/users", {method: "POST", body: { Session: getCookie(event, 'token') }})

    if(authorized.Status == 200){
        if(authorized.response.Role == 'Admin') {
            const audit: Record<string, any> | null = await Audit.find()

            if(audit.length > 0) {

                if(getQuery(event).page) {
                    const result = [];
                    const currentPage = Number(getQuery(event).page) - 1

                    const data = audit.reverse()
                    for (let i = 0; i < data.length; i += 8) { 
                        result.push(data.slice(i, i + 8)) 
                    }

                    if (result[currentPage]) 
                        return { status: 200, message: "The requested resource was authorized", audit: result[currentPage], totalitems: audit.length }
                    return { status: 404, message: "The requested resource could not be found", audit: [] }
                }

                if(getQuery(event).count)
                    return { status: 200, message: "The requested resource was authorized", audit: audit.slice(Number(`-${getQuery(event).count}`)).reverse(), totalitems: audit.length }
                return { status: 200, message: "The requested resource was authorized", audit: audit.reverse()}
            } return { status: 404, message: "The requested resource could not be found", audit}
        }
        return { status: 401, message: "Access to the requested resource is unauthorized", audit: []}
    }

    if(authorized.Status == 401)
        return { status: 401, message: authorized.message, audit: []}
    
})

