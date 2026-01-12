#!/usr/bin/env node

/**
 * Script to automatically set the user limit in the fitness app
 * Usage: node set-user-limit.js <limit>
 * Example: node set-user-limit.js 10
 */

const fs = require('fs');
const path = require('path');

// Get the limit from command line arguments
const limit = process.argv[2];

// Validate input
if (!limit) {
  console.error('❌ Error: Please provide a user limit as an argument');
  console.error('Usage: node set-user-limit.js <limit>');
  console.error('Example: node set-user-limit.js 10');
  process.exit(1);
}

// Validate that limit is a positive number
if (isNaN(limit) || parseInt(limit) <= 0) {
  console.error('❌ Error: User limit must be a positive number');
  process.exit(1);
}

const limitNum = parseInt(limit);

// File paths
const authContextPath = path.join(__dirname, 'src/context/AuthContext.tsx');
const checkUserLimitPath = path.join(__dirname, 'src/app/api/check-user-limit/route.ts');

// Files to update
const files = [
  {
    path: authContextPath,
    name: 'AuthContext.tsx',
    pattern: /const MAX_USERS = \d+;/
  },
  {
    path: checkUserLimitPath,
    name: 'check-user-limit/route.ts',
    pattern: /const MAX_USERS = \d+;/
  }
];

let successCount = 0;

console.log(`\n🔧 Setting user limit to ${limitNum}...\n`);

files.forEach(file => {
  try {
    // Check if file exists
    if (!fs.existsSync(file.path)) {
      console.error(`❌ File not found: ${file.name}`);
      return;
    }

    // Read the file
    let content = fs.readFileSync(file.path, 'utf8');

    // Check if the pattern exists
    if (!file.pattern.test(content)) {
      console.error(`❌ Could not find MAX_USERS constant in ${file.name}`);
      return;
    }

    // Replace the pattern
    const newContent = content.replace(
      file.pattern,
      `const MAX_USERS = ${limitNum};`
    );

    // Write the file back
    fs.writeFileSync(file.path, newContent, 'utf8');

    console.log(`✅ Updated ${file.name}`);
    successCount++;
  } catch (error) {
    console.error(`❌ Error updating ${file.name}: ${error.message}`);
  }
});

console.log();

if (successCount === files.length) {
  console.log(`✨ Success! User limit has been set to ${limitNum}`);
  console.log('\n📝 Remember to:');
  console.log('   1. Restart your dev server if it\'s running');
  console.log('   2. Test by trying to sign up more than ' + limitNum + ' users');
  console.log('\n');
  process.exit(0);
} else {
  console.error(`❌ Failed to update all files (${successCount}/${files.length} updated)`);
  console.error('Please update the files manually using the USER_LIMIT_MANUAL.md guide');
  process.exit(1);
}
