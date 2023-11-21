import bcrypt from "bcrypt"
export default defineEventHandler(async (event) => {
    const authorized: any = await $fetch("/api/users", { method: "POST", body: { Session: getCookie(event, 'token') } })
    if (authorized.Status == 200) {
        
        const { email, oldPassword, newPassword } = await readBody(event)
        if (!email || !oldPassword || !newPassword) return { status: 400, statusMessage: "Bad Request", message: "The client's request is invalid and cannot be processed" }

        const user: Record<string, any> | any = await User.findOne({ Email: email })
        if (user == null) return { Status: 404, message: "The requested resource could not be found" }
        
        user.ComparePasswords = async function (EnteredPassword: string) {
            return bcrypt.compare(EnteredPassword, this.Password)
        }

        if (await user.ComparePasswords(oldPassword)){
            const Encrypted = bcrypt.hashSync(newPassword, 5)
            const data = await User.findOneAndUpdate({ Email: email }, { $set: { Password: Encrypted } })
            return { status: 200, message: "The requested resource was authorized", data }
        } return { Status: 404, message: "The requested resource could not be found" }
    }
    return { Status: 401, message: "Access to the requested resource is unauthorized" }
})
