<script lang="ts">

	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import {TActionsState} from '../../../stores/actions/actions-store.interface';
	import GunAction from '../action/GunAction.svelte';

	export let actionsState: TActionsState;
	export let onEdit: (id: string) => void;
	export let onDelete: (id: string) => void;

</script>

<div class="actions-list">
	{#if (!actionsState)}
		<p>
			<SpinnerComponent/>
			Loading...
		</p>
	{:else }
		{#each actionsState.actions as action, idx}
			<GunAction
				onEdit={onEdit}
				onDelete={onDelete}
				action={action} isLast={idx === actionsState.actions.length - 1}/>
		{/each}
	{/if}
</div>

<style lang="less">
	@import "action-list.less";
</style>
