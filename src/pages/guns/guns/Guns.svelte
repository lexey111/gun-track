<script lang="ts">
	import * as dayjs from 'dayjs'
	import * as localizedFormat from 'dayjs/plugin/localizedFormat';
	import {IConfirmDialog} from '../../../components/modal/Confirm.interface';
	import Confirm from '../../../components/modal/Confirm.svelte';
	import {Gun} from '../../../models';
	import GunCard from '../gun/GunCard.svelte';

	dayjs.extend(localizedFormat);

	export let onRemove: (id: string) => void;
	export let onEdit: (id: string) => void;
	export let dateLocale: string;

	export let guns: Array<Gun>;

	let confirmDialog: IConfirmDialog;
	const handleOnDelete = (id: string) => {
		const gun = guns.find(x => x.id === id);

		confirmDialog.showConfirmDialog({
			text: `Are you sure you want to delete this gun? Operation cannot be undone!
\n
Gun to delete: ${gun.name}
			`,
			confirmText: 'Delete',
			onConfirm: () => onRemove(id)
		});
	}
</script>

<Confirm bind:this={confirmDialog}/>
<div class="guns-list">
	{#each guns as gun}
		<GunCard gun={gun}
		         onEdit={onEdit}
		         onRemove={handleOnDelete}
		         dateLocale={dateLocale}/>
	{/each}
</div>
