<script>
	export let src;
	export let alt;

	import {onMount} from 'svelte';

	let loaded = false;
	let thisImage;

	onMount(() => {
		thisImage.onload = () => {
			loaded = true;
		}
	});

</script>

<style>
    img {
        opacity: 0;
        transition: opacity 1.2s ease-out;
	     width: 100%;
    }

    img.loaded {
        opacity: 1;
    }
</style>

<img {src} {alt} class:loaded bind:this={thisImage}/>
