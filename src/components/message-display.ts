import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('message-display')
export class MessageDisplay extends LitElement {
	@property()
	accessor hasMessageSelected = false;

	@property()
	accessor message = '';

	@property()
	accessor artwork: null | string = null;

	protected createRenderRoot(): HTMLElement | DocumentFragment {
		return this;
	}

	render() {
		return this.hasMessageSelected ?
				html`
					<div
						class="h-full max-h-full overflow-y-auto rounded-md bg-[#50b0de] p-4 text-white"
					>
						<p>${this.message}</p>
						${this.artwork ?
							html`
								<img
									class="mt-6"
									src="/artwork/${this.artwork}.webp"
									alt="artwork"
								/>
							`
						:	null}
					</div>
				`
			:	html`
					<div
						class="grid h-full place-items-center rounded-md bg-[#50b0de] p-4 text-white"
					>
						<b class="text-lg font-bold lg:text-xl"
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
