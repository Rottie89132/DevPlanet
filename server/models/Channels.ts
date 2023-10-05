
import { defineMongooseModel } from "#nuxt/mongoose";

export const Channels = defineMongooseModel({
    name: 'Guild',
    schema: {
        GuildId:        { type: String },
        GuildName:      { type: String },
        ReviewChannel:  { type: String },
        LogChannel:     { type: String },
    }
})



