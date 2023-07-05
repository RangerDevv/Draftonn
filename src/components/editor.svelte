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
let databaseId = "648bc6ddddf63e135f4d";
let collectionId = "648bc7024074897c154d";

let LoadedTitle = "";
let loadedData = '';
let LoadedDate = "";

let editor;

Backend.appwriteDatabases.getDocument(databaseId, collectionId, pid).then((response) => {
    console.log(response);
    if (response.Content !== ' ' || response !== null || response !== undefined) {
        loadedData = response.Content;
        LoadedTitle = response.Name;
        LoadedDate = response.LastUpdated;
        console.log('The document is not empty' + loadedData);
        if (loadedData === ' ') {
            loadedData = JSON.stringify(editor.save());
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
                LastUpdated: new Date.now().toISOString(),
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
            LastUpdated: new Date.now().toISOString(),
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
<div class=" flex flex-row justify-center items-center gap-8 p-2">
<input type="text" bind:value={LoadedTitle} placeholder="Title" class="border-none text-4xl font-bold text-center bg-transparent active:border-none mx-auto self-center">
<p class="text-center text-gray-400 text-sm pr-8">Last updated: {LoadedDate}</p>
</div>
<div id="editor"></div>
<button id="save">Save</button>

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
</style>
</main>