<script lang="ts">
	export let text = '';

	let translation = '';
	let slot;
	let toTranslate;

	$: if (text) {
		toTranslate = text;
	}
	$: if (slot && slot.textContent) {
		toTranslate = slot.textContent;
	}
</script>

<span>
	{#if toTranslate}
		{toTranslate}
	{/if}
	<i bind:this={slot} class="hide"><slot/></i>
</span>

<style>
    .hide {
        display: none;
    }
</style>
