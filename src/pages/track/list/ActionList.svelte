<script lang="ts">

	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import {TActionsState} from '../../../stores/actions/actions-store.interface';
	import {isEmpty} from '../../../utils/objects';
	import GunAction from '../action/GunAction.svelte';

	export let actionsState: TActionsState;
	export let onEdit: (id: string) => void;
	export let onDelete: (id: string) => void;

	$: hasExpensesAtAll = !isEmpty(actionsState?.expenses);
</script>

<div class="actions-list">
	{#if (!actionsState)}
		<p>
			<SpinnerComponent/>
			Loading...
		</p>
	{:else }
		{#if (actionsState?.actions?.length)}
			<div class="actions-list-header">
				{#if (hasExpensesAtAll)}
					<div class="alh-money"><span>Expenses</span></div>
				{/if}
				{#if (actionsState?.totalShots > 0)}
					<div class="alh-shots"><span>Shots</span></div>
				{/if}
			</div>
		{/if}
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
