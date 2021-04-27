<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import {GunsStore} from '../../../stores/guns/guns-store';

	let gunsState$: any;
	let gunsState = {
		guns: []
	};

	onMount(() => {
		gunsState$ = GunsStore.subscribe(value => {
			if (!value || value.isEmpty === null) {
				return;
			}
			gunsState.guns = value.guns;
		});
	});

	onDestroy(() => {
		gunsState$ && gunsState$();
	});

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

	const handleGunChange = (id: string) => {
		navigate('/track/' + id);
	};
</script>
<ul class="guns-menu">
	{#each guns as gun}
		<li>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#" on:click={() => handleGunChange(gun.id)}>
				{gun.title}
			</a>
			{#if (gun.subtitle && gun.subtitle !== gun.title)}
				<i>{gun.subtitle}</i>
			{/if}
		</li>
	{/each}
</ul>

<style lang="less">
	.guns-menu {
		column-count: 2;
		background-color: var(--app-white-bg);
		padding: 16px;
		border-radius: 7px;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		list-style: decimal;

		li {
			margin-left: 16px;

			a {
				padding-left: 16px;
				display: block;
				font-weight: bold;
			}

			i {
				padding-left: 16px;
				font-size: var(--app-small-font-size);
				font-weight: normal;
				font-style: normal;
			}
		}
	}
</style>
