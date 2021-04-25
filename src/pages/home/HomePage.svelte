<script lang="ts">
	import LocaleMenu from '../../components/menu/LocaleMenu.svelte';
	import Button from '../../components/buttons/Button.svelte';
	import CurrencyMenu from '../../components/dropdown/CurrencyMenu.svelte';
	import Dropdown from '../../components/dropdown/Dropdown.svelte';
	import TypeMenu from '../../components/dropdown/TypeMenu.svelte';
	import I18n from '../../components/i18n/I18n.svelte';
	import Icon from '../../components/icons/Icon.svelte';
	import {IconsMap} from '../../components/icons/icons-map';
	import {showError, showInfo} from '../../components/notifications/notify';

	let type: string;
	const changeType = (t: string) => {
		console.log('>', t);
		type = t;
	}

	let currency = 'UAH';
	const changeCurrency = (t: string) => {
		console.log('>', t);
		currency = t;
	}
</script>

<h1>
	<I18n>@Common.Welcome</I18n>
</h1>
<h2>
	<I18n text="@Common.Welcome"/>
</h2>
<h3>
	<I18n>@Common.ThisIsGunTrack</I18n>
</h3>
<h4>Dropdown</h4>

<div class="form-group">
	<!--  svelte-ignore a11y-label-has-associated-control -->
	<label>Type</label>
	<TypeMenu type={type} onChange={changeType}/>
</div>

<div class="form-group">
	<!--  svelte-ignore a11y-label-has-associated-control -->
	<label>Type</label>
	<CurrencyMenu currency={currency} onChange={changeCurrency}/>
</div>

<Dropdown className="menu menu-left menu-button">
	<span slot="title">Left</span>
	<div class="dropdown-menu">
		<!--  svelte-ignore a11y-invalid-attribute-->
		<a href="#">
			sj askda Ajdhf skfdsjhfk jsdkfjhsdjkfhsk
		</a>
		<!--  svelte-ignore a11y-invalid-attribute-->
		<a class="selected" href="#">
			Ajdhf skfdsjhfk jsdkfjhsdjkfhsk
		</a>
		<!--  svelte-ignore a11y-invalid-attribute-->
		<a href="#">LK ;lkewew p[ssda</a>
		<!--  svelte-ignore a11y-invalid-attribute-->
		<a href="#">IUI Y78 8799</a>
	</div>
</Dropdown>
<h4>Toolbar</h4>
<div style="padding: 8px; background-color: var(--app-primary-bg); display: flex">
	<Button type="toolbar"><Icon type="home"/> &nbsp; Button</Button> &nbsp;

	<Dropdown isToolbar="true">
		<span slot="title"><Icon type="home"/> &nbsp;Toolbar button</span>
		<div class="dropdown-menu">
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#">
				sj askda Ajdhf skfdsjhfhsdjkfhsk
			</a>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a class="selected" href="#">
				Ajdhf skfdsjhfk jsdkfjhsdjkfhsk
			</a>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#">LK ;lkewew p[ssda</a>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#">IUI Y78 8799</a>
		</div>
	</Dropdown>
	&nbsp;
	<Dropdown isToolbar="true" left="true">
		<span slot="title"><Icon type="home"/> &nbsp;Toolbar button</span>
		<div class="dropdown-menu">
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#">
				sj askda Ajdhf skfdsjhfhsdjkfhsk
			</a>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a class="selected" href="#">
				Ajdhf skfdsjhfk jsdkfjhsdjkfhsk
			</a>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#">LK ;lkewew p[ssda</a>
			<!--  svelte-ignore a11y-invalid-attribute-->
			<a href="#">IUI Y78 8799</a>
		</div>
	</Dropdown>
	&nbsp;
	<LocaleMenu/>
</div>

<h4>Left</h4>
<Dropdown left="true">
	<span slot="title">AAAA</span>
	<div class="dropdown-menu">
		<!--  svelte-ignore a11y-invalid-attribute-->
		<a href="#">
			sj askda Ajdhf skfdsjhfk jsdkfjhsdjkfhsk
		</a>
		<!--  svelte-ignore a11y-invalid-attribute-->
		<a href="#" class="selected">
			Ajdhf skfdsjhfk jsdkfjhsdjkfhsk
		</a>
		<!--  svelte-ignore a11y-invalid-attribute-->
		<a href="#">LK ;lkewew p[ssda</a>
		<!--  svelte-ignore a11y-invalid-attribute-->
		<a href="#">IUI Y78 8799</a>
	</div>
</Dropdown>

<h4>Default</h4>
<Button onClick={() => showInfo('AAAAAAAAAA BBBBBB')}>Default</Button>
<Button disabled={true}>Default disabled</Button>

<h4>Danger</h4>
<Button type="danger" onClick={() => showError('AAAAAAAAAA  BBBBBB')}>Danger</Button>
<Button type="danger" disabled={true}>Danger disabled</Button>

<h4>Link</h4>
<Button type="link">Link</Button>
<Button type="link" disabled={true}>Link disabled</Button>

<h4>Link danger</h4>
<Button type="link-danger">Link danger</Button>
<Button type="link-danger" disabled={true}>Link danger disabled</Button>

<h4>Toolbar</h4>
<div style="padding: 8px; background-color: var(--app-primary-bg)">
	<Button type="danger">Default</Button>
	<Button type="ghost">Ghost</Button>
	<Button type="toolbar">Toolbar</Button>
	<Button type="toolbar" disabled={true}>Toolbar disabled</Button>
</div>

<h4>Ghost</h4>
<Button>Default</Button>
<Button type="ghost">Ghost</Button>
<Button type="ghost" disabled={true}>Ghost disabled</Button>

<h4>Ghost danger</h4>
<Button type="danger">Default</Button>
<Button type="ghost-danger">Ghost danger</Button>
<Button type="ghost-danger" disabled={true}>Ghost danger disabled</Button>

<h4>Icons</h4>
<div class="icon-list">
	{#each Object.keys(IconsMap) as type}
		<div>
			<Icon type={type} size="24px"/>
			<p>{type}</p>
		</div>
	{/each}
</div>

<style lang="less">
	.icon-list {
		display: flex;
		flex-flow: row wrap;

		& > div {
			display: flex;
			flex-flow: column wrap;
			margin: 10px;
			background-color: #fff;
			padding: 16px;
			border-radius: 7px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
			align-items: center;
			align-content: center;
			text-align: center;
		}
	}
</style>
