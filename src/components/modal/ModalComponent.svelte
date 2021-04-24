<script lang="ts">
	/**
	 * Component lives here because it is system-level singleton strictly attached to App.svelte
	 */
	import {onDestroy} from 'svelte';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import Icon from '../icons/Icon.svelte';
	import type {TSuperModal} from './modal-helper';
	import {prepareSuperModal} from './modal-helper';

	export const closeButton = true;
	export const closeOnEsc = true;
	export const closeOnOuterClick = true;
	export const componentProps = {};

	let Component = null;
	let props = null;

	let handler: TSuperModal;
	let scrollPos: number;

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
				<div class='modal-close-button' on:click={close}>
					<Icon type="close" size="24px"/>
				</div>
			{/if}
			<svelte:component this={Component} {...props.componentProps}/>
		</div>
	{/if}
	<input type='text' id='app-blur-control'/>
</div>

<style lang="less">
	:global {
		#app-full-screen-message {
			display: none;
			flex-flow: row wrap;
			position: fixed;
			overflow: hidden;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100vw;
			height: 100vh;
			align-content: center;
			justify-content: center;
			align-items: center;
			justify-items: center;
			background-color: var(--app-background);
			pointer-events: all;
			z-index: -1;

			#app-blur-control {
				position: absolute;
				top: -100px;
				left: -100px;
			}

			&.active {
				display: flex;
				z-index: 1000;
				pointer-events: all;
			}

			&.modal-like {
				background-color: rgba(0, 0, 0, 0.2);
				color: var(--app-text);
				font-size: var(--app-font-size);
				opacity: .98;
				backdrop-filter: blur(6px);
				-webkit-backdrop-filter: blur(6px);
				display: flex;
				flex-flow: row nowrap;
				align-content: center;
				align-items: center;
				align-self: center;
				justify-content: center;
				justify-items: center;
				justify-self: center;

				.modal-like-content {
					display: flex;
					flex-flow: column wrap;
					z-index: 10;
					position: relative;
					box-shadow: 0 0 18px rgba(0, 0, 0, .3);
					border-radius: 17px;

					.modal-close-button {
						position: absolute;
						border-top-right-radius: 17px;
						right: 0;
						top: 0;
						cursor: pointer;
						color: var(--app-primary-text);
						transition: all .2s ease;
						padding: 16px 16px 8px 16px;
						line-height: 1;

						&:hover {
							transform: scale(1.2);
						}
					}

					.modal-header {
						border-radius: 17px 17px 0 0;
						width: 100%;
						font-size: var(--app-big-font-size);
						background-color: var(--app-primary-bg);
						color: var(--app-primary-text);
						padding: 16px 0;
						box-sizing: border-box;
						border-left: 32px solid transparent; // instead of padding
						border-right: 32px solid transparent;
						display: flex;
						flex-flow: row nowrap;
						align-items: flex-end;
						align-content: flex-end;
					}

					.modal-content {
						//max-height: 70vh;
						//overflow-y: auto;
						background-color: var(--app-background);

						.modal-content-wrapper {
							padding: 32px;
							min-width: 100px;
							min-height: 50px;
							max-width: 70vw;
							max-height: 70vh;
							overflow: auto;
						}
					}

					.modal-footer {
						background-color: var(--app-background);
						border-radius: 0 0 17px 17px;
						width: 100%;
						padding: 16px 0;
						box-sizing: border-box;
						border-left: 16px solid transparent; // instead of padding
						border-right: 16px solid transparent;
						display: flex;
						flex-flow: row nowrap;
						justify-content: flex-end;

						button {
							margin-left: .4em;
						}
					}
				}
			}
		}

		@-moz-document url-prefix() {
			// trick for firefox which does not support backdrop blur
			#app-full-screen-message.modal-like {
				background-color: rgba(127, 127, 127, .5);
				color: var(--app-text);
				font-size: var(--app-font-size);
				opacity: 1;
			}
		}

	}
</style>
