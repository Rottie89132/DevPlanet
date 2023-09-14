<template>
    <field name="password" v-slot="{ field, meta }" >
        <label for="password"></label>
        <input :class=" meta.touched && !meta.valid /*|| Error && !meta.touched*/ ? ' btn-Input mb-5 error': ' btn-Input mb-5'" id="password" ref="password" type="password" v-bind="field" aria-label="password" autocomplete="current-password" placeholder="password:"/>
        <ErrorMessage class="mb-3 -mt-2 text-xs text-[#B92538]" name="password"/>
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
