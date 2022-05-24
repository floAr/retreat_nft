<script lang="ts">
import Preview from "../preview.svelte";
import { onMount } from "svelte";
import { getNext } from "./addressStore";
import Slotmachine from "../slotmachine.svelte";

let isRolling = true;

    onMount(async () => {
        var entry =  getNext();
        while (entry.name.length>0){
            console.log(entry.name);
            entry =  getNext();
        }})
    const stopRolling = ()=>{
        isRolling = false;
    } 
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Slotmachine  isRolling={isRolling}/>
{isRolling}
<button on:click={(_) => {stopRolling()}}>Stop</button>
