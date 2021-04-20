<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {AppStateStore} from '../../stores/app/app-state-store';
	import type {TAppLocale} from '../../stores/app/app-state-store.interface';
	import Icon from '../icons/Icon.svelte';
	import Dropdown from './Dropdown.svelte';

	let closeMenu;
	const setLocale = (locale: TAppLocale) => {
		AppStateStore.setLocale(locale);
		closeMenu();
	};

	const app_state = {locale: void 0};
	let appState$;
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
			<a href="#" on:click={() => setLocale('en-EN')} class:selected={app_state.locale === 'en-EN'}>English</a>
			<a href="#" on:click={() => setLocale('ua-UA')} class:selected={app_state.locale === 'ua-UA'}>Украинська</a>
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

					i {
						right: 8px;
						border-top-color: #fff !important;
					}

					&:focus {
						opacity: 1;
						background-color: rgba(255, 255, 255, .2);
					}
				}

				&.active, &:focus, &:hover {
					.dc-title {
						opacity: 1;
						background-color: rgba(255, 255, 255, .2);

						i {
							border-color: #fff transparent transparent transparent;
						}
					}
				}

				&.active {
					.dc-title {
						i {
							z-index: 200;
							border-width: 10px 6px 0 6px;
							top: 100%;
							margin-top: -8px;
						}
					}
				}
			}
		}
	}
</style>
