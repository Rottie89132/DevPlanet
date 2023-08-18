<template>
    <field name="email" v-slot="{ field, meta }" >
        <label for="email"></label>
        <input :class=" meta.touched && !meta.valid /*|| Error && !meta.touched*/ ? ' btn-Input mb-5 error': ' btn-Input mb-5'" id="email" ref="email" type="email" v-bind="field" aria-label="email" autocomplete="current-email" placeholder="email:"/>
        <ErrorMessage class="mb-3 -mt-2 text-xs text-[#B92538]" name="email"/>
    </field>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate';

const probs = defineProps({
    
    Error: {
        type: String,
        default: ""
    }
})

</script>

<style scoped>
.error {
    
    color: #B92538;
    @apply ring-2 ring-[#B92538] outline-none
}
</style>
