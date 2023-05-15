import type { FeedbackType } from '../types';

const seeds = {
    yourRole: [
        "Software Engineer", "Product Manager", "Project Manager", "Quality Assurance Engineer", "UX/UI Designer", "Front-end Developer", "Back-end Developer", "Full Stack Developer", "Data Scientist", "DevOps Engineer", "Scrum Master", "Business Analyst", "Technical Writer", "Database Administrator", "Support Engineer"
    ],
    theirRole: [
        "Software Engineer", "Product Manager", "Project Manager", "Quality Assurance Engineer", "UX/UI Designer", "Front-end Developer", "Back-end Developer", "Full Stack Developer", "Data Scientist", "DevOps Engineer", "Scrum Master", "Business Analyst", "Technical Writer", "Database Administrator", "Support Engineer"
    ],
    background: [
        "Can you provide feedback on my presentation delivery?",
        "I'd like feedback on my problem-solving approach.",
        "Could you give me feedback on my teamwork and collaboration?",
        "I want to improve my time management. Any feedback?",
        "Can you provide feedback on my coding style and best practices?",
        "I'd like feedback on my written communication skills.",
        "Could you give me feedback on my client interactions?",
        "I want to improve my leadership skills. Any feedback?",
        "Can you provide feedback on my attention to detail?",
        "I'd like feedback on my ability to handle feedback and criticism.",
    ],
    selectedFramework: ['Auto', 'SBI', 'BIO'],
    selectedStructure: ['Third Person Message','Message','Email','Custom'],
    customStructure: [
        `Start: Highlight the behaviors or actions that the person should start doing because they have a positive impact.
Stop: Point out the behaviors or actions that the person should stop doing because they have a negative impact.
Continue: Identify the behaviors or actions that the person is currently doing well and should continue doing.`,
        'Strengths-Opportunities-Aspirations (SOA) Model',
        `1. Things that went well
2. Things that need improvements`
    ],
    selectedTone: ['Casual', 'Informal', 'Formal'],
    feedback: [
        `Good things:
The individual demonstrated excellent problem-solving skills during the project and successfully resolved complex technical issues.
They showed great initiative by proactively taking on additional tasks and supporting team members when needed.
Area for improvement:
It would be beneficial for the individual to work on their time management skills as they often struggled to meet project deadlines. Setting realistic timelines and prioritizing tasks could help them become more efficient and organized.
Internal Note:
Overall, the individual's technical expertise and proactive approach have been valuable to the team. However, improving time management skills would contribute to smoother project execution and timely deliverables.`,
        `Good things:
        They delivered great code and following best practices, ensuring stability and maintainability.
        They collaborated with team members very effectively, actively participating in PRs and providing useful feedback to make the overall quality of the project better.
    Area for improvement:
        Could improve their written communication skills. Sometimes their code documentation lacked clarity and explanations. It was challenging for others to understand and maintain.
    Internal Note:
    The individual's technical competence and collaborative nature greatly contributed to the success of the project. By sharpening their written communication skills, they can further enhance the team's productivity and collaboration.`,
        `- They demonstrated exceptional attention to detail by meticulously identifying and fixing numerous bugs in the software, leading to improved reliability and user experience.
- They exhibited strong analytical skills in analyzing complex data sets and deriving meaningful insights, providing valuable input for decision-making processes.
- It would be beneficial for the individual to work on their presentation skills as their explanations during team meetings were often too technical and lacked clarity, making it difficult for non-technical stakeholders to grasp the key points.
- The individual's meticulous approach to bug fixing and analytical prowess have greatly contributed to the project's success. Enhancing their presentation skills would allow them to effectively communicate their findings to a broader audience, fostering better understanding and engagement.`,
        `- The individual consistently demonstrated a positive and collaborative attitude, fostering a supportive team environment and strengthening team morale.
- They actively sought feedback from team members, displaying a growth mindset and a willingness to continuously improve their skills.
- The individual should work on balancing their workload more effectively as they occasionally took on too many tasks, leading to periods of high stress and potential burnout. Prioritizing and delegating tasks when necessary would contribute to a healthier work-life balance.
- The individual's positive demeanor and openness to feedback have had a positive impact on team dynamics. By improving workload management, they can sustain their enthusiasm and productivity while maintaining a healthy work-life balance.`,
        `Good things: - The individual demonstrated strong leadership skills by effectively coordinating the team's efforts and ensuring everyone had a clear understanding of their roles and responsibilities.
- They consistently contributed creative ideas and innovative solutions during brainstorming sessions, fostering a culture of innovation within the team.
Improvement: They could benefit from improving their active listening skills during team discussions. At times, they appeared to be more focused on expressing their ideas rather than truly understanding and valuing the perspectives of others.
Internal Note: The individual's leadership capabilities and creative contributions have been instrumental to the team's success. By refining their active listening skills, they can foster a more inclusive and collaborative environment, harnessing the collective intelligence of the team.`,
    ],
};

function arrayRandom<T>(array: Array<T>): T {
    return array[Math.floor(Math.random() * array.length)];
}

export default function (): FeedbackType {
    const structure = arrayRandom(seeds.selectedStructure); 

    return {
        yourRole: arrayRandom(seeds.yourRole),
        theirRole: arrayRandom(seeds.theirRole),
        background: arrayRandom(seeds.background),
        selectedFramework: arrayRandom(seeds.selectedFramework), 
        selectedStructure: structure,
        customStructure: (structure === 'Custom') ? arrayRandom(seeds.customStructure) : '',   
        selectedTone: arrayRandom(seeds.selectedTone),    
        feedback: arrayRandom(seeds.feedback),    
    };
};