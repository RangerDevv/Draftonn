<script lang="ts">
import { appwriteDatabases } from "../../lib/backend";
import { DB_ID, COLLECTION } from "../../lib/ids"
import { ID, type Models, Query } from "appwrite";

export let AuthorName = "";
export let AuthorUid = "";
export let unitID = ""

let SearchAuid = AuthorUid;

let collectionId = "";

let DocumentDesc = "";

let lessons: string[] = []

let lessonName = ""

appwriteDatabases.listDocuments(DB_ID, COLLECTION.CCNote, [
  Query.equal("Unit", unitID),
  Query.orderAsc("Name")
]).then(res => lessons=res.documents.map(x => x.Name))



function createDocument() {
   appwriteDatabases.createDocument(DB_ID, COLLECTION.CCNote, ID.unique(), {
     AuthorName,
     AuthorUid,
     Name: lessonName,
     Description: DocumentDesc,
     LastUpdated: new Date().toISOString(),
     Unit: unitID
   }).then(res => location.href = `./doc/${res.$id}`)
}

function chooseLesson() {
  if(lessonName == "newlesson") {
    lessonName = ""
    let newName = prompt("Enter lesson name:")
    if(newName && !lessons.map(x => x.toLowerCase()).includes(newName.toLowerCase())) {
      lessons = [...lessons, newName]
      lessonName = newName
    } else {
      alert("Invalid lesson name.")
    }
  }
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
    <!--TODO: New lesson-->
    <select class="select select-bordered bg-gray-400" bind:value={lessonName} on:change={chooseLesson}>
      <option value="">Select Lesson...</option>
      <option value="newlesson">Create New Lesson</option>
      {#each lessons as lesson}
        <option value={lesson}>{lesson}</option>
      {/each}
    </select>
    <label for="description" class="text-gray-800">Notes Title</label>
    <input id="description" bind:value={DocumentDesc} class="input input-bordered bg-gray-400" placeholder="Description" />
    <button class="btn btn-primary" disabled={!(lessonName && DocumentDesc)} on:click={() => {
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