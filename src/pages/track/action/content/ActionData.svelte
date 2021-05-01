<script lang="ts">
	import {navigate} from 'svelte-routing';
	import type {Action} from '../../../../models';

	export let action: Action;

	const editRecord = () => {
		navigate('/track/' + action.gun.id + '/' + action.id + '/edit');
	}

</script>

<div class="action-main-column" on:click={editRecord}>
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
			align-items: flex-start;
			cursor: pointer;
		}

		.action-comment {
			color: var(--app-remark-text);
			cursor: pointer;

			&.no-data {
				opacity: .5;
				font-size: var(--app-small-font-size);
			}
		}
	}
</style>
