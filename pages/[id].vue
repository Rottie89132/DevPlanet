<template>
    <VitePwaManifest/>
    <div class="mx-4 ">
        <div class="flex items-center justify-start gap-4 my-2">
            <button @click="$router.back()"  class="flex items-center justify-between p-3 mt-2 rounded-lg outline-none focus:ring-4 focus:dark:ring-rose-950 focus:ring-rose-700 bg-rose-600 hover:bg-rose-700 dark:bg-rose-800 dark:hover:bg-rose-900 "
                aria-label="returnToHome">
                <icon name="material-symbols:keyboard-return" size="1.25em" class="text-white" />
            </button>
            <div class=" text-xs w-full dark:text-white text-black dark:bg-[#141414] bg-[#ececec] rounded-lg p-3 py-[0.85rem] mt-2 flex items-center justify-start gap-2">
                <div class="flex items-center justify-center gap-2 outline-none btn-focus opacity-80 hover:opacity-100">
                    <icon name="material-symbols:other-houses" size="1.25em" />
                    <NuxtLink class="outline-none btn-focus" to="/">Home</NuxtLink>
                </div>
                <icon name="material-symbols:arrow-forward-ios-rounded" size="1em" class="text-black opacity-80 dark:text-white" />
                <p class=" opacity-80 hover:opacity-100 me-1">ID</p>
                <icon name="material-symbols:arrow-forward-ios-rounded" size="1em" class="text-black opacity-80 dark:text-white" />
                <p class=" opacity-80 hover:opacity-100 me-1">{{ useRoute().params.id }}</p>
            </div>
        </div>
        <h1 class="mt-6 text-2xl font-bold text-black dark:text-white ">Review</h1>
        <div class="container mt-3">
            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-1 p-3 dark:bg-rose-800 bg-rose-600 rounded-xl">
                    <h1 class="text-base font-black text-rose-100 ">{{ activity == "Deleted" ? 'Inactive': "Active" }}</h1>
                    <p class="text-xs font-semibold text-rose-200">Current status</p>
                </div>
                <div class="col-span-1 p-3 dark:bg-[#141414] bg-[#ececec] rounded-xl">
                    <h1 class="text-base font-black text-black dark:text-white">{{ activity }}</h1>
                    <p class="text-xs font-semibold text-black opacity-70 dark:text-white">Latest activity</p>
                </div>
            </div>
        </div>
        <div class="px-4 py-2 mb-6 mt-9 dark:bg-[#141414] bg-[#ececec] rounded-xl">
            <div class="my-3 text-black dark:text-white">
                <h1 class="-mb-1 text-base font-bold opacity-90">History</h1>
                <div v-for="(item, index) in feed" :key="item" class="flex items-center justify-between p-4 my-4 select-none bg-[#F2F2F2] dark:bg-[#171717]  rounded-xl">
                    <Reviews :item="item" :index="index"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useVisitedPagesStore } from '~/stores/visitedPage';
const visitedPagesStore = useVisitedPagesStore();
const pageName = useRoute().fullPath.replace("/", ""); 

useColorMode()

useHead({
    title: `Planetaire - ${useRoute().params.id}`,
    meta: [{ name: "description", content: "My amazing site." }],
});

onMounted(() => {
    $StartSocket()
    $ClearSession()

    if (!visitedPagesStore.hasVisitedPage(pageName)) {
        visitedPagesStore.addVisitedPage(pageName);
    } 
});

definePageMeta({
    middleware: ["session"],
});

const feed = ref([])
const activity = ref()

const { $StartSocket, $ClearSession } = useNuxtApp();
const { data: response } = await useFetch(`/api/feeds/${useRoute().params.id}`);

if(response.value.status == 200){
    feed.value = response.value.audit
    const item = response.value.audit.slice(-1)[0].metadata.metaStatus
    activity.value = item.charAt(0).toUpperCase() + item.slice(1)
}

if(response.value.status == 404){
    navigateTo("/")
}

</script>


<style scoped>

.btn-focus:focus {
    @apply ring-4 dark:ring-neutral-800 ring-gray-300 outline-none 
}

</style>
