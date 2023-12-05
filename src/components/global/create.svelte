<script lang="ts">
import { appwriteDatabases } from "../../lib/backend";
import { DB_ID, COLLECTION } from "../../lib/ids"
import { ID,Query } from "appwrite";

export let AuthorName = "";
export let AuthorUid = "";
export let unitID = ""

let SearchAuid = AuthorUid;

let collectionId = "";

let DocumentName = "";



function createDocument() {
   appwriteDatabases.createDocument(DB_ID, COLLECTION.CCNote, ID.unique(), {
     AuthorName,
     AuthorUid,
     Name: DocumentName,
     LastUpdated: new Date().toISOString(),
     Unit: unitID
   }).then(res => location.href = `./doc/${res.$id}`)
}
</script>
<div class="flex flex-wrap gap-2">
<button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
    const modal = document.getElementById('my_modal_1');
    if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
        modal.showModal();
    }
}}>Create</button>

<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box bg-gray-200 flex flex-col gap-4">
    <h3 class="font-bold text-2xl text-gray-900 text-center">Create Note</h3>
    <label for="name" class="text-gray-800">Lesson Name</label>
    <select>
      
    </select>
    <label for="name" class="text-gray-800">Description</label>
    <textarea id="name" bind:value={DocumentName} class="input input-bordered bg-gray-400 h-28" placeholder="Name" />
    <button class="btn btn-primary" on:click={() => {
        createDocument();
        const modal = document.getElementById('my_modal_1');
        if (modal instanceof HTMLDialogElement && typeof modal.close === 'function') {
            modal.close();
        }
    }}>Create</button>
    <div class="modal-action">
      <button class="btn btn-error">Cancel</button>
    </div>
  </form>
</dialog>
</div>