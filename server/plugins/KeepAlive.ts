import { useScheduler } from "#scheduler"
import http from 'http';

export default defineNitroPlugin(() => {
    const scheduler = useScheduler();
    scheduler.run(async () => {
        console.log(`\n\x1b[34mℹ\x1b[0m Attempting to reconnect to server!`)

        const req = http.request('http://localhost:3000/api/status', (res) => {
            res.on('data', () => { console.log(`\x1b[32m✔\x1b[0m Reconnected successfully!`);})
        });

        req.on('error', (error) => {}); 
        req.end();

    }).everyMinutes(5);
})



