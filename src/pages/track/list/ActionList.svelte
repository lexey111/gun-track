<script lang="ts">

	import type {TActionsState} from '../../../stores/actions/actions-store.interface';
	import type {TGunsState} from '../../../stores/guns/guns-store.interface';
	import {isEmpty} from '../../../utils/objects';
	import GunAction from '../action/GunAction.svelte';
	import GunNavigator from '../navigator/GunNavigator.svelte';

	export let gunsState: TGunsState;
	export let id: string;
	export let actionsState: TActionsState;
	export let onDelete: (id: string) => void;

	let hasExpensesAtAll: boolean;
	$: hasExpensesAtAll = !isEmpty(actionsState?.expenses);

</script>

<div class="actions-list">
	{#if (actionsState)}
		{#if (actionsState?.actions?.length)}
			<div class="actions-list-header">
				{#if (hasExpensesAtAll)}
					<div class="alh-money"><span>Expenses</span></div>
				{/if}
				{#if (actionsState?.totalShots > 0)}
					<div class={'alh-shots' + (hasExpensesAtAll ? ' with-expenses' : '')}><span>
						Shots
						({actionsState?.totalShots})
					</span></div>
				{/if}
				<div class="alh-name">
					<GunNavigator {id} {gunsState} onTitle={true}/>
				</div>
			</div>
		{/if}
		{#each actionsState.actions as action, idx}
			<GunAction
				onDelete={onDelete}
				action={action} isLast={idx === actionsState.actions.length - 1}/>
		{/each}
	{/if}
</div>

<style lang="less">
	.actions-list {
		margin: 0 0 100px 0;

		.actions-list-header {
			display: flex;
			flex-flow: row nowrap;
			flex-direction: row-reverse;
			width: 100%;
			align-content: flex-end;
			padding: 0;
			border-radius: 17px 17px 0 0;
			border-bottom: 2px solid var(--app-primary-bg);
			background-color: var(--app-primary-bg);

			.alh-money, .alh-shots {
				display: flex;
				flex-flow: column wrap;
				width: 233px;
				align-content: flex-end;
				justify-content: flex-end;
				font-size: var(--app-font-size);
				color: var(--app-primary-text-darken);
				text-transform: uppercase;
				font-weight: 200;

				span {
					text-align: right;
					padding-right: 16px;
					padding-bottom: 4px;
				}
			}

			.alh-shots {
				margin-right: 22px;
			}

			.alh-shots.with-expenses {
				border-right: 2px solid rgba(0, 0, 0, 0.2);
			}

			.alh-money {
				span {
					padding-right: 32px;
				}
			}

			.alh-name {
				margin-right: auto;
				margin-left: 1em;
				padding: 12px 0;
			}
		}
	}
</style>
