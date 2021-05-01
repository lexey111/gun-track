<script type="ts">
	import GunAwarePage from './GunAwarePage.svelte';
	import GunFormPage from './GunFormPage.svelte';

	export let id: string;
</script>

<GunAwarePage {id} component={GunFormPage}/>
