<template>
    <div v-if="hidden && refreshing || response.status == 401" class="mt-4">
        <div class="grid grid-cols-2 gap-4">
            <div style="padding-bottom: 1.99rem" class="grid col-span-1 gap-1 p-3 dark:bg-[#191919] bg-[#ececec] rounded-xl pt-7 animate-pulse">
                <div class="w-20 h-1 p-2 rounded-full dark:opacity-70 opacity-30 dark:bg-neutral-800 bg-[#838383]"></div>
                <div class="w-30 h-1 p-2 my-2 rounded-full dark:opacity-60 opacity-20 dark:bg-neutral-800 bg-[#838383]"></div>
                <div class="w-24 h-1 p-2 rounded-full dark:opacity-50 opacity-10 dark:bg-neutral-800 bg-[#838383]"></div>
            </div>
            <div style="padding-bottom: 1.99rem" class="grid col-span-1 gap-1 p-3 dark:bg-[#191919] bg-[#ececec] rounded-xl pt-7 animate-pulse">
                <div class="w-20 h-1 p-2 rounded-full dark:opacity-70 opacity-30 dark:bg-neutral-800 bg-[#838383]"></div>
                <div class="w-30 h-1 p-2 my-2 rounded-full dark:opacity-60 opacity-20 dark:bg-neutral-800 bg-[#838383]"></div>
                <div class="w-24 h-1 p-2 rounded-full dark:opacity-50 opacity-10 dark:bg-neutral-800 bg-[#838383]"></div>
            </div>
        </div>
    </div>
    <div v-if="hidden && !refreshing && server.status == 200 " class="container mt-4">
        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1 p-3 dark:bg-rose-800 bg-rose-600 rounded-xl">
                <h1 class="text-3xl font-black text-rose-100 ">{{ ReviewCount }}</h1>
                <p class="my-2 font-semibold text-rose-200">Total reviews</p>
                <p class="text-xs text-rose-300">The total amount of reviews across all servers</p>
            </div>
            <div class="col-span-1 p-3 dark:bg-[#141414] bg-[#ececec] rounded-xl">
                <h1 class="text-3xl font-black">{{ ServerCount }}</h1>
                <p class="my-2 font-semibold opacity-70">Total servers</p>
                <p class="text-xs opacity-60">The total amount of servers the bot is in</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const { refreshing, ReviewCount, ServerCount, response, server } = defineModels<{ refreshing: Boolean, hidden: Boolean, ReviewCount: any, ServerCount: any, response: any, server: any }>()


</script>