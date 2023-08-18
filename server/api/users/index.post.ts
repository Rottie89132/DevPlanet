const UserSessions = new Map();
const config = useRuntimeConfig()
import io from 'socket.io-client';
import webPush from 'web-push';
const socket = io('http://localhost:3500');

export default defineEventHandler(async (event) => {

    const {Session, UserData, ClearSession} = await readBody(event);

    if(UserData && Session) {
        const UserId = UserData.ID;
        const UserExist = await User.findById(UserId);
        const ValidId = UserId.length == 24;

        if(ValidId && UserExist){ 
            UserSessions.set(Session, UserData) 
            setTimeout( async () => {
                if(UserSessions.get(Session)){

                    webPush.setVapidDetails(
                        'mailto:voorbeeld@email.com',
                        config.public.WorkerKey,
                        config.PrivateWorkerKey
                    );

                    const pushSubscription = await Subscription.findOne({ UserID: UserSessions.get(Session).ID })
                    
                    if(pushSubscription) {
                        const platform = pushSubscription.Platform
                        const payload = { 
                            title: 'Session Expired', 
                            platform: platform, 
                            body: `Your ${platform.toLowerCase()} session has timed out!`
                        }
                        webPush.sendNotification(pushSubscription, JSON.stringify(payload))
                    }

                    UserSessions.delete(Session);
                    socket.emit('SessionExpires', Session)
                }
            }, 120 * 60 * 1000); 
        }
    } 

    if(UserSessions.get(ClearSession)) {
        UserSessions.delete(ClearSession);
        return { Status: 200, message: "The requested resource was deleted" } 
    }

    if(UserSessions.get(Session)){
        const UserId = UserSessions.get(Session).ID;
        const UserExist = await User.findById(UserId);
        const ValidId = UserId.length == 24;

        if(ValidId && UserExist) return { Status: 200, message: "The requested resource was authorized", response: UserSessions.get(Session) }
        return { Status: 404, message: "The requested resource could not be found" } 
    } 
    return { Status: 401, message: "Access to the requested resource is unauthorized" } 
})