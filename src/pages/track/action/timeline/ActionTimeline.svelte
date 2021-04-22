<script lang="ts">
	import * as dayjs from 'dayjs';
	import * as isToday from 'dayjs/plugin/isToday';
	import * as isYesterday from 'dayjs/plugin/isYesterday';
	import * as localizedFormat from 'dayjs/plugin/localizedFormat';
	import * as relativeTime from 'dayjs/plugin/relativeTime';

	import {onDestroy, onMount} from 'svelte';
	import I18n from '../../../../components/i18n/I18n.svelte';
	import type {TAction} from '../../../../stores/actions/actions-store.interface';
	import {getTypeColor} from '../../../../stores/actions/actions-store.types';
	import {AppStateStore} from '../../../../stores/app/app-state-store';

	dayjs.extend(localizedFormat);
	dayjs.extend(relativeTime)
	dayjs.extend(isToday)
	dayjs.extend(isYesterday)

	export let action: TAction;

	$: color = getTypeColor(action?.type)

	let appState$;
	const state = {dateLocale: 'en'};
	onMount(() => {
		appState$ = AppStateStore.subscribe(value => {
			if (value.dateLocale && value.dateLocale !== state.dateLocale) {
				state.dateLocale = value.dateLocale;
			}
		})
	});

	onDestroy(() => {
		appState$ && appState$();
	});

	let isDateToday: boolean;
	$: {
		isDateToday = dayjs(action.date).startOf('day').isToday();
	}

	let isDateYesterday: boolean;
	$: {
		isDateYesterday = dayjs(action.date).startOf('day').isYesterday();
	}

</script>

<div class="action-date">
	<span>
		{#if (isDateToday)}
			<I18n text="@Common.Today"/>
		{:else}
			{#if (isDateYesterday)}
				<I18n text="@Common.Yesterday"/>
			{:else }
				{dayjs(action.date).locale(state.dateLocale).fromNow()}
			{/if}
		{/if}
	</span>
	<span class="extra-date">
		{dayjs(action.date).locale(state.dateLocale).format('LL')}
	</span>

	<i class="pre-action-type"></i>

	<i class="action-type"></i>

	<div class="action-type-tag">
		<i style="background-color:{color}"></i>
		<I18n text={'@Actions.' + (action.type || 'other')}/>
	</div>
</div>


<style lang="less">
	.action-date {
		display: flex;
		flex-flow: column wrap;
		font-size: var(--app-small-font-size);
		padding: 0 24px 0 0;
		flex-grow: 0;
		flex-shrink: 0;
		width: 200px;
		align-items: flex-end;
		position: relative;

		span {
			display: inline-flex;
			text-align: right;
			flex-flow: column wrap;
			color: var(--app-info-bg);

			&.extra-date {
				color: var(--app-remark-text);
				font-size: var(--app-very-small-font-size);
			}
		}

		.pre-action-type {
			display: block;
			position: absolute;
			width: 24px;
			height: 24px;
			border-radius: 24px;
			background-color: var(--app-info-bg);
			top: -2px;
			right: -11px;
			z-index: 2;
		}

		.action-type {
			display: block;
			position: absolute;
			width: 20px;
			height: 20px;
			border-radius: 20px;
			background-color: var(--app-white-bg);
			box-sizing: content-box;
			color: var(--app-text);
			top: 0;
			right: -9px;
			z-index: 3;
		}

		.action-type-tag {
			margin-top: 4px;
			height: auto;
			font-size: var(--app-very-small-font-size);
			color: var(--app-remark-text);
			text-align: right;

			i {
				display: inline-block;
				width: 6px;
				height: 6px;
				border-radius: 6px;
				margin-right: .4em;
				margin-bottom: 1px;
			}
		}

		&:first-child {
			&:after {
				top: 0;
			}
		}

		&:after {
			content: '';
			display: block;
			position: absolute;
			right: 0;
			top: -8px;
			width: 2px;
			bottom: -16px;
			background-color: var(--app-info-bg);
			z-index: 1;
		}
	}

	:global {
		.last-item {
			.action-date {
				&:after {
					bottom: 0;
					background: linear-gradient(var(--app-info-bg), transparent) !important;
				}
			}
		}
	}
</style>
