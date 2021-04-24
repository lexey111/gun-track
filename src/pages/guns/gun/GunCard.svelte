<script lang="ts">
	import dayjs from 'dayjs'
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import Info from '../../../components/modal/Info.svelte';
	import type {Gun} from '../../../models';
	import {GunsStore} from '../../../stores/guns/guns-store';

	dayjs.extend(localizedFormat);

	export let gun: Gun = null;
	export let dateLocale: string;
	export let onRemove: (id: string) => void;
	export let onEdit: (id: string) => void;

	const handleNavigate = (id: string) => {
		navigate('/track/' + id);
	};

	let infoNotes: any;
	const onShowNotes = (id: string) => {
		const notes = GunsStore.getGunById(id)?.notes;
		if (!notes) {
			return;
		}
		infoNotes.showInfoDialog({
			text: notes,
			title: 'Notes'
		});
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
</script>

<Info bind:this={infoNotes}/>

{#if (gun)}
	<div class="gun-card">
		<div class="gc-content">
			<div class="gc-title">
				<div class="gc-title-content" on:click={() => onEdit(gun.id)}>
					{title}
				</div>
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
				<Button size="small" type="text" onClick={() => handleNavigate(gun.id)}>
					<Icon type="arrow-right" alt="Go to Tracking"/>
				</Button>
				{#if (gun.notes)}
					<Button size="small" type="text" onClick={() => onShowNotes(gun.id)}>
						<Icon type="file" alt="Notes..."/>
					</Button>
				{/if}
				<Button size="small" type="text-ghost" onClick={() => onEdit(gun.id)}>
					<Icon type="edit"/>
					Change
				</Button>
				<Button size="small" type="text-danger" onClick={() => onRemove(gun.id)}>
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

			flex: 1 0 300px; /* can grow, can't shrink, minimum width 300px */
			max-width: 500px;
			min-height: 200px;
			margin: 10px;
			opacity: .9;

			.gc-actions {
				opacity: 0;
				transition: all .2s ease;
			}

			.gc-title-content, .gc-date, .gc-make, .gc-model, .gc-caliber {
				transition: transform .2s ease;
				transform: translateY(32px);
			}

			.gc-title {
				transition: background-color .2s ease-in-out, color .2s ease-in-out;
				cursor: pointer;
			}

			&:hover, &:focus-within {
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
				opacity: 1;

				.gc-actions {
					opacity: 1;
				}

				.gc-title-content, .gc-date, .gc-make, .gc-model, .gc-caliber {
					transform: translateY(0);
				}

				.gc-title {
					background-color: var(--app-accent-background);
					box-shadow: 0 2px 12px rgba(0, 0, 0, .2);
					color: var(--app-accent-text);
				}
			}

			.gc-content {
				height: 100%;
				max-width: 100%;
				width: 100%;
				overflow: hidden;
				display: flex;
				flex-flow: column nowrap;

				div {
					display: flex;
					flex-flow: row nowrap;
					width: 100%;
					justify-content: center;
					text-align: center;
				}
			}

			.gc-title {
				font-size: var(--app-very-big-font-size);
				border-radius: 7px 7px 0 0;

				.gc-title-content {
					padding: 16px;
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
</style>
