<script lang="ts">
	import {TAction} from '../../../stores/actions/actions-store.interface';

	export let action: TAction;
</script>

<div class="action-stat-column">
	{#if (action.shots)}
		<div class="action-shot">+{action.shots || 124}</div>
	{/if}
	{#if (action.sum !== 0)}
		<div class={'action-sum' + (action.shots ? '' : ' inherited')}>{action.sum}</div>
	{/if}

	{#if (action.expenses)}
		<div class="action-expenses">
			<span>+ {action.expenses}</span>
			<span>{action.currency}</span>
		</div>
	{/if}
</div>
