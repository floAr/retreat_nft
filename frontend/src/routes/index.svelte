<script lang="ts">
	import { fade } from 'svelte/transition';
	import Slotmachine from '../slotmachine.svelte';
	import { onMount } from 'svelte';
	import { getNext } from './addressStore';
	import { genomes } from '../genomes';
	export let name: string;
	export let address: string;
    let tokenId:number;

	let ear = 0;
	let eye = 0;
	let nose = 0;
	let mouth = 0;
	let hat = 0;

	type Status = 'uninitialized' | 'pendingMint' | 'success' | 'failure';

	let status: Status = 'success';
	let rolling = true;

	onMount(async () => {});

	const goNext = () => {
		status = 'uninitialized';
		rolling = true;
		var next = getNext();
		name = next.name;
		address = next.address;
        tokenId = next.tokenId;

		(ear = genomes[next.tokenId][0]),
			(eye = genomes[next.tokenId][1]),
			(nose = genomes[next.tokenId][2]),
			(mouth = genomes[next.tokenId][3]),
			(hat = genomes[next.tokenId][4]);
	};

	// get name from svelte load function
	const mintNow = async () => {
		status = 'pendingMint';
		try {
			// await new Promise((resolve) => setTimeout(resolve, 4000));
			// await fetch('/mint/' + address);
			await fetch('/mint/' + '0x2BED8372eDA95D442Da8B5cafd878e3C8B977634');

			rolling = false;
			status = 'success';
		} catch (error) {
			status = 'failure';
		}
	};
</script>

<img class="nifty-logo" src="nifty-logo.png" />
<h1>Chunkz</h1>

<Slotmachine
    tokenId={tokenId}
	isRolling={rolling ? 'Rolling' : 'Stopping'}
	earTarget={ear}
	eyeTarget={eye}
	hatTarget={hat}
	mouthTarget={mouth}
	noseTarget={nose}
/>

<div class="traits-area">
	<div class="trait">
		<!-- <span>Hat</span> -->
		<div class="trait-viewer" />
	</div>
	<div class="trait">
		<!-- <span>Eyes</span> -->
		<div class="trait-viewer" />
	</div>
	<div class="trait">
		<!-- <span>Ears</span> -->
		<div class="trait-viewer" />
	</div>
	<div class="trait">
		<!-- <span>Nose</span> -->
		<div class="trait-viewer" />
	</div>
	<div class="trait">
		<!-- <span>Mouth</span> -->
		<div class="trait-viewer" />
	</div>
</div>

<h2 transition:fade>Hey {name}! ({address})</h2>
<h3>Get in loser, we're minting Chunkz!</h3>

<div class="spinner-box">
	{#if status === 'pendingMint'}
		<!-- SPINNING SQUARES -->
		<div class="configure-border-1">
			<div class="configure-core" />
		</div>
		<div class="configure-border-2">
			<div class="configure-core" />
		</div>
	{/if}

	{#if status === 'uninitialized'}
		<button
			class="mintbtn btn"
			on:click={async (_) => {
				await mintNow();
			}}>Mint your Chunk</button
		>
	{:else if status === 'success'}
		<button on:click={() => goNext()} class="btn">Next</button>
	{/if}
</div>

<style>
	.nifty-logo {
		width: 80px;
	}
	.traits-area {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn {
		background-color: #e87aff;
		color: #fff;
		border-radius: calc(97px / 2);
		height: 80px;
        width: 30vw;
		padding: 0px 24px;
		border: none;
		display: inline-block;
		margin-bottom: 40px;
	}
	.btn:hover {
		background-color: #cf6ce4;
		cursor: pointer;
	}

	.spinner-box {
		width: 100%;
		height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
	}

	/* X-ROTATING BOXES */

	.configure-border-1 {
		width: 115px;
		height: 115px;
		padding: 3px;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(255, 108, 248);
		animation: configure-clockwise 3s ease-in-out 0s infinite alternate;
	}

	.configure-border-2 {
		width: 115px;
		height: 115px;
		padding: 3px;
		left: -115px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(63, 249, 220);
		transform: rotate(45deg);
		animation: configure-xclockwise 3s ease-in-out 0s infinite alternate;
	}

	.configure-core {
		width: 100%;
		height: 100%;
		background-color: transparent;
	}

	@keyframes configure-clockwise {
		0% {
			transform: rotate(0);
		}
		25% {
			transform: rotate(90deg);
		}
		50% {
			transform: rotate(180deg);
		}
		75% {
			transform: rotate(270deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes configure-xclockwise {
		0% {
			transform: rotate(45deg);
		}
		25% {
			transform: rotate(-45deg);
		}
		50% {
			transform: rotate(-135deg);
		}
		75% {
			transform: rotate(-225deg);
		}
		100% {
			transform: rotate(-315deg);
		}
	}
</style>
