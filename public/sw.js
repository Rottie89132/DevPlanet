import { clientsClaim } from "workbox-core";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";

self.skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

self.addEventListener("push", (event) => {

    const CurrentPlatform = navigator.userAgentData.platform
    const payload = event.data.json()

    
    const title = payload.title || "Push Notification";
    const options = {
        body: payload.body || "This is a push notification.",
        icon: payload.icon || "/icons/icon_144.png",
        data: { url: payload.url || "/" },
    };

    event.waitUntil(self.registration.showNotification(title, options));
    
});



