<template>
    <div v-auto-animate class=" w-full">
        <h1 class=" flex items-center gap-2 font-bold opacity-80 justify-between">
            <div class=" flex items-center gap-2">
                <icon :name="item.content.title.includes('Published') ? 'heroicons:check-circle' : item.content.title.includes('Deleted') ? 'heroicons:minus-circle' : 'heroicons:plus-circle'" size="1.2em" />
                {{ item.content.title.includes("Published") ? 'Created' : item.content.title.includes("Deleted") ? 'Deleted' : 'Updated' }}
                <span class=" text-xs opacity-50">{{ !showContent ? timeAgo : '' }}</span>
            </div>
            <button aria-label="Expand" @click="expand">
                <icon :class="showContent ? ' rotate-180' : ''" class=" transition-all delay-200 opacity-60" name="material-symbols:keyboard-arrow-down-rounded" size="1.5rem" />
            </button>
        </h1>
        <div v-if="showContent">
            <div class=" flex items-center gap-2 ">
                <p class=" opacity-80">Executed by: </p>
                <NuxtImg class=" w-4 h-4 rounded-full" :src="item.author.userAvatarUrl" :alt="item.author.userName"/>
                <p class=" opacity-70">{{ item.author.userName }}</p>
            </div>
            <p class=" text-sm mt-1 mb-4 opacity-50"> {{ item.content.updated?.subject || item.content.subject }}</p>
            <div class=" flex items-center justify-between">
                <Rating :rating="item.content.updated?.favorability || item.content.favorability" />
                <p class=" text-[0.6rem] dark:text-white text-black opacity-40">{{ item.metadata.metaTime }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    //import { vAutoAnimate } from "@formkit/auto-animate";
    const UsePropState = useState(`${useRoute().fullPath.replace("/", "")}${probs.index}`, () => false)
    const UseFirstState = useState(`${useRoute().fullPath.replace("/", "")}${probs.index}First`, () => false)
    const UseCurrentState = useState(`${useRoute().fullPath.replace("/", "")}${probs.index}`);
    const ShowFirst = useState(`${useRoute().fullPath.replace("/", "")}${probs.index}First`)
    
    const showContent = ref(false)
    const probs = defineProps({ item: { type: Object }, index: { type: Number } })

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