import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const pStart = content.indexOf('{/* MY PRINCIPLE SECTION */}');
const pEnd = content.indexOf('{/* --- Section 3: What I Do (Bento Grid) --- */}');

if (pStart !== -1 && pEnd !== -1) {
    let pBlock = content.slice(pStart, pEnd);
    content = content.slice(0, pStart) + content.slice(pEnd);
    
    const wStart = content.indexOf('{/* --- Section 4: My Work --- */}');
    content = content.slice(0, wStart) + pBlock + content.slice(wStart);
    
    fs.writeFileSync('src/App.tsx', content);
    console.log("Moved principle successfully");
} else {
    console.log("Could not find sections");
}
