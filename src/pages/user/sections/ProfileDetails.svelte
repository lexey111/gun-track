<script lang="ts">
	import Image from '../../../components/images/Image.svelte';
	import type {IAuthStore, TAuthState} from '../../../stores/auth/auth-store.interface';
	import ProfileLogout from './ProfileLogout.svelte';

	export let authStore: IAuthStore = null;
	export let authState: TAuthState;
</script>

<table>
	<tr>
		<td style="width: 120px">
			{#if authState.profileImageUrl}
				<Image src="{authState.profileImageUrl}" alt="avatar" class="avatar"/>
			{/if}
		</td>
		<td>
			<h2>Authorized via {authState.providerId}</h2>
			<p>
				<b>User ID:</b> {authState.email}
			</p>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<ProfileLogout authStore={authStore}/>
		</td>
	</tr>
</table>

<!--	<pre>{JSON.stringify(authState, null, 4)}</pre>-->

<style lang="less">
	table {
		width: auto;
		border-collapse: collapse;

		tr {
			td {
				vertical-align: top;

				h2 {
					margin: 0;
				}
			}

			&:last-child {
				td {
					padding: 16px 0 0 0;
					text-align: right;
				}
			}
		}
	}

	:global {
		.avatar {
			width: 96px;
			height: 96px;
			padding: 0;
			margin: 0;
			overflow: hidden;
			border-radius: 100%;
			box-sizing: border-box;
			border: 4px solid var(--app-primary-bg);

		}
	}
</style>
