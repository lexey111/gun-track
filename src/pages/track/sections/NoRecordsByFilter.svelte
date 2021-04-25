<script lang="ts">
	import I18n from '../../../components/i18n/I18n.svelte';
	import {ActionsStore} from '../../../stores/actions/actions-store';
	import type {TGunsState} from '../../../stores/guns/guns-store.interface';
	import GunNavigator from '../navigator/GunNavigator.svelte';

	export let currentGunTitle = '';
	export let id = '';
	export let gunsState: TGunsState;
	export let onResetFilters: () => void;

</script>

<div class="no-records">
	<h2>No data to display</h2>
	<p>
		There are no records here for <i class="gun-name">{currentGunTitle}</i> with filtering applied.
	</p>

	<h3>Applied filters [{ActionsStore.getFilter().length}]:</h3>

	<ul>
		{#each ActionsStore.getFilter() as filter}
			<li>
				<I18n text={'@Actions.' + filter}/>
			</li>
		{/each}
	</ul>

	<p>
		<!--  svelte-ignore a11y-invalid-attribute-->
		Use filter button in toolbar to change filtering, or <a href="#" on:click={onResetFilters}>reset it</a>.
	</p>

	{#if gunsState.guns.length > 1}
		<p>Or you can select another gun:</p>
		<div class="navigator-container">
			<GunNavigator id={id} gunsState={gunsState}/>
		</div>
	{/if}
</div>

<style lang="less">
	.navigator-container {
		width: auto;
		display: inline-block;
	}

	i.gun-name {
		background-color: var(--app-accent-background);
		color: var(--app-accent-text);
		padding: 4px 8px;
		border-radius: 7px;
	}

	ul {
		li {
			font-weight: bold;
			color: var(--app-primary-bg);
		}
	}
</style>
