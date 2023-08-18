const UserData = new Map();
const UserSessions = new Map();

import bcrypt from "bcrypt"
export default defineEventHandler(async (event)=> {

    const validateInput = await readBody(event)
    if(!validateInput) return false

    const { email, password } = await readBody(event)
    if(!password) return false
    
    const user = await User.findOne({ Email: email })
    if(user == null) return false
    
    user.comparePasswords = async function(EnteredPassword: string) {
        return bcrypt.compare(EnteredPassword, this.Password)
    }

    UserData.set(user.Email, { 
        ID: user._id, Username: user.Username.toLowerCase(),
        Email: user.Email, Role: user.Role
    })

    if (UserData.get(email) && (await user.comparePasswords(password))) {
        
        const SessionId = crypto.randomUUID()
        UserSessions.set(user._id, { Token: SessionId})

        await $fetch(`/api/users`, {
            method: "POST", 
            body: { Session: SessionId, UserData: UserData.get(email) }
        })

        setCookie(event, "token", SessionId, {
            httpOnly: false, secure: false, sameSite: true, maxAge: 121 * 60 * 1000
        }); return true
        
    }
    return false

})


