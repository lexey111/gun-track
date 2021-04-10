<script lang="ts">

	import SpinnerComponent from '../../../components/SpinnerComponent.svelte';
	import {TActionsState} from '../../../stores/actions/actions-store.interface';

	export let actionsState: TActionsState;

</script>

<div class="actions-list">
	{#if (!actionsState || actionsState?.busy)}
		<p>
			<SpinnerComponent/>
			Loading...
		</p>
	{:else }
		<pre>{JSON.stringify(actionsState, null, 2)}</pre>
	{/if}
</div>

<style lang="less">
	@import "actions-list.less";
</style>
