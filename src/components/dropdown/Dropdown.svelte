<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {clickOutside} from '../../utils/click-outside';

	export let title = '';
	export let onActiveChange: (activate: boolean) => void;
	export let onActiveChanged: (open: boolean) => void;
	export const close = () => {
		setInactive();
	};

	let active = false;
	let openTimeout;

	const setActive = () => {
		onActiveChange && onActiveChange(true);
		active = true;
		clearTimeout(openTimeout);
		if (onActiveChanged) {
			openTimeout = setTimeout(() => {
				onActiveChanged && onActiveChanged(true);
			}, 250);
		}
	};

	const setInactive = () => {
		onActiveChange && onActiveChange(false);
		active = false;
		clearTimeout(openTimeout);
		if (onActiveChanged) {
			openTimeout = setTimeout(() => {
				onActiveChanged && onActiveChanged(false);
			}, 250);
		}
	};

	function handleClickOutside() {
		setInactive();
	}

	function onPageVisibilityChanged() {
		setInactive();
	}

	onMount(() => {
		document.addEventListener('visibilitychange', onPageVisibilityChanged);
	});

	onDestroy(() => {
		document.removeEventListener('visibilitychange', onPageVisibilityChanged);
		clearTimeout(openTimeout);
	})
</script>

<div class={'dropdown-container' + (active ? ' active' : '')} use:clickOutside on:click_outside={handleClickOutside}>
	<div class="dc-title" tabindex="0" on:click={setActive}>
		{#if title}
			{title}
		{:else }
			<slot name="title"></slot>
		{/if}
		<i></i>
	</div>
	<div class="dc-dropdown-wrapper">
		<div class="dc-dropdown-content">
			<slot></slot>
		</div>
	</div>
</div>

<style lang="less">
	.dropdown-container {
		position: relative;
		height: 1em;

		hr {
			margin: 0 0 8px 0;
			padding: 0;
		}

		.dc-title {
			cursor: pointer;
			color: var(--app-link-text);
			transition: all .2s ease;
			position: relative;
			padding-right: 10px;
			outline: none;

			i {
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 6px 3px 0 3px;
				position: absolute;
				right: 0;
				top: 50%;
				margin-top: -3px;
				border-color: var(--app-link-text) transparent transparent transparent;
				transition: all .2s ease;
				transform-origin: center center;
			}
		}

		.dc-dropdown-wrapper {
			position: absolute;
			top: 100%;
			margin-top: 2px;
			right: -2px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
			background-color: var(--app-page-background);
			padding: 8px 16px;
			border-radius: 6px;
			pointer-events: none;
			opacity: 0;
			z-index: -1;
			transition: all .2s ease;
			transform-origin: top right;
			transform: scaleY(.5);
		}

		&.active, &:focus {
			.dc-title {
				color: var(--app-link-text-active);

				i {
					transform: rotate(180deg);
					border-color: var(--app-link-text-active) transparent transparent transparent;

				}

				&:focus {
					outline: none;
				}
			}

			.dc-dropdown-wrapper {
				pointer-events: all;
				z-index: 100;
				opacity: 1;
				transform: scaleY(1);
			}
		}
	}
</style>
