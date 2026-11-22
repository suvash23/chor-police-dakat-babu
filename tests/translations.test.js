import test from 'node:test';
import assert from 'node:assert/strict';
import { TRANSLATIONS, t } from '../src/translations.js';

test('TRANSLATIONS & localization tests', async (suite) => {
  await suite.test('dictionary contains translations for all keys in both English and Bangla', () => {
    const keys = Object.keys(TRANSLATIONS);
    assert.ok(keys.length > 50, `Expected over 50 keys, got ${keys.length}`);

    for (const key of keys) {
      const entry = TRANSLATIONS[key];
      assert.ok(typeof entry.en === 'string', `Key '${key}' must have string English translation`);
      assert.ok(typeof entry.bn === 'string', `Key '${key}' must have string Bangla translation`);
    }
  });

  await suite.test('t() helper function returns correct localized string', () => {
    assert.equal(t('roundLabel', 'en'), 'Round');
    assert.equal(t('roundLabel', 'bn'), 'রাউন্ড');
    assert.equal(t('sound', 'en'), 'Sound');
    assert.equal(t('sound', 'bn'), 'শব্দ');
  });

  await suite.test('t() helper fallback behaviors', () => {
    // If language defaults to 'en'
    assert.equal(t('rules'), '📖 Rules');
    // If key does not exist, return key string
    assert.equal(t('non_existent_key_123', 'en'), 'non_existent_key_123');
  });
});
