<script lang="ts">
  import { onMount } from "svelte";


import { appwriteDatabases } from "../../lib/backend";
import { DB_ID, COLLECTION } from "../../lib/ids"
import { ID,Query } from "appwrite";

export let AuthorName = "";
export let AuthorUid = "";

let databaseId = "648bc6ddddf63e135f4d";
let collectionId = "";

let DocumentName = "";
let folders = [] as any;
export let docLocation = "";

onMount(async () => {
	await appwriteDatabases.listDocuments(
        DB_ID,
        COLLECTION.Folders,
        [
            Query.equal("OwnerUid", AuthorUid),
        ]
    ).then((response) => {
        folders = response.documents as any;
        console.log(response);
    }, (error) => {
        console.log(error);
    });
});


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
            "Location": docLocation,
        }
    ).then((response) => {
        window.location.href = '/doc/'+response.$id;
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

</script>

<button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
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
        <option value="648bc7024074897c154d">Notebook</option>
    </select>
    <label for="folder" class="text-gray-800">Folder</label>
    <select id="folder" class="select select-bordered bg-gray-400" bind:value={docLocation}>
            <option value="~">📁Home</option>
        {#each folders as folder}
            <option value={folder.Location + "/" + folder.Name}>📁{folder.Location.substring(1) + "/" + folder.Name}</option>
        {/each}
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
    option{
        background-color: #575757;
    }
</style>
