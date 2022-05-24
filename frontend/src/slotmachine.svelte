<script lang="ts">
   import { ConfettiExplosion } from 'svelte-confetti-explosion'
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Preview from './preview.svelte';

	const ipfsBaseHash =
		'https://expansionpunks.mypinata.cloud/ipfs/bafybeidytvy5skqfaauow6nxnbboeyxt6gch6c4g6to2edkhwuzf52gwwa/';

    export let tokenId:number;

	export let isRolling: 'Rolling' | 'Stopping' | 'Final' = 'Rolling';

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
			if (isRolling === 'Stopping') {
				if (eyeRolling) {
					eyeRolling = false;
				} else if (earRolling) {
					earRolling = false;
				} else if (noseRolling) {
					noseRolling = false;
				} else if (mouthRolling) {
					mouthRolling = false;
				} else if (hatRolling) {
					hatRolling = false;
				} else {
					isRolling = 'Final';
                    confetti.render();
				}
			} else {
				eyeRolling = true;
				earRolling = true;
				noseRolling = true;
				mouthRolling = true;
				hatRolling = true;
			}
		}, 500);
	});
</script>

<!-- 5 preview next to each other -->
<div class="previews trait-viewer" >
	{#if isRolling !== 'Final'}
		<Preview trait="eyes" total={11} target={eyeTarget} rolling={eyeRolling} />
		<Preview trait="ears" total={8} target={earTarget} rolling={earRolling} />
		<Preview trait="nose" total={7} target={noseTarget} rolling={noseRolling} />
		<Preview trait="mouth" total={7} target={mouthTarget} rolling={mouthRolling} />
		<Preview trait="hat" total={9} target={hatTarget} rolling={hatRolling} />
	{:else}
		<img src={`${ipfsBaseHash}${tokenId}.png`} class="final" in:fly="{{ y: 200, duration: 2000 }}" out:fade />
        <div class="confetti">

            <ConfettiExplosion />
        </div>
	{/if}
</div>

<style>
	.previews {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		/* width: 100%; */
		padding: 4em;
	}
	.final {
		height: 400px;
		width: 300px;
	}
    .confetti {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        /* center my children */
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
</style>
