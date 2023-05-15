import { writable } from "svelte/store";
import axios from "axios";

import type { FeedbackType } from "../types";
import helperQuestionsPrompt from "../prompts/helper-questions";
import feedbackPrompt from "../prompts/feedback";

export const openAIKey = writable("");
let openAIKeyValue: string;

openAIKey.subscribe(value => {
    openAIKeyValue = value;
});

// Test async function to sleep x seconds
async function sleep(seconds: number) {
    return new Promise((resolve) =>
        setTimeout(resolve, seconds * 1000)
    );
}

export async function getFeedback(params: FeedbackType): Promise<void> {

    const prompt = feedbackPrompt(params);

    const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 512,
            temperature: 0.6,
            top_p: 1,
        },
        {
            headers: {
                Authorization: `Bearer ${openAIKeyValue}`,
            },
        }
    );

    console.log(`[Debug]
Prompt: ${prompt},
Response: ${response.data.choices[0].text}`);

    return response.data.choices[0].text;
}

type HelperQuestionsType = {
    yourRole: string;
    theirRole: string;
    background: string | null;
};

export async function getHelperQuestions({ yourRole, theirRole, background }: HelperQuestionsType): Promise<string> {

    const prompt = helperQuestionsPrompt({ yourRole, theirRole, background });

    const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 256,
            temperature: 0.6,
            top_p: 1,
        },
        {
            headers: {
                Authorization: `Bearer ${openAIKeyValue}`,
            },
        }
    );

    console.log(`[Debug]
Prompt: ${prompt},
Response: ${response.data.choices[0].text}`);

    return response.data.choices[0].text;
}
