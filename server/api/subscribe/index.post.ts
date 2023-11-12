
export default defineEventHandler(async (event) => {

    const authorized: any = await $fetch("/api/users", { method: "POST", body: { Session: getCookie(event, 'token') } })
    if (authorized.Status == 200) {
        
        const { subscription, platform } = await readBody(event)
        const { endpoint, keys } = subscription

        const updateQuery = await Subscription.findOneAndUpdate({ UserID: authorized.response.ID }, 
            { $set: { endpoint: endpoint, keys: keys, Platform: platform } }
        )

        if (!updateQuery) await Subscription.create({
            UserID: authorized.response.ID, Platform: platform, endpoint: endpoint, keys
        }); return { status: 200, message: "you have been subscribed to push notifications" }
    }
    return { status: 401, message: "Access to the requested resource is unauthorized" }
    
})