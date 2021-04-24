<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Dropdown from '../../../components/dropdown/Dropdown.svelte';
	import type {Gun} from '../../../models';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import type {TGunsState} from '../../../stores/guns/guns-store.interface';

	export let id: string;
	export let gunsState: TGunsState;

	let closeMenu: any;

	const handleGunSwitch = (id: string) => {
		closeMenu();
		localStorage.setItem('gun.current', id);
		navigate('/track/' + id);
		return false
	};

	let currentGun: Gun;
	let currentGunTitle: string;
	$: {
		currentGun = GunsStore.getGunById(id);
		currentGunTitle = currentGun?.name || currentGun?.make || currentGun?.model || 'unknown';
	}
</script>

<div>
	<Dropdown className="menu menu-left menu-button menu-button-ghost gun-navigator" bind:close={closeMenu}>
		<span slot="title">{currentGunTitle}</span>
		<div class="dropdown-menu">
			{#each gunsState.guns as gun}
				<!--  svelte-ignore a11y-invalid-attribute-->
				<a href="#" on:click={() => handleGunSwitch(gun.id)}
				   class={id === gun.id ? 'selected' : ''}>
					{gun.name || gun.make || gun.model || 'unknown'}
					{#if (gun.name && (gun.make || gun.model))}
						<br/>
						<i>{gun.make} {gun.model}</i>
					{/if}
					{#if (!gun.name && (gun.make && gun.model))}
						<br/>
						<i>{gun.model}</i>
					{/if}
				</a>
			{/each}
		</div>
	</Dropdown>
</div>
