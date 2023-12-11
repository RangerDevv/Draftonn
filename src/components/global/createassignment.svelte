<script lang="ts">
    import { ID, Query } from "appwrite";
    import { appwriteDatabases } from "../../lib/backend";
    import { COLLECTION, DB_ID } from "../../lib/ids";

    function create() {
        location.href = "./helpinghand/newassignment"
    }
</script>
<button class="btn text-gray-800 bg-gray-200 items-center mx-auto hover:bg-gray-300"
on:click={create}>
    New Assignment
</button>