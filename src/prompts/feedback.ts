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
    const background: string | null = params.background ? ` Also consider they are requesting the following: "${params.background}".` : null;
    const framework: string | null = (params.selectedFramework !== 'Auto') ? ` The feedback should be structured using the ${params.selectedFramework} framework as much as possible.` : null;
    const tone: string | null = params.selectedTone ? ` The feedback should be ${params.selectedTone}.` : null;

    const format: string | null = getFormat(params.selectedStructure, params.customStructure);

    return [
        `As a ${params.yourRole}, I am providing feedback to my colleague who is a ${params.theirRole}.`,
        `Given the following raw feedback about my colleague: "${params.feedback}", structure a feedback that is constructive and useful.`,
        background,
        framework,
        tone,
        format,
    ].filter(Boolean).join(' ');
}