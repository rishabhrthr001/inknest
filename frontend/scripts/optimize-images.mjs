import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const outputDir = path.join(__dirname, '../public/optimized');

// Create output directory
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const imagesToOptimize = [
    { name: 'Paperbag.jpg', width: 1920, quality: 80 },
    { name: 'Stickers.png', width: 1920, quality: 80 },
    { name: 'Stationery.png', width: 1920, quality: 80 },
    { name: 'mobile-bg1.png', width: 768, quality: 80 },
    { name: 'mobile-bg2.png', width: 768, quality: 80 },
    { name: 'mobile-bg3.png', width: 768, quality: 80 },
    { name: 'BrowserLogo.png', width: 512, quality: 90 },
    { name: 'Inknestlogo.png', width: 400, quality: 90 },
];

async function optimizeImage(imageName, width, quality) {
    const inputPath = path.join(publicDir, imageName);
    const baseName = path.parse(imageName).name;
    const outputPath = path.join(publicDir, `${baseName}.webp`);

    if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  Skipping ${imageName} - file not found`);
        return;
    }

    try {
        const originalSize = fs.statSync(inputPath).size;

        await sharp(inputPath)
            .resize(width, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality })
            .toFile(outputPath);

        const newSize = fs.statSync(outputPath).size;
        const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

        console.log(`✅ ${imageName} → ${baseName}.webp`);
        console.log(`   ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(newSize / 1024).toFixed(0)} KB (${reduction}% smaller)`);
    } catch (err) {
        console.error(`❌ Error optimizing ${imageName}:`, err.message);
    }
}

async function main() {
    console.log('🖼️  Optimizing hero images...\n');

    for (const img of imagesToOptimize) {
        await optimizeImage(img.name, img.width, img.quality);
    }

    console.log('\n✨ Done! Update Hero.tsx to use .webp files.');
}

main();
