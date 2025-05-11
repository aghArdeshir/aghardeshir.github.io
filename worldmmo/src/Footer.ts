export class Footer {
	render(rootContainer: HTMLElement) {
		const footerDom = document.createElement('div');
		footerDom.className = 'footer';
		rootContainer.appendChild(footerDom);
		footerDom.textContent = 'World MMO Footer';
	}
}
