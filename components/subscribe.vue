<template>
    <button class="flex items-center justify-between p-3 mt-2 rounded-lg dark:bg-[#141414] bg-[#EBEBEB] me-2" @click="subscribe">
        <Icon class=" dark:text-white text-black opacity-40" :name="userSubscribed ? 'mdi:bell' : 'mdi:bell-alert'" size="1.25em"/>
    </button>
</template>

<script setup>

const config = useRuntimeConfig()
const userSubscribed = ref()

onMounted(async () =>{

    const SetRegistration = await navigator.serviceWorker.ready
    const getSubscription = await SetRegistration.pushManager.getSubscription()
    
    const Storage = useLocalStorage("userSubscribed").value = getSubscription ? true : false
    userSubscribed.value = Storage
})

async function subscribe() {
    const SetRegistration = await navigator.serviceWorker.ready
    const getSubscription = await SetRegistration.pushManager.getSubscription()

    if(getSubscription) {
        useLocalStorage("userSubscribed").value = false
        const unsubscribeConfirmed = await getSubscription.unsubscribe()
        userSubscribed.value = false

        if(unsubscribeConfirmed) {
            useFetch("/api/subscribe", {
                method: 'DELETE', headers: { 'Content-Type': 'application/json' },
                body: { platform: navigator.userAgentData.platform }
            });
        } return 
    }
    
    const subscription = await SetRegistration.pushManager.subscribe({
        applicationServerKey: config.public.WorkerKey, userVisibleOnly: true 
    }); 
    
    useFetch("/api/subscribe", {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: {subscription, platform: navigator.userAgentData.platform}
    });

    useLocalStorage("userSubscribed").value = true
    userSubscribed.value = true
    
}

</script>