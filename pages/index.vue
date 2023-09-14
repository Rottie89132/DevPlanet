<template >
  <VitePwaManifest/>
  <div class="flex items-center justify-between my-2 me-2">
    <div class="flex items-center">
      <LazyMenu/>
      <LazyRefresh v-model:server="server" v-model:ServerCount="ServerCount" v-model:ReviewCount="ReviewCount" v-model:refreshing="refreshing"
        v-model:disabled="disabled" v-model:response="response" v-model:feed="feed" />
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

const refreshing = ref(true);
const disabled = ref(true);
const ServerCount = ref();
const ReviewCount = ref();
const hidden = ref(true);
const feed = ref([]);

const { data: response } = await useLazyFetch("/api/feeds/audit?count=6");
const { data: server } = await useLazyFetch("/api/feeds/server");
const { data: review } = await useLazyFetch("/api/feeds/reviews");

setTimeout(() => {
  feed.value = response.value.audit;
  ServerCount.value = server.value.count;
  ReviewCount.value = review.value.count;
  refreshing.value = false;
  disabled.value = false;
  
}, 500);

const { 
  $StartSocket, 
  $ClearSession,
  $CloseSocket, 
  $EventSession,
  $ServerSession
} = useNuxtApp();

onMounted(() => {
  $StartSocket();
  
  $ClearSession(response, server);
  $ServerSession(feed, ReviewCount, ServerCount, response, server);
  $EventSession(feed, ReviewCount, ServerCount, response, server);
  
  setTimeout(() => {
      if (response.value.status == 401) {
        $CloseSocket()
        navigateTo('/login')
      }
  }, 2000);
  
})

</script>

