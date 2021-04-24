<script lang="ts">
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

<div style="display: inline-flex">
	<Dropdown className="menu menu-left menu-button">
		<span slot="title">AAAA</span>
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
	<Dropdown className="menu menu-left menu-button menu-button-ghost">
		<span slot="title">AAAA</span>
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
	<Dropdown className="menu menu-left menu-button menu-button-secondary">
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
	&mdash;
	<Dropdown className="menu menu-left">
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
</div>

<h4>Default</h4>
<div>
	<Button onClick={() => showInfo('AAAAAAAAAA')}>Default</Button>
	<Button disabled={true}>Default disabled</Button>
	<Button type="danger" onClick={() => showError('AAAAAAAAAA')}>Danger</Button>
	<Button type="danger" disabled={true}>Danger disabled</Button>
	<Button type="text">Text</Button>
	<Button type="text" disabled={true}>Text disabled</Button>
	<Button type="text-danger">Text</Button>
	<Button type="text-danger" disabled={true}>Text danger disabled</Button>
</div>

<h4>Small</h4>
<div>
	<Button size="small">Small</Button>
	<Button size="small" disabled={true}>Small disabled</Button>
	<Button size="small" type="danger">Danger</Button>
	<Button size="small" type="danger" disabled={true}>Danger disabled</Button>
	<Button size="small" type="text">Text</Button>
	<Button size="small" type="text" disabled={true}>Text disabled</Button>
	<Button size="small" type="text-danger">Text</Button>
	<Button size="small" type="text-danger" disabled={true}>Text danger disabled</Button>
</div>

<h4>Big</h4>
<div>
	<Button size="big">Big</Button>
	<Button size="big" disabled={true}>Big disabled</Button>
	<Button size="big" type="danger">Danger</Button>
	<Button size="big" type="danger" disabled={true}>Danger disabled</Button>
	<Button size="big" type="text">Text</Button>
	<Button size="big" type="text" disabled={true}>Text disabled</Button>
	<Button size="big" type="text-danger">Text</Button>
	<Button size="big" type="text-danger" disabled={true}>Text danger disabled</Button>
</div>

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
