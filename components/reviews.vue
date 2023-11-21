<template>
    <div v-auto-animate class="w-full ">
        <h1 class="flex items-center justify-between gap-2 font-bold opacity-80">
            <div class="flex items-center gap-2 ">
                <icon :name="item.content.title.includes('Published') ? 'heroicons:check-circle' : item.content.title.includes('Deleted') ? 'heroicons:minus-circle' : 'heroicons:plus-circle'" size="1.2em" />
                {{ item.content.title.includes("Published") ? 'Created' : item.content.title.includes("Deleted") ? 'Deleted' : 'Updated' }}
                <span class="text-xs opacity-50 ">{{ !showContent ? timeAgo : '' }}</span>
            </div>
            <button class="outline-none  btn-focus" aria-label="Expand" @click="expand">
                <icon :class="showContent ? ' rotate-180' : ''" class="transition-all delay-200 opacity-60" name="material-symbols:keyboard-arrow-down-rounded" size="1.5rem" />
            </button>
        </h1>
        <div v-if="showContent">
            <div class="flex items-center gap-2 ">
                <p class=" opacity-80">Executed by: </p>
                <NuxtImg class="w-4 h-4 rounded-full " :src="item.author.userAvatarUrl" :alt="item.author.userName"/>
                <p class=" opacity-70">{{ item.author.userName }}</p>
            </div>
            <p class="opacity-60">{{ item.content.title }}</p>
            <div :class=" item.metadata.metaStatus == 'updated' ? ' bg-[#101010] p-2 py-4 rounded-md mt-3 opacity-100' : ''" class="mt-1 mb-4 text-sm opacity-50" v-if="item.metadata.metaStatus != 'deleted'">
                <div v-if="item.content.updated">
                    <div class="grid grid-cols-[2em,1fr]" v-if="item.content.updated.subject == item.content.subject" >
                        <Icon class="mr-1 text-cyan-600" size="1.3em" name="ic:outline-plus-minus-alt"/>
                        <p class="pb-2 pr-4 text-cyan-200">{{ item.content.updated.subject.replace(/<[^>]+>/g, '') }}</p>
                    </div>
                    <div v-else>
                        <div class="grid grid-cols-[2em,1fr]">
                            <Icon class=" text-rose-600" v-if="item.content.updated" size="1.5em" name="heroicons:minus-small-20-solid"/>
                            <p class="pb-2 pr-4 text-rose-200">{{ item.content.subject.replace(/<[^>]+>/g, '') }}</p>
                        </div>
                        <div class="grid grid-cols-[2em,1fr]" v-if="item.content.updated">
                            <Icon class=" text-lime-600" size="1.5em" name="heroicons:plus-small-20-solid"/>
                            <p class="pb-2 pr-4 text-lime-200">{{ item.content.updated.subject.replace(/<[^>]+>/g, '') }}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>{{ item.content.subject.replace(/<[^>]+>/g, '') }}</p>
                </div>
            </div>
            <div :class=" item.metadata.metaStatus != 'deleted' ? 'justify-between' :' justify-end mt-4'" class="flex items-center">
                <Rating v-if="item.metadata.metaStatus != 'deleted'" :rating="item.content.updated?.favorability || item.content.favorability" />
                <p class=" text-[0.6rem] dark:text-white text-black opacity-40">{{ item.metadata.metaTime }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const probs = defineProps({ item: { type: Object }, index: { type: Number } })
    const UsePropState = useState(`${useRoute().fullPath.replace("/", "")}${probs.index}`, () => false)
    const UseFirstState = useState(`${useRoute().fullPath.replace("/", "")}${probs.index}First`, () => false)
    const UseCurrentState = useState(`${useRoute().fullPath.replace("/", "")}${probs.index}`);
    const ShowFirst = useState(`${useRoute().fullPath.replace("/", "")}${probs.index}First`)
    
    const showContent = ref(false)
    

    const expand = () => {
        showContent.value == false ? showContent.value = true : showContent.value = false
        UsePropState.value = showContent.value

        if(probs.index < 1 ){
            UseFirstState.value = true
        }
    }

    if(probs.index < 1 && !ShowFirst.value || UseCurrentState.value){
        showContent.value = true
    }

    const dateString = probs.item.metadata.metaTime
    const [date, time] = dateString.split(" ");
    const [day, month, year] = date.split("-");
    const [hours, minutes, seconds] = time.split(":");

    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
    const timeAgo = useTimeAgo(dateObject)



</script>

<style scoped>


</style>