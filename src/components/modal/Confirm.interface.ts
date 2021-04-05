export type TConfirmProps = {
	title?: string
	text?: string
	confirmText? : string
	onConfirm: () => void
};

export interface IConfirmDialog {
	showConfirmDialog : (props: TConfirmProps) => void
}
