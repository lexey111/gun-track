<script lang="ts">
	import Icon from '../../../../components/icons/Icon.svelte';
	import type {TAction} from '../../../../stores/actions/actions-store.interface';

	export let action: TAction
	export let onShowNotes: (id: string) => void;

</script>

{#if (action.trainingNotes)}
	<div class="action-notes" on:click={() => onShowNotes(action.id)}>
		<Icon type="file"/>
		{@html action.trainingNotes}
	</div>
{/if}

<style lang="less">
	:global {
		.action-notes {
			svg {
				display: block;
				float: left;
				clear: both;
				padding: 2px 8px 0 0;
			}

			font-size: var(--app-small-font-size);
			max-height: 72px;
			height: auto;
			overflow: hidden;
			background-color: var(--app-background);
			padding: 4px 8px;
			margin: 8px 0;
			position: relative;
			border-radius: 6px;
			min-height: 24px;
			transition: transform .4s ease, opacity .2s ease;
			cursor: pointer;
			opacity: .8;

			&:hover {
				opacity: 1;
			}

			&:before {
				content: '';
				display: block;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				background-color: var(--app-background);
				opacity: .3;
				z-index: 2;
			}

			&:after {
				content: '';
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 24px;
				// background: linear-gradient(to bottom, transparent, var(--app-background) 70%);
				z-index: 2;
			}

			p {
				line-height: 1.0em !important;
				padding: 0;
				margin: 0 !important;
				margin-block-start: 0;
				margin-block-end: 0;
			}

			h1, h2, h3, h4 {
				margin: 0;
			}
		}
	}
</style>
