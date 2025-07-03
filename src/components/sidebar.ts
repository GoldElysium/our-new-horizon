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

	changeCollapse() {
		this.collapsed = !this.collapsed;
		this.onCollapse();
	}

	render() {
		return html`
			<div class="relative h-full bg-[#243962]">
				<div
					class="${this.collapsed ? 'slide-out w-0!' : (
						'slide-in w-[26rem] p-8'
					)} flex h-full flex-col gap-8 overflow-hidden"
				>
					<div class="flex justify-between">
						<button>Submissions</button>
						<button>About</button>
					</div>
					<message-display class="grow"></message-display>
					<volume-control></volume-control>
				</div>
				<button
					class="${this.collapsed ?
						'slide-out -right-18'
					:	'slide-in -right-8'} absolute top-12 grid place-items-center rounded-r-full bg-[#243962] py-2 pr-2 pl-1 text-white"
					@click="${() => this.changeCollapse()}"
				>
					${this.collapsed ?
						html`
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m8.25 4.5 7.5 7.5-7.5 7.5"
								/>
							</svg>
						`
					:	html`
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 19.5 8.25 12l7.5-7.5"
								/>
							</svg>
						`}
				</button>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'side-bar': Sidebar;
	}
}
