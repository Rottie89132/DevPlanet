import { defineMongooseModel } from "#nuxt/mongoose";

export const Audit = defineMongooseModel({
    name: 'audits',
    schema: {
        createdAt:  { type:       Date,    expires:     86400,   default:        new Date()              }, 
        metadata:   { metaId:     String,  metaStatus:  String, metaTime:       String                  }, 
        author:     { userName:   String,  userId:      String, userAvatarUrl:  String                  },
        guild:      { guildName:  String,  guildId:     String, guildIconUrl:   String                  },
        content:    { title:      String,  subject:     String, favorability:   String, updated: Object },
        timeseries: { 
            timeField:  { field: 'createdAt', type: 'date' },
            metaField:  { field: 'metadata', type: 'object' }
        }
        }
})