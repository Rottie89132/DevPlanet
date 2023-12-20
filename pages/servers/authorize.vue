<template>
    <div class="flex items-center justify-between my-2 me-2">
            <div class="flex items-center">
                <LazyMenu/>
                <button class=" btn-focus flex items-center justify-between p-3 mt-2 rounded-lg dark:bg-[#141414] bg-[#EBEBEB] me-2" aria-label="refresh" >
                    <Icon class="text-black dark:text-white opacity-60" name="ri:refresh-line" size="1.25em"/>
                </button>
            </div>
        </div>
        <div class="p-1 mx-3 mt-3 text-black dark:text-white">
            Please wait while we authorize your account.
        </div>
</template>

<script setup>

onMounted(async () => {

    setTimeout(async () => {
        const { code } = useRoute().query
        const data = await $fetch(`/api/auth/authorize/${code}`, { method: 'POST' })
        console.log(data)
        if(data.statusCode == 200){
            navigateTo('/servers')
        }
    }, 2000)
})






</script>