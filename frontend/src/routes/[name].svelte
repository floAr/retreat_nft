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

	onMount(async () => {

	});

	// get name from svelte load function
	const mintNow = async () => {
		
	};
</script>

<h1>Hey {name}!</h1>
<h2>Get ready to mint your NyftRetreatBuddy!</h2>
<h3>Your address is: {$signerAddress}</h3>

<button
	on:click={(_) => {
		mintNow();
	}}>Mint now!</button
>
