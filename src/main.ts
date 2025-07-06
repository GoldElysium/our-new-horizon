import '@pixi/gif';
import {
	Application,
	Assets,
	Container,
	FederatedPointerEvent,
	Sprite,
} from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { initDevtools } from '@pixi/devtools';
import { sound } from '@pixi/sound';
import {
	OVERLAY_POSITION,
	SCALE_FACTOR,
	TILE_WIDTH_PIXELS,
	WORLD_SIZE,
} from './PixiConfig.ts';
import locations from './data/locations.json';
import messages from './data/messages.json';
import { GifSprite } from 'pixi.js/gif';

async function setupPixi() {
	const app = new Application();

	await app.init({
		backgroundColor: '#50b0de',
		resizeTo: document.getElementById('app')!,
		antialias: true,
		autoDensity: true,
		resolution: window.devicePixelRatio,
	});
	document.getElementById('app')?.appendChild(app.canvas);

	if (import.meta.env.DEV) {
		void initDevtools({ app });
	}

	const viewport = new Viewport({
		worldHeight: WORLD_SIZE,
		worldWidth: WORLD_SIZE,
		events: app.renderer.events,
	});

	viewport
		.drag()
		.pinch()
		.decelerate()
		.wheel()
		.clamp({
			direction: 'all',
			underflow: 'center',
		})
		.clampZoom({ maxScale: 1, minScale: 0.5 });

	window.addEventListener('resize', () => {
		viewport.resize();
		viewport.clamp({
			direction: 'all',
			underflow: 'center',
		});
	});

	app.stage.addChild(viewport);

	const sidebar = document.querySelector('side-bar')!;
	sidebar.onCollapse = () => {
		setTimeout(() => {
			app.resize();
		}, 1);
	};

	setupCursor(app);

	return viewport;
}

function setupCursor(app: Application) {
	const cursor = GifSprite.from('cursor');
	cursor.position.set(-415, 0);
	cursor.setSize(96);

	const pointer = GifSprite.from('cursor-pointer');
	pointer.position.set(-425, 0);
	pointer.setSize(96);
	pointer.visible = false;

	const cursorContainer = new Container();
	cursorContainer.eventMode = 'none';

	app.stage.addChild(cursorContainer);
	cursorContainer.addChild(cursor);
	cursorContainer.addChild(pointer);

	app.renderer.events.cursorStyles.default = () => {
		cursor.visible = true;
		pointer.visible = false;
	};
	app.renderer.events.cursorStyles.pointer = () => {
		cursor.visible = false;
		pointer.visible = true;
	};

	app.stage.eventMode = 'dynamic';

	let x = 0;
	let y = 0;

	app.stage.on('pointermove', (e: FederatedPointerEvent) => {
		x = e.x;
		y = e.y;
	});

	app.ticker.add(() => {
		cursorContainer.position.set(x, y);
	});
}

async function loadAssets() {
	await Assets.init({
		basePath: '/assets',
		manifest: '/assets/manifest.json',
	});

	await Assets.loadBundle('default');
}

function setupOverlay(viewport: Viewport) {
	const overlay = Sprite.from('input');
	overlay.eventMode = 'none';
	overlay.scale = SCALE_FACTOR;
	overlay.position.set(OVERLAY_POSITION, OVERLAY_POSITION);
	overlay.alpha = 0.8;

	viewport.addChild(overlay);
	viewport.moveCenter(WORLD_SIZE / 2, WORLD_SIZE / 2);
	viewport.scaled = 0.5;

	viewport.addEventListener('wheel', () => {
		const zoom = viewport.scaled;
		overlay.alpha = 0.8 - zoom + 0.5;
	});
}

function addTiles(viewport: Viewport) {
	const messageDisplay = document.querySelector('message-display')!;
	let unpickedMessages = [...messages];

	for (const [row, rowContent] of locations.entries()) {
		const y = OVERLAY_POSITION + row * TILE_WIDTH_PIXELS;

		for (const [col, filename] of rowContent.entries()) {
			const messageIdx = Math.floor(
				Math.random() * (unpickedMessages.length - 1),
			);
			const message = unpickedMessages[messageIdx];
			unpickedMessages.splice(messageIdx, 1);

			if (unpickedMessages.length === 0) {
				unpickedMessages = [...messages];
			}

			const x = OVERLAY_POSITION + col * TILE_WIDTH_PIXELS;

			const tile = Sprite.from(`screenshots/${filename}`);
			tile.setSize(TILE_WIDTH_PIXELS);
			tile.position.set(x, y);
			tile.eventMode = 'static';
			tile.cursor = 'pointer';
			tile.on('pointerup', () => {
				messageDisplay.hasMessageSelected = true;
				messageDisplay.message = message.message;
				messageDisplay.artwork = message.artwork;
			});
			viewport.addChild(tile);
		}
	}
}

void (async () => {
	await loadAssets();
	const viewport = await setupPixi();
	addTiles(viewport);
	setupOverlay(viewport);

	const loadingContainer = document.getElementById('loading-container');
	if (loadingContainer) {
		loadingContainer.innerHTML = 'Tap anywhere to start!';
		const loadingScreen = document.getElementById('loading-screen');
		if (loadingScreen) {
			loadingScreen.classList.add('cursor-pointer');
			loadingScreen.addEventListener('click', () => {
				// Add fade-out effect to the loading screen
				loadingScreen.classList.add('fade-out');
				setTimeout(() => {
					loadingScreen.remove();
				}, 50);

				void Assets.loadBundle('default').then((resources) => {
					// Initialize background music
					const storedVolume = localStorage.getItem('storedVolume');
					let volume = 0.05;
					if (storedVolume) {
						const parsed = parseFloat(storedVolume);
						if (!isNaN(parsed)) {
							volume = parsed;
						}
					}

					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
					sound.add('bgm', resources.bgm);
					sound.disableAutoPause = true;
					sound.volumeAll = volume;
					// eslint-disable-next-line @typescript-eslint/no-floating-promises
					sound.play('bgm', { loop: true });

					// Connect the background music to the volume-control component
					const volumeControl =
						document.querySelector('volume-control')!;

					if (volumeControl) {
						volumeControl.backgroundMusic = sound;
					}
				});
			});
		}
	}
})();
