<script lang="ts">
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import type {Gun} from '../../../models';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import type {TGunsState} from '../../../stores/guns/guns-store.interface';
	import GunsMenu from './GunsMenu.svelte';

	export let id = '';
	export let gunsState: TGunsState;
	export let showNewActionDialog: () => void = null;
	let currentGun: Gun;
	let currentGunTitle: string;
	$: {
		currentGun = GunsStore.getGunById(id);
		currentGunTitle = currentGun?.name || currentGun?.make || currentGun?.model || 'unknown';
	}
</script>

<div class="no-records">
	<h1>No records here for <i class="gun-name">{currentGunTitle}</i> yet.</h1>
	<p>
		But it is the best time to create one!
	</p>
	<p>
		<Button onClick={showNewActionDialog}>
			<Icon type="plus-circle" size="24px" class="inline"/>
			Add record...
		</Button>
	</p>

	{#if gunsState.guns.length > 1}
		<p>Or you can select another gun:</p>
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
