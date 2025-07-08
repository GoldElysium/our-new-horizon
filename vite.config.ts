import { defineConfig, type Plugin, type ResolvedConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { AssetPack } from '@assetpack/core';
import { pixiPipes } from '@assetpack/core/pixi';

function assetpackPlugin(): Plugin {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apConfig: any = {
		entry: './assets',
		output: './public/assets',
		pipes: [
			...pixiPipes({
				cacheBust: true,
				resolutions: { default: 1, low: 0.5 },
				compression: {
					jpg: false,
					png: false,
					webp: {
						quality: 90,
						alphaQuality: 100,
						effort: 6,
					},
					avif: {
						quality: 75,
						effort: 9,
					},
				},
				texturePacker: {
					texturePacker: {
						removeFileExtension: true,
						width: 65536,
						height: 65536,
					},
					resolutionOptions: {
						maximumTextureSize: 65536,
					},
				},
				audio: {},
				manifest: { createShortcuts: true, trimExtensions: true },
			}),
		],
	};

	let mode: ResolvedConfig['command'];
	let ap: AssetPack | undefined;

	return {
		name: 'vite-plugin-assetpack',
		configResolved(resolvedConfig) {
			mode = resolvedConfig.command;
		},
		buildStart: async () => {
			if (mode === 'serve') {
				if (ap) return;
				ap = new AssetPack(apConfig);
				void ap.watch();
			} else {
				await new AssetPack(apConfig).run();
			}
		},
		buildEnd: async () => {
			if (ap) {
				await ap.stop();
				ap = undefined;
			}
		},
	};
}

export default defineConfig({
	plugins: [assetpackPlugin(), tailwindcss()],
	esbuild: {
		target: 'es2022',
	},
});
