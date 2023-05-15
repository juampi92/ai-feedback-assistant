import type { FeedbackType } from '../types';

type StructureMapType = {
    [key in FeedbackType['selectedStructure']]: string | null;
};

const structureMap: StructureMapType = {
    'Third Person Message': 'using the Third Person, and keep it as a message. Don\'t address the colleague',
    'Message': 'using the Second Person, and keep it as a message',
    'Email': 'as an email',
    'Custom': null,
};

function getFormat(selectedStructure: string, customStructure: string | null): string {
    const format = structureMap[selectedStructure]
        || `using the following structure: "${customStructure}"`;

    return ` Format the text ${format}".`;
}

export default function (params: FeedbackType): string {
    const background: string = params.background ? `
Also consider they are requesting the following: "${params.background}".
` : '';
    const framework: string = (params.selectedFramework !== 'Auto') ? `
The feedback should be structured using the ${params.selectedFramework} framework as much as possible.` : '';

    const format: string = getFormat(params.selectedStructure, params.customStructure);

    return `You are a feedback specialist, and you are going to help me write feedback for my colleagues based on my informal notes.

As a ${params.yourRole}, I am providing feedback to my colleague who is: ${params.theirRole}.

I will now describe my colleague and you would make a concise feedback that is useful.
The feedback should be ${params.selectedTone}. 
Format the text using ${format}.
${background}${framework}
My notes:

\`\`\`
${params.feedback}
\`\`\`

Formatted feedback:
`;
}