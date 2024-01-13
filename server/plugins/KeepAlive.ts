import { useScheduler } from "#scheduler"
import http from 'http';

const config = useRuntimeConfig()
export default defineNitroPlugin(() => {
    const scheduler = useScheduler();
    scheduler.run(async () => {
        console.log(`\n\x1b[34mℹ\x1b[0m Attempting to reconnect to server!`)

        const req = http.request(`${config.ServerUrl}`, (res) => {
            res.on('data', () => { console.log(`\x1b[32m✔\x1b[0m Reconnected successfully!`);})
        });

        req.on('error', (error) => { console.error(error); }); 
        req.end();

    }).everySeconds(10);
})



