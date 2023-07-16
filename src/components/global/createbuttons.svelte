<script>
    import { appwriteDatabases } from "../../lib/backend";
    import { DB_ID, COLLECTION } from "../../lib/ids"
    import { ID } from "appwrite";

    export let path = "~"
    export let AuthorName = ""
    export let AuthorUid = ""

    function newFolder() {
        let folderName = ""
        while(folderName == "") {
            //Replace later with Modal!
            folderName = prompt("(REPLACE PROMPT WITH MODAL LATER) Enter folder name:")
        }

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
<div class="flex flex-row gap-2">
    <button on:click={newFolder} class="btn text-gray-800 bg-gray-200 items-center hover:bg-gray-300">
        New Folder
    </button>
    <button class="btn text-gray-800 bg-gray-200 items-center hover:bg-gray-300">
        New Note
    </button>
</div>