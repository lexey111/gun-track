/* eslint-disable @typescript-eslint/no-unsafe-member-access,sonarjs/no-collapsible-if,@typescript-eslint/no-unsafe-call */
export function clickOutside(node: any): any {

	const handleClick = (event: any): void => {
		if (node && !node.contains(event.target)) {
			if (!event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('click_outside', node));
			}
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
