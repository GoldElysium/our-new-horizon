import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('message-display')
export class MessageDisplay extends LitElement {
	@property()
	accessor hasMessageSelected = false;

	@property()
	accessor author = '';

	@property()
	accessor message = '';

	protected createRenderRoot(): HTMLElement | DocumentFragment {
		return this;
	}

	render() {
		return this.hasMessageSelected ?
				html`
					<div class="h-full rounded-md bg-[#50b0de] p-4 text-white">
						<p>File: ${this.author}</p>
						<p>${this.message}</p>
					</div>
				`
			:	html`
					<div
						class="grid h-full place-items-center rounded-md bg-[#50b0de] p-4 text-white"
					>
						<b class="text-xl font-bold"
							>Click on a tile for a message here</b
						>
					</div>
				`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'message-display': MessageDisplay;
	}
}
