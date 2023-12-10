<script lang='ts'>
	import { Query,ID } from "appwrite";
	import { DB_ID,COLLECTION } from "../../lib/ids";

	import { appwriteDatabases } from '../../lib/backend';
	
    export let Name = "";
    let currDate = new Date();
	let FeedbackText = "";

	function CreateFeedback() {
		appwriteDatabases.createDocument(
			DB_ID,
			COLLECTION.Feedback,
			ID.unique(),
			{
				User: Name,
				Feedback: FeedbackText,
				Date: currDate.toISOString(),
			}
		)
	}
</script>

<dialog id="Feedback" class="modal">
    <div class="modal-box bg-gray-300 text-black h-96 gap-5">
        <p class="text-2xl font-semibold">Feedback</p>
        <p class="text-lg">Please give us feedback on how we can improve!</p>
        <textarea id="feedback" class=" outline outline-1 bg-transparent w-full h-32 rounded-md mt-6 p-2 text-base" bind:value={FeedbackText}></textarea>
        <div class="modal-action">
        <form method="dialog">
            <button class="btn btn-error">Close</button>
            <button class="btn btn-primary" on:click={CreateFeedback}>Submit</button>
        </form>
        </div>
    </div>
</dialog>