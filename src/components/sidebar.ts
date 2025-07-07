import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('side-bar')
export class Sidebar extends LitElement {
	@property()
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	accessor onCollapse = () => {};

	@state()
	private accessor collapsed = false;

	protected createRenderRoot(): HTMLElement | DocumentFragment {
		return this;
	}

	render() {
		return html`
			<div class="relative h-full bg-[#243962]">
				<div
					class="${this.collapsed ? 'slide-out w-0!' : (
						'slide-in w-72 lg:w-[26rem] p-8'
					)} flex h-full max-h-max flex-col gap-8 overflow-hidden contain-content"
				>
					<div class="flex justify-between">
						<button
							class="btn"
							@click="${() => {
								document
									.querySelector('submissions-dialog')!
									.showModal();
							}}"
						>
							Submissions
						</button>
						<button
							class="btn"
							@click="${() => {
								document
									.querySelector('about-dialog')!
									.showModal();
							}}"
						>
							About
						</button>
					</div>
					<message-display
						class="h-full min-h-0 grow"
					></message-display>
					<volume-control></volume-control>
				</div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'side-bar': Sidebar;
	}
}
