
import { defineMongooseModel } from "#nuxt/mongoose";

export const ClientServers = defineMongooseModel({
    name: 'Client',
    schema: {
        UserID: { type: String },
        GuildId: { type: String },
        GuildName: { type: String },
    }
})

