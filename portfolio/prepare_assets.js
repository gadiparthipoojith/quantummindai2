const fs = require('fs');
const path = require('path');

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
                    // Fallback for Windows if symlink creation fails
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
