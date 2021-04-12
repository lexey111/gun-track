<script lang="ts">
	import {TAction} from '../../../stores/actions/actions-store.interface';

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
