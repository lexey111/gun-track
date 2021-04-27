<script type="ts">
	export let src: string;
	export let alt: string;
	export let onError: () => void = null;
	export let onLoad: () => void = null;

	import {onMount} from 'svelte';

	let loaded = false;
	let thisImage: any;

	onMount(() => {
		thisImage.onload = () => {
			loaded = true;
			onLoad && onLoad();
		}

		thisImage.onerror = () => {
			loaded = false;
			onError && onError();
		}
	});
</script>

<style lang="less">
	:global {
		.app-img {
			opacity: 0;

			&.loaded {
				// opacity: 1;
				animation-name: image-appear;
				animation-fill-mode: forwards;
				animation-duration: .4s;
				animation-timing-function: linear;
			}
		}

		@keyframes image-appear {
			0% {
				opacity: 0;
				// transform: scaleY(.9);
			}
			100% {
				opacity: 1;
				// transform: scaleY(1);
			}
		}
	}
</style>

<img {src} {alt}
     class={'app-img' + (loaded ? ' loaded' : '') + ($$props.class ? ' ' + $$props.class : '')}
     bind:this={thisImage}/>
