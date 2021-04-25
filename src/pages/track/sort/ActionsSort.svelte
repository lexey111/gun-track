<script lang="ts">
	import Button from '../../../components/buttons/Button.svelte';
	import {ActionsStore} from '../../../stores/actions/actions-store';
	import type {TActionsState} from '../../../stores/actions/actions-store.interface';

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

<div class="block block-min">
	<div class="block-content">
		<Button type="toolbar" onClick={changeSortDirection}>Sort: by date {sortOrder}</Button>
	</div>
</div>
