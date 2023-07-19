<script>
    import { appwriteDatabases } from "../../lib/backend";
    import { DB_ID, COLLECTION } from "../../lib/ids"
    import { ID } from "appwrite";

    export let path = "~"
    export let AuthorName = ""
    export let AuthorUid = ""
    
    let folderName = ""

    function newFolder() {
        while (folderName === "") {
            folderName = prompt("Folder Name")
        }
        // if the folder name has a space in the name, replace it with a dash
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
<div class="flex flex-row gap-2">
    <button on:click={newFolder} class="btn text-gray-800 bg-gray-200 items-center hover:bg-gray-300">
        New Folder
    </button>
</div>