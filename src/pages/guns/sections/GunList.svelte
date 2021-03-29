<script lang="ts">
	import * as dayjs from 'dayjs'
	import * as localizedFormat from 'dayjs/plugin/localizedFormat';
	import {IConfirmDialog} from '../../../app/modal/Confirm.interface';
	import Confirm from '../../../app/modal/Confirm.svelte';
	import {Gun} from '../../../models';

	dayjs.extend(localizedFormat);

	export let onRemove: (id: string) => void;
	export let onEdit: (id: string) => void;

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

<div class="app-list">
	<Confirm bind:this={confirmDialog}/>
	<table class="data-table active">
		<thead>
		<tr>
			<th>Name</th>
			<th>Registered</th>
			<th class="centered">Actions</th>
		</tr>
		</thead>
		<tbody>
		{#each guns as gun}
			<tr on:dblclick={() => onEdit(gun.id)}>
				<td width="*">
					<a on:click={() => onEdit(gun.id)}>
						{gun.name}
					</a>
				</td>
				<td class="width-20">
					{#if (gun.dateCreated)}
						{dayjs(gun.dateCreated).format('LL LT')}
					{/if}
				</td>
				<td class="actions width-10">
					<div>
						<a on:click={() => onEdit(gun.id)}>
							Change
						</a>
						<span class="stub"></span>
						<a on:click={() => handleOnDelete(gun.id)} class="danger">
							Delete
						</a>
					</div>
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
</div>
