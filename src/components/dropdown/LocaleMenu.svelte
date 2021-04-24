<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import type {TAppLocale} from '../../stores/app/app-state-store.interface';
	import Icon from '../icons/Icon.svelte';
	import Dropdown from './Dropdown.svelte';

	let closeMenu: any;
	const setLocale = (locale: TAppLocale) => {
		AppStateStore.setLocale(locale);
		closeMenu();
	};

	const app_state = {locale: void 0};
	let appState$: any;
	onMount(() => {
		appState$ = AppStateStore.subscribe(value => {
			app_state.locale = value.locale;
		})
	});

	onDestroy(() => {
		appState$ && appState$();
	});
</script>

{#if app_state?.locale}
	<Dropdown className="locale-menu menu" bind:close={closeMenu}>
		<span slot="title">
			<Icon type="world" size="24px"/>
		</span>

		<div class="dropdown-menu">
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#" on:click={() => setLocale('en-EN')} class:selected={app_state.locale === 'en-EN'}>English</a>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#" on:click={() => setLocale('ua-UA')} class:selected={app_state.locale === 'ua-UA'}>Украинська</a>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#" on:click={() => setLocale('ru-RU')} class:selected={app_state.locale === 'ru-RU'}>Русский</a>
		</div>
	</Dropdown>
{/if}

<style lang="less">
	:global {
		.locale-menu {
			&.dropdown-container {
				.dc-title {
					color: #fff !important;
					opacity: .8;
					height: 50px;
					display: flex;
					flex-flow: row nowrap;
					align-content: center;
					align-items: center;
					padding: 0 24px 0 16px;
					border-radius: 7px;

					svg {
						color: #fff !important;
					}

					&:focus {
						opacity: 1;
						background-color: rgba(255, 255, 255, .1);
					}
				}

				&.active, &:focus, &:hover {
					.dc-title {
						opacity: 1;
						background-color: rgba(255, 255, 255, .1);

						svg {
							color: #fff;
						}
					}

					.dc-dropdown-wrapper {
						margin-top: -8px;
					}
				}
			}
		}
	}
</style>
