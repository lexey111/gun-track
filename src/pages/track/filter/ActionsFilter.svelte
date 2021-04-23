<script lang="ts">
	import {onMount} from 'svelte';
	import Button from '../../../components/buttons/Button.svelte';
	import Dropdown from '../../../components/dropdown/Dropdown.svelte';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
	import {ActionsStore} from '../../../stores/actions/actions-store';
	import {ActionTypes} from '../../../stores/actions/actions-store.types';

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

	let title = 'Filter';
	let closeDropdown;

	function applyFilter() {
		ActionsStore.setFilter(selection);
		closeDropdown();
	}

	function cancelFilter() {
		resetSelection();
		closeDropdown();
	}

	function handleDropdownOpen(active: boolean): void {
		if (active) {
			title = 'Filter';
			resetSelection();
		}
	}

	function handleDropdownOpened(active: boolean): void {
		if (!active) {
			title = 'Filter';
			if (selection.length && !allSelected) {
				title += ' [' + selection.length + ']';
			}
		}
	}
</script>

<div class="block">
	<div class="block-content">
		<Dropdown onActiveChange={handleDropdownOpen}
		          onActiveChanged={handleDropdownOpened}
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
					<Button size="small" type="text" onClick={cancelFilter}>Cancel</Button>
					<Button size="small" onClick={applyFilter}>Apply</Button>
				</div>
			</div>
		</Dropdown>
	</div>
</div>

<style lang="less">
	:global {
		.af-filter {
			height: 1.2em;

			.af-title {
				display: inline-flex;
				align-content: center;
				align-items: center;
				color: var(--app-primary-text);
				font-size: var(--app-font-size);

				&:hover, &:focus {
					text-decoration: underline;
				}
			}

			svg.dc-down {
				color: var(--app-primary-text);
			}
		}

		.af-dropdown-content {
			display: flex;
			flex-flow: column wrap;
			font-size: var(--app-small-font-size);
			color: var(--app-text);
			padding: 0 16px 0 0;
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
				border-top: 1px dashed var(--app-border-color);
				margin-top: 8px;
				padding-top: 8px;
				display: flex;
				flex-flow: row wrap;
				width: 100%;
				justify-content: flex-end;

				button.press-ghost {
					color: var(--app-link-text);

					&:hover, &:focus {
						color: var(--app-link-text-active) !important;
					}
				}
			}
		}
	}
</style>
