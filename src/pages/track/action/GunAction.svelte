<script lang="ts">
	import * as dayjs from 'dayjs'
	import * as localizedFormat from 'dayjs/plugin/localizedFormat';
	import * as relativeTime from 'dayjs/plugin/relativeTime';
	import {TAction} from '../../../stores/actions/actions-store.interface';

	dayjs.extend(localizedFormat);
	dayjs.extend(relativeTime)


	export let action: TAction;
	export let isLast: boolean;
</script>

<div class={'gun-action' + (isLast ? ' last-item' : '')}>
	<div class="action-date">
		<span>
			{dayjs(action.date).fromNow()}
		</span>
		<span class="extra-date">
			{dayjs(action.date).format('LL LT')}
		</span>
		<i class="action-type"></i>
	</div>

	<div class="action-content">
		<div class="action-title">
			<h1>{action.title}</h1>
			{#if (action.shots)}
				<span class="action-shot">+{action.shots || 124}</span>
			{/if}
			<span class="action-sum">{123344}</span>
		</div>

		{#if (action.comment)}
			<div class="action-comment">{action.comment}</div>
		{/if}

		{#if (!action.comment && !action.title)}
			<div class="action-comment no-data">No data</div>
		{/if}

		<div class="action-actions">
			<a href="#">Change</a>
			<a href="#" class="danger">Delete</a>
		</div>
	</div>
</div>

<style lang="less">
	@import "gun-action.less";
</style>

