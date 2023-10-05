export default defineEventHandler(async (event)=> {

    const authorized: any = await $fetch("/api/users", {method: "POST", body: { Session: getCookie(event, 'token') }})

    if(authorized.Status == 200){
        if(authorized.response.Role == 'Admin') {

            const channel: any = await Channels.find();
            const Serverdata: any = await Servers.find();

            const data = new Array();
            let ArrayCount: number = 0;

            Serverdata.forEach((item: any) => {
                data.push({
                    GuildId: item.GuildID,
                    GuildName: item.GuildName,
                    GuildIcon: item.GuildIcon,
                    ReviewChannel: item.Channels?.filter((item: any) => item.id == channel[ArrayCount]?.ReviewChannel)[0] || null,
                    LogChannel: item.Channels?.filter((item: any) => item.id == channel[ArrayCount]?.LogChannel)[0] || null,
                    Channels: item.Channels || []
                })
                ArrayCount++
            })

            
            return { status: 200, message: "The requested resource was authorized", data: data }
        }
        return { status: 401, message: "Access to the requested resource is unauthorized"}
    }
    return { status: 401, message: authorized.message}
})

