<script lang="ts">
    import { Query, ID, type Models } from "appwrite";
    import { appwriteDatabases } from "../lib/backend";
    import { COLLECTION, DB_ID } from "../lib/ids";

    export let user: string

    let classes: Models.Document[] = []

    let selectedClasses: string[] = []

    appwriteDatabases.listDocuments(DB_ID, COLLECTION.User_School, [
        Query.equal("User", user)
    ])
    .then(res => res.documents[0])
    .then(doc => {
        let school = doc.School
        return appwriteDatabases.listDocuments(DB_ID, COLLECTION.Classes, [
            Query.equal("School", school)
        ])
    })
    .then(res => {
        console.log(res)
        classes = res.documents
    })

    function updateClasses() {
        appwriteDatabases.listDocuments(DB_ID, COLLECTION.Class_User, [
            Query.equal("User", user)
        ]).then(res => {
            Promise.all(
                res.documents.map(
                    doc => appwriteDatabases.deleteDocument(DB_ID, COLLECTION.Class_User, doc.$id)
                )
            )
        }).then(() => {
            return Promise.all(selectedClasses.map(c => 
                appwriteDatabases.createDocument(DB_ID, COLLECTION.Class_User, ID.unique(), {
                    Class: c,
                    User: user
                })
            ))
        }).then(() => window.location.href = "/dashboard")
    }
</script>
<div class="flex flex-col items-center 2xl:scale-125 pt-10 gap-4">
    <p class="text-3xl text-center font-bold">Select your classes</p>
    <button class="h-12 bg-blue-500 rounded-md w-44">+ New Class</button>
    <div>
        {#each classes as c}
            <label class="cursor-pointer label">
                <input value={c.$id} bind:group={selectedClasses} type="checkbox" class="checkbox checkbox-info checkbox-lg" />
                <span class="label-text ml-2 text-lg">{c.Name}</span>
            </label>
        {/each}
        
    </div>
    <button class="bg-gray-400 rounded-md w-36 h-12" on:click={updateClasses} disabled={selectedClasses.length == 0}>Save</button>
</div>
<dialog id="newclassmodal" class="modal">
    <form method="dialog" class="modal-box bg-gray-200 flex flex-col gap-4">
      <h3 class="font-bold text-2xl text-gray-900 text-center">Create Class</h3>
      <label for="name" class="text-gray-800">Name</label>
      <input type="text" id="name" class="input input-bordered bg-gray-400" placeholder="Name" />
      <label for="database" class="text-gray-800">Type Of Document</label>
      <select id="database" class="select select-bordered bg-gray-400">
          <option value="648bc7024074897c154d">Notebook</option>
          <option value="64d5a380c46a1248b02c">Todo List</option>
          <option value="64dab46d57d73632fba5">Drawing</option>
      </select>
      <label for="folder" class="text-gray-800">Folder</label>
      <!--  createDocument() -->
      <button class="btn btn-primary" on:click={() => {
          const modal = document.getElementById('newclassmodal');
          if (modal instanceof HTMLDialogElement && typeof modal.close === 'function') {
              modal.close();
          }
      }}>Create</button>
      <div class="modal-action">
        <button class="btn btn-error">Cancel</button>
      </div>
    </form>
  </dialog>