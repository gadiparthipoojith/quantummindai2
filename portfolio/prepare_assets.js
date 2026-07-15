const fs = require('fs');
const path = require('path');

console.log("Cleaning up unnecessary heavy files from .open-next to reduce bundle size...");

function deleteFileIfExists(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${filePath}`);
    }
}

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
            // Exclude directories that are not needed
            if (file === 'caniuse-lite' || file === 'postcss' || file === 'eslint') {
                deleteFolderRecursive(filePath);
            } else {
                cleanDirectory(filePath);
            }
        } else {
            // Delete large unused files
            const ext = path.extname(file).toLowerCase();
            const name = path.basename(file).toLowerCase();
            
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
            }
        }
    });
}

// Perform cleanup on .open-next source folders before copy
cleanDirectory('.open-next/server-functions');
cleanDirectory('.open-next/cloudflare');
cleanDirectory('.open-next/middleware');

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
                        // Ignore
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

console.log("Preparing assets...");

if (fs.existsSync('.open-next/worker.js')) {
    if (fs.existsSync('.open-next/assets/_worker.js')) {
        fs.unlinkSync('.open-next/assets/_worker.js');
    }
    fs.copyFileSync('.open-next/worker.js', '.open-next/assets/_worker.js');
    console.log("Copied worker.js to assets/_worker.js");
} else {
    console.log("WARNING: .open-next/worker.js not found!");
}

const folders = ['cloudflare', 'middleware', '.build', 'server-functions'];
folders.forEach(f => {
    const src = path.join('.open-next', f);
    if (fs.existsSync(src)) {
        copyFolderRecursiveSync(src, '.open-next/assets');
        console.log(`Copied ${f} folder recursively to assets/${f}`);
    } else {
        console.log(`Folder not found: ${src}`);
    }
});

console.log("Assets preparation complete!");
