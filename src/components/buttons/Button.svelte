<script lang="ts">
	export let type: '' | 'default' | 'text' | 'danger' | 'text-danger' = '';
	export let size: 'small' | 'default' | 'big' = 'default';
	export let disabled = false;
	export let onClick: () => void = null;

	let className: string;
	$: {
		className = 'app-btn press';
		if (type === '' || type === 'default') {
			className += ' press-blue';
		}
		if (type === 'danger') {
			className += ' press-red';
		}
		if (type === 'text') {
			className += ' press-ghost';
		}
		if (type === 'text-danger') {
			className += ' press-ghost press-red';
		}

		if (size === 'small') {
			className += ' small';
		}
		if (size === 'big') {
			className += ' big';
		}
	}
</script>

<button class={className} disabled={disabled} on:click={onClick}>
	<slot/>
</button>

<style lang="less">
	:global {
		.app-btn {
			&.press.small {
				font-size: var(--app-small-font-size);
				padding-top: 10px;
				padding-bottom: 10px;
			}

			&.press.big {
				font-size: var(--app-big-font-size);
				padding: 16px 32px;
			}

			&.press-ghost {
				box-shadow: none;
			}
		}
	}
</style>
