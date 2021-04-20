<script lang="ts">
	import type {TAction} from '../../../../stores/actions/actions-store.interface';

	export let action: TAction;
</script>

{#if (action.trainingNotes)}
	<div class="action-notes">{@html action.trainingNotes}</div>
{/if}

