<template>
    <VitePwaManifest/>
    <div class="flex items-center justify-between my-2 me-2">
        <div class="flex items-center">
            <LazyMenu/>
            <button class="btn-focus outline-none flex items-center justify-between p-3 mt-2 rounded-lg dark:bg-[#141414] bg-[#EBEBEB] me-2" aria-label="refresh" @click="refresh" :disabled="refreshing">
                <Icon :class="refreshing || statuscode.status == 401 ? 'animate-spin' : ''"  class="text-black dark:text-white opacity-60" name="ri:refresh-line" size="1.25em"/>
            </button>
        </div>
        <button class="btn-focus outline-none flex items-center justify-between p-3 mt-2 rounded-lg dark:bg-[#141414] bg-[#EBEBEB] me-2" aria-label="cache" @click="deleteCache">
            <Icon  class="text-black dark:text-white opacity-60" name="bi:bug-fill" size="1.25em"/>
        </button>
    </div>
    <div class="p-1 mx-3 mt-3 text-black dark:text-white">
        <div class=" w-full mt-4 dark:bg-[#141414] bg-[#ececec] rounded-xl flex items-center">
            <div class="flex gap-2 px-4 py-2 justify-evenly">
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
            <h1 class="mt-1 mb-3 text-base font-bold opacity-90">Recent audits</h1>
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
                <div v-else v-for="(item, index) in showitems" key="item._id" tabindex="0" @keydown.enter="navigateTo(`/${item.metadata.metaId}`)" @click="navigateTo(`/${item.metadata.metaId}`)" class=" tab-index group flex items-center justify-between p-4 my-2 select-none bg-[#F2F2F2] hover:bg-[#E3E3E3] dark:bg-[#171717] dark:hover:bg-[#101010] rounded-xl">
                    <div class="flex ">
                        <NuxtImg class=" border-2 dark:border-[#282828] border-white rounded-full h-[1.8rem] w-[1.8rem]" :src="item.guild.guildIconUrl" draggable="false" :alt="item.guild.guildName" />
                        <NuxtImg class=" border-2 dark:border-[#282828] border-white rounded-full h-[1.8rem] w-[1.8rem] -ms-3" :src="item.author.userAvatarUrl" draggable="false" :alt="item.author.userName" />
                    </div>
                    <div>
                        <h1 class="text-[0.6rem] text-left font-bold dark:text-white text-black">{{ item.author.userName.charAt(0).toUpperCase() + item.author.userName.slice(1) }}</h1>
                        <h1 class="text-[0.5rem] text-left dark:text-white text-black opacity-80">{{ item.content.title.slice(0, 29)}}{{item.content.title.length > 29 ? ".." : ""}}</h1>
                    </div>
                    <div>
                        <p v-if="!visitedPagesStore.hasVisitedPage(item.metadata.metaId)" class=" border-[0.26em] dark:border-[#141414] border-[#ececec] flex justify-center items-center gap-1 rounded-md text-center py-[0.2em] px-[0.5em] right-12 absolute -mt-8 dark:group-hover:bg-rose-900 dark:bg-rose-800 bg-rose-600 group-hover:bg-rose-600 text-xs text-white">New</p>
                        <p class="text-[0.6rem] text-right font-bold dark:text-white text-black"> {{ item.guild.guildName }}</p>
                        <p class="text-[0.5rem] text-right dark:text-white text-black opacity-80">{{ item.metadata.metaTime }}</p>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script setup>
import { useVisitedPagesStore } from '~/stores/visitedPage';
const visitedPagesStore = useVisitedPagesStore();


const refreshing = ref(true);
const Currentpage = ref(1)
const showitems = ref([])
const totalItems = ref(1)
const pageItems = ref(8)
const statuscode = ref({})

const router = useRouter()
const pageName = useRoute().fullPath.replace("/", "").split("?")[0];
const Current = useState('Current', () => Number(useRoute().query.page || 1))
const CurrentCounter = useState('Current') ? useState('Current') : useRoute().query.page;

useHead({
    title: "Planetaire - Audits",
    meta: [{ name: "description", content: "My amazing site." }],
});

definePageMeta({
    middleware: ["session"],
});

onMounted( async () => {
    $StartSocket();
    $ClearSession(statuscode, statuscode);
})

const { $StartSocket, $ClearSession } = useNuxtApp();

if (!useRoute().query.page) {
    router.push({ path: '/audits', query: { page: Number(CurrentCounter.value) } })
} 

Currentpage.value = CurrentCounter.value
const { data: response } = await useLazyFetch(`/api/feeds/audit?page=${Currentpage.value}`);

if (!visitedPagesStore.hasVisitedPage(pageName)) {
    setTimeout(() => {
        if (response.value) {
            statuscode.value = { status: response.value.status }

            if (response.value.status == 200) {
                totalItems.value = response.value.totalitems
                showitems.value = response.value.audit
                refreshing.value = false;
                if(!visitedPagesStore.hasVisitedPage(pageName)) {
                    visitedPagesStore.addVisitedPage(pageName); 
                }
            }
        }
    }, 500);
} else {
    if(response.value) {
        statuscode.value = { status: response.value.status }

        if (response.value.status == 200) {
            totalItems.value = response.value.totalitems
            showitems.value = response.value.audit
            refreshing.value = false;
        }
    } else {
        setTimeout(async () => {
            statuscode.value = { status: response.value.status }

            if (response.value.status == 200) {
                totalItems.value = response.value.totalitems
                showitems.value = response.value.audit
                refreshing.value = false;
            }
        }, 500)
    }
}

const onClickHandler = async (page) => {
    Currentpage.value = page
    Current.value = page

    router.push({ path: '/audits', query: { page: Number(page) } })
    useLocalStorage("page").value = Number(page)
    
    if (response.value.status == 200){
        const { data: items } = await useLazyFetch(`/api/feeds/audit?page=${Currentpage.value}`);
        statuscode.value = { status: items.value.status }
        showitems.value = items.value.audit
    }
    
};

const refresh = async () => {
    const { data: items } = await useLazyFetch(`/api/feeds/audit?page=${Currentpage.value}`);
    refreshing.value = true;
    statuscode.value = { status: items.value.status }
    showitems.value = items.value.audit
    setTimeout(() => {
        refreshing.value = false;
        if (items.status == 401) {
            alert("Session Expired: Your session has timed out due to inactivity.");
            navigateTo("/login")
        }
    }, 1200);
}

const deleteCache = () => {
    localStorage.removeItem('visitedPages');
    refreshing.value = true;
    location.reload();
}


</script>

<style>

.btn-focus:focus {
    @apply ring-4 dark:ring-neutral-800 ring-gray-300 outline-none 
}

.pagination-container {
    @apply flex gap-2 justify-evenly
}

.paginate-buttons {
    @apply cursor-pointer dark:bg-[#1a1a1a] dark:hover:bg-[#232323] bg-[#ffffff] hover:bg-[#dfdfdf] w-10 h-10 rounded-md dark:text-white btn-focus outline-none 
}

.active-page {
    @apply  dark:hover:bg-rose-900 dark:bg-rose-800 bg-rose-600 hover:bg-rose-600 text-white
}

.active-page:focus {
    @apply ring-4 dark:ring-rose-950 ring-rose-700
}

</style>

