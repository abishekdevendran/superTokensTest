import { build } from 'esbuild';

build({
	entryPoints: ['src/index.ts'],
	minify: true,
	platform: 'node',
	bundle: true,
	outfile: 'dist/build.cjs',
	external: ['sharp', 'yamlparser', 'request']
})
	.then(() => console.log('Build Complete!🎉'))
	.catch(() => {
		console.error('Build failed 😿');
		process.exit(1);
	});
