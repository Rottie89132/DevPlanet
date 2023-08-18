<template >
    <Form class="grid" v-slot="{ meta }">
        
        <slot></slot>
        <span role="alert" v-if="Error && !meta.touched" class="flex justify-center text-xs text-[#B92538]">{{ Error }}</span>
        
        
    </Form>
</template>

<script setup>
    import { Form } from 'vee-validate';
   
    
    const probs = defineProps({
    Error: {
        type: String,
        default: ""
    }
})
</script>

