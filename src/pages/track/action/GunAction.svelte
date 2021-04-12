<script lang="ts">
	import * as dayjs from 'dayjs'
	import * as localizedFormat from 'dayjs/plugin/localizedFormat';
	import * as relativeTime from 'dayjs/plugin/relativeTime';
	import I18n from '../../../components/i18n/I18n.svelte';
	import {TAction} from '../../../stores/actions/actions-store.interface';
	import {getTypeColor} from '../../../stores/actions/actions-store.types';

	dayjs.extend(localizedFormat);
	dayjs.extend(relativeTime)

	export let action: TAction;
	export let isLast: boolean;
	export let onEdit: (id: string) => void;
	export let onDelete: (id: string) => void;

	$: color = getTypeColor(action?.type)

</script>

<div class={'gun-action' + (isLast ? ' last-item' : '')}>
	<div class="action-date">
		<span>
			{dayjs(action.date).fromNow()}
		</span>
		<span class="extra-date">
			{dayjs(action.date).format('LL LT')}
		</span>
		<i class="pre-action-type"></i>
		<i class="action-type"></i>
		<div class="action-type-tag">
			<I18n text={'@Actions.' + (action.type || 'other')}/>
		</div>
	</div>

	<div class="action-content" style="border-left-color: {color}">
		<div class="action-title">
			<h1>
				{action.title}
			</h1>
			{#if (action.shots)}
				<div class="action-shot">+{action.shots || 124}</div>
			{/if}
			{#if (action.sum !== 0)}
				<div class={'action-sum' + (action.shots ? '' : ' inherited')}>{action.sum}</div>
			{/if}
		</div>

		{#if (action.comment)}
			<div class="action-comment">{action.comment}</div>
		{/if}

		{#if (!action.comment && !action.title)}
			<div class="action-comment no-data">No data</div>
		{/if}

		<div class="action-actions">
			<a href="#" on:click={() => onEdit(action.id)}>Change</a>
			<a href="#" class="danger" on:click={() => onDelete(action.id)}>Delete</a>
		</div>
	</div>
</div>

<style lang="less">
	@import "gun-action.less";
</style>

