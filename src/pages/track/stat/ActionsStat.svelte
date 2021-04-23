<script lang="ts">
	import type {TActionsState} from '../../../stores/actions/actions-store.interface';
	import {getCurrencySign} from '../../../stores/actions/actions-store.types';

	export let actionsState: TActionsState;

</script>

<div class="block block-info">
	<div class="stat-exp">
		<ul>
			<li>Shots</li>
			<li>Records</li>
		</ul>
	</div>
	<div class="block-content">
		<ul>
			<li>
				<b>{actionsState?.totalShots}</b>
			</li>
			<li>
				<b>{actionsState?.actions.length}</b>
			</li>
		</ul>
	</div>
</div>

{#if (actionsState?.expenses && Object.keys(actionsState?.expenses).length)}
	<div class="block block-info">
		<div class="stat-exp">
			<ul>
				{#each Object.keys(actionsState.expenses) as currency}
					<li>{getCurrencySign(currency)} {currency}</li>
				{/each}
			</ul>
		</div>
		<div class="block-content">
			<ul>
				{#each Object.keys(actionsState.expenses) as currency}
					<li>
						<b>{new Intl.NumberFormat('en-EN').format(actionsState.expenses[currency])}</b>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}
