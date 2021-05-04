<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import I18n from '../../../components/i18n/I18n.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
</script>

<div class="no-records">
	<h2>
		<I18n>@Guns.NothingRegistered</I18n>
	</h2>
	<p>
		<I18n>@Guns.RegisterAtLeastOne</I18n>
	</p>
	<p>
		&nbsp;
	</p>

	<Button on:click={() => navigate('/guns')} type="ghost">
		<I18n>@Guns.GotoGunsPage</I18n> &nbsp;<Icon type="arrow-right"/>
	</Button>
</div>
