<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import SpinnerComponent from '../../components/SpinnerComponent.svelte';
	import {GunsStore} from '../../stores/guns/guns-store';
	import {TGunsState} from '../../stores/guns/guns-store.interface';
	import GunNavigator from './components/GunNavigator.svelte';

	export let id;

	let gunsState: TGunsState;
	let gunsUnsubscribe;

	function processStore(value: TGunsState) {
		gunsState = value;
		if (!value?.guns || value.guns.length === 0) {
			if (id) {
				navigate('/track');
			}
			return; // empty Guns table
		}

		const storedId = localStorage.getItem('gun.current');

		const storedRecord = value.guns.find(item => item.id === storedId);
		const record = value.guns.find(item => item.id === id);

		const resetNeeded = (id && !record) || (storedId && !storedRecord) || (!id && !storedRecord);

		if (resetNeeded) {
			localStorage.setItem('gun.current', value.guns[0].id);
			navigate('/track/' + value.guns[0].id);
			return;
		}

		if (storedId && storedRecord) {
			navigate('/track/' + storedId);
			return;
		}
	}

	onMount(() => {
		gunsUnsubscribe = GunsStore.subscribe((value: TGunsState) => {
			if (!value) {
				return;
			}
			if (!value.fullReady) {
				return;
			}
			processStore(value);
		});
	})

	onDestroy(() => {
		gunsUnsubscribe && gunsUnsubscribe();
	});
</script>

{#if (!gunsState || !gunsState.fullReady)}
	<p>
		<SpinnerComponent/>
		Loading...
	</p>
{:else }
	<GunNavigator id={id} gunsState={gunsState}/>
{/if}

<style lang="less">
	@import "track.less";
</style>
