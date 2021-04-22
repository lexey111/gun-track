<script lang="ts">
	import type {TActionsState} from '../../../stores/actions/actions-store.interface';
	import {getCurrencySign} from '../../../stores/actions/actions-store.types';

	export let actionsState: TActionsState;

</script>

<div class="stat-wrapper">
	<div class="stat stat-info stat-row">
		<div class="stat-exp">
			<ul>
				<li>Shots</li>
				<li>Records</li>
			</ul>
		</div>
		<ul>
			<li>
				<b>{actionsState?.totalShots}</b>
			</li>
			<li>
				<b>{actionsState?.actions.length}</b>
			</li>
		</ul>
	</div>

	{#if (actionsState?.expenses && Object.keys(actionsState?.expenses).length)}
		<div class="stat stat-info stat-row">
			<div class="stat-exp">
				<ul>
					{#each Object.keys(actionsState.expenses) as currency}
						<li>{getCurrencySign(currency)} {currency}</li>
					{/each}
				</ul>
			</div>
			<ul>
				{#each Object.keys(actionsState.expenses) as currency}
					<li>
						<b>{new Intl.NumberFormat('en-EN').format(actionsState.expenses[currency])}</b>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style lang="less">
	:global {
		.top-panel-content {
			.stat-wrapper {
				margin: 0;
				padding: 0;
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
				grid-gap: 8px;
			}
		}
	}
</style>
