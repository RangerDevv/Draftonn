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
