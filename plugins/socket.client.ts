import { io } from "socket.io-client";
let socket: any = null;

export default defineNuxtPlugin(() => {

    return {
        provide: {
            StartSocket: () => {
                if (socket) return;
                socket = io(`ws://${window.location.host.split(":")[0]}:3500`);

                socket.on("connect", () => {
                    console.log(`websocket connection established`);
                });

                socket.on("disconnect", () => {
                    console.log("websocket connection closed");
                });
            },
            CloseSocket: () => {
                if (socket) {
                    socket.close();
                    socket = null;
                }
            },
            OnSocketEvent: ( feed: any, ReviewCount: any, ServerCount: any, response: any, server: any ) => {
                socket.on(`event`, async (event: any) => {
                    const { data: review }: any = await useFetch("/api/feeds/reviews");
                    const { data: server }: any = await useFetch("/api/feeds/server");

                    setTimeout(async () => {
                        console.log("Websocket event received! ");
                        
                        ReviewCount.value = review.value.count;
                        ServerCount.value = server.value.count;
                        response.value = { status: server.value.status };
                        feed.value.splice(0, 0, event);
                    }, 1500);
                });

                socket.on(useCookie("token").value, async (event: any) => {
                    console.log("Websocket event received! ");

                    useCookie("token").value = null;
                    response.value = { status: 401 };
                    server.value = { status: 401 };

                    if (socket) {
                        socket.close();
                        socket = null;
                    }

                    setTimeout(() => {
                        //alert("Session Expired: Your session has timed out due to inactivity.");
                        navigateTo("/login");
                    }, 1000);
                });
            },
        },
    };
});
