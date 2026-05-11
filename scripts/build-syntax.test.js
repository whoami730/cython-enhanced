/**
 * Tests for grammar YAML → plist build (scripts/build-syntax.js).
 */
import test from 'node:test';
import { match } from 'node:assert/strict';
import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import { buildTmLanguageXmlForRepo, tmLanguageXmlFromGrammarYaml } from './build-syntax.js';

const repoRoot = resolve(__dirname, '..');

test('grammar YAML parses and serializes to plist XML with source.cython scope', () => {
  const xml = buildTmLanguageXmlForRepo(repoRoot);
  match(xml, /<key>scopeName<\/key>\s*<string>source\.cython<\/string>/);
  match(xml, /<key>name<\/key>\s*<string>Cython<\/string>/);
});

test('built plist includes api modifier in illegal-names pattern (grammar regression)', () => {
  const xml = buildTmLanguageXmlForRepo(repoRoot);
  match(xml, /public\s*\|\s*api\s*\|\s*cppclass/);
});

test('tmLanguageXmlFromGrammarYaml handles minimal dict', () => {
  const xml = tmLanguageXmlFromGrammarYaml('name: Test\nscopeName: source.test\n');
  match(xml, /<key>scopeName<\/key>\s*<string>source\.test<\/string>/);
});

test('grammars/cython.syntax.yaml lists api next to other Cython modifiers', () => {
  const yamlPath = join(repoRoot, 'grammars', 'cython.syntax.yaml');
  const text = readFileSync(yamlPath, 'utf8');
  match(text, /\|\s*public\s*\|\s*api\s*\|\s*cppclass/);
});
