export type FeedbackType = {
    yourRole: string;
    theirRole: string;
    background: string | null;
    selectedFramework: 'Auto' | 'SBI' | 'BIO';
    selectedStructure: 'Third Person Message' | 'Message' | 'Email' | 'Custom';
    customStructure: string;
    selectedTone: 'Casual' | 'Informal' | 'Formal';
    feedback: string;
};