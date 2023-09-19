<script>
    import Editor from 'js-draw';
    import 'js-draw/styles';
    import * as BackendIds from "../lib/ids";
    import * as Backend from "../lib/backend";
    import { Query } from 'appwrite';
    import { onMount } from 'svelte';

    const editor = new Editor(document.body);
    const toolbar = editor.addToolbar();
    const svgElem = editor.toSVG();

    // style the editor
    editor.getRootElement().style.height = '100vh';
    editor.getRootElement().style.width = '100vw';
    editor.getRootElement().style.backgroundColor = 'transparent';
    document.querySelector('.toolbar-root').style.backgroundColor = 'transparent';
    document.querySelector('.toolbar-root').style.border = 'none';
    document.querySelectorAll('.toolbar-dropdown').forEach((dropdown) => {
        dropdown.style.borderRadius = '20px';
    });

    // call the editor
    editor;
    toolbar;

    export let pid = "";
    export let AuthorUid = ""; 
    let savedEditor = "";
    let BoardTitle = "";
    let docVisibility = null;
    let docFileLocation = "";
    let DocUser = "";
    let folders = [];

    // load the document
    onMount(async () => {
        await Backend.appwriteDatabases.getDocument(
            BackendIds.DB_ID,
            BackendIds.COLLECTION.Drawing,
            pid
        ).then((response) => {
            console.log(response.Content);
            savedEditor = response['Content'];
            console.log(savedEditor);
            editor.loadFromSVG(savedEditor);
            BoardTitle = response.Name;
            docVisibility = response.IsPublic;
            docFileLocation = response.Location;
            DocUser = response.AuthorUid;
        }, (error) => {
            console.log(error);
        });
        Backend.appwriteDatabases.listDocuments(
            BackendIds.DB_ID,
            BackendIds.COLLECTION.Folders,
            [
                Query.equal("OwnerUid", AuthorUid),
            ]
        ).then((response) => {
            folders = response.documents;
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    });

    // a function to save the document that is called every second
    async function saveDocument() {
        savedEditor = editor.toSVG().outerHTML;
        await Backend.appwriteDatabases.updateDocument(
            BackendIds.DB_ID,
            BackendIds.COLLECTION.Drawing,
            pid,
            {
                "Name": BoardTitle,
                "Content": savedEditor,
                "IsPublic": docVisibility,
                "Location": docFileLocation,
            }
        ).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }

    function deleteDoc() {
    Backend.appwriteDatabases.deleteDocument(BackendIds.DB_ID, BackendIds.COLLECTION.Drawing, pid).then((response) => {
        console.log(response);
        window.location.href = '/dashboard';
    }, (error) => {
        console.log(error);
    });
    }

    // call the save function every 5 seconds after the document is loaded
    setTimeout(() => {
        setInterval(saveDocument, 5000);
    }, 5000);

    window.onbeforeunload = function() {
        saveDocument();
    };

</script>

<main>
{#if docVisibility==null}
<div class=" flex flex-col justify-center items-center pt-[40vh] gap-20">
<p class="text-center text-6xl text-slate-950 mx-auto w-[75vw]">🌐</p>
<span class="loading loading-infinity loading-lg text-black mx-auto"></span>
</div>
{:else}
{#if docVisibility==true || DocUser === AuthorUid}
<div class=" flex flex-row justify-center items-center gap-8 p-2">
<!--  checkboxes for public and private -->
<div class="flex flex-row justify-center items-center gap-2">
<label class="flex items-center">
{#if DocUser === AuthorUid}
<!-- Open the modal using ID.showModal() method -->
<button class="btn text-gray-800 bg-gray-200 gap-2 mx-auto  hover:bg-gray-300" onclick="settingModal.showModal()">Settings</button>
<dialog id="settingModal" class="modal">
  <form method="dialog" class="modal-box bg-gray-200 text-slate-950">
    <div class="flex flex-row justify-center items-center gap-2 text-xl">
        <p>Visibility</p>
        <input type="checkbox" class="checkbox checkbox-primary bg-gray-800"  bind:checked={docVisibility} on:change={saveDocument} />
        {#if docVisibility}
        <span class="ml-2">Public</span>
        {:else}
        <span class="ml-2">Private</span>
        {/if}
    </div>
    <div class="flex flex-col justify-center items-center gap-2 pt-3">
    <label for="folder" class="text-gray-800">Path Of Document</label>
    <select id="folder" class="select select-bordered bg-gray-400" bind:value={docFileLocation} on:change={saveDocument}>
        <option value="~">📁Home</option>
        {#each folders as folder}
            <option value={folder.Location + "/" + folder.Name}>📁{folder.Name}</option>
        {/each}
    </select>
    </div>
    <div class="modal-action flex justify-around">
      <button class="btn">Close</button>
      <button class="btn text-sm btn-error text-black" on:click={deleteDoc}>Delete</button>
      <button class="btn btn-success" on:click={() => {navigator.clipboard.writeText(window.location.href)}}>Copy Share Link</button>
    </div>
  </form>
</dialog>

{/if}
</label>
</div>
</div>
<div class="flex flex-col justify-center items-center gap-8 p-2 w-full">
<input type="text" bind:value={BoardTitle} placeholder="Title" class="border-none text-4xl font-bold text-center bg-transparent active:border-none mx-auto self-center items-center h-16" on:change={saveDocument} />

<p class="text-center text-2xl text-slate-950 mx-auto w-[75vw]"><span class="text-blue-500">Scroll Down</span> to start getting creative👇</p>
</div>
{:else}
<div class=" flex flex-col justify-center items-center pt-[40vh] gap-20 mx-auto">
    <p class="text-center text-6xl text-slate-950 mx-auto w-[75vw]">🔒</p>
    <p class="text-center text-2xl text-slate-950 mx-auto w-[75vw]">You do not have access to this document</p>
</div>
{/if}
{/if}
</main>
