<script lang="ts">
import Preview from "../preview.svelte";
import { onMount } from "svelte";
import { getNext } from "./addressStore";
import Slotmachine from "../slotmachine.svelte";


    onMount(async () => {
        var entry =  getNext();
        while (entry.name.length>0){
            console.log(entry.name);
            entry =  getNext();
        }})
        
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Slotmachine />
