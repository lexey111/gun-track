<script lang="ts">
	import I18n from '../../../components/i18n/I18n.svelte';
	import Image from '../../../components/images/Image.svelte';
	import type {IAuthStore, TAuthState} from '../../../stores/auth/auth-store.interface';
	import ProfileLogout from './ProfileLogout.svelte';

	export let authStore: IAuthStore = null;
	export let authState: TAuthState;
</script>

<table>
	<tr>
		<td style="width: 120px; text-align: center">
			{#if authState.profileImageUrl}
				<Image src="{authState.profileImageUrl}" alt="avatar" class="avatar"/>
			{/if}
		</td>
		<td>
			<h2>
				<I18n>@User.AuthorizedVia</I18n> &nbsp; {authState.providerId}</h2>
			<p>
				<b>
					<I18n>@User.UserID</I18n>
					:</b> {authState.email}
			</p>
		</td>
	</tr>
	<tr>
		<td>
			<ProfileLogout authStore={authStore}/>
		</td>
		<td></td>
	</tr>
</table>

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

				padding-bottom: 32px;
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
