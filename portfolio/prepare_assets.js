const fs = require('fs');
const path = require('path');

console.log("Cleaning up unnecessary heavy files and references from .open-next to reduce bundle size...");

// Helper to recursively process files in a directory
function processDirectory(dir, fileCallback) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
            processDirectory(filePath, fileCallback);
        } else {
            fileCallback(filePath);
        }
    });
}

// 1. Rewrite handler files to remove static references to unused WASM engines (mysql, sqlite)
console.log("Replacing unused WASM imports in JS/MJS bundles...");
processDirectory('.open-next', (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.js' || ext === '.mjs') {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Replace mysql wasm engine imports
        if (content.includes('query_engine_bg.mysql.wasm')) {
            content = content.replace(/await import\("[^"]+query_engine_bg\.mysql\.wasm"\)/g, 'Promise.resolve({default: null})');
            modified = true;
        }
        // Replace sqlite wasm engine imports
        if (content.includes('query_engine_bg.sqlite.wasm')) {
            content = content.replace(/await import\("[^"]+query_engine_bg\.sqlite\.wasm"\)/g, 'Promise.resolve({default: null})');
            modified = true;
        }
        // Replace query_compiler_fast_bg.wasm imports if any
        if (content.includes('query_compiler_fast_bg.wasm')) {
            content = content.replace(/await import\("[^"]+query_compiler_fast_bg\.wasm"\)/g, 'Promise.resolve({default: null})');
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Patched references in: ${filePath}`);
        }
    }
});

// 2. Perform file cleanups
function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
        console.log(`Deleted folder: ${folderPath}`);
    }
}

function cleanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);
        
        if (stat.isDirectory()) {
            if (file === 'caniuse-lite' || file === 'postcss' || file === 'eslint') {
                deleteFolderRecursive(filePath);
            } else {
                cleanDirectory(filePath);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            const name = path.basename(file).toLowerCase();
            
            // Delete unused database wasm binaries and node native modules
            if (
                ext === '.node' || 
                ext === '.map' || 
                name === 'query_engine_bg.mysql.wasm' || 
                name === 'query_engine_bg.sqlite.wasm' ||
                name === 'query_compiler_fast_bg.wasm' ||
                name === 'query_compiler_fast_bg.wasm-base64.js' ||
                name === 'capsize-font-metrics.json' ||
                name === 'readme.md' ||
                name === 'license' ||
                name.includes('tmp')
            ) {
                fs.unlinkSync(filePath);
                console.log(`Deleted file: ${filePath}`);
            }
        }
    });
}

console.log("Cleaning directories...");
cleanDirectory('.open-next/server-functions');
cleanDirectory('.open-next/cloudflare');
cleanDirectory('.open-next/middleware');

// 3. Prepare assets by copying directories
function copyFolderRecursiveSync(source, target) {
    if (!fs.existsSync(source)) return;
    const targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
    }
    
    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);
        files.forEach(function (file) {
            const curSource = path.join(source, file);
            const curStat = fs.lstatSync(curSource);
            const curTarget = path.join(targetFolder, file);
            
            if (curStat.isSymbolicLink()) {
                const linkTarget = fs.readlinkSync(curSource);
                try {
                    if (fs.existsSync(curTarget)) {
                        fs.unlinkSync(curTarget);
                    }
                    fs.symlinkSync(linkTarget, curTarget);
                } catch (e) {
                    try {
                        const resolvedPath = path.resolve(path.dirname(curSource), linkTarget);
                        if (fs.existsSync(resolvedPath)) {
                            const resolvedStat = fs.statSync(resolvedPath);
                            if (!resolvedStat.isDirectory()) {
                                fs.copyFileSync(resolvedPath, curTarget);
                            }
                        }
                    } catch (err) {
                        console.warn(`Warning: failed to link/copy symlink ${curSource}: ${err.message}`);
                    }
                }
            } else if (curStat.isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                fs.copyFileSync(curSource, curTarget);
            }
        });
    }
}

console.log("Preparing assets inside .open-next/assets directory...");
const targetAssetsDir = '.open-next/assets';

if (!fs.existsSync(targetAssetsDir)) {
    fs.mkdirSync(targetAssetsDir, { recursive: true });
}

if (fs.existsSync('.open-next/worker.js')) {
    fs.copyFileSync('.open-next/worker.js', path.join(targetAssetsDir, '_worker.js'));
    console.log("Copied worker.js to .open-next/assets/_worker.js");
}

const foldersToCopy = ['cloudflare', 'middleware', '.build', 'server-functions'];
foldersToCopy.forEach(folder => {
    const src = path.join('.open-next', folder);
    if (fs.existsSync(src)) {
        // Remove existing target folder to avoid nestings on multiple runs
        const targetSubFolder = path.join(targetAssetsDir, folder);
        if (fs.existsSync(targetSubFolder)) {
            deleteFolderRecursive(targetSubFolder);
        }
        copyFolderRecursiveSync(src, targetAssetsDir);
        console.log(`Copied ${folder} folder recursively to ${targetSubFolder}`);
    }
});

console.log("Assets preparation complete!");
