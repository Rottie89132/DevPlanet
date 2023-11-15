import { useScheduler } from "#scheduler"
import Pusher from "pusher"
const config = useRuntimeConfig()

const PushServer = new Pusher({
    appId: config.PusherAppID,
    key: config.public.PusherAppKey,
    secret: config.PusherAppSecret,
    cluster: config.public.cluster,
    useTLS: true
});

export default defineNitroPlugin(() => {
    const scheduler = useScheduler();

    scheduler.run(async () => {
        //await Audit.deleteMany({})

        PushServer.trigger("Socket", "AsyncRefresh", {});
        
    }).cron(`0 0 * * 0,2`)

})



