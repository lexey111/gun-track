<script lang="ts">
	import I18n from '../../../components/i18n/I18n.svelte';
	import type {TActionsState} from '../../../stores/actions/actions-store.interface';
	import {getCurrencySign} from '../../../stores/actions/actions-store.types';

	export let actionsState: TActionsState;

</script>

<div class="block block-info">
	<div class="stat-exp">
		<ul>
			<li>
				<I18n>@Track.Shots</I18n>
			</li>
			<li>
				<I18n>@Track.Records</I18n>
			</li>
		</ul>
	</div>
	<div class="block-content">
		<ul>
			<li>
				<b>{actionsState?.totalShots}</b>
			</li>
			<li>
				<b>{actionsState?.actions.length}</b>
				{#if (actionsState?.totalRecords !== actionsState?.actions.length)}
					/ {actionsState?.totalRecords}
				{/if}
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
