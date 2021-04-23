<script lang="ts">
	import {navigate} from 'svelte-routing';
	import Button from '../../../components/buttons/Button.svelte';
	import Icon from '../../../components/icons/Icon.svelte';
</script>

<div class="no-records">
	<h2>No guns is registered yet.</h2>
	<h3>You need to register at least one to make records.</h3>
	<p>
		&nbsp;
	</p>

	<Button onClick={() => navigate('/guns')}>
		Go to Guns page &nbsp;<Icon type="arrow-right"/>
	</Button>
</div>
