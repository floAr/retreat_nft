<script context="module">
	export async function load({ fetch, params }) {
		const { name } = params;
		return { props: { name: name } };
	}
</script>

<script lang="ts">
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
	export let name: string;
	export let address: string;

	type Status = "uninitialized" | "pendingMint" | "success" | "failure"

	let status:Status = 'uninitialized'

	onMount(async () => {

	});

	// get name from svelte load function
	const mintNow = async () => {
		status="pendingMint"
		try {
			// mint
			status="success"
		} catch (error) {
			status="failure"
		}
	};
</script>

<style>
	.nifty-logo {
			width: 80px;
	}
	.traits-area {
			display: flex;
			justify-content: center;
			align-items: center;
	}
	.trait {
			margin: 0px 20px;
	}
	.trait span {
			display: inline-block;
			color: #3E4353;
			margin-bottom: 8px;
	}
	.trait-viewer {
			width: 250px;
			height: 350px;
			border: 2px solid #fff;
			border-radius: 10px;
	}
	.btn{
			background-color: #E87AFF;
			color: #fff;
			border-radius: calc(97px / 2);
			height: 48px;
			padding: 0px 24px;
			border: none;
			display: inline-block;
			margin-bottom: 40px;
	}
	.btn:hover {
			background-color: #CF6CE4;
			cursor: pointer;
	}
</style>
	<img class="nifty-logo" src="../static/nifty-logo.png">
	<h1>Chunkz</h1>

	<div class="traits-area">
			<div class="trait">
					<span>Hat</span>
					<div class="trait-viewer"></div>
			</div>
			<div class="trait">
					<span>Eyes</span>
					<div class="trait-viewer"></div>
			</div>
			<div class="trait">
					<span>Ears</span>
					<div class="trait-viewer"></div>
			</div>
			<div class="trait">
					<span>Nose</span>
					<div class="trait-viewer"></div>
			</div>
			<div class="trait">
					<span>Mouth</span>
					<div class="trait-viewer"></div>
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
	on:click={(_) => {
			mintNow();
	}}>Mint your Chunk</button
>
{:else if status === 'success'}
	<button class="btn">Next</button>
{/if}

<h3 style="margin-bottom: 16px;">Wallet Address</h3>
<p style="margin:0px;">{$signerAddress}</p>

