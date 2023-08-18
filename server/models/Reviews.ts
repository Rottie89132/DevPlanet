import { defineMongooseModel } from "#nuxt/mongoose";

export const Reviews = defineMongooseModel({
    name: 'Reviews',
    schema: {
        User:      { type:  String },
        Nickname:  { type:  String },
        Data:      { type:  Array  },
    },
})


