<script lang="ts">
	import dayjs from 'dayjs'
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import {onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import {I18nService} from '../../../components/i18n/i18n.service';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import Confirm from '../../../components/modal/Confirm.svelte';
	import Info from '../../../components/modal/Info.svelte';
	import type {Gun} from '../../../models';
	import {GunsStore} from '../../../stores/guns/guns-store';
	import GunPhoto from './GunPhoto.svelte';

	dayjs.extend(localizedFormat);
	let confirmRemovePhotoDialog: any;

	export let gun: Gun = null;
	export let dateLocale: string;
	export let onRemove: (id: string) => void;

	const handleNavigate = (id: string) => {
		navigate('/track/' + id);
	};

	let infoNotes: any;
	const onShowNotes = (id: string) => {
		const note = GunsStore.getGunById(id)?.notes;
		if (!note) {
			return;
		}
		infoNotes.showInfoDialog({
			text: note,
			extraClass: 'scroll-y',
			title: notesCaption
		});
	};

	const onUploadPhoto = (id: string) => {
		navigate('/guns/' + encodeURI(id) + '/upload');
	};

	const onEdit = (id: string) => {
		navigate('/guns/' + encodeURI(id) + '/edit');
	};

	let title: string;
	let hasName: boolean;
	let hasMake: boolean;
	let hasModel: boolean;
	$: {
		title = gun?.name || gun?.make || gun?.model || 'no name';
		hasName = !!gun?.name;
		hasMake = !!gun?.make;
		hasModel = !!gun?.model;
	}

	let gotoTracking: string;
	let notesCaption: string;
	let uploadPhoto: string;
	onMount(() => {
		void I18nService.translate('@Guns.gotoTracking').then(s => gotoTracking = s);
		void I18nService.translate('@Common.Notes').then(s => notesCaption = s);
		void I18nService.translate('@Guns.uploadPhoto').then(s => uploadPhoto = s);
	});
</script>

<Info bind:this={infoNotes}/>
<Confirm bind:this={confirmRemovePhotoDialog}/>

{#if (gun)}
	<div class="gun-card">
		<div class="gc-content">
			<div class="gc-title" class:with-photo={gun.photo} on:click={() => onEdit(gun.id)}>
				<div class="gc-title-content">
					{title}
				</div>
				{#if (gun.photo)}
					<div class="gc-photo-wrapper">
						<div class="gc-photo">
							<GunPhoto id={gun.id}/>
						</div>
					</div>
				{/if}
			</div>
			{#if (hasMake && hasName)}
				<div class="gc-make">
					<span>{gun.make}</span>
				</div>
			{/if}
			{#if (hasModel && hasName || (hasModel && hasMake))}
				<div class="gc-model">
					<span>{gun.model}</span>
				</div>
			{/if}
			{#if (gun.dateCreated)}
				<div class="gc-date">
					{dayjs(gun.dateCreated).locale(dateLocale).format('LL')}
				</div>
			{/if}
			{#if (gun.caliber)}
				<div class="gc-caliber">
					{gun.caliber}
				</div>
			{/if}
			<div class="gc-actions">
				<Button size="small" type="link" on:click={() => handleNavigate(gun.id)}>
					<Icon type="arrow-right" alt={gotoTracking}/>
				</Button>

				{#if (gun.notes)}
					<Button size="small" type="link" on:click={() => onShowNotes(gun.id)}>
						<Icon type="file" alt={notesCaption}/>
					</Button>
				{/if}

				<Button size="small" type="link" on:click={() => onUploadPhoto(gun.id)}>
					<Icon type="camera" alt={uploadPhoto}/>
				</Button>

				<Button size="small" type="ghost" on:click={() => onEdit(gun.id)}>
					<Icon type="edit"/>
					<I18n>@Common.Change</I18n>
				</Button>
				<Button size="small" type="link-danger" on:click={() => onRemove(gun.id)}>
					<Icon type="delete"/>
				</Button>
			</div>
		</div>
	</div>
{/if}


<style lang="less">
	:global {
		.gun-card {
			background-color: var(--app-card-background);
			color: var(--app-card-text);
			font-size: var(--app-small-font-size);
			border-radius: 7px;
			overflow: hidden;
			display: flex;
			flex-flow: column wrap;
			box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
			transition: all .2s ease;

			flex: 1 0 330px; /* can grow, can't shrink, minimum width 300px */
			max-width: 500px;
			min-height: 200px;
			margin: 10px;
			opacity: .9;

			.gc-actions {
				opacity: 0;
				transition: all .2s ease;
			}

			.gc-title {
				transition: background-color .2s ease, color .2s ease;
				cursor: pointer;
				flex-flow: column nowrap;
				display: flex;
				font-size: var(--app-very-big-font-size);
				border-radius: 7px 7px 0 0;
				padding-top: 32px;
				background-color: #ddd;

				.gc-title-content {
					padding: 0 16px 32px 0;
					width: 100%;
					flex-flow: row wrap;
					box-sizing: border-box;
				}

				&.with-photo {
					padding-bottom: 32px;
					margin-bottom: 48px;

					.gc-title-content {
						padding: 0 16px;
						margin-bottom: 20px;
					}
				}
			}

			.gc-content {
				height: 100%;
				max-width: 100%;
				width: 100%;
				overflow: hidden;
				display: flex;
				flex-flow: column nowrap;
				position: relative;

				div {
					display: flex;
					flex-flow: row nowrap;
					width: 100%;
					justify-content: center;
					text-align: center;
				}

				.gc-title {
					flex-flow: column nowrap;
					position: relative;
				}

				.gc-photo-wrapper {
					display: flex;
					width: 100%;
					position: absolute;
					top: 100%;
					margin-top: -62px;
					left: 0;
					right: 0;
					z-index: 2;

					.gc-photo {
						transition: all .2s ease;
						height: 80px;
						width: 80px;
						margin: 16px 0;
						background-color: var(--app-white-bg);
						border: 4px solid var(--app-white-bg);
						box-sizing: content-box;
						border-radius: 100%;
						overflow: hidden;
						position: relative;
						z-index: 1;

						span {
							z-index: 2;
						}

						img {
							width: 100%;
							min-height: 100%;
							object-fit: cover;

							transition: all .2s ease;

							&.loaded {
								animation-name: gun-image-appear;
								animation-delay: .1s;
								animation-fill-mode: forwards;
								animation-duration: .2s;
								animation-timing-function: linear;
							}
						}
					}
				}

			}

			&:hover, &:focus-within {
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
				opacity: 1;

				.gc-actions {
					opacity: 1;
				}

				.gc-title {
					background-color: var(--app-accent-background);
					box-shadow: 0 2px 12px rgba(0, 0, 0, .2);
					color: var(--app-accent-text);
				}

				.gc-photo {
					box-shadow: 0 2px 12px rgba(0, 0, 0, .2);
				}
			}

			.gc-make, .gc-model, .gc-date, .gc-caliber {
				margin-top: 8px;

				span {
					padding: 0 16px;
				}
			}

			.gc-make {
				color: #000;
			}

			.gc-date {
				color: var(--app-remark-text);
			}

			.gc-actions {
				margin-top: auto;
				padding: 32px 0 16px 0;
				display: flex;
				flex-flow: row nowrap;
				box-sizing: border-box;
				align-items: center;

				button {
					padding: 8px 16px;
				}

				button:not(:last-child) {
					margin-right: 8px;
				}
			}
		}
	}

	@keyframes gun-image-appear {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
			border-radius: 100%;
		}
	}
</style>
