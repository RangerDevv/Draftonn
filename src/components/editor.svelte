<script>
import EditorJS from '@editorjs/editorjs';
// only import the following: Embed, header, link, list, quote, table, InlineCode, warning, paragraph
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Embed from '@editorjs/embed';
import Link from '@editorjs/link';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Warning from '@editorjs/warning';
import Paragraph from 'editorjs-paragraph-with-alignment';
import Header from 'editorjs-header-with-alignment'
import ToggleBlock from 'editorjs-toggle-block';
import Hyperlink from 'editorjs-hyperlink';
import Marker from '@editorjs/marker';
import * as Backend from '../lib/backend';

export let pid = "";
export let user = "";
let databaseId = "648bc6ddddf63e135f4d";
let collectionId = "648bc7024074897c154d";

let LoadedTitle = "";
let loadedData = '';
let LoadedDate = "";
let docVisibility = null;
let AuthorUid = "";

let canRead = false;

let editor;
Backend.appwriteDatabases.getDocument(databaseId, collectionId, pid).then((response) => {
    console.log(response);
    if (response.Content !== ' ' || response !== null || response !== undefined) {
        loadedData = response.Content;
        LoadedTitle = response.Name;
        LoadedDate = response.LastUpdated;
        docVisibility = response.IsPublic;
        AuthorUid = response.AuthorUid;
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
                link: Link,
                table: Table,
                inlineCode: InlineCode,
                warning: Warning,
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
                marker: {
                    class: Marker,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+M',
                },
            },
            data: JSON.parse(loadedData),
        }
    );

    document.getElementById('save').onclick = function save() {
        editor.save().then((outputData) => {
            console.log('Article data: ', outputData);
            Backend.appwriteDatabases.updateDocument(databaseId, collectionId, pid,
            {
                Content: JSON.stringify(outputData),
                Name: LoadedTitle,
                LastUpdated: new Date().toISOString(),
                IsPublic: docVisibility,
            }
            ).then((response) => {
                console.log(response);
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
        console.log('Article data: ', outputData);
        Backend.appwriteDatabases.updateDocument(databaseId, collectionId, pid,
        {
            Content: JSON.stringify(outputData),
            Name: LoadedTitle,
            LastUpdated: new Date().toISOString(),
            IsPublic: docVisibility,
        }
        ).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log('Saving failed: ', error)
    });
}

// call the autosave function every 5 seconds
setInterval(autoSave, 5000);

// call the autosave function when the user leaves the page
window.onbeforeunload = function () {
    autoSave();
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
<p class="text-center text-6xl text-slate-950">🌐</p>
<span class="loading loading-infinity loading-lg text-black"></span>
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
<input type="checkbox" class="form-checkbox" bind:checked={docVisibility} on:change={autoSave} />
{#if docVisibility}
<span class="ml-2">Public</span>
{:else}
<span class="ml-2">Private</span>
{/if}
{/if}
</label>
</div>
</div>
<div id="editor"></div>
{#if user === AuthorUid}
    <button id="save">Save</button>
{/if}
{:else}
<div class=" flex flex-col justify-center items-center pt-[40vh] gap-20">
    <p class="text-center text-6xl text-slate-950">🔒</p>
    <p class="text-center text-2xl text-slate-950">You do not have access to this document</p>
</div>
{/if}
{/if}

<style>
    .editor {
        width: 100%;
        height: 100vh;
        padding: 2rem;
    }

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
    /*  make the table bolder */
    table {
        border: 1px solid black;
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