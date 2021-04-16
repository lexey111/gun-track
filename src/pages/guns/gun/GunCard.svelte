<script lang="ts">
	import Edit from 'carbon-icons-svelte/lib/Edit16';
	import Trash from 'carbon-icons-svelte/lib/TrashCan16';

	import * as dayjs from 'dayjs'
	import * as localizedFormat from 'dayjs/plugin/localizedFormat';
	import {Gun} from '../../../models';

	dayjs.extend(localizedFormat);

	export let gun: Gun = null;
	export let dateLocale: string;
	export let onRemove: (id: string) => void;
	export let onEdit: (id: string) => void;

	let title;
	let hasName;
	let hasMake;
	let hasModel;
	$: {
		title = gun?.name || gun?.make || gun?.model || 'no name';
		hasName = !!gun?.name;
		hasMake = !!gun?.make;
		hasModel = !!gun?.model;
	}
</script>

{#if (gun)}
	<div class="gun-card">
		<div class="gc-content">
			<div class="gc-title">
				<div class="gc-title-content">
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
			<div class="gc-actions">
				<button class="press press-deeppurple press-round" on:click={() => onEdit(gun.id)}>
					<Edit/>
					Change
				</button>
				<button class="press press-red press-round" on:click={() => onRemove(gun.id)}>
					<Trash/>
				</button>
			</div>
		</div>
	</div>
{/if}
