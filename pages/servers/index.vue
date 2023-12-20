<template>
    <VitePwaManifest/>
    <div class="flex items-center justify-between my-2 me-2">
        <div class="flex items-center">
            <LazyMenu/>
            <button class=" btn-focus flex items-center justify-between p-3 mt-2 rounded-lg dark:bg-[#141414] bg-[#EBEBEB] me-2" aria-label="refresh" @click="refresh" :disabled="refreshing">
                <Icon :class="refreshing || statuscode.status == 401 ? 'animate-spin' : ''"  class="text-black dark:text-white opacity-60" name="ri:refresh-line" size="1.25em"/>
            </button>
        </div>
    </div>
    <div>
        <Transition name="modal">
            <UseFocusTrap :options="{ immediate: true }" v-if="ModalShow" class="fixed top-0 z-10 flex items-end justify-center w-screen h-full bg-black bg-opacity-60 backdrop-blur-sm">
                <div tabindex="0" class="mx-6 mb-10 outline-none rounded-xl" ref="modal">
                    <Transition name="modalDelay">
                        <div ref="modalDelay" v-if="modalShowDelay">
                            <div class="dark:bg-[#141414] bg-[#EBEBEB] pb-14 p-8 rounded-xl ">
                                <div class="flex items-center justify-between ">
                                    <h1 class="text-3xl font-bold dark:text-white">Update</h1>
                                </div>
                                <h2 class="mt-4 text-xl font-semibold opacity-60 dark:text-white">{{ guildname }}</h2>
                                <p class="mb-6 opacity-40 dark:text-white">Please select the new {{ type }} channel from the list below</p>
                                <hr class=" mb-8 h-1 bg-[#F4F4F4] dark:bg-[#1D1D1D] rounded-full border-none">
                                <div class="mb-8 ">
                                    <select class="w-full pl-4 mb-1 Select-Input" v-model="selected">
                                        <option disabled hidden selected="selected">{{ selected.name || selected }}</option>
                                        <option v-for="option in loaditems" :value="option">{{ option.name }}</option>
                                    </select>
                                    <span class=" font-medium text-sm text-[#B92538]">{{ ErrorMessage }}</span>
                                </div>
                    
                                <div class="flex gap-3 ">
                                    <button :disabled="Load" class=" outline-none transition-all btn-focus font-semibold dark:text-white text-black bg-white dark:bg-[#1D1D1D] rounded-xl py-2 px-6" @click="handleUpdate({Value: selected, Server: {id: channelData.GuildId, name: channelData.GuildName }, type: type })">
                                        <Icon v-if="Load" class=" animate-spin" name="ri:refresh-line" size="1.25em"/>
                                        <p v-else>Confirm</p>
                                    </button>
                                    <button class="px-6 py-2 font-bold outline-none focus:ring-1 focus:ring-rose-500 focus:dark:ring-rose-800 rounded-xl text-rose-500 dark:text-rose-800" @click="animate()">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </UseFocusTrap>
        </Transition>
    </div>

    <div class="p-1 mx-3 mt-3 text-black dark:text-white">
        <div v-if="Connection?.statusCode != 200">
            <a class="relative flex items-center justify-center w-full mb-4 duration-300 ease-in outline-none btn-focus btn-login" href="https://discord.com/api/oauth2/authorize?client_id=974324336552984637&response_type=code&redirect_uri=https%3A%2F%2Fdevplanet.onrender.com%2Fservers%2Fauthorize&scope=identify+guilds">Authorize client</a>
        </div>
        <div v-else>
            <div  class="px-4 py-2 mt-4 dark:bg-[#141414] bg-[#ececec] rounded-xl pb-4">
                <h1 class="mt-1 mb-3 text-base font-bold opacity-90">Server list</h1>
                <div v-auto-animate class="flex gap-2 overflow-auto ">
                    <div v-if="refreshing || statuscode.status == 401 || statuscode.status == 404" v-for="data in pageItems" :key="data" class="grid items-center justify-center px-[1.48em] p-4 select-none bg-[#F2F2F2] dark:bg-[#1a1a1a] rounded-xl animate-pulse">
                        <div class="rounded-full dark:opacity-90 opacity-40 dark:bg-neutral-800 bg-[#838383] h-[3.5rem] w-[3.5rem] mb-3 "></div>
                        <div class=" w-full h-[0.1rem] p-[0.35rem] mb-1 rounded-full dark:opacity-70 opacity-40 dark:bg-neutral-800 bg-[#838383]"></div>
                        <div class=" h-[0.1rem] p-[0.35rem] mb-1 rounded-full dark:opacity-70 opacity-40 dark:bg-neutral-800 bg-[#838383]"></div>
                    </div>
                    <div v-else v-for="(item, index) in showitems" :key="index" tabindex="0" :class="index == CurrentIndex ? ' bg-[#E3E3E3] dark:bg-[#101010]' : ' bg-[#F2F2F2] dark:bg-[#171717] hover:bg-[#E3E3E3] dark:hover:bg-[#101010]'" class=" tab-index transition-all grid items-center justify-center px-[1.48em] p-4 select-none rounded-xl" @keydown.enter="ServerChannel(index)" @click="ServerChannel(index)">
                        <NuxtImg v-if="item.GuildIcon" class=" border-2 dark:border-[#282828] border-white rounded-full h-[3.5rem] w-[3.5rem] mb-3" :src="item.GuildIcon" draggable="false" :alt="item.GuildName"  />
                        <div v-else class=" flex items-center justify-center rounded-full dark:opacity-90 opacity-40 dark:bg-neutral-800 bg-[#838383] h-[3.5rem] w-[3.5rem] mb-3 "><icon size="2rem" name="tdesign:search-error"></icon></div>
                        <p class=" text-center text-[0.55rem] font-bold dark:text-white text-black">{{ item.GuildName.slice(0, 12) }}</p>
                        <p class=" text-center text-[0.4rem] md:text-[0.5em] font-bold dark:text-white text-black opacity-80 mb-[0.60em]">Manage server</p>
                    </div>
                </div>
            </div>
            <div class=" px-4 py-2 mt-4 dark:bg-[#141414] bg-[#ececec] rounded-xl pb-4">
                <h1 class="mt-1 mb-3 text-base font-bold opacity-90">Server channels</h1>
                <div v-if="refreshing || Load || statuscode.status == 401 || statuscode.status == 404" v-for="data in 2" :key="data" class=" pb-[1.29em] flex items-center justify-start p-4 my-2 select-none bg-[#F2F2F2] dark:bg-[#1a1a1a] rounded-xl animate-pulse">
                    <div class="flex ">
                        <div class="rounded-full dark:opacity-90 opacity-40 dark:bg-neutral-800 bg-[#838383] h-[1.8rem] w-[1.8rem]"></div>
                    </div>
                    <div class="ms-6">
                        <div class="w-20 h-[0.1rem] p-[0.35rem] mb-1 rounded-full dark:opacity-70 opacity-40 dark:bg-neutral-800 bg-[#838383]"></div>
                        <div class="w-28 h-[0.1rem] p-[0.35rem] rounded-full dark:opacity-50 opacity-30 dark:bg-neutral-800 bg-[#838383]"></div>
                    </div>
                </div>
                <div v-else>
                    <div tabindex="0" @keydown.enter="Module(channelData, channelData?.ReviewChannel, true)" @click="Module(channelData, channelData?.ReviewChannel, true)" class=" tab-index flex items-center justify-between p-4 my-2 select-none bg-[#F2F2F2] hover:bg-[#E3E3E3] dark:bg-[#171717] dark:hover:bg-[#101010] rounded-xl">
                        <div class="flex ">
                            <div class="text-[#6B8FA3]">
                                <Icon size="1.8em" name="solar:document-add-bold-duotone"></Icon>
                            </div>
                            <div class="ms-6">
                                <p class="text-[0.8rem] font-bold dark:text-white text-black">Review channel:</p>  
                                <p class="text-[0.6rem] font-normal dark:text-white text-black opacity-50"><Icon :class="channelData?.ReviewChannel ? '' : ' opacity-0 absolute'" class=" me-1" size="1.2em" name="ph:hash-bold"></Icon>{{ channelData?.ReviewChannel?.name || "Channel hasn't been asigned yet" }}</p>
                            </div>
                        </div>
                        <div class="-mt-5 opacity-60" >
                            <Icon size="1.2em" name="material-symbols:edit-square-outline"></Icon>
                        </div>
                    </div>
                    <div tabindex="0" @keydown.enter="Module(channelData, channelData?.LogChannel, false)" @click="Module(channelData, channelData?.LogChannel, false)" class="tab-index flex items-center justify-between p-4 my-2 select-none bg-[#F2F2F2] hover:bg-[#E3E3E3] dark:bg-[#171717] dark:hover:bg-[#101010] rounded-xl">
                        <div class="flex">
                            <div class="text-[#6F6BA3]">
                                <Icon size="1.8em" name="solar:document-add-bold-duotone"></Icon>
                            </div>
                            <div class="ms-6">
                                <p class=" text-[0.8rem] font-bold dark:text-white text-black">Audit log channel:</p>  
                                <p class=" text-[0.6rem] font-normal dark:text-white text-black opacity-50"> <Icon :class="channelData?.LogChannel ? '' : ' opacity-0 absolute'" class=" me-1" size="1.2em" name="ph:hash-bold"></Icon>{{ channelData?.LogChannel?.name || "Channel hasn't been asigned yet" }}</p>
                            </div>
                        </div>
                        <div class="-mt-5 opacity-60">
                            <Icon size="1.2em" name="material-symbols:edit-square-outline"></Icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { useVisitedPagesStore } from '~/stores/visitedPage';
const { $StartSocket, $ClearSession } = useNuxtApp();
const visitedPagesStore = useVisitedPagesStore();

const refreshing = ref(true)
const channelData = ref({})
const statuscode = ref({})
const showitems = ref([])
const pageItems = ref(3)
const Load = ref(false)
const selected = ref("")
const loaditems = ref([])
const ModalShow = ref(false)
const modalShowDelay = ref(false)
const modalDelay = ref(null)
const guildname = ref("")
const modal = ref(null)
const type = ref()
const ErrorMessage = ref()

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

const router = useRouter()
const pageName = useRoute().fullPath.replace("/", "").split("?")[0];
const Current = useState('CurrentIndex', () => Number(useRoute().query.index || 0))
const CurrentIndex = useState('CurrentIndex') ? useState('CurrentIndex') : useRoute().query.Index;

if (!useRoute().query.index) {
    router.push({ path: '/servers', query: { index: Number(CurrentIndex.value) } })
}

const { data: Connection } = await useLazyFetch("/api/auth/authorize");
const { data: response } = await useLazyFetch("/api/feeds/guilds");
const { data: server } = await useLazyFetch(`/api/feeds/Channels`)

if (!visitedPagesStore.hasVisitedPage(pageName)) {
    setTimeout(() => {
        if (response.value) {
            statuscode.value = { status: response.value.status }
            if (response.value.status == 200) {
                showitems.value = response.value.server
                channelData.value = server.value.data[CurrentIndex.value]
                refreshing.value = false;
                if (!visitedPagesStore.hasVisitedPage(pageName)) {
                    visitedPagesStore.addVisitedPage(pageName);
                }
            }
        }
    }, 500);
} else {
    
    if (response.value) {
        statuscode.value = { status: response.value.status }
        if (response.value.status == 200) {
            showitems.value = response.value.server
            channelData.value = server.value.data[CurrentIndex.value]
            refreshing.value = false;
        }
    } else {
        setTimeout(async () => {
            if (response.value) {
                statuscode.value = { status: response.value.status }
                if (response.value.status == 200) {
                    showitems.value = response.value.server
                    channelData.value = server.value.data[CurrentIndex.value]
                    refreshing.value = false;
                }
            }
        },500)
    }
}

const ServerChannel = (index) => {

    if(Load.value) return
    Load.value = true

    router.push({ path: '/servers', query: { index: index } })
    Current.value = index;
    
    window.localStorage.setItem("ServerChannel", Number(Current.value));
    setTimeout(async () => {
        const { data: server } = await useLazyFetch(`/api/feeds/Channels`);
        if(server.value) {channelData.value = server.value.data[index]} 
        Load.value = false
    }, 400);

}

const refresh = async () => {
    const { data: items } = await useLazyFetch("/api/feeds/guilds");
    const { data: server } = await useLazyFetch(`/api/feeds/Channels`);

    refreshing.value = true;
    statuscode.value = { status: items.value.status }
    showitems.value = items.value.server
    channelData.value = server.value.data[CurrentIndex.value]
    
    setTimeout(() => {
        refreshing.value = false;
        if (items.status == 401) {
            alert("Session Expired: Your session has timed out due to inactivity.");
            navigateTo("/login")
        }
    }, 1200);
}

const Module = (event, eventid, islog) => {

    ErrorMessage.value = " "
    loaditems.value = event?.Channels
    guildname.value = event.GuildName
    selected.value = eventid || "Channel hasn't been asigned yet"
    type.value = !islog ? "log" : "review";
    
    ModalShow.value = true

    setTimeout(() =>{modalShowDelay.value = true}, 100)
}

const animate = () => {
    modalShowDelay.value = false;
    setTimeout(() =>{ModalShow.value = false }, 100)
}

onClickOutside(modal, () => { animate() })


const handleUpdate = async (values) => {
    const { data: request } = await useFetch("/api/auth/update", { method: "POST", body: values })
    
    if(request.value.status == 200) {

        ErrorMessage.value = " "
        Load.value = true
        setTimeout(async () => {
            const { data: server } = await useLazyFetch(`/api/feeds/Channels`);
            channelData.value = server.value.data[Number(Current.value)]; animate()
        }, 100)

        setTimeout(() => {
            Load.value = false
        }, 2000)
    } else {
        Load.value = true
        setTimeout(async () => { 
            Load.value = false 
            ErrorMessage.value = "Please select a different channel"
        }, 500)
    }
}


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

.modal-enter-active, 
.modal-leave-active {
    transition: all 0.8s ease;
}
.modal-enter-from,
.modal-leave-to { 
    opacity: 0;
}

.modalDelay-enter-active, 
.modalDelay-leave-active {
    transition: all 1s ease;
}
.modalDelay-enter-from,
.modalDelay-leave-to { 
    opacity: 0;
    transform: translateY(12em);
}

.btn-focus:focus {
    @apply ring-4 dark:ring-neutral-800 ring-gray-300 outline-none 
}


</style>
