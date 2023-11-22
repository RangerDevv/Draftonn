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
        ).then(_ => window.location.href = `${path}/${folderName}`)
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
    <button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
        const modal = document.getElementById('my_modal_2');
        if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
            modal.showModal();
        }
    }}>New Folder</button>
    <button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
        const modal = document.getElementById('my_modal_1');
        if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
            modal.showModal();
        }
    }}>Create</button>
    <!-- deleteFolder() -->
    {#if path != "~"}
    <!-- <button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
        deleteFolder()
    }}>Delete</button> -->
    <!--  create a button that opens a modal that asks the user if they are sure they want to delete the folder -->
    <button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300" on:click={() => {
        const modal = document.getElementById('my_modal_3');
        if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
            modal.showModal();
        }
    }}>Delete</button>
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