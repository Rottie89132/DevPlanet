<template>
        <button id="Button" :type="type" aria-label="Sumbit" class=" relative ease-in duration-300 flex items-center justify-center w-full mb-4 btn-login" :disabled="loading">
            <Icon v-if="loading" class=" animate-spin" name="ri:refresh-line" size="1.25em"/>
            <p v-else>Login</p>
        </button>
</template>

<script setup>

const probs = defineProps({
    
    type: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        required: false
    },
})

</script>


