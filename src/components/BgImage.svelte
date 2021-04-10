<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {unsafeDebounce} from '../utils/debounce';

	const minNumber = 1;
	const maxNumber = 8;

	function getRandomImageNum(): number {
		return Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
	}

	let firstImageNum = 0;
	let secondImageNum = 0;

	let firstLoaded = false;
	let secondLoaded = false;
	let firstFideOut = false;
	let secondFideOut = false;
	let firstTop = 0;
	let secondTop = 0;

	let firstImage;
	let secondImage;
	let phase = 1;

	let imageUpdater;
	let firstDelay;

	function updateWindowsSize() {
		const height1 = firstImage.height;
		const wHeight = document.documentElement.clientHeight;
		const top1 = Math.floor((height1 - wHeight) / 2);
		firstTop = top1 ? 0 - top1 : 0;

		const height2 = secondImage.height;
		const top2 = Math.floor((height2 - wHeight) / 2);
		secondTop = top2 ? 0 - top2 : 0;
	}

	const debouncedResize = unsafeDebounce(updateWindowsSize);

	function updateImages() {
		let nm = getRandomImageNum();
		while (nm === firstImageNum || nm === secondImageNum) {
			nm = getRandomImageNum();
		}
		// set state
		if (phase === 1) {
			secondImageNum = nm;
			secondLoaded = false;
		} else {
			firstImageNum = nm;
			firstLoaded = false;
		}
		// next tick
		if (phase === 1) {
			phase = 2;
		} else {
			phase = 1;
		}
	}

	onMount(() => {
		firstImage.onload = () => {
			firstFideOut = false;
			secondFideOut = true;
			firstLoaded = true;
			secondLoaded = false;

			updateWindowsSize();
		}

		secondImage.onload = () => {
			firstFideOut = true;
			secondFideOut = false;
			secondLoaded = true;
			firstLoaded = false;

			updateWindowsSize();
		}

		window.addEventListener('resize', debouncedResize);

		imageUpdater = setInterval(updateImages, 5 * 60 * 1000); // each 5 minutes

		firstDelay = setTimeout(() => {
			updateImages();
		}, 1000);
	});

	onDestroy(() => {
		window.removeEventListener('resize', debouncedResize);

		clearTimeout(firstDelay);
		clearInterval(imageUpdater);
	});

</script>

<div id="app-bg-image">
	<img src={firstImageNum > 0? '/images/bg-' + firstImageNum + '.jpg' : ''} alt=""
	     class={(firstLoaded ? 'loaded' : '') + (firstFideOut ? ' fade-out' : '')}
	     style="top: {firstTop}px"
	     bind:this={firstImage}>

	<img src={secondImageNum > 0? '/images/bg-' + secondImageNum + '.jpg' : ''} alt=""
	     class={(secondLoaded ? 'loaded' : '') + (secondFideOut ? ' fade-out' : '')}
	     style="top: {secondTop}px"
	     bind:this={secondImage}>
</div>

<style lang="less">
	#app-bg-image {
		z-index: -1;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		img {
			opacity: 0;
			transition: opacity 1s ease-out;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}

		img.loaded {
			opacity: 1;
		}

		img.fade-out {
			opacity: 0;
		}
	}
</style>
