const fs = require('fs');
const path = require('path');

console.log('Running portfolio tests...\n');

let testsPassed = 0;
let testsFailed = 0;

function test(description, callback) {
    try {
        callback();
        console.log(`✓ ${description}`);
        testsPassed++;
    } catch (error) {
        console.log(`✗ ${description}`);
        console.log(`  Error: ${error.message}`);
        testsFailed++;
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message || `Expected ${expected}, but got ${actual}`);
    }
}

function assertFileExists(filepath) {
    if (!fs.existsSync(filepath)) {
        throw new Error(`File ${filepath} does not exist`);
    }
}

function assertFileContains(filepath, searchString) {
    const content = fs.readFileSync(filepath, 'utf8');
    if (!content.includes(searchString)) {
        throw new Error(`File ${filepath} does not contain "${searchString}"`);
    }
}

// Run tests
test('index.html file exists', () => {
    assertFileExists('index.html');
});

test('styles.css file exists', () => {
    assertFileExists('styles.css');
});

test('script.js file exists', () => {
    assertFileExists('script.js');
});

test('index.html contains DOCTYPE declaration', () => {
    assertFileContains('index.html', '<!DOCTYPE html>');
});

test('index.html links to styles.css', () => {
    assertFileContains('index.html', 'styles.css');
});

test('index.html links to script.js', () => {
    assertFileContains('index.html', 'script.js');
});

test('index.html has navigation section', () => {
    assertFileContains('index.html', '<nav');
});

test('index.html has hero section', () => {
    assertFileContains('index.html', 'class="hero"');
});

test('index.html has projects section', () => {
    assertFileContains('index.html', 'id="projects"');
});

test('index.html has contact section', () => {
    assertFileContains('index.html', 'id="contact"');
});

test('styles.css contains navbar styling', () => {
    assertFileContains('styles.css', '.navbar');
});

test('styles.css contains responsive media queries', () => {
    assertFileContains('styles.css', '@media');
});

test('script.js contains smooth scrolling code', () => {
    assertFileContains('script.js', 'smooth');
});

test('script.js contains scroll event listener', () => {
    assertFileContains('script.js', 'scroll');
});

// Print results
console.log('\n-------------------');
console.log(`Tests passed: ${testsPassed}`);
console.log(`Tests failed: ${testsFailed}`);
console.log('-------------------');

if (testsFailed > 0) {
    process.exit(1);
}

console.log('\n✅ All tests passed! Portfolio is ready to deploy.');