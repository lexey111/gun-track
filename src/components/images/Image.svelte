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
        transition: opacity .2s ease-out;
        width: 100%;
        border-radius: 100%;
        box-sizing: border-box;
        border: 4px solid var(--app-primary-bg);
    }

    img.loaded {
        opacity: 1;
    }
</style>

<img {src} {alt} class:loaded bind:this={thisImage}/>
