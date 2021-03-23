export type TSuperModal = ((e: KeyboardEvent) => void);

export function prepareSuperModal(
	onClose?: () => void,
	closeOnEsc?: boolean,
	closeOnClick?: boolean): TSuperModal | null {

	const waitDiv:HTMLDivElement = document.querySelector('#app-full-screen-message');

	if (!waitDiv) {
		throw new Error('Modal container not found!');
	}

	const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [focusable]';
	const modal = waitDiv;

	const firstFocusableElement = modal.querySelectorAll(focusableElements)[0] as HTMLElement;
	const focusableContent = modal.querySelectorAll(focusableElements);
	const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

	if (onClose && closeOnClick) {
		waitDiv.onclick = () => {
			setTimeout(() => {
				if (waitDiv.onclick) { // could be detached already by close handler
					onClose();
				}
			}, 100);
		};
	}

	const trapFocus = (e: KeyboardEvent): void => {
		const isTabPressed = e.key === 'Tab';
		const isEscPressed = e.key === 'Escape';

		if (isEscPressed && onClose && closeOnEsc) {
			onClose();
		}

		if (!isTabPressed) {
			return;
		}

		if (!firstFocusableElement || !lastFocusableElement) {
			return;
		}

		if (e.shiftKey) {
			// if shift key pressed for shift + tab combination
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus(); // add focus for the last focusable element
				e.preventDefault();
			}
		} else if (document.activeElement === lastFocusableElement) {
			// if focused has reached to last focusable element then focus first focusable element after pressing tab
			firstFocusableElement.focus(); // add focus for the first focusable element
			e.preventDefault();
		}
	};

	document.addEventListener('keydown', trapFocus);

	setTimeout(() => {
		if (firstFocusableElement) {
			firstFocusableElement.focus();
		}
	}, 200);

	return trapFocus;
}
