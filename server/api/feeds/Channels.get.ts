export default defineEventHandler(async (event)=> {

    const authorized: any = await $fetch("/api/users", {method: "POST", body: { Session: getCookie(event, 'token') }})

    if(authorized.Status == 200){
        if(authorized.response.Role == 'Admin') {

            const channel: Record<string, any> | null = await Channels.find();
            const Serverdata: Record<string, any> | null = await Servers.find();
            const ClientServer = await ClientServers.find({ UserID: authorized.response.ID });

            const data = new Array();
            let ArrayCount: number = 0;

            Serverdata.forEach((item: any, index: any) => {
                
                const matchingClientServer = ClientServer.find((clientServer: any) => clientServer.GuildId === item.GuildID);
                if (matchingClientServer) {
                    data.push({
                        GuildId: item.GuildID,
                        GuildName: item.GuildName,
                        GuildIcon: item.GuildIcon,
                        ReviewChannel: item.Channels?.filter((item: any) => item.id == channel[ArrayCount]?.ReviewChannel)[0] || null,
                        LogChannel: item.Channels?.filter((item: any) => item.id == channel[ArrayCount]?.LogChannel)[0] || null,
                        Channels: item.Channels || []
                    })
                    ArrayCount++
                }
            })

            if(data.length == 0) return { status: 404, message: "No valid access token found"}
                return { status: 200, message: "The requested resource was authorized", data: data }
        }
        return { status: 401, message: "Access to the requested resource is unauthorized"}
    }
    return { status: 401, message: authorized.message}
})

