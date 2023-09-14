<template>
    <VitePwaManifest/>
    <div class="flex items-center justify-between my-2 me-2">
        <div class="flex items-center">
            <LazyMenu/>
            <button class="flex items-center justify-between p-3 mt-2 rounded-lg dark:bg-[#141414] bg-[#EBEBEB] me-2" aria-label="refresh" :disabled="refreshing">
                <Icon :class="refreshing || statuscode.status == 401 ? 'animate-spin' : ''"  class="dark:text-white text-black opacity-60" name="ri:refresh-line" size="1.25em"/>
            </button>
        </div>
    </div>
    <div class="p-1 mt-3 mx-3 dark:text-white text-black">
        <div class=" w-full mt-4 dark:bg-[#141414] bg-[#ececec] rounded-xl flex items-center">
            <div class=" px-4 py-2 flex gap-2 justify-evenly">
                <vue-awesome-paginate
                    :total-items="totalItems"
                    :modelValue="Currentpage"
                    :show-breakpoint-buttons="true"
                    :hidePrevNextWhenEnds="true"
                    :items-per-page="pageItems"
                    :max-pages-shown="1"
                    :on-click="onClickHandler"
                />
            </div>
        </div>
        <div class="px-4 py-2 mt-5 dark:bg-[#141414] bg-[#ececec] rounded-xl">
            <h1 class="text-base font-bold opacity-90 mt-1 mb-3">Server list</h1>
            <div>
                <div v-if="refreshing || statuscode.status == 401 || statuscode.status == 404" v-for="data in pageItems" :key="data" class="flex items-center justify-between p-4 my-2 select-none bg-[#F2F2F2] dark:bg-[#1a1a1a] rounded-xl animate-pulse">
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
            </div>
        </div>  
    </div>
</template>

<script setup>
const { $StartSocket, $ClearSession } = useNuxtApp();

useHead({
    title: "Planetaire - Servers",
    meta: [{ name: "description", content: "My amazing site." }],
});

definePageMeta({
    middleware: ["session"],
});

onMounted(() => {
    $StartSocket();
    $ClearSession(statuscode, statuscode);
})


const refreshing = ref(true)
const totalItems = ref(80)
const statuscode = ref({})
const Currentpage = ref(80 / 8 / 2)
const pageItems = ref(8)

const onClickHandler = async (page) => {
    Currentpage.value = page
};

</script>

<style>
.pagination-container {
    @apply flex gap-2 justify-evenly
}

.paginate-buttons {
    @apply cursor-pointer dark:bg-[#1a1a1a] dark:hover:bg-[#232323] bg-[#ffffff] hover:bg-[#dfdfdf] w-10 h-10 rounded-md dark:text-white
}

.active-page {
    @apply  dark:hover:bg-rose-900 dark:bg-rose-800 bg-rose-600 hover:bg-rose-600 text-white
}
</style>

