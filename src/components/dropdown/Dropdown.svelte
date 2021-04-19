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
	});
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
	@import "dropdown.less";
</style>
