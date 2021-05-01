<script lang="ts">
	import dayjs from 'dayjs'
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import type {Gun} from '../../../models';
	import GunCard from '../gun/GunCard.svelte';

	dayjs.extend(localizedFormat);

	export let onRemove: (id: string) => void;
	export let dateLocale: string;

	export let guns: Array<Gun>;
</script>

<div class="guns-list">
	{#each guns as gun}
		<GunCard gun={gun}
		         onRemove={() => onRemove(gun.id)}
		         dateLocale={dateLocale}/>
	{/each}
</div>

<style>
    .guns-list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 64px;
        justify-content: center;
    }
</style>
