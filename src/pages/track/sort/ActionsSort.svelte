<script lang="ts">
	import {ActionsStore} from '../../../stores/actions/actions-store';
	import {TActionsState} from '../../../stores/actions/actions-store.interface';

	const changeSortDirection = () => {
		if (ActionsStore.getOrder() === 'asc') {
			ActionsStore.setOrder('desc')
		} else {
			ActionsStore.setOrder('asc');
		}
	}
	export let actionsState: TActionsState;

	$: sortOrder = actionsState?.sortOrder === 'desc' ? '↑' : '↓';

</script>

<div>
	<a href="#" on:click={changeSortDirection}>By date {sortOrder}</a>
</div>
