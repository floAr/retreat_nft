<script lang="ts">
import { onMount } from 'svelte';

	import Preview from './preview.svelte';

    export let isRolling = true;

	export let eyeTarget: number = 0;
	export let earTarget: number = 0;
	export let noseTarget: number = 0;
	export let mouthTarget: number = 0;
	export let hatTarget: number = 0;

	let eyeRolling = true;
	let earRolling = true;
	let noseRolling = true;
	let mouthRolling = true;
	let hatRolling = true;

    onMount(async () => {
       // check if we are rolling every second
         setInterval(() => {
              if (!isRolling) {
                  console.log(`${eyeTarget}, ${earTarget}, ${noseTarget}, ${mouthTarget}, ${hatTarget}`);
               if(eyeRolling){
                   eyeRolling = false;
               } else 
                if(earRolling){
                     earRolling = false;
                } else
                if(noseRolling){
                     noseRolling = false;
                } else
                if(mouthRolling){
                     mouthRolling = false;
                } else
                if(hatRolling){
                     hatRolling = false;
                }
              }
              else{
                eyeRolling = true;
                earRolling = true;
                noseRolling = true;
                mouthRolling = true;
                hatRolling = true;
              }
         }, 500)
    })
</script>

<!-- 5 preview next to each other -->
<div class="previews trait-viewer">
	<Preview trait="eyes" total={11} target={eyeTarget} rolling={eyeRolling} />
	<Preview trait="ears" total={8} target={earTarget} rolling={earRolling} />
	<Preview trait="nose" total={7} target={noseTarget} rolling={noseRolling} />
	<Preview trait="mouth" total={7} target={mouthTarget} rolling={mouthRolling} />
	<Preview trait="hat" total={9} target={hatTarget} rolling={hatRolling} />
</div>

<style>

    .previews {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100vw;    
    }
</style>