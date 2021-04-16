<script lang="ts">
	import * as dayjs from 'dayjs'
	import * as isToday from 'dayjs/plugin/isToday';
	import * as localizedFormat from 'dayjs/plugin/localizedFormat';
	import * as relativeTime from 'dayjs/plugin/relativeTime';

	import {onDestroy, onMount} from 'svelte';
	import I18n from '../../../../components/i18n/I18n.svelte';
	import {TAction} from '../../../../stores/actions/actions-store.interface';
	import {getTypeColor} from '../../../../stores/actions/actions-store.types';
	import {AppStateStore} from '../../../../stores/app/app-state-store';

	dayjs.extend(localizedFormat);
	dayjs.extend(relativeTime)
	dayjs.extend(isToday)

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

</script>

<div class="action-date">
	<span>
		{#if (dayjs(action.date).isToday())}
			<I18n text="@Common.Today"/>
		{:else}
			{dayjs(action.date).locale(state.dateLocale).fromNow()}
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
