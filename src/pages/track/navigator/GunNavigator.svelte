<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Dropdown from '../../../components/dropdown/Dropdown.svelte';
	import type {Gun} from '../../../models';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import type {TGunsState} from '../../../stores/guns/guns-store.interface';

	export let id: string;
	export let gunsState: TGunsState;
	export let onTitle = false;

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

	let guns: Array<any>;
	$: {
		guns = gunsState?.guns?.map(gun => {
			const title = gun.name || gun.make || gun.model || 'unknown';
			let subtitle: string;
			if (gun.name) {
				subtitle = gun.make;
				if (gun.model) {
					subtitle += ' - ' + gun.model;
				}
			}
			if (!subtitle) {
				subtitle = gun.model;
			}

			return {
				...gun,
				title,
				subtitle
			};
		});
	}
</script>

<div>
	<Dropdown className={'menu menu-left menu-button' + (onTitle ? ' menu-button-ghost' : '')} bind:close={closeMenu}>
		<span slot="title">{currentGunTitle}</span>
		<div class="dropdown-menu">
			{#each guns as gun}
				<!--  svelte-ignore a11y-invalid-attribute-->
				<a href="#" on:click={() => handleGunSwitch(gun.id)}
				   class={id === gun.id ? 'selected' : ''}>
					{gun.title}
					{#if (gun.subtitle && gun.subtitle !== gun.title)}
						<br/>
						<i>{gun.subtitle}</i>
					{/if}
				</a>
			{/each}
		</div>
	</Dropdown>
</div>

<style lang="less">
	.dropdown-menu {
		i {
			display: inline-block;
			margin-top: 8px;
			font-weight: normal;
			font-style: normal;
			opacity: .8;
			font-size: var(--app-very-small-font-size);
		}
	}
</style>
