<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {clickOutside} from '../../utils/click-outside';

	import {stateStore} from './dropdown-store';

	export let title = '';
	export let className = '';
	export let onActiveChange: (activate: boolean) => void;
	export let onActiveChanged: (open: boolean) => void;
	export const close = () => {
		setInactive();
	};

	let storeUnsubscribe$;

	let active = false;
	let openTimeout;

	const setActive = () => {
		stateStore.set(true);

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
		stateStore.set(false);

		onActiveChange && onActiveChange(false);
		active = false;
		clearTimeout(openTimeout);
		if (onActiveChanged) {
			openTimeout = setTimeout(() => {
				onActiveChanged && onActiveChanged(false);
			}, 250);
		}
	};

	const toggleActive = () => {
		if (active) {
			setInactive();
		} else {
			setActive();
		}
	}

	const onKeypress = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			toggleActive();
			e.preventDefault();
			return false;
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
		storeUnsubscribe$ = stateStore.subscribe(v => {
			if (v) {
				setInactive();
			}
		});
	});

	onDestroy(() => {
		document.removeEventListener('visibilitychange', onPageVisibilityChanged);
		storeUnsubscribe$ && storeUnsubscribe$();
		clearTimeout(openTimeout);
	})
</script>

<div class={'dropdown-container' + (active ? ' active' : '') + (className ? ' ' + className : '')}
     use:clickOutside on:click_outside={handleClickOutside}>
	<div class="dc-title" tabindex="0"
	     on:keypress={onKeypress}
	     on:click={toggleActive}>
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
	:global {
		.dropdown-container {
			position: relative;
			min-height: 1em;

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
				display: flex;
				flex-flow: row nowrap;
				height: 1em;
				align-items: center;
				align-content: center;

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

				&:focus {
					text-decoration: underline;
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
					z-index: 1000;
					opacity: 1;
					transform: scaleY(1);
				}
			}
		}
	}
</style>
