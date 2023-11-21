<template>
    <div v-auto-animate class="px-4 py-2 mt-8 dark:bg-[#141414] bg-[#ececec] rounded-xl">
        <div class="my-3 text-black dark:text-white">
            <h1 class="text-base font-bold opacity-90">Recent reviews</h1>
        </div>
        <div v-if="refreshing || response.status == 401 || response.status == 404" v-for="index in 6" :key="index" class="flex items-center justify-between p-4 my-2 select-none bg-[#F2F2F2] dark:bg-[#1a1a1a] rounded-xl animate-pulse">
            <div class="flex ">
                <div class="rounded-full dark:opacity-90 opacity-40 dark:bg-neutral-800 bg-[#838383] h-[1.8rem] w-[1.8rem]"></div>
            </div>
            <div class="-ms-6">
                <div class="w-20 h-[0.1rem] p-[0.35rem] mb-1 rounded-full dark:opacity-70 opacity-40 dark:bg-neutral-800 bg-[#838383]"></div>
                <div class="w-28 h-[0.1rem] p-[0.35rem] rounded-full dark:opacity-50 opacity-30 dark:bg-neutral-800 bg-[#838383]"></div>
            </div>
            <div>
                <div class="w-20 h-[0.1rem] p-[0.35rem] mb-1 rounded-full dark:opacity-70 opacity-40 dark:bg-neutral-800 bg-[#838383]"></div>
                <div class="w-16 h-[0.1rem] p-[0.35rem] rounded-full dark:opacity-50 opacity-30 dark:bg-neutral-800 bg-[#838383]"></div>
            </div>  
        </div>
        <div v-else v-for="(item, index) in feed" :key="item" class="flex items-center justify-between p-4 my-2 select-none bg-[#F2F2F2] hover:bg-[#E3E3E3] dark:bg-[#171717] dark:hover:bg-[#101010] rounded-xl" :class="index === 0 ? 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-800 dark:hover:bg-rose-900 ' : index > 5 ? 'hidden': ''" @click="navigateTo(`/${item.metadata.metaId}`)">
            <div class="flex ">
                <NuxtImg class=" border-2 dark:border-[#282828] border-white rounded-full h-[1.8rem] w-[1.8rem]" :src="item.guild.guildIconUrl" draggable="false" :alt="item.guild.guildName" />
                <NuxtImg class=" border-2 dark:border-[#282828] border-white rounded-full h-[1.8rem] w-[1.8rem] -ms-3" :src="item.author.userAvatarUrl" draggable="false" :alt="item.author.userName" />
            </div>
            <div class="">
                <h1 class="text-[0.6rem] text-left font-bold dark:text-white text-black truncate" :class="index === 0 ? 'text-rose-100 ' : ''">{{ item.author.userName.charAt(0).toUpperCase() + item.author.userName.slice(1) }}</h1>
                <h1 class="text-[0.5rem] text-left dark:text-white text-black opacity-80" :class="index === 0 ? 'text-rose-100 ' : ''">{{ item.content.title.slice(0, 29) }}{{ item.content.title.length > 29 ? ".." : "" }}</h1>
            </div>
            <div>
                <p class="text-[0.6rem] text-right font-bold dark:text-white text-black " :class="index === 0 ? 'text-rose-100 ' : ''"> {{ item.guild.guildName }}</p>
                <p class="text-[0.5rem] text-right dark:text-white text-black opacity-80 " :class="index === 0 ? 'text-rose-200 opacity-100 ' : ''">{{ item.metadata.metaTime }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const { refreshing, response, feed } = defineModels<{ refreshing: any, response: any, feed: any }>()

</script>


