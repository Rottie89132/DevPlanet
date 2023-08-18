export default defineEventHandler(async (event) => {

    const authorized: any = await $fetch("/api/users", { method: "POST", body: { Session: getCookie(event, 'token') } })
    if (authorized.Status == 200) {
        const { platform } = await readBody(event)

        await Subscription.findOneAndDelete({ 
            UserID: authorized.response.ID, Platform: platform
        })
        
        return { status: 200, message: "you have been unsubscribed from push notifications" }
    }
    return { status: 401, message: "Access to the requested resource is unauthorized" }
    
})