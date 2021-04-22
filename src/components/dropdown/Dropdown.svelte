<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {clickOutside} from '../../utils/click-outside';
	import Icon from '../icons/Icon.svelte';

	import {stateStore} from './dropdown-store';

	export let title = '';
	export let className = '';
	export let onActiveChange: (activate: boolean) => void;
	export let onActiveChanged: (open: boolean) => void;

	export const close = () => {
		setInactive();
	};

	export let dropdown: any;

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
	<div class="dc-title" tabindex="0" bind:this={dropdown}
	     on:keypress={onKeypress}
	     on:click={toggleActive}>
		<span>
		{#if title}
			{title}
		{:else }
			<slot name="title"></slot>
		{/if}
		</span>
		<Icon type="down" size=".7em" class="dc-down"/>
	</div>

	{#if (active)}
		<div class="dc-dropdown-wrapper">
			<div class="dc-dropdown-content">
				<slot></slot>
			</div>
		</div>
	{/if}
</div>

<style lang="less">
	:global {
		.dropdown-container {
			position: relative;
			min-height: 1em;

			.dc-title {
				cursor: pointer;
				color: var(--app-link-text);
				transition: background-color .2s ease, opacity .2s ease, color .2s ease, box-shadow .2s ease;
				position: relative;
				outline: none;
				display: flex;
				flex-flow: row nowrap;
				height: 1em;
				align-items: center;
				align-content: center;

				span {
					overflow: hidden;
				}

				svg.dc-down {
					display: inline-block;
					padding: 0 .4em;
					margin-top: 2px;
					margin-left: auto;
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
				right: -2px;
				box-shadow: 0 2px 8px rgba(0, 0, 0, .4);
				background-color: var(--app-white-bg);
				padding: 8px 16px;
				border-radius: 6px;
				pointer-events: none;
				opacity: 0;
				z-index: -1;
				transition: all .1s ease;
				transform-origin: top right;
				transform: scaleY(.5);
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

			&.menu {
				display: flex;
				flex-flow: row nowrap;
				height: 100%;
				align-items: center;
				align-content: center;
				position: relative;
				width: auto;

				.dc-dropdown-wrapper {
					display: flex;
					flex-flow: column nowrap;

					.dc-dropdown-content {
						display: flex;
						flex-flow: column nowrap;

						.dropdown-menu {
							display: flex;
							flex-flow: column nowrap;

							a {
								padding: 8px 16px 8px 22px;
								font-size: var(--app-small-font-size);
								color: var(--app-text);
								transition: all .2s ease;
								white-space: nowrap;
								position: relative;
								border-radius: 7px;
								line-height: 1.2;
								text-decoration: none;

								&:hover, &:focus {
									background-color: var(--app-menu-bg) !important;
									color: var(--app-menu-text);
									box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
									outline: none;
								}

								&:before {
									content: '';
									width: 16px;
									position: absolute;
									left: 6px;
									color: var(--app-menu-bg);
									transition: color .2s ease;
								}

								&.selected {
									background-color: rgba(0, 0, 0, 0.2);
									box-shadow: none;
									border: none;

									&:before {
										content: '✔';
									}

									&:hover, &:focus {
										background-color: var(--app-menu-bg);
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
			}

			&.menu-button {
				.dc-title {
					background-color: var(--app-primary-bg);
					height: 42px;
					padding: 0 12px;
					border-radius: 12px;
					color: var(--app-primary-text);
					box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
					max-width: 20em;

					svg.dc-down {
						color: var(--app-primary-text);
					}

					&:focus {
						box-shadow: 0 0 0 4px rgba(129, 34, 237, 0.4);
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
						pointer-events: none;
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
					box-shadow: 0 4px 4px rgba(0, 0, 0, .2);


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

			&.menu-button.menu-button-secondary {
				.dc-title {
					border: 2px solid var(--app-white-bg);
					box-sizing: border-box;
				}

				&.active {
					.dc-title {
						border-bottom: none;

						&:after {
							content: '';
							display: block;
							z-index: 1001;
							background-color: var(--app-primary-bg-darken);
							position: absolute;
							bottom: -4px;
							left: 0;
							right: 0;
							height: 4px;
						}
					}

					.dc-dropdown-wrapper {
						border: 2px solid var(--app-white-bg);
					}
				}
			}

			&.menu-button.menu-button-ghost {
				.dc-title {
					box-sizing: border-box;
					border: 2px solid var(--app-primary-bg-lighten);
					background-color: var(--app-white-bg);
					color: var(--app-primary-bg);
					opacity: .9;

					svg.dc-down {
						color: var(--app-primary-bg);
					}
				}

				&.active {
					.dc-title {
						border-bottom: none;

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
					}

					.dc-dropdown-wrapper {
						background-color: var(--app-white-bg);
						border: 2px solid var(--app-primary-bg-lighten);

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
