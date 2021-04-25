<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {clickOutside} from '../../utils/click-outside';
	import Icon from '../icons/Icon.svelte';

	import {stateStore} from './dropdown-store';

	export let title = '';
	export let isToolbar = false;
	export let left = false;
	export let className = '';
	export let onActiveChange: (activate: boolean) => void;
	export let onActiveChanged: (open: boolean) => void;

	export const close = () => {
		setInactive();
	};

	export let dropdown: any;
	let titleWidth: number;

	let storeUnsubscribe$: any;

	let active = false;
	let openTimeout: any;

	const setActive = () => {
		stateStore.set(true);

		onActiveChange && onActiveChange(true);
		active = true;
		titleWidth = dropdown.clientWidth;

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

	let dropdownClass: string;
	$: {
		dropdownClass = 'dropdown-container' +
			(active ? ' active' : '') +
			(className ? ' ' + className : '') +
			(isToolbar ? ' menu menu-button toolbar' : '') +
			(left ? ' menu-left' : '');
	}
</script>

<div class={dropdownClass}
     use:clickOutside on:click_outside={handleClickOutside}>
	<div class="dc-title" tabindex="0" bind:this={dropdown}
	     on:keypress={onKeypress}
	     on:click={toggleActive}>
		{#if title}
			{title}
		{:else }
			<slot name="title"/>
		{/if}
		<Icon type="down" size="11px" class="dc-down"/>
	</div>

	{#if (active)}
		<div class="dc-dropdown-wrapper" style="min-width: {titleWidth}px">
			<div class="dc-dropdown-content">
				<slot/>
			</div>
		</div>
	{/if}
</div>

<style lang="less">
	:global {
		.dropdown-container {
			min-height: 1em;
			flex-flow: row nowrap;
			justify-items: stretch;
			justify-content: stretch;
			padding: 0;
			margin: 0;
			display: flex;
			flex-flow: row nowrap;
			height: 100%;
			align-items: center;
			align-content: center;
			position: relative;
			width: auto;

			.dc-title {
				cursor: pointer;
				color: var(--app-link-text);
				transition: background-color .2s ease, opacity .2s ease, color .2s ease;
				position: relative;
				outline: none;
				display: flex;
				flex-flow: row nowrap;
				flex-grow: 2;
				flex-shrink: 2;
				align-items: center;
				align-content: center;
				justify-items: flex-start;
				justify-content: flex-start;

				span {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					align-content: center;
					justify-items: center;
					justify-content: center;
					padding: 0 1em 0 0;
					margin: 0;
					vertical-align: text-top;
					line-height: 1;
				}

				svg.dc-down {
					display: inline-block;
					margin: 0 0 0 auto;
					transform-origin: center center;
					transition: all .2s ease-in-out;
				}

				&:focus {
					text-decoration: underline;
				}

				&:hover, &:focus {
					opacity: 1 !important;
				}
			}

			.dc-dropdown-wrapper {
				position: absolute;
				top: 100%;
				margin-top: 2px;
				right: 0;
				box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
				background-color: var(--app-white-bg);
				padding: 8px 16px;
				border-radius: 7px;
				pointer-events: none;
				opacity: 0;
				transition: all .1s ease;
				transform-origin: top right;
				transform: scaleY(.5);
				display: flex;
				flex-flow: column nowrap;
				z-index: 1;

				.dc-dropdown-content {
					display: flex;
					flex-flow: column nowrap;

					.dropdown-menu {
						display: flex;
						flex-flow: column nowrap;

						a {
							padding: 12px 16px 12px 22px;
							font-size: var(--app-small-font-size);
							color: var(--app-text);
							transition: all .1s ease;
							white-space: nowrap;
							position: relative;
							border-radius: 7px;
							line-height: 1.2;
							text-decoration: none;

							&:hover, &:focus {
								background-color: var(--app-menu-bg-hover) !important;
								color: var(--app-menu-text-hover) !important;
								box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
								outline: none;
							}

							&:before {
								content: '';
								width: 16px;
								position: absolute;
								left: 6px;
								color: var(--app-menu-bg);
								transition: color .1s ease;
							}

							&.selected {
								background-color: rgba(0, 0, 0, 0.2);
								box-shadow: none;
								border: none;
								font-weight: bold;

								&:before {
									content: '✔';
								}

								&:hover, &:focus {
									background-color: var(--app-menu-bg) !important;
									color: var(--app-menu-text) !important;
									box-shadow: none;

									&:before {
										color: var(--app-menu-text);
										box-shadow: none;
									}
								}
							}
						}
					}
				}
			}

			&.active, &:focus {
				.dc-title {
					color: var(--app-link-text-active);

					svg.dc-down {
						transform: rotate(180deg);
						color: var(--app-link-text-active);
					}

					opacity: 1;

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

			&.menu-left {
				.dc-dropdown-wrapper {
					left: 0;
					right: unset;
				}
			}

			&.menu-button {
				.dc-title {
					background-color: var(--app-primary-bg);
					padding: 10px 24px;
					border: 2px solid transparent;
					box-sizing: content-box;
					min-height: 1em;
					border-radius: 12px;
					color: var(--app-primary-text);
					max-width: 20em;

					svg.dc-down {
						color: var(--app-primary-text);
					}

					&:focus {
						box-shadow: 0 0 0 4px rgba(255, 191, 1, 0.8);
						background-color: var(--app-primary-bg-darken);
						text-decoration: none;
					}

					&:hover {
						background-color: var(--app-primary-bg-lighten);
					}
				}

				&.active {
					.dc-title {
						border-bottom-right-radius: 0;
						border-bottom-left-radius: 0;
						background-color: var(--app-primary-bg-darken);

						svg.dc-down {
							color: var(--app-primary-text);
						}

						&:focus {
							box-shadow: none;
						}
					}
				}

				.dc-dropdown-wrapper {
					background-color: var(--app-primary-bg-darken);
					margin-top: 0;
					border-top-left-radius: 0;
					border-top-right-radius: 0;

					.dc-dropdown-content {
						.dropdown-menu {
							a {
								color: var(--app-primary-text);
								font-size: var(--app-small-font-size);

								&:hover, &:focus {
									background-color: var(--app-primary-bg-lighten);
									color: var(--app-primary-text);
								}

								&:before {
									color: var(--app-primary-text);
									opacity: .8;
								}

								&.selected {
									&:hover, &:focus {
										&:before {
											color: var(--app-primary-text);
											opacity: 1;
										}
									}
								}

							}
						}
					}
				}
			}

			&.menu-button.toolbar {
				.dc-title {
					box-sizing: border-box;
					color: var(--app-primary-bg);
					background-color: rgba(255, 255, 255, .7);
					box-shadow: 0 0 4px rgba(0, 0, 0, .4);

					svg.dc-down {
						color: var(--app-primary-bg);
					}

					&:hover, &:focus, &:focus-within {
						background-color: rgba(255, 255, 255, 1);
					}

					&:focus, &:focus-within {
						box-shadow: 0 0 0 4px rgba(255, 191, 1, 0.8);
					}
				}

				&.active {
					.dc-title {
						border-bottom-color: transparent;

						&:after {
							content: '';
							display: block;
							z-index: 1001;
							background-color: var(--app-white-bg);
							position: absolute;
							bottom: -4px;
							left: 0;
							right: 0;
							height: 4px;
						}

						&:focus, &:focus-within {
							box-shadow: none;
						}
					}

					.dc-dropdown-wrapper {
						background-color: var(--app-white-bg);
						border: none;
						border-radius: 7px;
						z-index: 1000;
						margin-top: -5px;

						.dc-dropdown-content {
							.dropdown-menu {
								a {
									color: var(--app-primary-bg);

									&:hover, &:focus {
										background-color: var(--app-primary-bg-lighten);
										color: var(--app-primary-text);
									}

									&:before {
										color: var(--app-primary-text);
									}

									&.selected {
										background-color: var(--app-primary-bg-lighten);
										color: var(--app-primary-text);

										&:hover, &:focus {
											&:before {
												color: var(--app-primary-text);
											}
										}
									}

								}
							}
						}

					}
				}
			}
		}
	}
</style>
