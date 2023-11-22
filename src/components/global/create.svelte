<script lang="ts">
  import { onMount } from "svelte";


import { appwriteDatabases } from "../../lib/backend";
import { DB_ID, COLLECTION } from "../../lib/ids"
import { ID,Query } from "appwrite";

export let AuthorName = "";
export let AuthorUid = "";

let SearchAuid = AuthorUid;

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
        DB_ID,
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
        if (collectionId==COLLECTION.Notes) {
        window.location.href = '/doc/'+response.$id;
        } else if (collectionId==COLLECTION.Todo) {
        window.location.href = '/todo/'+response.$id;
        } else if (collectionId==COLLECTION.Drawing) {
        window.location.href = '/draw/'+response.$id;
        }
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

let seachWord = "";
let DocsearchResults = [] as any;
let TodosearchResults = [] as any;
let DrawsearchResults = [] as any;

function search() {
    appwriteDatabases.listDocuments(
        DB_ID,
        COLLECTION.Notes,
        [
            Query.search("Name", seachWord),
        ]
    ).then((response) => {
        DocsearchResults = response.documents as any;
        // remove all the that do not have the same author
        DocsearchResults = DocsearchResults.filter((result: any) => {
            return result.AuthorUid == SearchAuid;
        });
    }, (error) => {
        console.log(error);
    });
    appwriteDatabases.listDocuments(
        DB_ID,
        COLLECTION.Todo,
        [
            Query.search("Name", seachWord),
        ]
    ).then((response) => {
        TodosearchResults = response.documents as any;
        // remove all the that do not have the same author
        TodosearchResults = TodosearchResults.filter((result: any) => {
            return result.AuthorUid == SearchAuid;
        });
    }, (error) => {
        console.log(error);
    });
    appwriteDatabases.listDocuments(
        DB_ID,
        COLLECTION.Drawing,
        [
            Query.search("Name", seachWord),
        ]
    ).then((response) => {
        DrawsearchResults = response.documents as any;
        // remove all the that do not have the same author
        DrawsearchResults = DrawsearchResults.filter((result: any) => {
            return result.AuthorUid == SearchAuid;
        });
    }, (error) => {
        console.log(error);
    });
}
</script>
<div class="flex flex-wrap gap-2">
<button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
    const modal = document.getElementById('my_modal_1');
    if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
        modal.showModal();
    }
}}>Create</button>
<button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
    const modal = document.getElementById('searchModal');
    // if the key combination of ctrl+q is pressed then open the search modal
    if (onkeydown = (e) => {
        if (e.ctrlKey && e.key == "q") {
            if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
                modal.showModal();
            }
        }
    }) 
    if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
        modal.showModal();
    }
}}>Search 🔍</button>
</div>
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box bg-gray-200 flex flex-col gap-4">
    <h3 class="font-bold text-2xl text-gray-900 text-center">Create Document</h3>
    <label for="name" class="text-gray-800">Name</label>
    <input type="text" id="name" bind:value={DocumentName} class="input input-bordered bg-gray-400" placeholder="Name" />
    <label for="database" class="text-gray-800">Type Of Document</label>
    <select id="database" class="select select-bordered bg-gray-400" bind:value={collectionId}>
        <option value="648bc7024074897c154d">Notebook</option>
        <option value="64d5a380c46a1248b02c">Todo List</option>
        <option value="64dab46d57d73632fba5">Drawing</option>
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
<!-- Search Modal -->
<dialog id="searchModal" class="modal">
	<div class="modal-box bg-gray-300 text-black h-96">
        <h3 class="font-bold text-2xl text-gray-900 text-center">Search</h3>
        <div class="flex flex-row items-center gap-2 mx-auto">
        <input type="text" bind:value={seachWord} class="input input-bordered bg-gray-400 w-full mt-5" placeholder="Search" on:input={search} />
        </div>
        {#each DocsearchResults as result}
            <a href={"/doc/"+result.$id} class="w-full btn btn-ghost mt-1 text-left">📄:{result.Name}</a>
        {/each}
        {#each TodosearchResults as result}
            <a href={"/todo/"+result.$id} class="w-full btn btn-ghost mt-1 text-left">✅:{result.Name}</a>
        {/each}
        {#each DrawsearchResults as result}
            <a href={"/draw/"+result.$id} class="w-full btn btn-ghost mt-1 text-left">🎨:{result.Name}</a>
        {/each}
		<div class="modal-action">
		<form method="dialog">
			<button class="btn btn-error">Close</button>
		</form>
		</div>
	</div>
</dialog>
<style>
</style>
