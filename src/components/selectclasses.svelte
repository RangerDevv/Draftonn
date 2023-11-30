<script lang="ts">
    import { Query, ID, type Models } from "appwrite";
    import { appwriteDatabases } from "../lib/backend";
    import { COLLECTION, DB_ID } from "../lib/ids";

    export let user: string

    let className = "", teacherName = "", acceleration = ""

    let classes: Models.Document[] = []

    let selectedClasses: string[] = []

    let school = ""

    appwriteDatabases.listDocuments(DB_ID, COLLECTION.Class_User, [
        Query.equal("User", user)
    ]).then(res => res.documents.forEach(doc => {
        selectedClasses = [...selectedClasses, doc.Class]
    }))

    appwriteDatabases.listDocuments(DB_ID, COLLECTION.User_School, [
        Query.equal("User", user)
    ])
    .then(res => res.documents[0])
    .then(doc => {
        school = doc.School
        return appwriteDatabases.listDocuments(DB_ID, COLLECTION.Classes, [
            Query.equal("School", school)
        ])
    })
    .then(res => {
        classes = res.documents
    })

    function createClass() {
        let id = ID.unique()
        let name = `${acceleration} ${className} w/ ${teacherName}`
        appwriteDatabases.createDocument(DB_ID, COLLECTION.Classes, id, {
            Name: name,
            School: school
        }).then(d => {
            classes = [...classes, ({
                $id: d.$id,
                Name: name 
            } as unknown as Models.Document)]
            selectedClasses = [...selectedClasses, d.$id]
        })
    }

    function updateClasses() {
        appwriteDatabases.listDocuments(DB_ID, COLLECTION.Class_User, [
            Query.equal("User", user)
        ]).then(res => {
            return Promise.all(
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
    <button class="h-12 bg-blue-500 rounded-md w-44" on:click={() => {
        const modal = document.getElementById('newclassmodal');
        if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
            modal.showModal();
        }
    }}>+ New Class</button>
    <div>
        {#each classes as c}
            <label class="cursor-pointer label">
                <input value={c.$id} bind:group={selectedClasses} type="checkbox" class="checkbox checkbox-info checkbox-lg" />
                <span class="label-text ml-2 mr-auto text-lg text-left">{c.Name}</span>
            </label>
        {/each}
        
    </div>
    <button class="bg-gray-400 rounded-md w-36 h-12" on:click={updateClasses} disabled={selectedClasses.length == 0}>Save</button>
</div>
<dialog id="newclassmodal" class="modal">
    <form method="dialog" class="modal-box bg-gray-200 flex flex-col gap-4">
      <h3 class="font-bold text-2xl text-gray-900 text-center">Create Class</h3>
      <label for="name" class="text-gray-800">Class Name</label>
      <input type="text" id="name" class="input input-bordered bg-gray-400" placeholder="Class Name" bind:value={className} />
      <label for="name" class="text-gray-800">Professor/Teacher Name</label>
      <input type="text" id="name" class="input input-bordered bg-gray-400" placeholder="Professor/Teacher Name" bind:value={teacherName} />
      <label for="database" class="text-gray-800">Class Acceleration</label>
      <select id="database" class="select select-bordered bg-gray-400" bind:value={acceleration}>
          <option value="">Select...</option>
          <option value="On Level">On Level</option>
          <option value="Honors">Honors</option>
          <option value="Dual Credit">Dual Credit</option>
          <option value="AP">AP</option>
          <option value="IB-HL">IB-HL</option>
      </select>
      <button class="btn btn-primary" disabled={!teacherName || !acceleration || !className} on:click={() => {
          createClass()
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