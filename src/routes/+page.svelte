<script>
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";
    import { oneDark } from "@codemirror/theme-one-dark";
    import Sidebar from "./sidebar.svelte";
    import {main, utils, styles} from "$lib/stores.js";
    import { db } from './store';
    import { onMount } from "svelte";
    let db$;
    let file;
    let value = $main;
    let currentFile = "main.js";
    // if (currentFile == "main.js") {
    //     value = $main;
    // }
    // else if (currentFile == "utils.js") {
    //     value = $utils;
    // }
    // else if (currentFile == "styles.js") {
    //     value = $styles;
    // }
    const fileContents = {
      "main.js": $main,
      "utils.js": $utils,
      "styles.css": $styles,
    };
    
    onMount(() => {
      const getFile = async () => {
        db$ = await db();
        db$.files
          // .find()
          // .sort({ updatedAt: 'desc' })
          .$.subscribe((files) => (file = files));
      };
      getFile();
    });
    function saveCode(a) {
      // Logic to save the code
      if (a == "main.js") {
        $main = value;
      }
      else if (a == "utils.js") {
        $utils = value;
      }
      else if (a == "styles.css") {
        $styles = value;
      }
      // console.log("Code saved:", a, value);
    }
    const saveFile = async (a)=>{
      const db$  = await db();
      if (a == "main.js") {
        $main = value;
      }
      else if (a == "utils.js") {
        $utils = value;
      }
      else if (a == "styles.css") {
        $styles = value;
      }
    }
  
    // function deleteCode(a) {
    //   // Logic to delete the code
    //  async (note) => await note.remove();

    // }
  
    function changeFile(file) {
      saveCode(currentFile);
      currentFile = file;
      value = fileContents[file];
      if (file == "main.js") {
        value = $main;
    }
    else if (file == "utils.js") {
      value = $utils;
    }
    else if (file == "styles.css") {
      value = $styles;
    }
  }
    // const handleEditNote = (note) => {
    //   console.log(note);
    //   selectedEvent.set(note);
    //   title = note.title;
    //   id = note.id;
    //   // id.set(note.id);
    //   console.log(selectedEvent);
      // console.log(file, currentFile, value);     
    //   const saveNote = async () => {
    //   const db$ = await db();
    //   if (isEmptyObject($selectedEvent)) {
    //     await db$.notes
    //       .insert({
    //         id: id,
    //         title: title,
    //         start: new Date().toISOString(),
    //         end: new Date().toISOString(),
    //       })
    //       .then(resetForm);
    //   } else {
    //     await $selectedEvent
    //       .update({
    //         $set: {
    //           id: id,
    //           title: title,
    //            end: new Date().getTime().toString(),
    //         },
    //       })
    //       .then(resetForm);
    //   }
    // };     
  </script>
  <div class="flex w-full h-screen">
    <Sidebar />
    <div class="relative w-full h-screen overflow-auto bg-[#282c34]">
      <nav class="bg-gray-800">
        <ul class="flex">
          <li class="px-4 py-2 border w-36 line-clamp-1 border-gray-600 text-white" on:click={() => changeFile("main.js")}>main.js</li>
          <li class="px-4 py-2 border w-36 line-clamp-1 border-gray-600 text-white" on:click={() => changeFile("utils.js")}>utils.js</li>
          <li class="px-4 py-2 border w-36 line-clamp-1 border-gray-600 text-white" on:click={() => changeFile("styles.css")}>styles.css</li>
        </ul>
      </nav>
      <CodeMirror bind:value lang={javascript()} theme={oneDark} />
      <div class="fixed bottom-0 right-0 left-0 flex justify-end items-center w-full px-3 py-1">
        {#if currentFile == "main.js"}
            <button class="mr-2 px-4 py-2 bg-blue-500 text-white rounded" on:click={()=>saveCode("main.js")}>
            Save
            </button>
            <button class="px-4 py-2 bg-red-500 text-white rounded" on:click={()=>deleteCode("main.js")}>
            Delete
            </button>
        {:else if currentFile == "utils.js"}
            <button class="mr-2 px-4 py-2 bg-blue-500 text-white rounded" on:click={()=>saveCode("utils.js")}>
            Save
            </button>
            <button class="px-4 py-2 bg-red-500 text-white rounded" on:click={()=>deleteCode("utils.js")}>
            Delete
            </button>
        {:else if currentFile == "styles.css"}
            <button class="mr-2 px-4 py-2 bg-blue-500 text-white rounded" on:click={()=>saveCode("styles.css")}>
            Save
            </button>
            <button class="px-4 py-2 bg-red-500 text-white rounded" on:click={()=>deleteCode("styles.css")}>
            Delete
            </button>
        {/if}
      </div>
    </div>
  </div>
  <!-- <div class="flex">
    <div class="w-screen h-screen bg-[#282c34] flex flex-col">
      <nav class="bg-gray-800 p-4">
        <ul class="flex gap-2">
          <li class="px-4 py-2.5 rounded-md bg-gray-900 text-white" on:click={() => changeFile("main.js")}>main.js</li>
          <li class="px-4 py-2.5 rounded-md bg-gray-900 text-white" on:click={() => changeFile("utils.js")}>utils.js</li>
          <li class="px-4 py-2.5 rounded-md bg-gray-900 text-white" on:click={() => changeFile("styles.css")}>styles.css</li>
        </ul>
        <ul class="flex">
          <li
            class="mr-2 px-4 py-2 bg-gray-900 text-white rounded cursor-pointer"
            class:selected={currentFile === "main.js"}
            on:click={() => changeFile("main.js")}
          >
            main.js
          </li>
          <li
            class="mr-2 px-4 py-2 bg-gray-900 text-white rounded cursor-pointer"
            class:selected={currentFile === "utils.js"}
            on:click={() => changeFile("utils.js")}
          >
            utils.js
          </li>
          <li
            class="mr-2 px-4 py-2 bg-gray-900 text-white rounded cursor-pointer"
            class:selected={currentFile == "styles.css"}
            on:click={() => changeFile("styles.css")}
          >
            styles.css
          </li>
        </ul>
      </nav>
      <div class="flex-grow">
        <CodeMirror bind:value lang={javascript()} theme={oneDark} />
      </div>
      <div class="flex justify-end py-2 px-4">
          {#if currentFile == "main.js"}
              <button class="mr-2 px-4 py-2 bg-blue-500 text-white rounded" on:click={()=>saveCode("main.js")}>
              Save
              </button>
              <button class="px-4 py-2 bg-red-500 text-white rounded" on:click={()=>deleteCode("main.js")}>
              Delete
              </button>
          {:else if currentFile == "utils.js"}
              <button class="mr-2 px-4 py-2 bg-blue-500 text-white rounded" on:click={()=>saveCode("utils.js")}>
              Save
              </button>
              <button class="px-4 py-2 bg-red-500 text-white rounded" on:click={()=>deleteCode("utils.js")}>
              Delete
              </button>
          {:else if currentFile == "styles.css"}
              <button class="mr-2 px-4 py-2 bg-blue-500 text-white rounded" on:click={()=>saveCode("styles.css")}>
              Save
              </button>
              <button class="px-4 py-2 bg-red-500 text-white rounded" on:click={()=>deleteCode("styles.css")}>
              Delete
              </button>
          {/if}
      </div>
    </div>
  </div> -->

<style>
  ::-webkit-scrollbar{
	 	height:0px;
		width: 0px;
	}
	::-webkit-scrollbar-thumb{
		background: rgb(202, 202, 202);
		border-radius: 10px;
	}
</style>


  
  