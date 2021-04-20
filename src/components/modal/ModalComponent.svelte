<script lang="ts">
	/**
	 * Component lives here because it is system-level singleton strictly attached to App.svelte
	 */
	import {onDestroy} from 'svelte';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import type {TSuperModal} from './modal-helper';
	import {prepareSuperModal} from './modal-helper';

	export const closeButton = true;
	export const closeOnEsc = true;
	export const closeOnOuterClick = true;
	export const componentProps = {};

	let Component = null;
	let props = null;

	let handler: TSuperModal;
	let scrollPos;

	const open = (NewComponent: unknown, newProps = {}) => {
		scrollPos = document.documentElement.scrollTop;
		Component = NewComponent;
		props = newProps;

		const waitDiv: HTMLDivElement = document.querySelector('#app-full-screen-message');
		waitDiv.className = 'modal-like active';
		document.body.classList.add('no-scroll');

		// remove focus from main page and put it to the trap or first focusable item
		handler = prepareSuperModal(
			close,
			props.closeOnEsc ?? true,
			props.closeOnOuterClick ?? true
		);
	};

	const close = () => {
		Component = null;
		props = null;

		const waitDiv: HTMLDivElement = document.querySelector('#app-full-screen-message');
		if (waitDiv) {
			waitDiv.onclick = null;
			waitDiv.className = '';
			document.body.classList.remove('no-scroll');
		}

		document.documentElement.scrollTop = scrollPos;

		if (handler) {
			document.removeEventListener('keydown', handler);
		}
	};

	const handleInnerClick = (event: MouseEvent) => {
		event.stopPropagation();
		event.stopImmediatePropagation();
		event.preventDefault();

		return false;
	};

	// assign instance to store, App will re-attach it to context: getContext('AppState').modal
	AppStateStore.setModal(open, close);

	// close on location change
	let oldPath = '';
	const appStateUnsubscribe = AppStateStore.subscribe(value => {
		if (oldPath !== value.path) {
			oldPath = value.path;
			close();
		}
	});

	onDestroy(() => {
		appStateUnsubscribe();
	});
</script>

<div id="app-full-screen-message">
	{#if Component}
		<div class={'modal-like-content' + (props.extraClass ? ' ' + props.extraClass: '')} on:click={handleInnerClick}>
			{#if props.closeButton}
				<div class='modal-close-button' on:click={close}>&times;</div>
			{/if}
			<svelte:component this={Component} {...props.componentProps}/>
		</div>
	{/if}
	<input type='text' id='app-blur-control'/>
</div>

<style lang="less">
	:global {
		@import "modal.less";
	}
</style>
