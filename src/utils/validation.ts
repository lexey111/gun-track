export function validateEmail(mail: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
}
