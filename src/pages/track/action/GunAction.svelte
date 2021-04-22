<script lang="ts">
	import type {TAction} from '../../../stores/actions/actions-store.interface';
	import {getTypeColor} from '../../../stores/actions/actions-store.types';
	import ActionData from './content/ActionData.svelte';
	import ActionNotes from './content/ActionNotes.svelte';
	import ActionStat from './stat/ActionStat.svelte';
	import ActionTimeline from './timeline/ActionTimeline.svelte';

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
	.gun-action {
		display: flex;
		width: 100%;
		flex-flow: row nowrap;
		margin: 8px 0 16px;

		.action-content {
			width: 100%;
			margin-left: 24px;
			flex-grow: 2;
			background-color: var(--app-white-bg);
			padding: 16px;
			box-shadow: 0 0 1px rgba(0, 0, 0, .5);
			border-left: 2px solid transparent;
			box-sizing: content-box;
			transition: all .2s ease-in;
			position: relative;
			display: flex;
			flex-flow: column nowrap;

			.action-columns {
				display: flex;
				flex-flow: row nowrap;
				width: 100%;
				height: 100%;
				transition: transform .2s ease-in-out;
			}

			.action-actions {
				margin-top: 8px;
				padding-top: 8px;
				display: flex;
				flex-flow: row wrap;
				align-content: flex-end;
				justify-content: flex-end;
				font-size: var(--app-small-font-size);
				width: 100%;
				border-top: 1px dashed var(--app-border-color);
				opacity: 0;
				transition: opacity .2s ease-in;

				a:last-child {
					margin-left: 3em;
				}
			}
		}

		&:not(:hover) {
			.action-columns {
				transform: translateY(16px);
			}

			.action-notes {
				transform: translateY(16px);
			}
		}

		&:hover {
			.action-columns {
				transform: translateY(0);
			}

			.action-notes {
				transform: translateY(0);
			}

			.action-content {
				box-shadow: -2px 0 4px rgba(0, 0, 0, .3);
			}

			.action-actions {
				opacity: 1;
			}
		}
	}
</style>

