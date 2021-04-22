<script lang="ts">
	import type {TAction} from '../../../../stores/actions/actions-store.interface';

	export let action: TAction;
</script>

<div class="action-main-column">
	<h1>
		{action.title}
	</h1>
	{#if (action.comment)}
		<div class="action-comment">{action.comment}</div>
	{/if}

	{#if (!action.comment && !action.title && !action.trainingNotes)}
		<div class="action-comment no-data">No data</div>
	{/if}
</div>


<style lang="less">
	.action-main-column {
		width: 100%;

		h1 {
			margin: 0 auto 0 0;
			font-size: var(--app-big-font-size);
			display: flex;
			flex-flow: column nowrap;
		}

		.action-comment {
			color: var(--app-remark-text);

			&.no-data {
				opacity: .5;
				font-size: var(--app-small-font-size);
			}
		}
	}
</style>
