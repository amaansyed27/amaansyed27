const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function generateSVG(sketch, outputName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Load p5.js and the sketch
    await page.setContent(`
        <!DOCTYPE html>
        <html>
        <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
            <style>
                body { margin: 0; overflow: hidden; }
                canvas { display: block; }
            </style>
        </head>
        <body>
            <script>
                ${await fs.readFile(sketch, 'utf8')}
            </script>
        </body>
        </html>
    `);

    // Wait for the animation to render
    await page.waitForTimeout(1000);

    // Capture the canvas as SVG
    const svg = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        return canvas.toDataURL();
    });

    // Save the SVG
    await fs.writeFile(path.join('output', outputName), svg);
    await browser.close();
}

async function main() {
    try {
        // Generate SVGs for both animations
        await generateSVG(
            'assets/source/football-game_sketch.js',
            'football-game.svg'
        );
        await generateSVG(
            'assets/source/monaco-track_sketch.js',
            'monaco-track.svg'
        );
    } catch (error) {
        console.error('Error generating SVGs:', error);
        process.exit(1);
    }
}

main();
