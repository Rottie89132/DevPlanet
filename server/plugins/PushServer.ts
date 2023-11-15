import PusherServer from "pusher"
import PusherClient from 'pusher-js';
import webPush from 'web-push';

const config = useRuntimeConfig()

const PushClient = new PusherClient(config.public.PusherAppKey, { 
    cluster: config.public.cluster 
})

const PushServer = new PusherServer({
    appId: config.PusherAppID,
    key: config.public.PusherAppKey,
    secret: config.PusherAppSecret,
    cluster: config.public.cluster,
    useTLS: true
});

export default defineNitroPlugin(async () => {
    const channel = PushClient.subscribe('Socket');
    console.log("\x1b[32m✔\x1b[0m Connected to \x1b[36mPusher\x1b[0m")

    channel.bind('event', async (event: any) => {
        PushServer.trigger("Socket", "event", event);

        webPush.setVapidDetails(
            'mailto:voorbeeld@email.com',
            config.public.WorkerKey,
            config.PrivateWorkerKey
        );

        const pushSubscription = await Subscription.find()
        if (pushSubscription.length > 0) {
            pushSubscription.forEach((subscription: any) => {
                webPush.sendNotification(subscription, JSON.stringify({
                    title: `${event.author.userName} ${event.content.title}`,
                    body: `${event.guild.guildName}`,
                    data: `/${event.metadata.metaId}`
                }))
            })
        }
    });

    channel.bind('guild', async (event: any) => {
        PushServer.trigger("Socket", "guild", event );
    })

    channel.bind('SessionExpires', async (event: any) => {
        PushServer.trigger("Socket", event, event );
    })

    channel.bind('AsyncRefresh', async (event: any) => {
        PushServer.trigger("Socket", "AsyncRefresh", event);
    })

});
