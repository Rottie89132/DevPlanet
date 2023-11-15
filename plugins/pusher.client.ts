import Pusher from 'pusher-js';
let pusher: any = null;
let channel: any = null;
let Countstate: Boolean = false;

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    return {
        provide: {
            StartSocket: () => {
                if (pusher) return;
                console.log(`Pusher connection established`);
                pusher = new Pusher(config.public.PusherAppKey, { cluster: config.public.cluster }); 
                channel = pusher.subscribe('Socket');
                Countstate = true;
                
            },
            CloseSocket: () => {
                if (pusher) {
                    console.log("Pusher connection closed");
                    pusher.unsubscribe('Socket');
                    pusher.disconnect();
                    pusher = null;
                    useCookie("token").value = null;
                    Countstate = false;
                }
            },
            ClearSession: (response: any, server: any) => {
                channel.bind(useCookie("token").value, async (event: any) => {

                    if (Countstate) console.log("Pusher event received! ");

                    useCookie("token").value = null;
                    try {
                        response.value = { status: 401 };
                        server.value = { status: 401 };
                    } catch { }

                    if (pusher) {
                        console.log("Pusher connection closed");
                        pusher.unsubscribe('Socket');
                        pusher.disconnect();
                        pusher = null;
                        Countstate = false;
                    }

                    setTimeout(() => {
                        if (!Countstate) {
                            Countstate = true;
                            alert("Session Expired: Your session has timed out due to inactivity.");
                            navigateTo("/login")
                        }
                    }, 1000);
                })
            },
            EventSession: (feed: any, ReviewCount: any, ServerCount: any, response: any, server: any) => {
                channel.bind(`event`, async (event: any) => {
                    const { data: review }: any = await useFetch("/api/feeds/reviews");
                    const { data: server }: any = await useFetch("/api/feeds/server");

                    setTimeout(async () => {
                        console.log("Pusher event received! ");

                        ReviewCount.value = review.value.count;
                        ServerCount.value = server.value.count;
                        response.value = { status: server.value.status };
                        feed.value?.splice(0, 0, event);
                    }, 1500);
                });
            },
            ServerSession: (feed: any, ReviewCount: any, ServerCount: any, response: any) => {
                channel.bind('AsyncRefresh', async (event: any) => {
                    const { data: review }: any = await useFetch("/api/feeds/reviews");
                    const { data: server }: any = await useFetch("/api/feeds/server");

                    setTimeout(async () => {
                        console.log("Pusher event received! ");

                        ReviewCount.value = review.value.count;
                        ServerCount.value = server.value.count;
                        response.value = { status: server.value.status };
                        feed.value.splice(0, 0, []);
                    }, 250);
                })
            }
        }
    }
})
