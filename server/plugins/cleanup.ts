import { useScheduler } from "#scheduler"
const config = useRuntimeConfig()
import io from 'socket.io-client';
const socket = io(`http://localhost:${config.public.SocketPORT}`);

export default defineNitroPlugin(() => {
    const scheduler = useScheduler();

    scheduler.run(async () => {
        await Audit.deleteMany({})
        socket.emit('AsyncRefresh', [{}])
    }).cron(`0 0 * * 0,2`)

})



