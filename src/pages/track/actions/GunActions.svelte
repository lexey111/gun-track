<script lang="ts">
	import {onMount} from 'svelte';
	import {ActionsStore} from '../../../stores/actions/actions-store';

	export let id;

	onMount(() => {
		ActionsStore.initStore(id);
	});
</script>

<div class="actions-list">
	<code>{id}</code>
</div>

<style lang="less">
	@import "gun-actions.less";
</style>

