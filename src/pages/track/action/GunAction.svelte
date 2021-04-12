<script lang="ts">
	import {TAction} from '../../../stores/actions/actions-store.interface';
	import {getTypeColor} from '../../../stores/actions/actions-store.types';
	import ActionData from './ActionData.svelte';
	import ActionNotes from './ActionNotes.svelte';
	import ActionStat from './ActionStat.svelte';
	import ActionTimeline from './ActionTimeline.svelte';

	export let action: TAction;
	export let isLast: boolean;
	export let onEdit: (id: string) => void;
	export let onDelete: (id: string) => void;

	$: color = getTypeColor(action?.type)
</script>

<div class={'gun-action' + (isLast ? ' last-item' : '')}>
	<ActionTimeline action={action}/>

	<div class="action-content" style="border-left-color: {color}">
		<div class="action-columns">
			<ActionData action={action}/>
			<ActionStat action={action}/>
		</div>

		<ActionNotes action={action}/>

		<div class="action-actions">
			<a href="#" on:click={() => onEdit(action.id)}>Change</a>
			<a href="#" class="danger" on:click={() => onDelete(action.id)}>Delete</a>
		</div>
	</div>
</div>

<style lang="less">
	@import "gun-action.less";
</style>

