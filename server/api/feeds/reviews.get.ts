

export default defineEventHandler(async (event)=> {

    const authorized: any = await $fetch("/api/users", {method: "POST", body: { Session: getCookie(event, 'token') }})

    if(authorized.Status == 200){
        if(authorized.response.Role == 'Admin') {
            const ReviewsCount: any = await Reviews.find()
            let count = 0
            
            ReviewsCount.forEach((item: any) => {
                count += item.Data.length
            })

            if(ReviewsCount.length > 0) 
                return { status: 200, message: "The requested resource was authorized", count: count}
            return { status: 404, message: "The requested resource could not be found", count: count}
            
            
        }
        return { status: 401, message: "Access to the requested resource is unauthorized"}
    }
    return { status: 401, message: authorized.message}
})


