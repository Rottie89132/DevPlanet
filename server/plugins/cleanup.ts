import { useScheduler } from "#scheduler"
const config = useRuntimeConfig()
const SocketUrl: any = config.public.Environment == "Production" ? config.public.SocketUrl : `http://localhost:${config.public.SocketPORT}`

import io from 'socket.io-client';
const socket = io(SocketUrl);

export default defineNitroPlugin(() => {
    const scheduler = useScheduler();

    scheduler.run(async () => {
        //await Audit.deleteMany({})
        socket.emit('AsyncRefresh', [{}])
    }).cron(`0 0 * * 0,2`)

})



