export class Dom {
	constructor() {
		this.$ = document.querySelector.bind(document);
	}
}
