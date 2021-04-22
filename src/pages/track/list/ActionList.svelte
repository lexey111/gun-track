<script lang="ts">

	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import type {TActionsState} from '../../../stores/actions/actions-store.interface';
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
	.actions-list {
		margin: 16px 16px 100px 16px;

		.actions-list-header {
			font-size: var(--app-big-font-size);
			color: var(--app-text);
			text-transform: uppercase;
			font-weight: 100;
			display: flex;
			flex-flow: row nowrap;
			flex-direction: row-reverse;
			width: 100%;
			align-content: flex-end;

			.alh-money, .alh-shots {
				display: flex;
				flex-flow: column wrap;
				width: 233px;
				align-content: flex-end;

				span {
					text-align: right;
					padding-right: 16px;
				}
			}

			.alh-money {
				span {
					padding-right: 32px;
				}
			}
		}
	}
</style>
