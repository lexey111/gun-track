<script lang="ts">
	import Button from '../../../components/buttons/Button.svelte';
	import I18n from '../../../components/i18n/I18n.svelte';
	import {ActionsStore} from '../../../stores/actions/actions-store';
	import type {TActionsState} from '../../../stores/actions/actions-store.interface';

	export let onApply: (sort: string) => void;

	const changeSortDirection = () => {
		if (ActionsStore.getOrder() === 'asc') {
			onApply('desc');
			ActionsStore.setOrder('desc');
		} else {
			onApply('asc');
			ActionsStore.setOrder('asc');
		}
	}
	export let actionsState: TActionsState;

	$: sortOrder = actionsState?.sortOrder === 'desc' ? '↑' : '↓';

</script>

<div class="block block-min">
	<div class="block-content">
		<Button type="toolbar" on:click={changeSortDirection}>
			<I18n>@Track.Sort</I18n> &nbsp; {sortOrder}</Button>
	</div>
</div>
