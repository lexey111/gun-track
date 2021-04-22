<script lang="ts">
	import type {TActionsState} from '../../../stores/actions/actions-store.interface';

	export let actionsState: TActionsState;

</script>

<div class="stat-wrapper">
	<div class="stat stat-row">
		<div class="stat-exp">
			Statistics
		</div>
		<ul>
			<li>
				Shots: <b>{actionsState?.totalShots}</b>
			</li>
			<li>
				Records: <b>{actionsState?.actions.length}</b>
			</li>
		</ul>
	</div>

	{#if (actionsState?.expenses && Object.keys(actionsState?.expenses).length)}
		<div class="stat stat-row">
			<div class="stat-exp">
				Expenses
			</div>
			<ul>
				{#each Object.keys(actionsState.expenses) as currency}
					<li><b>{actionsState.expenses[currency]}</b> {currency}</li>
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

				.stat {
					height: 100%;
					flex: 1;
					background-color: var(--app-primary-bg-light-shade-1) !important;
				}

				.stat-row {
					flex-flow: row nowrap;
					height: 100%;
					margin-right: 0 !important;
				}

				.stat {
					ul {
						list-style: none;
						margin: 0;
						padding: 16px 0;
						color: var(--app-primary-text-darken);

						li {
							line-height: 1.4em;
							padding: 0;
							margin: 0;
						}
					}

					.stat-exp {
						display: flex;
						flex-flow: row nowrap;
						margin-right: 1em;
						padding-right: 1em;
						padding-left: 16px;
						color: var(--app-primary-text-darken);
						border-right: 2px solid var(--app-primary-bg);
						height: 100%;
						align-items: center;
					}
				}
			}
		}
	}
</style>
