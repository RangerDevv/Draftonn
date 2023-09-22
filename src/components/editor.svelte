<script>
import EditorJS from '@editorjs/editorjs';
// only import the following: Embed, header, link, list, quote, table, InlineCode, warning, paragraph
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Warning from '@editorjs/warning';
import Paragraph from 'editorjs-paragraph-with-alignment';
import Header from 'editorjs-header-with-alignment'
import ToggleBlock from 'editorjs-toggle-block';
import Hyperlink from 'editorjs-hyperlink';
import Marker from '@editorjs/marker';
import ImageTool from '@editorjs/image';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import Underline from '@editorjs/underline';
import ChangeCase from 'editorjs-change-case';
import editorjsCodeflask from '@calumk/editorjs-codeflask';
import * as Backend from '../lib/backend';
import * as BackendID from '../lib/ids';
import { ID,Query } from 'appwrite';

export let pid = "";
export let user = "";
export let name = "";
let databaseId = "648bc6ddddf63e135f4d";
let collectionId = "648bc7024074897c154d";

let LoadedTitle = "";
let loadedData = '';
let LoadedDate = "";
let docFileLocation = "";
let folders = [];
let docVisibility = null;
let AuthorUid = "";

let canRead = false;

let editor;

async function getFolders() {
await Backend.appwriteDatabases.listDocuments(
    BackendID.DB_ID,
    BackendID.COLLECTION.Folders,
    [
        Query.equal("OwnerUid", AuthorUid),
    ]
).then((response) => {
    folders = response.documents;
    console.log(response);
}, (error) => {
    console.log(error);
});
}

Backend.appwriteDatabases.getDocument(databaseId, collectionId, pid).then((response) => {
    console.log(response);
    if (response.Content !== ' ' || response !== null || response !== undefined) {
        loadedData = response.Content;
        LoadedTitle = response.Name;
        LoadedDate = response.LastUpdated;
        docVisibility = response.IsPublic;
        AuthorUid = response.AuthorUid;
        docFileLocation = response.Location;
        getFolders();
        console.log('The document is not empty' + loadedData);
        if (loadedData === ' ') {
            loadedData = JSON.stringify(editor.save());
        }
        if (user == AuthorUid) {
            canRead = true;
        } else {
            canRead = false;
        }
    } else {
        loadedData = editor.save();
        console.log('The document is empty' + loadedData);
    }

    editor = new EditorJS(
        {
            holder: 'editor',
            placeholder: 'Start writing your article... Press tab to see the toolbar',
            tools: {
                header: Header,
                list: List,
                quote: Quote,
                embed: Embed,
                table: Table,
                inlineCode: InlineCode,
                warning: Warning,
                code: editorjsCodeflask,
                underline: Underline,
                changeCase: ChangeCase,
                image: {
                    class : ImageTool,
                        config: {
                            uploader: {uploadByFile}
                        }
                },
                marker: {
                    class: Marker,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+M',
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                toggleBlock: {
                    class: ToggleBlock,
                    inlineToolbar: true,
                },
                hyperlink: {
                    class: Hyperlink,
                    inlineToolbar: true,
                },
            },
            data: JSON.parse(loadedData),
        }
    );

// onready function that is called when the editor is ready
editor.isReady.then(() => {
    console.log('Editor.js is ready to work!');
    new Undo({ editor });
    new DragDrop(editor);
});

function uploadByFile(file) {
 return Backend.appwriteStorage.createFile('64ada07bbca91d21cdbc', ID.unique(), file).then((res) => {
   return {
    success: 1,
    file   : {
     url: `https://cloud.appwrite.io/v1/storage/buckets/64ada07bbca91d21cdbc/files/${res.$id}/view?project=648bc5020fbda818412e`,
    }
   }
  });
}

    document.getElementById('save').onclick = function save() {
        editor.save().then((outputData) => {
            Backend.appwriteDatabases.updateDocument(databaseId, collectionId, pid,
            {
                Content: JSON.stringify(outputData),
                Name: LoadedTitle,
                LastUpdated: new Date().toISOString(),
                IsPublic: docVisibility,
            }
            ).then((response) => {
            }, (error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    }
}, (error) => {
    console.log(error);
});

// autosave function that is called every 5 seconds or when the user leaves the page
function autoSave() {
    editor.save().then((outputData) => {
        Backend.appwriteDatabases.updateDocument(databaseId, collectionId, pid,
        {
            Content: JSON.stringify(outputData),
            Name: LoadedTitle,
            LastUpdated: new Date().toISOString(),
            IsPublic: docVisibility,
            Location: docFileLocation,
        }
        ).then((response) => {
        }, (error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log('Saving failed: ', error)
    });
}

function deleteDoc() {
    Backend.appwriteDatabases.deleteDocument(databaseId, collectionId, pid).then((response) => {
        console.log(response);
        window.location.href = '/dashboard';
    }, (error) => {
        console.log(error);
    });
}

// call the autosave function every 5 seconds
setInterval(autoSave, 5000);

// call the autosave function when the user leaves the page
window.onbeforeunload = function () {
    autoSave();
}

// a function to make a clone of the document
function clone() {
    Backend.appwriteDatabases.createDocument(
        BackendID.DB_ID,
        BackendID.COLLECTION.Notes,
        ID.unique(),
        {
            Content: loadedData,
            Name: LoadedTitle,
            AuthorName: name,
            AuthorUid: user,
            IsPublic: docVisibility,
        }
    ).then((response) => {
        console.log(response);
        window.location.href = '/doc/'+response.$id;
    }, (error) => {
        console.log(error);
    });
}
</script>
<main>
{#if !canRead}
<!--  a transparent div that covers the whole page -->
<div id="barrier">
</div>
{/if}
{#if docVisibility==null}
<div class=" flex flex-col justify-center items-center pt-[40vh] gap-20">
<p class="text-center text-6xl text-slate-950 mx-auto w-[75vw]">🌐</p>
<span class="loading loading-infinity loading-lg text-black mx-auto"></span>
</div>
{:else}
{#if docVisibility==true || user === AuthorUid}
<div class=" flex flex-row justify-center items-center gap-8 p-2">
<input type="text" bind:value={LoadedTitle} placeholder="Title" class="border-none text-4xl font-bold text-center bg-transparent active:border-none mx-auto self-center h-16">
<p class="text-center text-gray-400 text-sm pr-8">Last updated: {LoadedDate.substring(0, 10).replaceAll('-', '/') + ' ' + LoadedDate.substring(11, 16).replaceAll('-', ':')}</p>
<!--  checkboxes for public and private -->
<div class="flex flex-row justify-center items-center gap-2">
<label class="flex items-center">
{#if user === AuthorUid}
<!-- Open the modal using ID.showModal() method -->
<button class="btn text-gray-800 bg-gray-200 gap-2 mx-auto  hover:bg-gray-300" onclick="settingModal.showModal()">Settings</button>
<dialog id="settingModal" class="modal">
  <form method="dialog" class="modal-box bg-gray-200 text-slate-950">
    <div class="flex flex-row justify-center items-center gap-2 text-xl">
        <p>Visibility</p>
        <input type="checkbox" class="checkbox checkbox-primary bg-gray-800"  bind:checked={docVisibility} on:change={autoSave} />
        {#if docVisibility}
        <span class="ml-2">Public</span>
        {:else}
        <span class="ml-2">Private</span>
        {/if}
    </div>
    <div class="flex flex-col justify-center items-center gap-2 pt-3">
    <label for="folder" class="text-gray-800">Path Of Document</label>
    <select id="folder" class="select select-bordered bg-gray-400" bind:value={docFileLocation} on:change={autoSave}>
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

{:else}
<button class="btn text-gray-800 bg-gray-200 gap-2 mx-auto z-[100001]  hover:bg-gray-300" on:click={clone}>Clone</button>
{/if}
</label>
</div>
</div>
<div id="editor"></div>
{:else}
<div class=" flex flex-col justify-center items-center pt-[40vh] gap-20 mx-auto">
    <p class="text-center text-6xl text-slate-950 mx-auto w-[75vw]">🔒</p>
    <p class="text-center text-2xl text-slate-950 mx-auto w-[75vw]">You do not have access to this document</p>
</div>
{/if}
{/if}

<style>
    h1 {
        font-size: 2rem;
    }
    h2 {
        font-size: 1.5rem;
    }
    h3 {
        font-size: 1.17rem;
    }
    h4 {
        font-size: 1rem;
    }
    h5 {
        font-size: .83rem;
    }
    h6 {
        font-size: .67rem;
    }

    /* center the button */
    button {
        display: block;
        margin: 0 auto;
    }

    /*  remove border from input */
    input {
        border: none;
        outline: none;
        /* center the input */
        display: block;
        margin: 0 auto;
        padding-top: 1rem;
    }
    /*  make the barriers background color transparent */
    #barrier {
        background-color: transparent;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
</style>
</main>
