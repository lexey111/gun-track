<script lang="ts">
	import type {ActionExtended} from '../../../../stores/actions/actions-store.interface';
	import {getCurrencySign} from '../../../../stores/actions/actions-store.types';

	export let action: ActionExtended;
	let currencySign: string;
	$: currencySign = getCurrencySign(action.currency);

	let hasExpenses: boolean;
	$: hasExpenses = action?.totalExpenses && Object.keys(action?.totalExpenses).length > 0;
</script>

<div class="action-stat-column">
	{#if (action.shots)}
		<div class="action-shot">+{action.shots || 124}</div>
	{/if}
	{#if (action.sum !== 0)}
		<div class={'action-sum' + (action.shots ? '' : ' inherited')}>{action.sum}</div>
	{/if}

	{#if (hasExpenses)}
		<div class="action-expenses">
			{#if (action.expenses)}
				<div class="action-expense">+ {currencySign} {action.expenses}</div>
			{/if}
			<ul class="action-expense-list">
				{#each Object.keys(action.totalExpenses) as expKey}
					<li>{getCurrencySign(expKey)} <span>{action.totalExpenses[expKey]}</span></li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style lang="less">
	.action-stat-column {
		max-width: 400px;
		height: 100%;
		display: flex;
		flex-flow: row nowrap;

		div {
			font-size: var(--app-small-font-size);
			margin-left: 16px;
			display: flex;
			flex-flow: column wrap;
			height: auto;
			align-content: center;
			align-items: center;
		}

		div.action-shot {
			background-color: var(--app-primary-bg);
			align-content: center;
			justify-content: center;
			color: var(--app-primary-text);
			padding: 0 8px;
			height: var(--app-very-big-font-size);
			border-radius: 28px;
			margin-top: 2px;
			white-space: nowrap;
		}

		div.action-sum {
			font-size: var(--app-very-big-font-size);

			&.inherited {
				color: var(--app-remark-text);
			}
		}

		div.action-expenses {
			height: 100%;
			width: 200px;
			flex-flow: row nowrap;
			border-left: 1px dashed var(--app-border-color);
			align-items: flex-start;
			justify-items: flex-start;
			padding-left: 16px;

			div.action-expense {
				background-color: var(--app-success-bg);
				align-content: center;
				justify-content: center;
				color: var(--app-success-text);
				padding: 0 8px;
				height: var(--app-very-big-font-size);
				border-radius: 28px;
				margin-top: 2px;
				white-space: nowrap;
				margin-right: 16px;
			}

			ul.action-expense-list {
				margin: 9px 0 0 auto;
				padding: 0;
				list-style: none;
				display: flex;
				flex-flow: column nowrap;

				li {
					line-height: 1em;
					white-space: nowrap;
					color: var(--app-remark-text);

					span {
						color: var(--app-text);
						padding-right: 16px;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
