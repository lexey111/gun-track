<script type="ts">
	import GunAwarePage from './GunAwarePage.svelte';
	import PhotoUploadPage from './PhotoUploadPage.svelte';

	export let id: string;
</script>

<GunAwarePage {id} component={PhotoUploadPage}/>
