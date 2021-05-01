<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
</script>

<div class="no-records">
	<h2>No guns is registered yet.</h2>
	<p>You need to register at least one to make records.</p>
	<p>
		&nbsp;
	</p>

	<Button on:click={() => navigate('/guns')} type="ghost">
		Go to Guns page &nbsp;<Icon type="arrow-right"/>
	</Button>
</div>
