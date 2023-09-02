<script>
    import { appwriteDatabases } from "../../lib/backend";
    import { DB_ID, COLLECTION } from "../../lib/ids"
    import { ID } from "appwrite";

    export let path = "~"
    export const AuthorName = ""
    export let AuthorUid = ""
    
    let folderName = ""

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