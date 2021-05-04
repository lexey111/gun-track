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
		<Icon type="filter" size="1em"/> &nbsp;<I18n>@Common.NoDataToDisplay</I18n>
	</h1>
	<p>
		<I18n>@Track.NoRecordsFilter1</I18n>&nbsp;
		{actionsState.totalRecords}
		<I18n>@Track.NoRecordsFilter2</I18n>&nbsp;
		<i class="gun-name">{currentGunTitle}</i>&nbsp;
		<I18n>@Track.NoRecordsFilter3</I18n>
	</p>

	<h3>
		<I18n>@Track.FilteringApplied</I18n>&nbsp;[{ActionsStore.getFilter().length}]:
	</h3>

	<ul>
		{#each ActionsStore.getFilter() as filter}
			<li>
				<I18n text={'@Actions.' + filter}/>
			</li>
		{/each}
	</ul>

	<p>
		<!--  svelte-ignore a11y-invalid-attribute-->
		<I18n>@Track.UseFilterButton</I18n>
		<a href="#" on:click={onResetFilters}>
			<I18n>@Track.ResetFilter</I18n>
		</a>
	</p>

	{#if gunsState.guns.length > 1}
		<I18n>@Track.SelectAnotherGun</I18n>
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
