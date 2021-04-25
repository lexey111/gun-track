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

<style lang="less">
	:global {
		.app-img {
			opacity: 0;

			&.loaded {
				opacity: 1;
				animation-play-state: running;
				animation-name: image-appear;
				animation-duration: .4s;
				animation-timing-function: ease-in-out;
			}
		}

		@keyframes image-appear {
			0% {
				opacity: 0;
				transform: translateY(15px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}
</style>

<img {src} {alt}
     class={'app-img' + (loaded ? ' loaded' : '') + ($$props.class ? ' ' + $$props.class : '')}
     bind:this={thisImage}/>
