<script lang="ts">

import { appwriteDatabases } from "../../lib/backend";
import { ID } from "appwrite";

export let AuthorName = "";
export let AuthorUid = "";

let databaseId = "648bc6ddddf63e135f4d";
let collectionId = "";

let DocumentName = "";


function createDocument() {
    appwriteDatabases.createDocument(
        databaseId,
        collectionId, 
        ID.unique(), 
        {
            "Name": DocumentName,
            "AuthorName": AuthorName,
            "AuthorUid": AuthorUid,
            "IsPublic": false,
        }
    ).then((response) => {
        console.log(response);
        window.location.href = '/doc/' + response.$id;
    }, (error) => {
        console.log(error);
    });
}

</script>

<button class="btn text-gray-800 bg-gray-200 items-center mx-auto" on:click={() => {
    const modal = document.getElementById('my_modal_1');
    if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
        modal.showModal();
    }
}}>Create</button>
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box bg-gray-200 flex flex-col gap-4">
    <h3 class="font-bold text-2xl text-gray-900 text-center">Create Document</h3>
    <label for="name" class="text-gray-800">Name</label>
    <input type="text" id="name" bind:value={DocumentName} class="input input-bordered bg-gray-400" placeholder="Name" />
    <label for="database" class="text-gray-800">Type Of Document</label>
    <select id="database" class="select select-bordered bg-gray-400" bind:value={collectionId}>
        <option value="648bc7024074897c154d">Document</option>
    </select>
    <!--  createDocument() -->
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

<style>
    /*  style the options */
    .select option {
        background-color: #fff;
        color: #000;
        height: 30px;
    }
</style>
