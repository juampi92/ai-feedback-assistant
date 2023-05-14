import { writable } from "svelte/store";
import axios from "axios";

import helperQuestionsPrompt from "../prompts/helper-questions";

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

type FeedbackType = {
    feedback: string;
};

export async function getFeedback({
    feedback,
}: FeedbackType) {

    // const response = await axios.post(
    //   "https://api.openai.com/v1/engines/davinci-codex/completions",
    //   {
    //     prompt: feedback,
    //     max_tokens: 100,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${openAIKeyValue}`,
    //     },
    //   }
    // );

    await sleep(2);

    const response = {
        data: {
            choices: [
                {
                    text: "This is a test",
                },
            ],
        },
    };

    return response.data.choices[0].text;
}

type HelperQuestionsType = {
    yourRole: string;
    theirRole: string;
    background: string | null;
};

export async function getHelperQuestions({ yourRole, theirRole, background }: HelperQuestionsType): Promise<string> {

    const prompt = helperQuestionsPrompt({ yourRole, theirRole, background });

    console.log(`[Debug] Key: ${openAIKeyValue}`);

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
