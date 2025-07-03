import {
	Application,
	Bounds,
	Rectangle,
	type Container,
	getGlobalBounds,
	Assets,
	Sprite,
} from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { initDevtools } from '@pixi/devtools';
import { sound } from '@pixi/sound';
import {
	CULL_MARGIN,
	OVERLAY_POSITION,
	SCALE_FACTOR,
	TILE_WIDTH_PIXELS,
	WORLD_SIZE,
} from './PixiConfig.ts';
import locations from './data/locations.json';

function cull(
	container: Container,
	view: Rectangle | Bounds,
	skipUpdateTransform = true,
) {
	if (
		container.cullable &&
		container.measurable &&
		container.includeInBuild
	) {
		const pos = container.getGlobalPosition(undefined, skipUpdateTransform);

		// TODO: Bounds don't seem to properly scale? Workaround using a margin for now
		const tempBounds = new Bounds();
		const bounds =
			container.cullArea ??
			getGlobalBounds(container, skipUpdateTransform, tempBounds);

		container.culled =
			pos.x >= view.x + view.width + CULL_MARGIN ||
			pos.y >= view.y + view.height + CULL_MARGIN ||
			pos.x + bounds.width + CULL_MARGIN <= view.x ||
			pos.y + bounds.height + CULL_MARGIN <= view.y;
	} else {
		container.culled = false;
	}

	if (
		!container.cullableChildren ||
		container.culled ||
		!container.renderable ||
		!container.measurable ||
		!container.includeInBuild
	)
		return;

	container.children.forEach((child) =>
		cull(child, view, skipUpdateTransform),
	);
}

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

	app.ticker.add(() => {
		if (viewport.dirty) {
			viewport.children?.forEach((child) =>
				cull(child, app.stage.getBounds(true)),
			);
			viewport.dirty = false;
		}
	});

	app.stage.addChild(viewport);

	const sidebar = document.querySelector('side-bar')!;
	sidebar.onCollapse = () => {
		setTimeout(() => {
			app.resize();
		}, 1);
	};

	return viewport;
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

	for (const [y, row] of locations.entries()) {
		const tileY = OVERLAY_POSITION + y * TILE_WIDTH_PIXELS;
		for (const [x, filename] of row.entries()) {
			const tileX = OVERLAY_POSITION + x * TILE_WIDTH_PIXELS;

			const tile = Sprite.from(`screenshots/${filename}`);
			tile.setSize(TILE_WIDTH_PIXELS);
			tile.position.set(tileX, tileY);
			tile.cullable = true;
			tile.eventMode = 'static';
			tile.cursor = 'pointer';
			tile.on('pointerup', () => {
				messageDisplay.hasMessageSelected = true;
				messageDisplay.author = filename;
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
