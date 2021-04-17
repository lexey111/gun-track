<script lang="ts">
	import Edit from 'carbon-icons-svelte/lib/Edit16';
	import Trash from 'carbon-icons-svelte/lib/TrashCan16';

	import * as dayjs from 'dayjs'
	import * as localizedFormat from 'dayjs/plugin/localizedFormat';
	import Button from '../../../components/buttons/Button.svelte';
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
				<Button size="small" onClick={() => onEdit(gun.id)}>
					<Edit/>
					Change
				</Button>
				<Button size="small" type="danger" onClick={() => onRemove(gun.id)}>
					<Trash/>
				</Button>
			</div>
		</div>
	</div>
{/if}
