<script lang="ts">
	import {TActionsState} from '../../../stores/actions/actions-store.interface';

	export let actionsState: TActionsState;

</script>

<div>
	<ul>
		<li>
			Total shots: <b>{actionsState?.totalShots}</b>
		</li>
		<li>
			Records: <b>{actionsState?.actions.length}</b>
		</li>
	</ul>
</div>

{#if (actionsState?.expenses && Object.keys(actionsState?.expenses).length)}
	<div class="stat-exp">
		Expenses
	</div>

	<div>
		<ul>
			{#each Object.keys(actionsState.expenses) as currency}
				<li><b>{actionsState.expenses[currency]}</b> {currency}</li>
			{/each}
		</ul>
	</div>
{/if}
