import { useScheduler } from "#scheduler"
import http from 'http';

const config = useRuntimeConfig()
export default defineNitroPlugin(() => {
    const scheduler = useScheduler();
    scheduler.run(async () => {
        console.log(`\n\x1b[34mℹ\x1b[0m Attempting to reconnect to server!`)

        await fetch(`${config.ServerUrl}`).then(res => {
            console.log(`\x1b[32m✔\x1b[0m Reconnected successfully!`)
        }).catch(err => console.error(err))
        
    }).everySeconds(10);
})



