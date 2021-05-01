<script lang="ts">
	export let type: '' | 'default' | 'link' | 'danger' | 'link-danger' | 'toolbar' | 'ghost' | 'ghost-danger' = '';
	export let size: 'small' | 'default' | 'big' = 'default';
	export let disabled = false;

	let className: string;
	$: {
		className = 'btn';
		if (type === '' || type === 'default') {
			className += ' btn-blue';
		}
		if (type === 'danger') {
			className += ' btn-red';
		}
		if (type === 'link') {
			className += ' btn-link';
		}
		if (type === 'link-danger') {
			className += ' btn-link btn-red';
		}
		if (type === 'toolbar') {
			className += ' btn-toolbar';
		}
		if (type === 'ghost') {
			className += ' btn-ghost';
		}
		if (type === 'ghost-danger') {
			className += ' btn-ghost-danger';
		}

		if (size === 'small') {
			className += ' small';
		}
		if (size === 'big') {
			className += ' big';
		}
	}
</script>

<button class={className} {disabled} on:click>
	<slot/>
</button>
