<script lang="ts">
	import {onDestroy, onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import SpinnerComponent from '../../../components/spinners/SpinnerComponent.svelte';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import GunPhoto from '../../guns/gun/GunPhoto.svelte';

	let gunsState$: any;
	let gunsState = {
		guns: []
	};
	let ready = false;

	onMount(() => {
		gunsState$ = GunsStore.subscribe(value => {
			if (!value || value.isEmpty === null) {
				return;
			}
			ready = true;
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

	const gotoGuns = () => {
		navigate('/guns');
	};

</script>

{#if (!ready)}
	<p>
		<SpinnerComponent/>
		<I18n>@Common.Loading</I18n>...
	</p>
{/if}

{#if (ready && guns && guns?.length === 0)}
	<p>
		<I18n>@Home.NoGunsRegistered</I18n>
	</p>
	<p>
		<Button type="ghost" on:click={gotoGuns}>
			<I18n>@Guns.GotoGunsPage</I18n> &nbsp;
			<Icon type="arrow-right"/>
		</Button>
	</p>
{/if}

{#if (ready && guns && guns?.length > 0)}
	<p class="track-goto">
		<Button type="ghost" on:click={gotoGuns}>
			<I18n>@Guns.GotoGunsPage</I18n>
		</Button>
	</p>

	<div class="track-selector">
		{#each guns as gun}
			<div class="track-item">
				<div class="track-item-content">
					{#if (gun.photo)}
						<GunPhoto id={gun.id} class="track-image"/>
					{/if}
					<div class="track-labels" class:with-photo={gun.photo}>

						<h4>
							{gun.title}
						</h4>

						{#if (gun.subtitle && gun.subtitle !== gun.title)}
							<h5>{gun.subtitle}</h5>
						{/if}

						{#if (gun.caliber)}
							<p>
								{gun.caliber}
							</p>
						{/if}

						<div class="track-actions">
							<Button type="ghost" on:click={() => handleGunChange(gun.id)}>
								<Icon type="arrow-right"/> &nbsp;
								<I18n>@Home.Records</I18n>
							</Button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style lang="less">
	:global {
		.track-goto {
			margin-left: 10px;
		}

		.track-selector {
			display: flex;
			flex-flow: row wrap;
			margin-bottom: 32px;
			align-items: center;
			justify-content: center;
			justify-items: center;

			.track-item {
				display: flex;
				flex: 1 0 330px; /* can grow, can't shrink, minimum width 300px */
				max-width: 500px;
				min-height: 200px;
				margin: 10px;
				padding: 16px;
				box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
				background-color: var(--app-white-bg);
				border-radius: 7px;
				align-items: stretch;

				.track-item-content {
					display: flex;
					width: 100%;
					flex-flow: row nowrap;

					.track-image {
						height: 120px;
						width: 120px;
						display: flex;
						flex-grow: 0;
						flex-shrink: 0;
						margin: 0;
						box-sizing: content-box;
						border: 4px solid var(--app-background);
						border-radius: 100%;
						overflow: hidden;
						position: relative;
						z-index: 1;

						img {
							width: 100%;
							max-height: 100%;
							object-fit: cover;
							border-radius: 100%;

							&.loaded {
								animation-name: track-image-appear;
								animation-fill-mode: forwards;
								animation-duration: .2s;
								animation-timing-function: linear;
							}
						}
					}

					.track-labels {
						flex-grow: 2;
						display: flex;
						flex-flow: column nowrap;
						position: relative;

						&.with-photo {
							border-left: 2px solid var(--app-background);
							margin-left: 16px;
							padding-left: 16px;
						}

						.track-actions {
							width: auto;
							padding-top: 8px;
							position: absolute;
							bottom: 0;
							right: 0;
							display: flex;
							flex-flow: row nowrap;
							justify-content: flex-end;
							flex-shrink: 0;
							flex-grow: 0;
							background-color: var(--app-white-bg);

							.btn {
								white-space: nowrap;
								margin-left: 5px;
							}
						}

						h4, h5, p {
							padding: 0 !important;
							margin: 0 0 .5em 0;
						}

						h4 {
							font-size: var(--app-big-font-size);
							display: block;
							font-weight: bold;
						}

						h5 {
							font-size: var(--app-font-size);
							font-weight: normal;
							font-style: normal;
							margin-bottom: 1em;
						}
					}
				}
			}
		}

		@keyframes track-image-appear {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
				border-radius: 100%;
			}
		}
	}
</style>
