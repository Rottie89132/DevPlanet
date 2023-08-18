<template>
  <VitePwaManifest/>
  <div class="flex items-center justify-between my-2 me-2">
    <div class="flex items-center">
      <LazyMenu/>
      <LazyRefresh v-model:server="server" v-model:ServerCount="ServerCount" v-model:ReviewCount="ReviewCount" v-model:refreshing="refreshing"
        v-model:disabled="disabled" v-model:response="response" v-model:feed="feed" />
      <LazyLogout/>
    </div>
    <LazySubscribe/>
    </div>
  <LazyDashboard>
    <LazyReviewStats v-model:response="response" v-model:server="server" v-model:hidden="hidden" v-model:refreshing="refreshing" v-model:ReviewCount="ReviewCount" v-model:ServerCount="ServerCount" />
    <LazyRecentView v-model:refreshing="refreshing" v-model:response="response" v-model:feed="feed"/>
  </LazyDashboard>
</template>

<script setup>


definePageMeta({
  middleware: ["session"],
});

useHead({
  title: "Planetaire - Dashboard",
  meta: [{ name: "description", content: "My amazing site." }],
});

const hidden = ref(true);
const refreshing = ref(true);
const disabled = ref(true);
const feed = ref([]);
const ServerCount = ref();
const ReviewCount = ref();

const { data: response } = await useLazyFetch("/api/feeds/audit?count=6");
const { data: server } = await useLazyFetch("/api/feeds/server");
const { data: review } = await useLazyFetch("/api/feeds/reviews");

setTimeout(() => {
  feed.value = response.value.audit;
  ServerCount.value = server.value.count;
  ReviewCount.value = review.value.count;
  refreshing.value = false;
  disabled.value = false;
  
}, 2000);

const { $StartSocket, $OnSocketEvent, $CloseSocket } = useNuxtApp();

onMounted(() => {
  $StartSocket();
  $OnSocketEvent(feed, ReviewCount, ServerCount, response, server);
  
  setTimeout(() => {
      if (response.value.status == 401) {
        $CloseSocket()
        navigateTo('/login')
      }
  }, 2000);
  
})

// const hide = ref();
// const NavShow = ref(false)
// const TopShow = ref(false)
// const navbar = ref()
// const topics = ref()
// const busy = ref()

// const ShowNavbar = () => {
//   busy.value = true;
//   if (NavShow.value == true) {
//     TopShow.value = TopShow.value ? false : true;
//     topics.value = NavShow.value ? false : true;

//     setTimeout(() => {
//       NavShow.value = NavShow.value ? false : true;
//       navbar.value = NavShow.value ? false : true;
//       busy.value = false;
//     }, 800)
//   } else {
//     NavShow.value = NavShow.value ? false : true;
//     navbar.value = NavShow.value ? false : true;
//     setTimeout(() => {
//       TopShow.value = TopShow.value ? false : true;
//       topics.value = NavShow.value ? false : true;
//       busy.value = false;
//     }, 800)
//   }
// }


//   < div v -if= "response" >
//     <div v-if="response.status == 401" class="absolute top-0 z-20 flex items-center justify-center w-full h-screen py-5 dark:bg-black bg-white bg-opacity-90">
//       <div class="text-center">
//         <LazyIcon class="mb-4 dark:text-white text-black opacity-80" name="material-symbols:lock" size="9em" />
//         <h1 class="text-xl font-bold dark:text-white text-black opacity-80">Unauthorized credentials</h1>
//         <LazyNuxtLink to="/login" class="text-sm dark:text-white text-black hover:opacity-70 font-semibold underline opacity-60">Take me back to the login screen</LazyNuxtLink>
//       </div>
//     </div>
// </ >

</script>

<style scoped>
.navbar-enter-active,
.navbar-leave-active {
  transition: all 0.8s ease;
}

.navbar-enter-from,
.navbar-leave-to {
  opacity: 0;
}

.topics-enter-active,
.topics-leave-active {
  transition: all 0.8s ease;
}

.topics-enter-from,
.topics-leave-to {
  transform: translateX(-100%);
}

</style>