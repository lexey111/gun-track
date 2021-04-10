<script lang="ts">

	import GunAction from '../action/GunAction.svelte';
	import SpinnerComponent from '../../../components/SpinnerComponent.svelte';
	import {TActionsState} from '../../../stores/actions/actions-store.interface';

	export let actionsState: TActionsState;

</script>

<div class="actions-list">
	{#if (!actionsState)}
		<p>
			<SpinnerComponent/>
			Loading...
		</p>
	{:else }
		{#each actionsState.actions as action, idx}
			<GunAction action={action} isLast={idx === actionsState.actions.length - 1}/>
		{/each}

		<pre>{JSON.stringify(actionsState, null, 2)}</pre>
	{/if}
</div>

<style lang="less">
	@import "action-list.less";
</style>
