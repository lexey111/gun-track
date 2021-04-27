<script lang="ts">
	import {onMount} from 'svelte';
	import Button from '../../../components/buttons/Button.svelte';
	import Dropdown from '../../../components/dropdown/Dropdown.svelte';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import {ActionsStore} from '../../../stores/actions/actions-store';
	import {ActionTypes} from '../../../stores/actions/actions-store.types';

	export let storeFilters: Array<string> = [];
	export let onApply: (filters: Array<string>) => void;

	let selection: Array<string> = [];
	let allSelected = false;

	function resetSelection() {
		selection = [];
		const curFilter = storeFilters; // ActionsStore.getFilter();
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

	let title: string;
	$: {
		title = 'Filter...';
		if (selection.length && !allSelected) {
			title = 'Filter [' + selection.length + ']';
		}
	}
	let closeDropdown: any;

	function applyFilter() {
		onApply && onApply(selection);
		ActionsStore.setFilter(selection);
		closeDropdown();
	}

	function cancelFilter() {
		resetSelection();
		closeDropdown();
	}

	function handleDropdownOpen(active: boolean): void {
		if (active) {
			resetSelection();
		}
	}
</script>

<div class="block block-min">
	<div class="block-content">
		<Dropdown onActiveChange={handleDropdownOpen}
		          isToolbar={true}
		          className="af-filter"
		          bind:close={closeDropdown}>
			<span slot="title" class="af-title"><Icon type="filter" class="inline"/> {title}</span>
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
						       class="small"
						       id={actionType.id}
						       checked={selection.includes(actionType.id)}
						       on:change={() => handleChange(actionType.id)}/>
						<label for={actionType.id}>
							<I18n text={'@Actions.' + actionType.id}/>
						</label>
					</p>
				{/each}
				<div class="af-actions">
					<!--  svelte-ignore a11y-invalid-attribute-->
					<a href="#" on:click={cancelFilter}>Cancel</a>
					<Button size="small" onClick={applyFilter}>Apply</Button>
				</div>
			</div>
		</Dropdown>
	</div>
</div>

<style lang="less">
	:global {
		.af-title {
			font-size: var(--app-font-size);
			width: 7em;
		}

		.af-dropdown-content {
			display: flex;
			flex-flow: column wrap;
			font-size: var(--app-small-font-size);
			color: var(--app-text);
			padding: 0 16px;
			min-width: 200px;

			hr {
				margin: 8px 0;
			}

			p {
				line-height: 1.0em;
				padding: 0;
				margin: 6px 0;
			}

			.af-actions {
				margin-top: 24px;
				display: flex;
				flex-flow: row wrap;
				width: 100%;
				justify-content: flex-end;
				align-items: center;

				button {
					margin-left: 1em;
				}
			}
		}
	}
</style>
