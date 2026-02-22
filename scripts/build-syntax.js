#!/usr/bin/env node
/**
 * Build TextMate grammar from YAML to plist (.tmLanguage).
 * Replaces syntaxdev + first-mate + oniguruma to avoid native build.
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const plist = require('plist');

const repoRoot = path.resolve(__dirname, '..');
const inputPath = path.join(repoRoot, 'grammars', 'cython.syntax.yaml');
const outputDir = path.join(repoRoot, 'syntaxes');
const outputPath = path.join(outputDir, 'cython.tmLanguage');

const yamlText = fs.readFileSync(inputPath, 'utf8');
const grammar = yaml.load(yamlText);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const plistXml = plist.build(grammar);
fs.writeFileSync(outputPath, plistXml, 'utf8');

console.log('Built syntaxes/cython.tmLanguage');
