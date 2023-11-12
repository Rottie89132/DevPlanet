
export default defineEventHandler(async (event) => {
    const authorized: any = await $fetch("/api/users", { method: "POST", body: { Session: getCookie(event, 'token') } })

    if (authorized.Status == 200) {
        if (authorized.response.Role == 'Admin') {

            const validateInput = await readBody(event)
            if (!validateInput) return { status: 400, message: "The requested resource could not be modified" } 
            const { Value, Server, type } = await readBody(event)

            const Serverdata: Record<string, any> | null = await Servers.find({ GuildID: Server.id });
            const Channel: Record<string, any> | null = await Channels.find({ GuildId: Server.id });

            if (Serverdata.length < 1) return { status: 404, message: "The requested resource was not found" }
            if (Channel.length < 1) await Channels.create({GuildId: Server.id, GuildName: Server.name})

            const ValueExist: boolean = type == "review" ? Channel[0]?.ReviewChannel == Value.id : Channel[0]?.LogChannel == Value.id;
            const query: boolean = type == "review"

            const ValidValue = Serverdata[0].Channels.filter((object: any) => object.id == Value.id)[0] || null
            if (ValueExist || !ValidValue) return { status: 304, message: "The requested resource was not modified" }
            
            if (query) await Channels.findOneAndUpdate({GuildId: Server.id }, {$set: { ReviewChannel: Value.id }})
            else await Channels.findOneAndUpdate({GuildId: Server.id}, {$set: { LogChannel: Value.id }})
            
            return { status: 200, message: "The requested resource was modified" }
        }
        return { status: 401, message: "Access to the requested resource is unauthorized" }
    }
    return { status: 401, message: authorized.message }
})
