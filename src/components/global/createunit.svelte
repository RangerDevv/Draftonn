<script lang="ts">
    import { ID, Query } from "appwrite";
    import { appwriteDatabases } from "../../lib/backend";
    import { COLLECTION, DB_ID } from "../../lib/ids";

    export let id: string;

    function create() {
        let attempt = prompt("Enter the unit name:")
        appwriteDatabases.listDocuments(DB_ID, COLLECTION.Units, [
            Query.equal("Class", id)
        ]).then(x => x.documents)
        .then(units => {
            console.log("h")
            if(!attempt || units.map(u => (u.Name as string).toLowerCase()).includes(attempt.toLowerCase())) {
                return alert("Invalid Unit Name.")
            } else {
                return appwriteDatabases.createDocument(DB_ID, COLLECTION.Units, ID.unique(), {
                    Name: attempt,
                    Class: id
                }).then(() => {
                    location.reload()
                })
            }
        })
    }
</script>
<button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300"
on:click={create}>
    New Unit
</button>