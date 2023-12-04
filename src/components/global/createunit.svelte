<script lang="ts">
    import { Query } from "appwrite";
    import { appwriteDatabases } from "../../lib/backend";
    import { COLLECTION, DB_ID } from "../../lib/ids";

    export let id: string;

    function create() {
        appwriteDatabases.listDocuments(DB_ID, COLLECTION.Units, [
            Query.equal("Class", id)
        ]).then(x => x.documents)
        .then(units => {
            
        })
    }
</script>
<button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300"
on:click={create}>
    New Unit
</button>