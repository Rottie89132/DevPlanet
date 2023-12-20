export default defineEventHandler(async (event) => {
    
    const SessionId: any = getCookie(event, "token")
    const user: Record<string, any> | null = await useStorage("Sessions").getItem(SessionId)

    if(!user) return { statusCode: 401 }

    const ClientServer= await ClientServers.find({UserID: user.ID});
    if(ClientServer.length == 0) return { statusCode: 401 }
    return { statusCode: 200 }

});