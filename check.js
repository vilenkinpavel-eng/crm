#!/usr/bin/env node
// Connected OS — pre-deploy syntax check
// Usage: node check.js index.html
// Add to git workflow: node check.js index.html && git add index.html && git commit ...

const fs = require('fs');
const file = process.argv[2] || 'index.html';

if (!fs.existsSync(file)) {
  console.error(`File not found: ${file}`);
  process.exit(1);
}

const content = fs.readFileSync(file, 'utf8');
const start = content.indexOf('<script type="module">');
const end = content.lastIndexOf('</script>');
if (start === -1 || end === -1) {
  console.error('❌ No script tag found');
  process.exit(1);
}

const js = content.slice(start + 22, end);
const lines = js.split('\n');

// Check for duplicate function declarations
const seen = {};
const dupes = {};
lines.forEach((line, i) => {
  const m = line.match(/^(?:async\s+)?function\s+(\w+)/);
  if (m) {
    const name = m[1];
    if (seen[name]) dupes[name] = [seen[name], i + 1];
    else seen[name] = i + 1;
  }
});

if (Object.keys(dupes).length > 0) {
  console.error('❌ DUPLICATE FUNCTIONS FOUND — will cause SyntaxError in browser:');
  Object.entries(dupes).forEach(([name, lines]) => {
    console.error(`   function ${name} declared at lines ${lines[0]} and ${lines[1]}`);
  });
  process.exit(1);
}

// Check balanced braces (rough check)
let depth = 0;
let inStr = false, strChar = '';
for (let i = 0; i < js.length; i++) {
  const c = js[i];
  if (inStr) {
    if (c === strChar && js[i-1] !== '\\') inStr = false;
  } else if (c === '"' || c === "'" || c === '`') {
    inStr = true; strChar = c;
  } else if (c === '{') depth++;
  else if (c === '}') depth--;
}
if (depth !== 0) {
  console.error(`❌ UNBALANCED BRACES: depth=${depth} (${depth > 0 ? 'missing closing }' : 'extra }'}) `);
  process.exit(1);
}

console.log(`✅ ${file} looks good (${lines.length} lines, ${Object.keys(seen).length} functions, balanced braces)`);
process.exit(0);
