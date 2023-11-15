import { io } from "socket.io-client";
let socket: any = null;
let Countstate: Boolean = false;

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const SocketUrl: any = config.public.Environment == "Production" ? config.public.SocketUrl : `ws://${window.location.host.split(":")[0]}:${config.public.SocketPORT || 3500}`
    
    return {
        provide: {
            StartSocket: () => {
                if (socket) return;
                socket = io(SocketUrl);

                socket.on("connect", () => {
                    console.log(`websocket connection established`);
                    Countstate = true;
                });

                socket.on("disconnect", () => {
                    console.log("websocket connection closed");
                    Countstate = false;
                });
            },
            CloseSocket: () => {
                if (socket) {
                    socket.close();
                    socket = null;
                    useCookie("token").value = null
                }
            },
            ClearSession: (response: any, server: any ) => {
                socket.on(useCookie("token").value, async (event: any) => {

                    if(Countstate) console.log("Websocket event received! ");

                    useCookie("token").value = null;
                    try {
                        response.value = { status: 401 };
                        server.value = { status: 401 };
                    } catch {}

                    if (socket) {
                        socket.close();
                        socket = null;
                    }
                    
                    setTimeout(() => {
                        if (!Countstate) {
                            Countstate = true;
                            alert("Session Expired: Your session has timed out due to inactivity.");
                            navigateTo("/login")
                        }
                    }, 1000);

                });
            },
            EventSession: ( feed: any, ReviewCount: any, ServerCount: any, response: any, server: any ) => {
                socket.on(`event`, async (event: any) => {
                    const { data: review }: any = await useFetch("/api/feeds/reviews");
                    const { data: server }: any = await useFetch("/api/feeds/server");

                    setTimeout(async () => {
                        console.log("Websocket event received! ");
                        
                        ReviewCount.value = review.value.count;
                        ServerCount.value = server.value.count;
                        response.value = { status: server.value.status };
                        feed.value?.splice(0, 0, event);
                    }, 1500);
                });
            },
            ServerSession: (feed: any, ReviewCount: any, ServerCount: any, response: any) => {
                socket.on('AsyncRefresh', async (event: any) => {
                    const { data: review }: any = await useFetch("/api/feeds/reviews");
                    const { data: server }: any = await useFetch("/api/feeds/server");

                    setTimeout(async () => {
                        console.log("Websocket event received! ");

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
