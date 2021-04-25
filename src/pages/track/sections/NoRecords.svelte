<script lang="ts">
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import type {TGunsState} from '../../../stores/guns/guns-store.interface';
	import GunNavigator from '../navigator/GunNavigator.svelte';

	export let id = '';
	export let currentGunTitle = '';
	export let gunsState: TGunsState;
	export let showNewActionDialog: () => void = null;
</script>

<div class="no-records">
	<h2>No records here for <i>{currentGunTitle}</i>, yet.</h2>
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
		<div class="navigator-container">
			<GunNavigator id={id} gunsState={gunsState}/>
		</div>
	{/if}
</div>

<style>
    .navigator-container {
        width: auto;
        display: inline-block;
    }
</style>
