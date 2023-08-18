import { defineMongooseModel } from "#nuxt/mongoose";

export const Subscription = defineMongooseModel({
    name: 'subscriptions',
    schema: {
        UserID:     { type: String },
        Platform:   { type: String },
        endpoint:   { type: String },
        keys:       { type: Object }
    }
})