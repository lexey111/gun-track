<script lang="ts">
	import Dropdown from '../../components/dropdown/Dropdown.svelte';
	import I18n from '../../components/i18n/I18n.svelte';
	import {ActionTypes} from '../../stores/actions/actions-store.types';

	let date = new Date();

	let title = 'Test 1';

	function handleDropdownActive(active: boolean): void {
		if (active) {
			title = 'Test 1 (open)';
		}
	}

	function handleDropdownOpen(active: boolean): void {
		if (!active) {
			title = 'Test 1';
		}
	}

	let closeDropdown1;

	function closeDropdown() {
		console.log('Apply!');
		closeDropdown1();
	}
</script>

<div class="app-page">
	<h1>
		<I18n>@Common.Welcome</I18n>
	</h1>
	<h2>
		<I18n text="@Common.Welcome"/>
	</h2>
	<h3>
		<I18n>@Common.ThisIsGunTrack</I18n>
	</h3>

	<div class="form-group">
		<label>Test</label>
		<Dropdown onActiveChange={handleDropdownActive}
		          onActiveChanged={handleDropdownOpen}
		          bind:close={closeDropdown1}>
			<span slot="title">{title}</span>
			<div class="some-content">
				<h1>Some content</h1>
				<p>
					Hello, guys!
				</p>
				<button class="press press-ghost press-amber" on:click={closeDropdown}>Close</button>
			</div>
		</Dropdown>
	</div>

	<div class="form-group">
		<label>Test</label>
		<Dropdown title="Test title">
			<div class="some-content">
				<h1>Some content</h1>
				<p>
					Hello, guys!
				</p>
			</div>
		</Dropdown>
	</div>


	{#each ActionTypes as actionType}
		<p>
			<input type="checkbox"
			       id={actionType.id}
			       checked={Math.random() > .5}/>
			<label for={actionType.id}>
				<I18n text={'@Actions.' + actionType.id}/>
			</label>
		</p>
	{/each}

</div>

<style lang="less">
    .some-content {
        white-space: nowrap;
    }

    p {
        font-size: var(--app-small-font-size);

    label {
        font-size: var(--app-small-font-size);
    }

    }
</style>
