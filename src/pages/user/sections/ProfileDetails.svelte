<script lang="ts">
	import Image from '../../../components/Image.svelte';
	import {IAuthStore, TAuthState} from '../../../stores/auth/auth-store.interface';
	import ProfileLogout from './ProfileLogout.svelte';

	export let authStore: IAuthStore = null;
	export let authState: TAuthState;
</script>

<table>
	<tr>
		<td>
			{#if authState.profileImageUrl}
				<div class="avatar">
					<Image src="{authState.profileImageUrl}" alt="avatar"/>
				</div>
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
			<ProfileLogout authStore={authStore} authState={authState}/>
		</td>
	</tr>
</table>

<!--	<pre>{JSON.stringify(authState, null, 4)}</pre>-->

<style lang="less">
	table {
		width: 100%;
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

	.avatar {
		width: 96px;
		height: 96px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, .5);
		border-radius: 100%;
		overflow: hidden;
	}
</style>
