<script lang="ts">
	import {Gun} from '../../../models';

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
					{#if (gun._lastChangedAt)}
						{new Date(gun._lastChangedAt)}
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
