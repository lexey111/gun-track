<script lang="ts">
	import {onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import {I18nService} from '../../../components/i18n/i18n.service';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import Info from '../../../components/modal/Info.svelte';
	import type {Action} from '../../../models';
	import {ActionsStore} from '../../../stores/actions/actions-store';
	import {getTypeColor} from '../../../stores/actions/actions-store.types';
	import ActionData from './content/ActionData.svelte';
	import ActionNotes from './content/ActionNotes.svelte';
	import ActionStat from './stat/ActionStat.svelte';
	import ActionTimeline from './timeline/ActionTimeline.svelte';

	export let action: Action;
	export let isLast: boolean;
	export let onDelete: (id: string) => void;

	let color: string;
	$: color = getTypeColor(action?.type)

	let infoNotes: any;
	const onShowNotes = (id: string) => {
		const notes = ActionsStore.getActionById(id)?.trainingNotes;
		if (!notes) {
			return;
		}
		infoNotes.showInfoDialog({
			text: notes,
			extraClass: 'scroll-y',
			title: notesCaption
		});
	};

	const editRecord = () => {
		navigate('/track/' + action.gun.id + '/' + action.id + '/edit');
	}

	let notesCaption: string;
	onMount(() => {
		void I18nService.translate('@Common.Notes').then(s => notesCaption = s);
	});
</script>

<Info bind:this={infoNotes}/>

<div class={'gun-action' + (isLast ? ' last-item' : '')}>
	<ActionTimeline {action}/>

	<div class="action-content" style="border-left-color: {color}">
		<div class="action-columns">
			<ActionData {action}/>
			<ActionStat {action}/>
		</div>

		<ActionNotes {onShowNotes} {action}/>

		<div class="action-actions">
			{#if (action.trainingNotes)}
				<Button on:click={() => onShowNotes(action.id)} type="link" size="small">
					<Icon type="file"/> &nbsp;
					<I18n>@Common.Notes</I18n>
					...
				</Button>
			{/if}
			<Button on:click={() => editRecord(action.gunID, action.id)} type="ghost" size="small">
				<Icon type="edit"/> &nbsp;
				<I18n>@Common.Change</I18n>
			</Button>
			<Button on:click={() => onDelete(action.id)} type="link-danger" size="small">
				<Icon type="delete"/>
			</Button>
		</div>
	</div>
</div>

<style lang="less">
	:global {
		.gun-action {
			display: flex;
			width: 100%;
			flex-flow: row nowrap;
			margin: 16px 0;

			.action-content {
				width: 100%;
				margin: 0 24px 0 32px;
				flex-grow: 2;
				background-color: var(--app-white-bg);
				padding: 16px;
				box-shadow: 0 0 1px rgba(0, 0, 0, .5);
				border-left: 2px solid transparent;
				box-sizing: content-box;
				transition: all .2s ease;
				position: relative;
				display: flex;
				flex-flow: column nowrap;

				.action-columns {
					display: flex;
					flex-flow: row nowrap;
					width: 100%;
					height: 100%;
					transition: transform .2s ease;
				}

				.action-actions {
					margin-top: 8px;
					padding-top: 12px;
					display: flex;
					flex-flow: row wrap;
					align-content: flex-end;
					justify-content: flex-end;
					font-size: var(--app-small-font-size);
					width: 100%;
					border-top: 1px dashed var(--app-border-color);
					opacity: 0;
					transition: opacity .2s ease;

					button {
						margin-left: 1em;
					}
				}
			}

			&:not(:hover) {
				.action-columns {
					transform: translateY(32px);
				}

				.action-notes {
					transform: translateY(40px);
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
	}
</style>

