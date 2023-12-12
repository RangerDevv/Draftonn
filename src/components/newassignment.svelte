<script lang="ts">
    import { each } from "svelte/internal";
    import { appwriteDatabases, appwriteStorage } from "../lib/backend";
    import { ID } from "appwrite";
    import { COLLECTION, DB_ID } from "../lib/ids";
    
    export let user: string;
    export let classId: string;

    interface Question {
        question: string
        answer: string
        is_file: boolean
        files?: FileList
    }

    let assignmentname = ""
    let questions: Question[] = []

    let hover = -1

    $: disabled = !(assignmentname != ""
        && questions.length > 0 
        && questions.every(x => x.question.trim() != "" && x.answer.trim() != ""))

    const addFree = () => questions = [...questions, {question: "", answer: "", is_file: false}]
    const addFile = () => questions = [...questions, {question: "", answer: "", is_file: true}]

    async function uploadFiles() {
        for(let question of questions) {
            if(question.is_file) {
                const file = question.files!.item(0)!
                appwriteStorage.createFile('64ada07bbca91d21cdbc', question.answer, file)
            }
        } 
    }

    // async function addQuestions(assignmentId: number) {
    //     await Promise.all(questions.map((question, idx) => {
    //         return supabase.from("Question").insert({
    //             number: idx + 1,
    //             text: question.question,
    //             answer: question.answer,
    //             is_file: question.is_file,
    //             assignment_id: assignmentId
    //         })
    //     }))
    // }

    function submit() {
        disabled = true
        uploadFiles()
        .then(() => {
            return appwriteDatabases.createDocument(DB_ID, COLLECTION.Assignment, ID.unique(), {
                Name: assignmentname,
                User: user,
                Class: classId,
                Questions: JSON.stringify(questions.map(({ question, answer, is_file}) => ({question, answer, is_file})))
            })
        })
        .then(doc => document.location.href = `./assignment/${doc.$id}`)
        .catch(e => {
            disabled = false
            alert(e.message)
        })
    }
</script>
<div class=" w-screen h-screen">
<h1 class="text-center text-5xl pt-16">Make a New Assignment</h1>
<div class="flex flex-col gap-y-5 items-center mt-10">
    <input type="text" bind:value={assignmentname} placeholder="Assignment Name" class="input input-bordered input-primary w-full max-w-lg" />
    <h1 class="text-4xl my-5">Questions</h1>
    <div class="flex flex-col gap-y-10">
        {#each questions as question, idx}
            <div class="flex flex-row gap-x-3 w-full items-center justify-center" on:mouseenter={() => hover = idx} on:mouseleave={() => hover = -1}>
                {#if hover == idx}
                    <button class="btn btn-error btn-sm btn-square btn-outline" on:click={() => {questions.splice(idx, 1); questions = questions}}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                {:else}
                    <h1 class="text-2xl w-8">
                        {idx + 1}.
                    </h1>  
                {/if}
 
                <div class="flex flex-col gap-y-2 w-96 sm:w-[32rem]">
                    <input type="text" bind:value={question.question} placeholder="Question Text" class="input input-bordered input-primary w-96 sm:w-full sm:max-w-lg" />
                    {#if question.is_file}
                        <!-- <input bind:files={question.files} on:change={() => question.answer = Date.now().toString()} accept="image/png, image/jpeg" type="file" class="btn bg-base-content w-96 h-96 sm:w-full sm:max-w-lg" /> -->
                        <div class="flex w-full pt-10 items-center justify-center bg-grey-lighter">
                            <label class="w-64 flex flex-col items-center px-4 py-6 bg-gray-500 hover:bg-gray-600 scale-125 rounded-lg shadow-lg tracking-wide uppercase">
                                <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span class="mt-2 text-base leading-normal">Select a file</span>
                                <input bind:files={question.files} on:change={() => question.answer = Date.now().toString()} accept="image/png, image/jpeg" type='file' class="hidden" />
                            </label>
                        </div>
                        <!-- Preview the image -->
                        {#if question.files}
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <!-- get the image that was uploaded -->
                            {#each question.files as file}
                                <img src={URL.createObjectURL(file)} class="w-96 h-96 sm:w-full sm:max-w-lg" />
                            {/each}
                        {/if}
                    {:else}
                        <textarea bind:value={question.answer} class="textarea textarea-primary w-full sm:max-w-lg h-32" placeholder="Question Answer"></textarea>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <div class="dropdown dropdown-hover">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <label tabindex="0"  class="btn btn-primary mt-5">+ New Question</label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li><a on:click={addFree}>Multiple Choice/Free Response</a></li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li><a on:click={addFile}>File Upload</a></li>
        </ul>
    </div>
    <button on:click={submit} class="btn btn-info" class:btn-disabled={disabled}>Create Assignment</button>
</div>
</div>