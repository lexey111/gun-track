<script lang="ts">
	import Icon from '../icons/Icon.svelte';

	export let title: string;
	export let open = false;

	const toggleState = () => {
		open = !open;
		console.log('open', open);
	}
</script>

<div class="collapser" class:open>
	<div class="collapser-header">
		<!--  svelte-ignore a11y-invalid-attribute-->
		<Icon type="down" on:click={toggleState}/>
		<a href="#" on:click={toggleState}>
			{title}
		</a>
	</div>
	<div class="collapser-content">
		<slot></slot>
	</div>
</div>

<style lang="less">
	:global {
		.collapser {
			display: flex;
			flex-flow: column nowrap;

			.collapser-header {
				width: 100%;
				height: 36px;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;

				svg {
					transform-origin: center center;
					width: 11px;
					height: 11px;
					transition: all .2s ease;
					margin-right: .5em;
					transform: rotate(-90deg);
					border: 2px solid var(--app-primary-bg);
					color: var(--app-primary-bg);
					padding: 4px;
					border-radius: 100%;
					display: inline-block;
					cursor: pointer;

					&:hover {
						border-color: var(--app-primary-bg-light);
					}
				}

				a {
					text-decoration: none;
					line-height: 1;

					&:focus {
						outline: none;
						text-decoration: underline;
					}
				}
			}

			.collapser-content {
				opacity: 0;
				z-index: -1;
				pointer-events: none;
				tab-index: -1;
				transition: all .2s ease;
				max-height: 0;
				padding: 0 0 4px 18px;
				margin-left: 10px;
				border-left: 4px solid var(--app-primary-bg);
			}

			&.open {
				.collapser-header {
					svg {
						transform: rotate(-180deg);
					}
				}

				.collapser-content {

					opacity: 1;
					z-index: 0;
					pointer-events: all;
					tab-index: 0;
					max-height: 1000px;
				}
			}
		}
	}
</style>
