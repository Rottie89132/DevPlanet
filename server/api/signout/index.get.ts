export default defineEventHandler(async (event)=> {
    
    const cookie = getCookie(event, 'token') || null;
    deleteCookie(event, "token")
    return await $fetch("/api/users", { method: "POST", body: { ClearSession: cookie } })

})