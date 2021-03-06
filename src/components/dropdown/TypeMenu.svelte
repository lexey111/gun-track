<script lang="ts">
	import {ActionTypes} from '../../stores/actions/actions-store.types';
	import I18n from '../i18n/I18n.svelte';
	import Dropdown from './Dropdown.svelte';

	export let type: string;
	export let onChange: (type: string) => void;

	let closeMenu: any;
	let dropdown: any;

	const handleType = (newType: string): void => {
		onChange && onChange(newType);
		closeMenu();

		setTimeout(() => {
			dropdown && dropdown.focus();
		}, 200)
	};

	const groups = [];
	ActionTypes.forEach(item => {
		if (!groups[item.group]) {
			groups[item.group] = [];
		}
		groups[item.group].push(item);
	});

	function getGroupContent(groupId: string): Array<{ id: string }> {
		return groups[groupId];
	}
</script>

<Dropdown className="type-menu menu menu-button" bind:close={closeMenu} bind:dropdown={dropdown}>
		<span slot="title">
			{#if (type)}
				<I18n text={'@Actions.' + type}/>
			{:else}
				&mdash;
			{/if}
		</span>
	<div class="dropdown-menu">
		{#each Object.keys(groups) as groupName}
			<div>
				<h4>
					<I18n text={'@Groups.' + groupName}/>
				</h4>
				{#each getGroupContent(groupName) as item}
					<!--  svelte-ignore a11y-invalid-attribute-->
					<a href="#"
					   on:click={() => handleType(item.id)}
					   class:selected={item.id === type}
					   tabindex="0">
						<I18n text={'@Actions.' + item.id}/>
					</a>
				{/each}
			</div>
		{/each}
	</div>
</Dropdown>

<style lang="less">
	:global {
		.type-menu {
			&.dropdown-container {
				.dc-title {
					min-width: 10em;
				}

				.dc-dropdown-wrapper {
					left: 0;
					right: unset;

					.dropdown-menu {
						flex-flow: row nowrap !important;

						& > div {
							display: flex;
							flex-flow: column wrap;
							width: 33%;

							&:not(:first-child) {
								margin-left: 16px;
							}

							h4 {
								font-weight: bold;
								color: var(--app-primary-text);
								font-size: var(--app-small-font-size);
								border-bottom: 1px dashed var(--app-primary-bg-lighten);
								opacity: .8;
								margin: 8px 0;
								padding: 2px 0 6px 0;
							}
						}
					}

				}

				&.menu-oops {
					.dc-dropdown-wrapper {
						.dropdown-menu {
							flex-flow: column nowrap !important;

							& > div {
								width: 100%;

								&:not(:first-child) {
									margin: 0 !important;
								}

								h4 {
									margin: 4px 0;
									border: none;
									font-size: var(--app-small-font-size);
								}

								a {
									padding-top: 6px;
									padding-bottom: 6px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
