<template>
    <button @click="logout" class=" dark:bg-[#141414] bg-[#EBEBEB] rounded-lg p-3 me-2 flex items-center justify-between mt-2" aria-label="logout">
        <Icon class=" dark:text-white text-black opacity-60" name="ic:twotone-log-out" size="1.25em"/>
    </button>
</template>

<script setup>

const { $CloseSocket, } = useNuxtApp()
async function logout() {
    await useFetch("/api/signout")
    $CloseSocket()

    return navigateTo('/login')
}


</script>


