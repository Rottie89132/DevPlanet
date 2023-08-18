<template>
    <button @click="onrefresh" class="flex items-center justify-between p-3 mt-2 rounded-lg dark:bg-[#141414] bg-[#EBEBEB] me-2" :disabled="disabled" aria-label="refresh">
        <Icon :class="refreshing || response.status == 401 ? 'animate-spin' : ''"  class="dark:text-white text-black opacity-60" name="ri:refresh-line" size="1.25em"/>
    </button>
</template>

<script setup lang="ts">

const { refreshing, disabled, response, feed, ReviewCount, ServerCount, server } = defineModels<{
    refreshing: Boolean, disabled: boolean, response: any, feed: any, ReviewCount: any, ServerCount: any, server: any
}>()

async function onrefresh() {
        refreshing.value = true;
        disabled.value = true;
        const res: any = await $fetch("/api/feeds/audit?count=6")
        const ser: any = await $fetch("/api/feeds/server")
        const rev: any = await $fetch("/api/feeds/reviews")

        setTimeout(async () => {
    
            refreshing.value = false;
            disabled.value = false;

            ReviewCount.value = rev.count
            ServerCount.value = ser.count
            feed.value = res.audit;
            response.value = { status: res.status }
            server.value = { status: ser.status}
            if(res.status == 401) { 
                alert("Session Expired: Your session has timed out due to inactivity.");
                navigateTo("/login")
            }
            //if(res.status != 503) { feedArray.value = res.audit.length } 
        }, 2000);
    }

</script>
