
type HelperQuestionsType = {
    yourRole: string;
    theirRole: string;
    background: string|null;
};

export default function (params: HelperQuestionsType): string {
    const background = params.background ? `. Also consider they are requesting the following: "${params.background}"` : '';

    return `As a ${params.yourRole}, I am providing feedback to my colleague who is a ${params.theirRole}${background}. Please, ask me 10 guiding questions about my colleague that will help me provide constructive and useful feedback. Keep them concise.
For example: How effectively does your colleague does X?
`;
}