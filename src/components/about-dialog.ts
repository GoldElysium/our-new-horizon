import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('about-dialog')
export class AboutDialog extends LitElement {
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
							Credits to Our New Horizon
						</h1>
						<h2 class="text-center text-lg font-bold lg:text-xl">
							Organizer:
						</h2>
						<div class="flex justify-center gap-4">
							<div class="flex flex-col items-center gap-2">
								<img
									class="size-28 rounded-full"
									src="/credits/Zame.webp"
									alt=""
								/>
								<span>Zaめ</span>
								<div class="flex gap-2">
									<a
										href="https://x.com/Ztynz1"
										target="_blank"
									>
										<svg
											class="size-4"
											fill="currentColor"
											role="img"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>X</title>
											<path
												d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
						<h2
							class="mt-4 text-center text-lg font-bold lg:text-xl"
						>
							Developer:
						</h2>
						<div class="flex justify-center gap-4">
							<div class="flex flex-col items-center gap-2">
								<img
									class="size-28 rounded-full"
									src="/credits/GoldElysium.webp"
									alt=""
								/>
								<span>GoldElysium</span>
								<div class="flex gap-2">
									<a
										href="https://github.com/GoldElysium"
										target="_blank"
									>
										<svg
											class="size-4"
											role="img"
											fill="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>GitHub</title>
											<path
												d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
						<h2
							class="mt-4 text-center text-lg font-bold lg:text-xl"
						>
							Assistants:
						</h2>
						<div class="flex justify-center gap-4">
							<div class="flex flex-col items-center gap-2">
								<img
									class="size-28 rounded-full"
									src="/credits/Avery.webp"
									alt=""
								/>
								<span>Avery</span>
							</div>
							<div class="flex flex-col items-center gap-2">
								<img
									class="size-28 rounded-full"
									src="/credits/snaksx.webp"
									alt=""
								/>
								<span>snaksx</span>
								<div class="flex gap-2">
									<a
										href="https://x.com/snaksxy"
										target="_blank"
									>
										<svg
											class="size-4"
											fill="currentColor"
											role="img"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>X</title>
											<path
												d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
						<h2
							class="mt-4 text-center text-lg font-bold lg:text-xl"
						>
							Logo:
						</h2>
						<div class="flex justify-center gap-4">
							<div class="flex flex-col items-center gap-2">
								<img
									class="size-28 rounded-full"
									src="/credits/Avery.webp"
									alt=""
								/>
								<span>Avery</span>
							</div>
						</div>
						<h2
							class="mt-4 text-center text-lg font-bold lg:text-xl"
						>
							Cursor Artist:
						</h2>
						<div class="flex justify-center gap-4">
							<div class="flex flex-col items-center gap-2">
								<img
									class="size-28 rounded-full"
									src="/credits/Zame.webp"
									alt=""
								/>
								<span>Zaめ</span>
								<div class="flex gap-2">
									<a
										href="https://x.com/Ztynz1"
										target="_blank"
									>
										<svg
											class="size-4"
											fill="currentColor"
											role="img"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>X</title>
											<path
												d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
						<h2
							class="mt-4 text-center text-lg font-bold lg:text-xl"
						>
							Cursor Animation:
						</h2>
						<div class="flex justify-center gap-4">
							<div class="flex flex-col items-center gap-2">
								<img
									class="size-28 rounded-full"
									src="/credits/R3.webp"
									alt=""
								/>
								<span>R3</span>
								<div class="flex gap-2">
									<a
										href="https://x.com/_R3dacted"
										target="_blank"
									>
										<svg
											class="size-4"
											fill="currentColor"
											role="img"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>X</title>
											<path
												d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
						<h2
							class="mt-4 text-center text-lg font-bold lg:text-xl"
						>
							Audio:
						</h2>
						<div class="flex justify-center gap-4">
							<div class="flex flex-col items-center gap-2">
								<img
									class="size-28 rounded-full"
									src="/credits/jester.webp"
									alt=""
								/>
								<span>jesterdist</span>
								<div class="flex gap-2">
									<a
										href="https://x.com/jesterdist"
										target="_blank"
									>
										<svg
											class="size-4"
											fill="currentColor"
											role="img"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>X</title>
											<path
												d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
											/>
										</svg>
									</a>
									<a
										href="https://www.youtube.com/@jesterdist"
										target="_blank"
									>
										<svg
											class="size-4"
											fill="currentColor"
											role="img"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>YouTube</title>
											<path
												d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'about-dialog': AboutDialog;
	}
}
