const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\0896bcfc-2f4c-47de-8443-d34df5f1b71b';
const destDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
    if (file.endsWith('.png')) {
        let destName = file;
        if (file.startsWith('hero_dashboard_mockup')) destName = 'hero_dashboard_mockup.png';
        else if (file.startsWith('ai_automation_visual')) destName = 'ai_automation_visual.png';
        else if (file.startsWith('case_study_ecommerce')) destName = 'case_study_ecommerce.png';
        else if (file.startsWith('case_study_ai_workflow')) destName = 'case_study_ai_workflow.png';
        
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, destName));
        console.log(`Copied ${file} -> ${destName}`);
    }
});
console.log('Done copying images.');
