import { useScheduler } from "#scheduler"
const config = useRuntimeConfig()

export default defineNitroPlugin(() => {
    const scheduler = useScheduler();

    scheduler.run(async () => {
        //await Audit.deleteMany({})
        
    }).cron(`0 0 * * 0,2`)

})



