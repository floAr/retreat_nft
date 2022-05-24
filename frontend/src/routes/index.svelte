<script context="module">
	export async function load({ fetch, params }) {
		const { name } = params;
		return { props: { name: name } };
	}
</script>

<script lang="ts">
	import Slotmachine from '../slotmachine.svelte';
	import { onMount } from 'svelte';

	import {
		connected,
		provider,
		chainId,
		signer,
		signerAddress,
		contracts,
		defaultEvmStores
	} from 'svelte-ethers-store';
	import { getNext } from './addressStore';
	import { genomes } from '../genomes';
	export let name: string;
	export let address: string;
	let genome: { ear: number; eye: number; nose: number; mouth: number; hat: number };

	type Status = 'uninitialized' | 'pendingMint' | 'success' | 'failure';

	let status: Status = 'success';

	onMount(async () => {
		console.log(genomes);
	});

	const goNext = () => {
		var next = getNext();
		name = next.name;
		address = next.address;

		genome = {
			ear: genomes[next.tokenId][0],
			eye: genomes[next.tokenId][1],
			nose: genomes[next.tokenId][2],
			mouth: genomes[next.tokenId][3],
			hat: genomes[next.tokenId][4]
		};
		status = 'uninitialized';
	};

	// get name from svelte load function
	const mintNow = async () => {
		status = 'pendingMint';
		try {
			// mint
			// wait 4 seconds
			await new Promise((resolve) => setTimeout(resolve, 4000));
			status = 'success';
		} catch (error) {
			status = 'failure';
		}
	};
</script>

<img class="nifty-logo" src="nifty-logo.png" />
<h1>Chunkz</h1>

<Slotmachine isRolling={true} />

<div class="traits-area">
	<div class="trait">
		<span>Hat</span>
		<div class="trait-viewer" />
	</div>
	<div class="trait">
		<span>Eyes</span>
		<div class="trait-viewer" />
	</div>
	<div class="trait">
		<span>Ears</span>
		<div class="trait-viewer" />
	</div>
	<div class="trait">
		<span>Nose</span>
		<div class="trait-viewer" />
	</div>
	<div class="trait">
		<span>Mouth</span>
		<div class="trait-viewer" />
	</div>
</div>

<h2>Hey {name}!</h2>
<h3>Get in loser, we're minting Chunkz!</h3>

{#if status === 'pendingMint'}
	<p>Rolling...</p>
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

<h3 style="margin-bottom: 16px;">Wallet Address</h3>
<p style="margin:0px;">{address}</p>

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
		height: 48px;
		padding: 0px 24px;
		border: none;
		display: inline-block;
		margin-bottom: 40px;
	}
	.btn:hover {
		background-color: #cf6ce4;
		cursor: pointer;
	}
</style>
