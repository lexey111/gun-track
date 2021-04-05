<script lang="ts">
	import {navigate} from 'svelte-routing';
	import {TGunsState} from '../../../stores/guns/guns-store.interface';

	export let id;
	export let gunsState: TGunsState;

	const handleGunSwitch = (id: string) => {
		localStorage.setItem('gun.current', id);
		navigate('/track/' + id);
		return false
	};
</script>

<div class="gun-navigator">
	{#each gunsState.guns as gun}
		<a on:click={() => handleGunSwitch(gun.id)}
		   class={id === gun.id ? 'active' : ''}>
			{gun.name}
		</a>
	{/each}
</div>

<style lang="less">
	@import "gun-navigator.less";
</style>

