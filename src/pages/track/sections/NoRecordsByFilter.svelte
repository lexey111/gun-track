<script lang="ts">
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import type {Gun} from '../../../models';
	import {ActionsStore} from '../../../stores/actions/actions-store';
	import type {TActionsState} from '../../../stores/actions/actions-store.interface';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import type {TGunsState} from '../../../stores/guns/guns-store.interface';
	import GunsMenu from './GunsMenu.svelte';

	export let id = '';
	export let gunsState: TGunsState;
	export let actionsState: TActionsState;
	export let onResetFilters: () => void;

	let currentGun: Gun;
	let currentGunTitle: string;
	$: {
		currentGun = GunsStore.getGunById(id);
		currentGunTitle = currentGun?.name || currentGun?.make || currentGun?.model || 'unknown';
	}

</script>

<div class="no-records">
	<h1>
		<Icon type="filter" size="1em"/> &nbsp;No data to display
	</h1>
	<p>
		There are no records (from {actionsState.totalRecords}) for <i class="gun-name">{currentGunTitle}</i> to display with filtering applied.
	</p>

	<h3>Filtering applied [{ActionsStore.getFilter().length}]:</h3>

	<ul>
		{#each ActionsStore.getFilter() as filter}
			<li>
				<I18n text={'@Actions.' + filter}/>
			</li>
		{/each}
	</ul>

	<p>
		<!--  svelte-ignore a11y-invalid-attribute-->
		Use filter button in toolbar to change filtering, or <a href="#" on:click={onResetFilters}>reset filter</a>.
	</p>

	{#if gunsState.guns.length > 1}
		<p>Or you can select another gun:</p>
		<GunsMenu/>
	{/if}
</div>

<style lang="less">
	.no-records {
		min-height: 600px;
	}

	i.gun-name {
		background-color: var(--app-accent-background);
		color: var(--app-accent-text);
		padding: 4px 8px;
		margin: 0 .2em;
		border-radius: 7px;
	}

	ul {
		li {
			font-weight: bold;
			color: var(--app-primary-bg);
		}
	}
</style>
