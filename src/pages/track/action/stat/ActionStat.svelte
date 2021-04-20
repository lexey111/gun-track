<script lang="ts">
	import type {ActionExtended} from '../../../../stores/actions/actions-store.interface';
	import {getCurrencySign} from '../../../../stores/actions/actions-store.types';

	export let action: ActionExtended;
	$: currencySign = getCurrencySign(action.currency);
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
