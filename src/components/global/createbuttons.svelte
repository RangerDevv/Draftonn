<script lang="ts">
    import { appwriteDatabases } from "../../lib/backend";
    import { DB_ID, COLLECTION } from "../../lib/ids"
    import { ID,Query } from "appwrite";

    export let path = "~"
    export const AuthorName = ""
    export let AuthorUid = ""
    
    let folderName = ""
    export let currFolderID = ""

    function newFolder() {
        folderName = folderName.replace(" ", "-")
        appwriteDatabases.createDocument(
            DB_ID,
            COLLECTION.Folders,
            ID.unique(),
            {
                Name: folderName,
                Location: path,
                OwnerUid: AuthorUid
            }
        ).then(_ => window.location.href = `${path.replace("~/","")}/${folderName}`)
    }

// delete function that gets called when the delete button is clicked 
// function: gets all of the Notes, Drawings, and Todos in the current folder the user is in and deletes them one by one if a folder is contained in a folder it will delete that folder and all of the contents inside of it
function deleteFolder() {
    // get all of the notes in the current folder
    let notes = appwriteDatabases.listDocuments(
        DB_ID,
        COLLECTION.Notes, 
        [
            Query.equal('AuthorUid', AuthorUid),
            Query.equal("Location", path!)
        ]
    ).then(response => response.documents)
    // get all of the drawings in the current folder
    let drawings = appwriteDatabases.listDocuments(
        DB_ID,
        COLLECTION.Drawing, 
        [
            Query.equal('AuthorUid', AuthorUid),
            Query.equal("Location", path!)
        ]
    ).then(response => response.documents)
    // get all of the todos in the current folder
    let todos = appwriteDatabases.listDocuments(
        DB_ID,
        COLLECTION.Todo, 
        [
            Query.equal('AuthorUid', AuthorUid),
            Query.equal("Location", path!)
        ]
    ).then(response => response.documents)
    // get all of the folders in the current folder
    let folders = appwriteDatabases.listDocuments(
        DB_ID,
        COLLECTION.Folders, 
        [
            Query.equal('OwnerUid', AuthorUid),
            Query.equal("Location", path!)
        ]
    ).then(response => response.documents)
    // delete all of the notes in the current folder
    notes.then((notes) => {
        notes.forEach((note) => {
            appwriteDatabases.deleteDocument(DB_ID, COLLECTION.Notes, note.$id)
        })
    })
    // delete all of the drawings in the current folder
    drawings.then((drawings) => {
        drawings.forEach((drawing) => {
            appwriteDatabases.deleteDocument(DB_ID, COLLECTION.Drawing, drawing.$id)
        })
    })
    // delete all of the todos in the current folder
    todos.then((todos) => {
        todos.forEach((todo) => {
            appwriteDatabases.deleteDocument(DB_ID, COLLECTION.Todo, todo.$id)
        })
    })
    // delete all of the folders in the current folder
    folders.then((folders) => {
        folders.forEach((folder) => {
            appwriteDatabases.deleteDocument(DB_ID, COLLECTION.Folders, folder.$id)
        })
    })
    // delete the current folder
    appwriteDatabases.deleteDocument(DB_ID, COLLECTION.Folders, currFolderID)
    // redirect the user to the dashboard after 2 seconds
    setTimeout(() => {
        window.location.href = "/dashboard"
    }, 2000)
}
</script>
<div class="flex flex-row gap-2 w-6">
<div class="tooltip" data-tip="Create Folder">
<button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
    const modal = document.getElementById('my_modal_2');
    if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
        modal.showModal();
    }
}}>
<svg height="30px" width="30px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
viewBox="0 0 512 512"  xml:space="preserve">
<style type="text/css">
.st0{fill:#000000;}
</style>
<g>
<path class="st0" d="M503.654,101.298h-43.289V58c0-4.61-3.727-8.338-8.329-8.338h-16.833c-4.602,0-8.347,3.728-8.347,8.338v43.298
   h-43.289c-4.602,0-8.329,3.727-8.329,8.329v16.833c0,4.602,3.727,8.346,8.329,8.346h43.289v43.29c0,4.601,3.745,8.337,8.347,8.337
   h16.833c4.602,0,8.329-3.736,8.329-8.337v-43.29h43.289c4.619,0,8.346-3.744,8.346-8.346v-16.833
   C512,105.026,508.273,101.298,503.654,101.298z"/>
<path class="st0" d="M500.836,239.74l-0.21-0.428l-0.28-0.394c-8.556-12.616-22.817-20.367-38.216-20.367H382.22l-12.633-36.115
   l-0.385,0.096c-8.836-19.204-27.839-32.178-49.519-32.178H144.986c-1.994-0.026-4.041-1.129-5.231-3.666l0.017,0.035
   c-8.592-18.889-27.314-31.329-48.224-31.329H46.474c-0.035,0-0.035-0.009-0.052-0.009c-15.118,0.009-29.134,7.489-37.743,19.702
   l-0.595,0.866l-0.123,0.376C2.748,144.22,0,153.355,0,162.611c0,4.768,0.736,9.571,2.188,14.243H2.17l0.018,0.035l0.017,0.061
   l0.018,0.062v0.017l76.115,247.645v0.035l0.332,1.033c6.912,21.801,27.121,36.587,49.973,36.587l272.719,0.009
   c19.72-0.009,37.48-11.102,46.404-28.268l0.437,0.141l57.516-152.178l0.07-0.201l0.017-0.062l0.018-0.035
   c1.838-5.196,2.73-10.62,2.73-15.992c0-9.098-2.625-18.136-7.717-25.984V239.74z M472.63,270.011l-55.03,145.58l-0.035,0.106
   c-2.432,6.859-8.941,11.443-16.203,11.443l-272.719-0.017c-7.506,0.017-14.156-4.848-16.412-12.004L35.783,166.382l0.017,0.043
   c-0.402-1.251-0.595-2.537-0.595-3.814c0-2.608,0.805-5.162,2.258-7.244l-0.018,0.017c2.223-3.114,5.547-4.786,8.994-4.786h45.11
   c6.754,0,13.106,4.007,16.185,10.735c6.649,14.602,21.12,24.217,37.253,24.217h174.697c8.294,0,15.906,5.486,18.653,14.156
   l0.07,0.21l8.994,25.678H207.733c-20.279,0-38.18,13.019-44.951,32.134l-35.608,102.904l26.596,9.204l35.573-102.781l-0.035,0.122
   c2.974-8.276,10.376-13.42,18.425-13.42h254.399c3.482,0,6.912,1.741,9.1,4.97c1.364,2.029,2.134,4.496,2.117,7.016
   C473.348,267.186,473.103,268.629,472.63,270.011z"/>
</g>
</svg>
</button>
</div>
<div class="tooltip" data-tip="Create">
<button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
    const modal = document.getElementById('my_modal_1');
    if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
        modal.showModal();
    }
}}>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

        <rect x="0" fill="none" width="24" height="24"/>
        
        <g>
        
        <path d="M21 14v5c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V5c0-1.105.895-2 2-2h5v2H5v14h14v-5h2z"/>
        
        <path d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4"/>
        
        </g>
        
    </svg>
</button>
</div>
    <!-- deleteFolder() -->
    {#if path != "~"}
    <!-- <button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
        deleteFolder()
    }}>Delete</button> -->
    <!--  create a button that opens a modal that asks the user if they are sure they want to delete the folder -->
    <div class="tooltip" data-tip="Delete">
    <button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
        const modal = document.getElementById('my_modal_3');
        if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
            modal.showModal();
        }
    }}><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg></button>
    </div>
    {/if}
</div>


<dialog id="my_modal_2" class="modal">
    <form method="dialog" class="modal-box bg-gray-200 flex flex-col gap-4">
      <h3 class="font-bold text-2xl text-gray-900 text-center">Create Folder</h3>
      <label for="name" class="text-gray-800">Name</label>
      <input type="text" id="name" bind:value={folderName} class="input input-bordered bg-gray-400" placeholder="Name" />
      <!--  createDocument() -->
      <button class="btn btn-primary" on:click={() => {
          newFolder();
          const modal = document.getElementById('my_modal_2');
          if (modal instanceof HTMLDialogElement && typeof modal.close === 'function') {
              modal.close();
          }
      }}>Create</button>
      <div class="modal-action">
        <button class="btn btn-error">Cancel</button>
      </div>
    </form>
</dialog>

<!-- delete modal -->
<dialog id="my_modal_3" class="modal">
    <form method="dialog" class="modal-box bg-gray-200 flex flex-col gap-4">
      <h3 class="font-bold text-2xl text-gray-900 text-center">Are you sure you want to delete this folder?</h3>
      <!--  deleteFolder() -->
      <button class="btn btn-error" on:click={() => {
          deleteFolder();
          const modal = document.getElementById('my_modal_3');
          if (modal instanceof HTMLDialogElement && typeof modal.close === 'function') {
              modal.close();
          }
      }}>Yes</button>
        <button class="btn btn-ghost outline text-black outline-black">No</button>
    </form>
</dialog>