import test from 'node:test';
import assert from 'node:assert/strict';
import { generateRoomCode, shuffleArray, computeRoundScores } from '../src/utils.js';

test('Utility functions test suite', async (suite) => {
  await suite.test('generateRoomCode: generates valid format (4 uppercase letters + dash + 4 digits)', () => {
    const code = generateRoomCode();
    assert.match(code, /^[A-Z]{4}-\d{4}$/, `Expected code like CHOR-4821, got ${code}`);
  });

  await suite.test('generateRoomCode: generates unique random codes', () => {
    const codes = new Set();
    for (let i = 0; i < 50; i++) {
      codes.add(generateRoomCode());
    }
    assert.equal(codes.size, 50, 'All 50 generated room codes should be unique');
  });

  await suite.test('shuffleArray: preserves array length and elements', () => {
    const original = ['babu', 'police', 'dakat', 'chor'];
    const shuffled = shuffleArray(original);
    assert.equal(shuffled.length, 4);
    assert.deepEqual([...shuffled].sort(), [...original].sort());
  });

  await suite.test('computeRoundScores: correct police guess keeps points', () => {
    const assignments = [
      { id: 'babu' },
      { id: 'police' },
      { id: 'dakat' },
      { id: 'chor' }
    ];
    // Police (player 1) accuses Chor (player 3) when target is Chor
    const res = computeRoundScores({
      assignments,
      targetRole: 'chor',
      accusedPlayerId: 3,
      chorPoints: 0
    });

    assert.equal(res.isCorrect, true);
    assert.deepEqual(res.scores, [1000, 800, 600, 0]);
  });

  await suite.test('computeRoundScores: wrong police guess transfers 800 pts to target', () => {
    const assignments = [
      { id: 'babu' },
      { id: 'police' },
      { id: 'dakat' },
      { id: 'chor' }
    ];
    // Target is Chor (player 3), but Police (player 1) mistakenly accuses Dakat (player 2)
    const res = computeRoundScores({
      assignments,
      targetRole: 'chor',
      accusedPlayerId: 2,
      chorPoints: 0
    });

    assert.equal(res.isCorrect, false);
    // Babu gets 1000, Police gets 0, Dakat keeps 600, Chor gets 0 + 800 = 800
    assert.deepEqual(res.scores, [1000, 0, 600, 800]);
  });

  await suite.test('computeRoundScores: custom 400 pts Chor score handling', () => {
    const assignments = [
      { id: 'babu' },
      { id: 'police' },
      { id: 'dakat' },
      { id: 'chor' }
    ];
    // When Chor escapes with 400 pt rules
    const res = computeRoundScores({
      assignments,
      targetRole: 'chor',
      accusedPlayerId: 2,
      chorPoints: 400
    });

    assert.equal(res.isCorrect, false);
    // Chor gets 400 + 800 = 1200 pts
    assert.deepEqual(res.scores, [1000, 0, 600, 1200]);
  });
});
