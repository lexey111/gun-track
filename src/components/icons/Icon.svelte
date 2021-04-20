<script lang="ts">
	import {IconsMap} from './icons-map';

	export let type = 'star';
	export let size = '1rem';
	export let alt = '';

	const displayIcon = (alt ? `<title>${alt}</title>` : '') + IconsMap[type] || IconsMap.star;
</script>

<svg
	class={$$props.class}
	width={size}
	height={size}
	fill="currentColor"
	viewBox="64 64 896 896">
	{@html displayIcon}</svg>

<style>
    svg.inline {
        display: inline-flex;
        margin-right: .4em;
    }
</style>
