import { action } from "./_generated/server";
import { v } from "convex/values";

import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";
const apiKey = process.env.OPENAI_API_KEY!

const openai = new OpenAI({
    apiKey: apiKey,
})

export const generateAudioAction = action({
    args: { input: v.string(), voice: v.string() },
    handler: async (_, { voice, input }) => {
        // do something with `args.a` and `args.b`
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voice as SpeechCreateParams['voice'],
            input: input,
        });
        const buffer = await mp3.arrayBuffer();

        // optionally return a value
        return buffer;
    },
});