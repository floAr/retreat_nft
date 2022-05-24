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
		// spin(1);
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

    const getSpin =()=>{
        if(total===11){
            return 'spin11'
        }
       if(total===9)
         {
              return 'spin9'
         }
         if(total===8)
         {
              return 'spin8'
         }
        if(total===7)
         {
              return 'spin7'
         }
    }
</script>

<!-- show current image -->
<!-- {#if !rolling}
    <img class="rolling" src={images[target]} />
{:else} -->
<div class="trait">
<span>{trait.toUpperCase()}</span>
<div id="viewbox">
	<div class={`wrapper ${getSpin()} ${rolling?'rolling':'stopped'}`} id="slotmachine">
		<ul>
			{#each images as image}
				<li>
					<img src={image} />
				</li>
			{/each}
			<li>
				<img src={rolling?images[0]:images[target]} />
			</li>
		</ul>
	</div>
</div>
</div>
<!-- {/if} -->
<style>
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
	#viewbox {
		overflow: hidden;
		width: 300px;
		height: 400px;
		border: solid 1px #000;
		position: relative;
        background-color: #fff;
	}
	#viewbox .wrapper {
		position: relative;
	}
	#viewbox ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	#viewbox li {
		display: block;
		width: 300px;
		height: 100%;
		text-align: center;
		font-size: 170px;
	}

	
	#slotmachine {
		/* animate slotmachine */		
		

		animation-timing-function: linear;
	}

    .rolling{
        animation-iteration-count: infinite;
    }

    .stopped{
        animation-iteration-count: 0;
    }

	img {
        max-width: 300px;
        max-height: 500px;
		width: 100%;
		height: auto;
	}

   
    @keyframes spin11 {
		from {
			top: -4800px;
		}
		to {
			top: 0px;
		}
	}
    .spin11{
        animation-name: spin11;
        animation-duration: 2s;
    }

    @keyframes spin9 {
		from {
			top: -4000px;
		}
		to {
			top: 0px;
		}
	}
    .spin9{
        animation-name: spin9;
        animation-duration: 1.63s;
    }
    
    @keyframes spin8 {
        from {
            top: -3600px;
        }
        to {
            top: 0px;
        }
    }
    .spin8{
        animation-name: spin8;
        animation-duration: 1.45s;
    }

    @keyframes spin7 {
        from {
            top: -3200px;
        }
        to {
            top: 0px;
        }
    }
    .spin7{
        animation-name: spin7;
        animation-duration: 1.27s;
    }




</style>
