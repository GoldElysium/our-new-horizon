import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import messages from '../data/messages.json';

@customElement('submissions-dialog')
export class SubmissionsDialog extends LitElement {
	private get dialog() {
		return this.renderRoot.querySelector('div[id="modal"]')!;
	}

	public showModal() {
		this.dialog.classList.remove('hidden');
	}

	protected createRenderRoot(): HTMLElement | DocumentFragment {
		return this;
	}

	render() {
		return html`
			<div
				id="modal"
				class="absolute z-50 hidden min-h-[100dvh] w-screen max-w-screen bg-[#50b0de]"
			>
				<button
					class="fixed top-8 right-8 z-10 cursor-pointer rounded-full bg-[#243962] p-2 text-white"
					@click=${() => this.dialog.classList.add('hidden')}
				>
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
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<div
					slot="content"
					class="mt-16 flex justify-center text-white"
				>
					<div class="my-6 flex max-w-2xl flex-col gap-4">
						<h1
							class="mb-6 text-center text-xl font-bold lg:text-3xl"
						>
							All Messages
						</h1>
						${messages.map(
							({ message, artwork }) => html`
								<div class="rounded-lg bg-[#243962] p-6">
									<p>${message}</p>
									${artwork &&
									html`
										<img
											class="mt-4"
											src="/artwork/${artwork}.webp"
											alt=""
										/>
									`}
								</div>
							`,
						)}
					</div>
				</div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'submissions-dialog': SubmissionsDialog;
	}
}
