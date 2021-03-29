<script lang="ts">
	import * as dayjs from 'dayjs'
	import * as localizedFormat from 'dayjs/plugin/localizedFormat';
	import {Gun} from '../../../models';

	dayjs.extend(localizedFormat);

	export let onRemove: (id: string) => void;
	export let onEdit: (id: string) => void;

	export let guns: Array<Gun>;
	export let busy: boolean;
</script>

<div class="app-list">
	<table>
		{#each guns as gun}
			<tr>
				<td>{gun.name}</td>
				<td>
					{#if (gun.dateCreated)}
						{dayjs(gun.dateCreated).format('LL LT')}
					{/if}
				</td>
				<td>
					<button
						class="press press-round press-green press-ghost"
						disabled={busy}
						on:click={() => onEdit(gun.id)}>E
					</button>
					<button
						class="press press-round press-red press-ghost"
						disabled={busy}
						on:click={() => onRemove(gun.id)}>D
					</button>
				</td>
			</tr>
		{/each}
	</table>
</div>
