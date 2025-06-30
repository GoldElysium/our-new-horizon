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
import { CULL_MARGIN, WORLD_HEIGHT, WORLD_WIDTH } from './PixiConfig.ts';

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

async function setup(): Promise<[Application, Viewport]> {
	const app = new Application();

	await app.init({
		backgroundColor: '#50b0de',
		resizeTo: window,
		antialias: true,
		autoDensity: true,
		resolution: window.devicePixelRatio,
	});
	document.getElementById('app')?.appendChild(app.canvas);

	if (import.meta.env.DEV) {
		void initDevtools({ app });
	}

	const viewport = new Viewport({
		worldHeight: WORLD_HEIGHT,
		worldWidth: WORLD_WIDTH,
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

	return [app, viewport];
}

async function setupTextures() {
	await Assets.init({
		basePath: '/assets',
		manifest: '/assets/manifest.json',
	});

	await Assets.loadBundle('default');
}

function setupImage(viewport: Viewport) {
	const overlay = Sprite.from('input');
	overlay.x = 2157;
	overlay.y = 2157;
	viewport.addChild(overlay);

	viewport.addEventListener('wheel', () => {
		const zoom = viewport.scaled;
		overlay.alpha = 0.8 - zoom + 0.5;
	});
}

void (async () => {
	await setupTextures();
	const [app, viewport] = await setup();

	const loadingScreen = document.getElementById('loading-screen');
	if (loadingScreen) {
		loadingScreen.classList.add('fade-out');
		setTimeout(() => {
			loadingScreen.remove();
		}, 500);
	}

	setupImage(viewport);
})();
