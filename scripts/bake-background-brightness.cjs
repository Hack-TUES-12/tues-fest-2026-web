/**
 * Regenerates `public/assets/background.png` from `background-unfiltered.png` with the same linear
 * RGB gain as the former CSS `filter: brightness(1.35)` (alpha unchanged). Run after editing the source tile.
 */
const path = require('node:path');
const sharp = require('sharp');

const BRIGHTNESS = 1.35;
const root = path.join(__dirname, '..');
const input = path.join(root, 'public/assets/background-unfiltered.png');
const output = path.join(root, 'public/assets/background.png');

sharp(input)
	.recomb([
		[BRIGHTNESS, 0, 0, 0],
		[0, BRIGHTNESS, 0, 0],
		[0, 0, BRIGHTNESS, 0],
		[0, 0, 0, 1],
	])
	.png()
	.toFile(output)
	.then(() => {
		console.log('Wrote', path.relative(root, output));
	})
	.catch((err) => {
		console.error(err);
		process.exitCode = 1;
	});
