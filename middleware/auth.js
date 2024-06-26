export default defineNuxtRouteMiddleware( async (to, from) => {
    
    const cookie = useCookie("token")
    const data = await $fetch("/api/users", {method: "POST", body: { Session: cookie._rawValue }})
    
    if(data.Status == 200) {
        return navigateTo("/")
    }
})