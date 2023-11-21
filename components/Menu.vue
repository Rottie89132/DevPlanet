<template>
    <div id="navbar" class="fixed top-0 z-10 w-1 h-full ">
        <Transition name="navbar">
            <div v-if="NavShow">
                <button @click="ShowNavbar" :disabled="busy" ref="navbar" class="absolute w-screen h-full bg-black cursor-default backdrop-blur-sm bg-opacity-60"></button>
                <Transition name="topics">
                    <div v-if="TopShow" ref="topics" class=" fixed border-r-2 dark:border-[#111111] border-[#efefef] dark:bg-[#090909] bg-[#f6f6f6] dark:text-[#ccc] text-[#262525] border-opacity-40 justify-center p-4  h-full">
                        <hr class=" mt-10 mb-5 border dark:border-[#100F0F] border-[#dadada]">
                        <NuxtLink to="/" class="dark:hover:text-white hover:text-[#0a0a0a] bg-[#dadada] hover:bg-[#d0d0d0] dark:bg-[#100F0F] dark:hover:bg-[#1e1c1c] transition-all delay-100 mb-5 flex justify-center p-2 items-center rounded-lg">
                            <icon size="1.6rem" name="ic:baseline-home"></icon>
                        </NuxtLink>
                        <NuxtLink :to="redirectServer" class="dark:hover:text-white hover:text-[#0a0a0a] bg-[#dadada] hover:bg-[#d0d0d0] dark:bg-[#100F0F] dark:hover:bg-[#1e1c1c] transition-all delay-100 mb-5 flex justify-center p-2 items-center rounded-lg">
                            <icon size="1.6rem" name="ic:baseline-apartment"></icon>
                        </NuxtLink>
                        <NuxtLink :to="redirect" class="dark:hover:text-white hover:text-[#0a0a0a] bg-[#dadada] hover:bg-[#d0d0d0] dark:bg-[#100F0F] dark:hover:bg-[#1e1c1c] transition-all delay-100 mb-5 flex justify-center p-2 items-center rounded-lg">
                            <icon size="1.6rem" name="ic:baseline-all-inbox"></icon>
                        </NuxtLink>
                        <hr class=" my-5 border dark:border-[#100F0F] border-[#dadada]">
                        <div class="absolute bottom-3">
                            <hr class=" my-5 border dark:border-[#100F0F] border-[#dadada]">
                            <button class="dark:hover:text-white hover:text-[#0a0a0a] bg-[#dadada] hover:bg-[#d0d0d0] dark:bg-[#100F0F] dark:hover:bg-[#1e1c1c] transition-all delay-100 mb-5 flex justify-center p-2 items-center rounded-lg" @click="logout">
                                <icon size="1.6rem" name="ri:logout-circle-r-line"></icon>
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </div>
    <button class="flex items-center justify-between p-3 mx-3 mt-2 rounded-lg dark:bg-[#141414] bg-[#EBEBEB]" aria-label="menu" @click="ShowNavbar" :disabled="busy">
        <icon name="ri:menu-fill" size="1.25em" class="text-black dark:text-white opacity-60"/>
    </button>
    
</template>


<script setup>

const { $CloseSocket, } = useNuxtApp()
const redirectServer = ref('/servers')
const redirect = ref('/audits')
const NavShow = ref(false)
const TopShow = ref(false)
const savedServer = ref()
const savedpage = ref()
const navbar = ref()
const topics = ref()
const busy = ref()

const ShowNavbar = () => {
    busy.value = true;

    savedpage.value = Number(useLocalStorage("page", 1).value) || 1;
    redirect.value = `/audits?page=${Number(savedpage.value)}`

    savedServer.value = useLocalStorage("ServerChannel", 0).value;
    redirectServer.value = `/servers?index=${Number(savedServer.value)}`

    if (NavShow.value == true) {
        TopShow.value = TopShow.value ? false : true;
        topics.value = NavShow.value ? false : true;

        setTimeout(() => {
            NavShow.value = NavShow.value ? false : true;
            navbar.value = NavShow.value ? false : true;
            busy.value = false;
        }, 200)
    } else {
        NavShow.value = NavShow.value ? false : true;
        navbar.value = NavShow.value ? false : true;
        setTimeout(() => {
            TopShow.value = TopShow.value ? false : true;
            topics.value = NavShow.value ? false : true;
            busy.value = false;
        }, 200)
    }
}

async function logout() {

    await useFetch("/api/signout")
    $CloseSocket()

    return navigateTo('/login')
}

</script>

<style>
.navbar-enter-active,
.navbar-leave-active {
    transition: all 0.8s ease;
}

.navbar-enter-from,
.navbar-leave-to {
    opacity: 0;
}

.topics-enter-active,
.topics-leave-active {
    transition: all 0.8s ease;
}

.topics-enter-from,
.topics-leave-to {
    transform: translateX(-100%);
}

.router-link-active {
    @apply dark:bg-[#1e1c1c] bg-[#d0d0d0]
}

.router-link-active svg {
    @apply dark:text-white dark:hover:text-white hover:text-[#0a0a0a] text-[#0a0a0a]
}


</style>
