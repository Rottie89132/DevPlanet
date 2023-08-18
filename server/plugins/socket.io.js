import { Server } from 'socket.io';
import webPush from 'web-push';
import os from 'os';

const config = useRuntimeConfig()
const interfaces = os.networkInterfaces();
const addresses = [];

const { SocketPORT, PORT } = process.env

for (const key in interfaces) {
  for (const iface of interfaces[key]) {
    if (iface.family === 'IPv4' && !iface.internal) {
      addresses.push(`http://${iface.address}:${PORT}`);
    }
  }
}

export default defineNitroPlugin( async() => {
  
  const io = new Server(SocketPORT, {
    cors: { 
      origin: [`http://localhost:${PORT}`, ...addresses],
      credentials: true
    }
});
  console.log("\x1b[32m✔\x1b[0m websocket connection established")
  console.log()
  addresses.forEach((address) => {
    console.log('  \x1b[37m  > Websocket: \x1b[0m  \x1b[36m' + address + '\x1b[0m');
  });
  console.log()

  io.engine.on("connection_error", (err) => { 
    console.log(`\x1b[41m ERROR \x1b[0m socket.io connection Error:`, err); 
  })

  io.on('connection', (socket) => {
    ////console.log(`\x1b[42m √ \x1b[0m Client connected: ${socket.id}`); 
  })

  io.on('connect', (socket) => {

    socket.on("error", (msg) => { 
      console.log(`\x1b[41m ERROR \x1b[0m Error:`, msg); 
    })

    socket.on('event', async (event) => { 
      socket.broadcast.emit('event', event )

      webPush.setVapidDetails(
        'mailto:voorbeeld@email.com',
        config.public.WorkerKey,
        config.PrivateWorkerKey
      );

      const pushSubscription = await Subscription.find()

      pushSubscription.forEach(subscription => {
          webPush.sendNotification(subscription, JSON.stringify({
            title: `${event.author.userName} ${event.content.title}`,
            body: `${event.guild.guildName}`,
            data: `/${event.metadata.metaId}`
          }))
      })
    })

    socket.on('guild', async (event) => {
      socket.broadcast.emit('guild', event )
    })

    socket.on('SessionExpires', async (event) => {
      socket.broadcast.emit(event, event )
    })

    socket.on('join-room', (RoomID) => { 
      socket.join(RoomID);
    })

    socket.on('disconnecting', () => {
      ////console.log(`\x1b[44m i \x1b[0m Client disconnected: ${socket.id}`);
    }) 
  });

  
  
})