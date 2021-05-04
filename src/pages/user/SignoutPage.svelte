<script lang="ts">
	import {onMount} from 'svelte';
	import {navigate} from 'svelte-routing';
	import I18n from '../../components/i18n/I18n.svelte';

	onMount(() => {
		setTimeout(() => {
			navigate('/home');
		}, 500);
	});
</script>

<h1>
	<I18n>@User.SignOut</I18n>
</h1>
<p>
	<I18n>@User.SignoutMessage</I18n>
</p>
