<script>
    import EditorJS from '@editorjs/editorjs';
    // only import the following: Embed, header, link, list, quote, table, InlineCode, warning, paragraph
    import List from '@editorjs/list';
    import Table from '@editorjs/table';
    import InlineCode from '@editorjs/inline-code';
    import Paragraph from 'editorjs-paragraph-with-alignment';
    import Header from 'editorjs-header-with-alignment'
    import Hyperlink from 'editorjs-hyperlink';
    import ImageTool from '@editorjs/image';
    import DragDrop from 'editorjs-drag-drop';
    import Undo from 'editorjs-undo';
    import Underline from '@editorjs/underline';
    import Checklist from '@editorjs/checklist';
    import Strikethrough from '@sotaproject/strikethrough';
    import editorjsNestedChecklist from '@calumk/editorjs-nested-checklist';
    import * as Backend from '../lib/backend';
    import * as BackendID from '../lib/ids';
    import { ID,Query } from 'appwrite';
    
    export let pid = "";
    export let user = "";
    export let name = "";
    let databaseId = "648bc6ddddf63e135f4d";
    let collectionId = "64d5a380c46a1248b02c";
    
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
                    checklist: {
                        class: Checklist,
                        inlineToolbar: true,
                    },
                    header: Header,
                    list: List,
                    table: Table,
                    inlineCode: InlineCode,
                    underline: Underline,
                    strikethrough: Strikethrough,
                    nestedChecklist: editorjsNestedChecklist,
                    image: {
                        class : ImageTool,
                            config: {
                                uploader: {uploadByFile}
                            }
                    },
                    paragraph: {
                        class: Paragraph,
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
    <div class="tooltip" data-tip="Settings">
        <button class="btn text-gray-800 bg-gray-200 gap-2 mx-auto  hover:bg-gray-300" onclick="settingModal.showModal()"><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="#1C274C" stroke-width="1.5"/>
            <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="#1C274C" stroke-width="1.5"/>
        </svg></button>
        </div>
    <dialog id="settingModal" class="modal">
      <form method="dialog" class="modal-box bg-gray-200 text-slate-950 overflow-x-hidden">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div class="flex flex-row justify-center items-center gap-2 text-xl pt-7">
            <p>Visibility</p>
            <input type="checkbox" class="checkbox checkbox-primary bg-gray-800" bind:checked={docVisibility} on:change={autoSave} />
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
        <!--  delete button -->
        <div class="modal-action">
            <div>
            <div class="tooltip" data-tip="Delete">
            <button class="btn text-sm btn-error text-black" on:click={deleteDoc}><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg></button>
            </div>
            <div class="tooltip" data-tip="Copy Share Link">
            <button class="btn btn-success" on:click={() => {navigator.clipboard.writeText(window.location.href)}}><svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="ic_fluent_copy_link_24_regular" fill="#212121" fill-rule="nonzero">
                        <path d="M13.7533481,2 C14.9105985,2 15.863488,2.8749731 15.9865561,3.9994587 L17.75,4 C18.940864,4 19.9156449,4.92516159 19.9948092,6.09595119 L20,6.25 L20,12.25 C20,12.6642136 19.6642136,13 19.25,13 C18.8703042,13 18.556509,12.7178461 18.5068466,12.3517706 L18.5,12.25 L18.5,6.25 C18.5,5.87030423 18.2178461,5.55650904 17.8517706,5.50684662 L17.75,5.5 L15.6182905,5.49983563 C15.214809,6.09910034 14.5301141,6.49330383 13.7533481,6.49330383 L10.2466519,6.49330383 C9.46988587,6.49330383 8.78519098,6.09910034 8.38170952,5.49983563 L6.25,5.5 C5.87030423,5.5 5.55650904,5.78215388 5.50684662,6.14822944 L5.5,6.25 L5.5,19.754591 C5.5,20.1342868 5.78215388,20.448082 6.14822944,20.4977444 L6.35177056,20.5114376 C6.71784612,20.5611 7,20.8748952 7,21.254591 C7,21.6688046 6.66421356,22.004591 6.25,22.004591 C5.05913601,22.004591 4.08435508,21.0794294 4.00519081,19.9086398 L4,19.754591 L4,6.25 C4,5.05913601 4.92516159,4.08435508 6.09595119,4.00519081 L6.25,4 L8.01344395,3.9994587 C8.13651196,2.8749731 9.08940148,2 10.2466519,2 L13.7533481,2 Z M17.25,14.5 L18.25,14.5 C20.3210678,14.5 21.9999918,16.1789322 21.9999918,18.25 C21.9999918,20.2542592 20.4276389,21.8912737 18.4522792,21.994802 L18.2534432,22 L17.2534432,22.0045992 C16.839234,22.0064847 16.5019095,21.6722434 16.4999918,21.2580342 C16.4982641,20.8783424 16.778975,20.5632552 17.1448187,20.5119127 L17.2465568,20.5045989 L18.25,20.5 C19.4926407,20.5 20.4999918,19.4926407 20.4999918,18.25 C20.4999918,17.059136 19.5748384,16.0843551 18.4040488,16.0051908 L18.25,16 L17.25,16 C16.8357864,16 16.4999918,15.6642136 16.4999918,15.25 C16.4999918,14.8703042 16.7821539,14.556509 17.1482294,14.5068466 L17.25,14.5 L18.25,14.5 L17.25,14.5 Z M12.25,14.5 L13.25,14.5 C13.6642136,14.5 14,14.8357864 14,15.25 C14,15.6296958 13.7178461,15.943491 13.3517706,15.9931534 L13.25,16 L12.25,16 C11.0073593,16 10,17.0073593 10,18.25 C10,19.440864 10.9251616,20.4156449 12.0959512,20.4948092 L12.25,20.5 L13.25,20.5 C13.6642136,20.5 14,20.8357864 14,21.25 C14,21.6296958 13.7178461,21.943491 13.3517706,21.9931534 L13.25,22 L12.25,22 C10.1789322,22 8.5,20.3210678 8.5,18.25 C8.5,16.2457408 10.0723611,14.6087263 12.0508414,14.505198 L12.25,14.5 L13.25,14.5 L12.25,14.5 Z M12.25,17.5 L18.25,17.5 C18.6642136,17.5 19,17.8357864 19,18.25 C19,18.6296958 18.7178461,18.943491 18.3517706,18.9931534 L18.25,19 L12.25,19 C11.8357864,19 11.5,18.6642136 11.5,18.25 C11.5,17.8703042 11.7821539,17.556509 12.1482294,17.5068466 L12.25,17.5 L18.25,17.5 L12.25,17.5 Z M13.7533481,3.5 L10.2466519,3.5 C9.83428745,3.5 9.5,3.83428745 9.5,4.24665191 C9.5,4.65901638 9.83428745,4.99330383 10.2466519,4.99330383 L13.7533481,4.99330383 C14.1657126,4.99330383 14.5,4.65901638 14.5,4.24665191 C14.5,3.83428745 14.1657126,3.5 13.7533481,3.5 Z" id="🎨-Color">
            
            </path>
                    </g>
                </g>
            </svg></button>
            </div>
            </div>
        </div>
      </form>
    </dialog>
    {:else}
    {#if pid!=""}
        <button class="btn text-gray-800 bg-gray-200 gap-2 mx-auto z-[100001]  hover:bg-gray-300" on:click={clone}>Clone</button>
    {/if}
    {/if}
    </label>
    </div>
    </div>
    <div id="editor"></div>
    {#if user === AuthorUid}
        <!--<button id="save">Save</button>-->
    {/if}
    {:else}
    <div class=" flex flex-col justify-center items-center pt-[40vh] gap-20 mx-auto">
        <p class="text-center text-6xl text-slate-950 mx-auto w-[75vw]">🔒</p>
        <p class="text-center text-2xl text-slate-950 mx-auto w-[75vw]">You do not have access to this document</p>
    </div>
    {/if}
    {/if}
    
    <style>
            .tc-wrap {
    --color-background: #f9f9fb;
    --color-text-secondary: #7b7e89;
    --color-border: #505050;
    --cell-size: 34px;
    --toolbox-icon-size: 18px;
    --toolbox-padding: 6px;
    --toolbox-aiming-field-size: calc(var(--toolbox-icon-size) + var(--toolbox-padding)*2);
    border-left: 0;
    position: relative;
    height: 100%;
    width: 100%;
    margin-top: var(--toolbox-icon-size);
    box-sizing: border-box;
    display: grid;
    grid-template-columns: calc(100% - var(--cell-size)) var(--cell-size);
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
    
