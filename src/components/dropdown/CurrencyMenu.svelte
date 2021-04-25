<script lang="ts">
	import {ActionCurrencies, getCurrencySign} from '../../stores/actions/actions-store.types';
	import I18n from '../i18n/I18n.svelte';
	import Dropdown from './Dropdown.svelte';

	export let currency: string;
	export let onChange: (type: string) => void;

	let closeMenu: any;
	let dropdown: any;

	const handleType = (newCurrency: string): void => {
		onChange && onChange(newCurrency);
		closeMenu();

		setTimeout(() => {
			dropdown && dropdown.focus();
		}, 200)
	};

	let currencySign: string;
	$: {
		currencySign = getCurrencySign(currency);
	}
</script>

<Dropdown className="currency-menu menu menu-button" bind:close={closeMenu} bind:dropdown={dropdown}>
		<span slot="title">
			{#if (currency)}
				<i>{currencySign}</i>
				<I18n text={'@Currencies.' + currency}/>
			{:else}
				&mdash;
			{/if}
		</span>
	<div class="dropdown-menu">
		{#each ActionCurrencies as item}
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#"
			   on:click={() => handleType(item.id)}
			   class:selected={item.id === currency}
			   tabindex="0">
				<i>
					{getCurrencySign(item.id)}
				</i>
				<I18n text={'@Currencies.' + item.id}/>
			</a>
		{/each}
	</div>
</Dropdown>

<style lang="less">
	:global {
		.currency-menu {
			&.dropdown-container {
				i {
					font-style: normal;
					opacity: .6;
					padding: 0 16px 0 0;
				}

				.dc-dropdown-wrapper {
					right: unset;
					left: 0;
					border-radius: 0 7px 7px 7px;
					min-width: 15em;
				}
			}
		}
	}
</style>
