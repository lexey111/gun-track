<script lang="ts">
	import I18n from '../../components/i18n/I18n.svelte';

	const email = 'admin@gun-track.org';
</script>

<h1>
	<I18n>@User.Contacts</I18n>
</h1>
<h3>
	<I18n>@User.AdminEmail</I18n>
</h3>
<p>
	<a href="mailto:{email}">{email}</a>
</p>

<h3>
	<I18n>@Contacts.UserDataDeletion</I18n>
</h3>

<p>
	<I18n>@Contacts.WeDontCollect</I18n>
</p>

<p>
	<I18n>@Contacts.ToDoThat</I18n>
</p>

<ol>
	<li>
		<I18n>@Contacts.InstructionLine1</I18n>
	</li>
	<li>
		<I18n>@Contacts.InstructionLine2</I18n>
	</li>
</ol>
