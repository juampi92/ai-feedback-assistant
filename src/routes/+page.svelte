<script>
    import { derived, writable } from "svelte/store";

    import copy from "../utils/copy";
    import feedbackPrompt from "../prompts/feedback";

    import {
        openAIKey,
        getFeedback,
        getHelperQuestions,
    } from "../utils/openai";
    import Section from "../components/Section.svelte";
    import seeder from "../utils/seed";

    let feedback = "";

    // Background Section
    let yourRole = "";
    let theirRole = "";
    let background = "";

    // Structure Section
    let selectedFramework = "Auto";
    let selectedStructure = "Third Person Message";
    let customStructure = "";
    let selectedTone = "Casual";

    // HelperQuestions
    let helperQuestions = "";
    let helperQuestionsLoading = false;

    async function fetchHelperQuestions() {
        if (helperQuestionsLoading) {
            return;
        }

        if (!yourRole || !theirRole) {
            alert(
                "In order to generate the helper questions, please provide your role and their role in the Background section."
            );
            return;
        }

        helperQuestionsLoading = true;

        try {
            helperQuestions = await getHelperQuestions({
                yourRole,
                theirRole,
                background,
            });
        } catch (error) {
            alert(error.message);
        } finally {
            helperQuestionsLoading = false;
        }
    }

    let isLoading = writable(false);
    let results = writable("");

    let showKeyInput = writable(true);
    let keyLabelClass = derived(openAIKey, ($openAIKey) =>
        $openAIKey.length ? "text-green-500" : ""
    );

    async function handleSubmit() {
        isLoading.set(true);

        try {
            const response = await getFeedback({
                yourRole,
                theirRole,
                feedback,
                background,
                selectedFramework,
                selectedStructure,
                customStructure,
                selectedTone,
            });
            results.set(response);
        } catch (error) {
            alert(error.message);
        } finally {
            isLoading.set(false);
        }
    }

    let isCopied = false;
    function copyToClipboard() {
        const prompt = feedbackPrompt({
            yourRole,
            theirRole,
            feedback,
            background,
            selectedFramework,
            selectedStructure,
            customStructure,
            selectedTone,
        });

        isCopied = true;
        copy(prompt);

        setTimeout(() => {
            isCopied = false;
        }, 2000);
    }

    function clear() {
        yourRole = "";
        theirRole = "";
        background = "";
        feedback = "";
        selectedFramework = "Auto";
        selectedStructure = "Third Person Message";
        customStructure = "";
        selectedTone = "Casual";
    }

    function seed() {
        const newSeed = seeder();

        yourRole = newSeed.yourRole;
        theirRole = newSeed.theirRole;
        background = newSeed.background;
        feedback = newSeed.feedback;
        selectedFramework = newSeed.selectedFramework;
        selectedStructure = newSeed.selectedStructure;
        customStructure = newSeed.customStructure;
        selectedTone = newSeed.selectedTone;
    }
</script>

<div class="py-16 white">
    <div class="container m-auto px-4 md:px-12 text-gray-600">
        <header class="flex justify-between p-0 text-center">
            <h1 class="mb-12 text-gray-900 font-bold text-4xl">
                AI Feedback Assistant
            </h1>
            <a
                href="https://github.com/juampi92/ai-feedback-assistant"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg
                    class="fill-current text-gray-500 hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6 .113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.08-.729.08-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495 1 .108-.775.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.095.81 2.22 0 1.605-.015 2.905-.015 3.3 0 .32 .21 .695 .825 .575C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    />
                </svg>
            </a>
        </header>

        <main class="grid gap-8">
            <Section title="Configuration">
                <label
                    class="justify-between cursor-pointer"
                    on:click={() => ($showKeyInput = true)}
                >
                    <span class="flex items-center {$keyLabelClass}">
                        <svg
                            class="w-5 h-5 transform transition-transform duration-200 {$showKeyInput
                                ? 'rotate-0'
                                : '-rotate-90'}"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                        <span>Open AI Key</span>
                    </span>
                    {#if $showKeyInput}
                        <input
                            type="password"
                            bind:value={$openAIKey}
                            class="block w-full p-2 border border-gray-300 rounded mt-2"
                            on:blur={() => ($showKeyInput = !$openAIKey.length)}
                        />
                    {/if}
                </label>
            </Section>

            <div>
                <button
                    class="bg-transparent px-3 py-1 border border-gray-500 text-gray-500 rounded-none float-right ml-5"
                    on:click|preventDefault={clear}>Clear</button
                >
                <button
                    class="bg-transparent px-3 py-1 border border-purple-500 text-purple-500 rounded-none float-right"
                    on:click|preventDefault={seed}>Seed fake data</button
                >
            </div>

            <Section
                title="Background / Motive <small class='text-gray-400'>(optional)</small>"
                subtitle="In this section, you can specify more information about your colleague, and what do they expect from your feedback."
                styles={$openAIKey ? "" : "opacity-80"}
            >
                <div class="flex mt-4">
                    <input
                        type="text"
                        bind:value={yourRole}
                        placeholder="Your role"
                        class="block w-1/2 p-2 border border-gray-300 rounded mr-2"
                    />
                    <input
                        type="text"
                        bind:value={theirRole}
                        placeholder="Their role"
                        class="block w-1/2 p-2 border border-gray-300 rounded ml-2"
                    />
                </div>
                <div>
                    <p class="text-gray-500 text-sm mb-3">
                        Use this space to specificy the feedback your colleague
                        wants from you. This space will guide the feedback
                        generation, but it's not mandatory.
                        <br />If empty, the feedback will be about the entire
                        person.
                    </p>
                    <textarea
                        bind:value={background}
                        class="h-20 block w-full p-2 border border-gray-300 rounded"
                        placeholder="Example: I want to improve my communication skills."
                    />
                </div>
            </Section>

            <Section
                title="Structure"
                subtitle=""
                styles={$openAIKey ? "" : "opacity-80"}
            >
                <label class="block mb-2">
                    Would you like to use a specific feedback Model or
                    Framework?
                    <select
                        class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        bind:value={selectedFramework}
                    >
                        <option value="Auto">Auto - Let GPT decide</option>
                        <option value="SBI"
                            >SBI - Situation / Behavior / Impact</option
                        >
                        <option value="BIO"
                            >BIO - Behavior / Impact / Outcome</option
                        >
                    </select>
                </label>

                <hr />

                <label class="block mb-2">
                    Would you like to structure your feedback in a certain way?
                    <select
                        class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        bind:value={selectedStructure}
                    >
                        <option value="Third Person Message"
                            >Third person message</option
                        >
                        <option value="Message">Message</option>
                        <option value="Email">Email</option>
                        <option value="Custom">Custom</option>
                    </select>
                </label>

                {#if selectedStructure === "Custom"}
                    <textarea
                        class="mt-2 block w-full border border-gray-300 rounded-md p-2"
                        bind:value={customStructure}
                        placeholder=""
                    />
                {/if}

                <hr />

                <label class="block mb-2">
                    Pick the tone of your feedback:
                    <select
                        class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        bind:value={selectedTone}
                    >
                        <option value="Casual">Casual</option>
                        <option value="Informal">Informal</option>
                        <option value="Formal">Formal</option>
                    </select>
                </label>
            </Section>

            <Section
                title="Your Feedback / Brain Dump"
                subtitle="This is where you share your thoughts about your colleague. Your feedback doesn't have to be structured, just write what comes to your mind.<br>GPT will take care of the rest."
                styles={$openAIKey ? "" : "opacity-80"}
            >
                <a
                    href="#"
                    on:click|preventDefault={fetchHelperQuestions}
                    disabled={!$openAIKey || helperQuestionsLoading}
                    class="text-right text-blue-500 underline mt-2 {!$openAIKey ||
                    helperQuestionsLoading
                        ? 'opacity-50 pointer-events-none'
                        : ''}"
                >
                    {#if !helperQuestionsLoading}
                        Feel stuck? Get some helper questions!
                    {:else}
                        Generating...
                    {/if}
                </a>

                {#if helperQuestions.length}
                    <div>
                        <h2>Helper Questions</h2>
                        <p class="text-gray-500 text-sm mb-3">
                            Answer these questions in a non-organized way to get
                            your thoughts out of your head.
                        </p>

                        <p class="mx-4 text-sm font-mono whitespace-pre-line">
                            {helperQuestions}
                        </p>

                        <p class="text-gray-500 text-sm mb-3">
                            <b>Important:</b> the questions won't be sent to GPT,
                            so you shouldn't reference. Instead, include the question
                            in the answer.
                        </p>
                    </div>
                {/if}

                <textarea
                    bind:value={feedback}
                    class="h-40 block w-full p-2 border border-gray-300 rounded"
                    placeholder="Start writing your feedback here..."
                />
            </Section>

            <Section
                title=""
                styles={!$openAIKey || feedback.length < 10 || $isLoading
                    ? "opacity-50"
                    : ""}
            >
                <div class="flex">
                    <button
                        class="
                            flex items-center justify-center px-4 py-2 bg-gray-200 rounded-l
                        "
                        on:click={copyToClipboard}
                        title="Copy full prompt to clipboard"
                    >
                        <svg
                            class="h-4 w-4 fill-black transition-colors duration-200"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            class:fill-green-800={isCopied}
                            class:duration-500={!isCopied}
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4 2a2 2 0 00-2 2v9a2 2 0 002 2h2v2a2 2 0 002 2h9a2 2 0 002-2V8a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H4zm9 4V4H4v9h2V8a2 2 0 012-2h5zM8 8h9v9H8V8z"
                            />
                        </svg>
                    </button>
                    <button
                        disabled={!$openAIKey ||
                            feedback.length < 10 ||
                            $isLoading}
                        on:click={handleSubmit}
                        class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-r"
                    >
                        {#if $isLoading}
                            Generating...
                        {:else}
                            Generate Feedback using GPT
                        {/if}
                    </button>
                </div>

                {#if $results}
                    <p class="whitespace-pre-line">{$results}</p>
                {/if}
            </Section>
        </main>
    </div>
</div>
