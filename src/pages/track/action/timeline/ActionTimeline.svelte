<script lang="ts">
	import * as dayjs from 'dayjs'
	import * as localizedFormat from 'dayjs/plugin/localizedFormat';
	import * as relativeTime from 'dayjs/plugin/relativeTime';
	import I18n from '../../../../components/i18n/I18n.svelte';
	import {TAction} from '../../../../stores/actions/actions-store.interface';
	import {getTypeColor} from '../../../../stores/actions/actions-store.types';

	dayjs.extend(localizedFormat);
	dayjs.extend(relativeTime)

	export let action: TAction;

	$: color = getTypeColor(action?.type)

</script>

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
		<i style="background-color:{color}"></i>
		<I18n text={'@Actions.' + (action.type || 'other')}/>
	</div>
</div>
