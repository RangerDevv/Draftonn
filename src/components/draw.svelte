<script>
    import Editor from 'js-draw';
    import 'js-draw/styles';
    import * as BackendIds from "../lib/ids";
    import * as Backend from "../lib/backend";
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
    export const user = ""; // unused
    let savedEditor = "";

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
                "Content": savedEditor
            }
        ).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }

    // call the save function every 5 seconds after the document is loaded
    setTimeout(() => {
        setInterval(saveDocument, 5000);
    }, 5000);

</script>

<main class="editorHolder">

</main>

<style>
.editorHolder {
  background-color: #f5f5f5;
  height: 100vh;
}

.toolbar-root {
}

.toolbar-root {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
</style>