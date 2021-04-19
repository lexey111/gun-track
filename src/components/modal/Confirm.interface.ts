export type TConfirmProps = {
	title?: string
	text?: string
	confirmText?: string
	confirmIcon?: string
	onConfirm: () => void
};

export interface IConfirmDialog {
	showConfirmDialog: (props: TConfirmProps) => void
}
