import App from './app/App.svelte';

import './aws-init';

import './styles/index.less';

const _App = new App({
	target: document.body,
});

export default _App;
