<script lang="ts">
	import Button from '../../../components/buttons/Button.svelte';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import type {Gun} from '../../../models';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import type {TGunsState} from '../../../stores/guns/guns-store.interface';
	import GunsMenu from './GunsMenu.svelte';

	export let id = '';
	export let gunsState: TGunsState;
	export let addRecord: () => void = null;
	let currentGun: Gun;
	let currentGunTitle: string;
	$: {
		currentGun = GunsStore.getGunById(id);
		currentGunTitle = currentGun?.name || currentGun?.make || currentGun?.model || 'unknown';
	}
</script>

<div class="no-records">
	<h1>
		<I18n>@Track.NoRecords1</I18n>&nbsp;<i class="gun-name">{currentGunTitle}</i>
		<I18n>@Track.NoRecords2</I18n>
	</h1>
	<p>
		<I18n>@Track.BestTimeToCreate</I18n>
	</p>
	<p>
		<Button on:click={addRecord}>
			<Icon type="plus-circle" size="24px" class="inline"/>
			<I18n>@Track.AddARecord</I18n>
		</Button>
	</p>

	{#if gunsState.guns.length > 1}
		<p>
			<I18n>@Track.SelectAnotherGun</I18n>
		</p>
		<GunsMenu/>

	{/if}
</div>

<style>
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

</style>
