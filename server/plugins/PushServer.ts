import Pusher from 'pusher-js';
import webPush from 'web-push';

const config = useRuntimeConfig()
const PushClient = new Pusher(config.public.PusherAppKey, { cluster: config.public.cluster })

export default defineNitroPlugin(async () => {
    const channel = PushClient.subscribe('Socket');
    console.log("\x1b[32m✔\x1b[0m Connected to \x1b[36mPusher\x1b[0m")
    
    channel.bind('event', async (event: any) => {

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
});
