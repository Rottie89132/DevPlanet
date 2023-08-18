<template>
    <VitePwaManifest/>
    <div class=" absolute w-[100%] h-[100%] p-5 ">
        <div class=" flex justify-center rounded-xl py-10 p-5 h-[100%] dark:bg-[#141414] bg-[#ececec]">
            <div>
                <div class="flex justify-center w-full">
                    <div
                        class=" w-[80%] bg-[#FFFFFF] dark:bg-[#131111] rounded-full border-[0.5em] border-[#F4F4F4] dark:border-[#1F1F1F] p-5">
                        <NuxtImg src="/image/Frame.svg" draggable="false" alt="rocket" />
                    </div>
                </div>
                <h1 class="my-5 text-5xl text-center text-[#676767] dark:text-[#BABABA] font-kufi">Planetaire</h1>
                <hr class=" my-10 h-2 bg-[#F4F4F4] dark:bg-[#1D1D1D] rounded-full border-none">
                <div>
                    <FieldForm  :Error="Message" @submit="handleLogin" :validation-schema="schema">
                        <FieldMail :Error="Message" />
                        <FieldPassword :Error="Message" />
                        <FieldSubmit type="submit" :loading="isloading" />
                    </FieldForm>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { configure } from 'vee-validate';
import * as yup from 'yup';
useColorMode()

definePageMeta({
    middleware: ['auth'],
})

useHead({
    title: 'Planetaire - Login',
    meta: [{ name: 'description', content: 'Please login' }]
})

const isloading = ref(false)
const Message = ref('')
const schema = yup.object().shape({

    email: yup.string()
        .required()
        .email(),

    password: yup.string()
        .min(8)
        .max(16)
        .required(),

});

async function handleLogin(values, actions) {

    isloading.value = true
    const { data: response } = await useFetch("/api/auth", { method: "POST", body: values })

    setTimeout(() => {
        isloading.value = false
        actions.resetForm();

        if (response._value) {
            navigateTo("/")
        }
        else Message.value = "Password or username is incorrect!"

    }, 2000);
}

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
});

</script>
