#!/usr/bin/env node
/**
 * Build TextMate grammar from YAML to plist (.tmLanguage).
 * Replaces syntaxdev + first-mate + oniguruma to avoid native build.
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { load } from 'js-yaml';
import { build } from 'plist';

/**
 * @param {string} yamlText raw YAML for the TextMate grammar
 * @returns {string} plist XML
 */
function tmLanguageXmlFromGrammarYaml(yamlText) {
  const grammar = load(yamlText);
  return build(grammar);
}

/**
 * @param {string} repoRoot absolute path to extension repo root
 * @returns {string} plist XML for syntaxes/cython.tmLanguage
 */
function buildTmLanguageXmlForRepo(repoRoot) {
  const inputPath = join(repoRoot, 'grammars', 'cython.syntax.yaml');
  const yamlText = readFileSync(inputPath, 'utf8');
  return tmLanguageXmlFromGrammarYaml(yamlText);
}

function main() {
  const repoRoot = resolve(__dirname, '..');
  const outputDir = join(repoRoot, 'syntaxes');
  const outputPath = join(outputDir, 'cython.tmLanguage');

  const plistXml = buildTmLanguageXmlForRepo(repoRoot);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputPath, plistXml, 'utf8');

  console.log('Built syntaxes/cython.tmLanguage');
}

export default {
  buildTmLanguageXmlForRepo,
  tmLanguageXmlFromGrammarYaml,
};

if (require.main === module) {
  main();
}
