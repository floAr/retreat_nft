<script lang="ts">
	import { onMount } from 'svelte';

	export let trait: string;
	export let total: number;
	export let rolling: boolean;
	let images: string[] = [];
	const basePath = `/traits/${trait}/`;
	let current = 0;
	export let target: number;

	onMount(async () => {
		// generate images
		for (let i = 0; i < total; i++) {
			images.push(`${basePath}${i.toString()}.png`);
		}
		console.log(images);
		images = [...images];

		// get next image every 1 second
		setInterval(() => {
			if (rolling) {
				current = (current + 1) % total;
				console.log(images);
			} else {
				current = target;
			}
		}, 100);
	});
</script>

<!-- show current image -->
<img class={rolling ? 'rolling' : 'stopped'} src={images[current]} />

<style>
	/* image size */
	img {
		width: 15vw;
		height: auto;
		/* border  */
	}
	.rolling {
		border: 2px solid red;
		animation: shake 0.5s;
		/* When the animation is finished, start again */
		animation-iteration-count: infinite;
	}
	.stopped {
		border: 2px solid green;
		animation: none;
	}

	@keyframes shake {
		0% {
			transform: rotate(2deg);
		}



		50% {
			transform: rotate(-2deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
</style>
