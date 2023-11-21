import bcrypt from "bcrypt"
export default defineEventHandler(async (event) => {
    const authorized: any = await $fetch("/api/users", { method: "POST", body: { Session: getCookie(event, 'token') } })
    if (authorized.Status == 200) {
        if (authorized.response.Role == 'Admin') {
            const { username, email, password, role } = await readBody(event)

            if (!username || !email || !password || !role) return { status: 400, statusMessage: "Bad Request", message: "The client's request is invalid and cannot be processed" }
            const Encrypted = bcrypt.hashSync(password, 5)

            await User.create({Username: username, Email: email, Password: Encrypted, role: role})
            return { status: 200, message: "The requested resource was authorized" }
        }
    }
    return { status: 401, message: "Access to the requested resource is unauthorized" }
})

