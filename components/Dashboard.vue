<template>
    <div v-auto-animate class="p-1 mx-3 dark:text-white text-black">
        <h1 class="text-2xl font-bold ">Dashboard</h1>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate";

// const { refreshing, hidden } = defineModels<{ refreshing: any, hidden: Boolean }>()
// const hide = ref(false)

// const onHide = () => {
//     hide.value = true;
//     hidden.value = hidden.value ? false : true;
//     setTimeout(() => {
//         hide.value = false;
//     }, 300);
// };

// <button @click="onHide" : disabled = "refreshing" >
//     <Icon : class="!hidden ? ' rotate-180' : 'rotate-0'" class="transition-all delay-100 opacity-60 hover:opacity-80" name = "material-symbols:arrow-drop-down-circle-outline" size = "1em" />
//         </button>

</script>

