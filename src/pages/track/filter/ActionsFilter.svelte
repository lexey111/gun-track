<script lang="ts">
	import {onMount} from 'svelte';
	import I18n from '../../../components/i18n/I18n.svelte';
	import {ActionsStore} from '../../../stores/actions/actions-store';
	import {TActionsState} from '../../../stores/actions/actions-store.interface';
	import {ActionTypes} from '../../../stores/actions/actions-store.types';
	import {clickOutside} from '../../../utils/click-outside';

	export let actionsState: TActionsState;

	let active = false;

	let selection: Array<string> = [];
	let allSelected = false;

	function resetSelection() {
		selection = [];
		const curFilter = ActionsStore.getFilter();
		ActionTypes.forEach(type => {
			if (!curFilter.length || curFilter.includes(type.id)) {
				selection.push(type.id)
			}
		});
		allSelected = selection.length === ActionTypes.length;
	}

	onMount(() => {
		resetSelection();
	});

	function handleChange(id: string): void {
		const state = selection.includes(id);
		if (state) {
			selection = selection.filter(item => item !== id);
		} else {
			selection = [...selection, id];
		}
		allSelected = selection.length === ActionTypes.length;
	}

	function handleSelectAll() {
		let _allSelected = selection.length === ActionTypes.length;
		selection = [];
		if (!_allSelected) {
			ActionTypes.forEach(item => selection.push(item.id));
		}
		allSelected = selection.length === ActionTypes.length;
	}

	const setActive = () => {
		active = true;
	};

	const setInactive = () => {
		active = false;
		resetSelection();
	};

	function applyFilter() {
		ActionsStore.setFilter(selection);
		setInactive();
	}

	function cancelFilter() {
		resetSelection();
		setInactive();
	}

	function handleClickOutside() {
		setInactive();
	}
</script>

<div class={'actions-filter-container' + (active ? ' active' : '')} use:clickOutside on:click_outside={handleClickOutside}>
	<div class="af-title" tabindex="0" on:click={setActive}>
		Filter
		{#if (selection.length && !allSelected && !active)}
			({selection.length})
		{/if}
		<i></i>
	</div>
	<div class="af-dropdown-wrapper">
		<div class="af-dropdown-content">
			<p>
				<input type="checkbox" id={'all'}
				       checked={allSelected}
				       on:change={handleSelectAll}
				/>
				<label for={'all'}>
					<I18n text={'@Actions.all'}/>
				</label>
			</p>
			<hr>
			{#each ActionTypes as actionType}
				<p>
					<input type="checkbox"
					       id={actionType.id}
					       checked={selection.includes(actionType.id)}
					       on:change={() => handleChange(actionType.id)}/>
					<label for={actionType.id}>
						<I18n text={'@Actions.' + actionType.id}/>
					</label>
				</p>
			{/each}
			<hr>

			<div class="af-actions">
				<button class="press press-ghost press-sm" on:click={cancelFilter}>Cancel</button>
				<button class="press press-ghost press-sm press-deeppurple" on:click={applyFilter}>Apply</button>
			</div>
		</div>
	</div>
</div>

<style lang="less">
	.actions-filter-container {
		position: relative;
		height: 1em;

		hr {
			margin: 0 0 8px 0;
			padding: 0;
		}

		.af-title {
			cursor: pointer;
			color: var(--app-link-text);
			transition: all .2s ease;
			position: relative;
			padding-right: 10px;
			outline: none;

			i {
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 6px 3px 0 3px;
				position: absolute;
				right: 0;
				top: 50%;
				margin-top: -3px;
				border-color: var(--app-link-text) transparent transparent transparent;
				transition: all .2s ease;
				transform-origin: center center;
			}
		}

		.af-dropdown-wrapper {
			position: absolute;
			top: 100%;
			right: 0;
			box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
			background-color: var(--app-page-background);
			padding: 8px 16px;
			border-radius: 6px;
			pointer-events: none;
			opacity: 0;
			z-index: -1;
			transition: all .2s ease;

			p {
				font-size: var(--app-small-font-size);
				line-height: 1.2em;
			}

			.af-actions {
				display: flex;
				flex-flow: row wrap;
				width: 100%;
				justify-content: flex-end;
			}
		}

		&.active, &:focus {

			.af-title {
				color: var(--app-link-text-active);

				i {
					transform: rotate(180deg);
					border-color: var(--app-link-text-active) transparent transparent transparent;

				}

				&:focus {
					outline: none;
				}
			}

			.af-dropdown-wrapper {
				pointer-events: all;
				z-index: 100;
				opacity: 1;
			}
		}
	}
</style>
