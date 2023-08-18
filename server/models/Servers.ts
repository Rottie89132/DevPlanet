import { defineMongooseModel } from "#nuxt/mongoose";

export const Servers = defineMongooseModel({
    name: 'Servers',
    schema: {
        GuildID:   {type:  String,  required:  true,  unique:  true  },
        GuildName: {type:  String,  required:  true,  unique:  false },
        
    },
})

