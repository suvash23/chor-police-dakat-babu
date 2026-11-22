import test from 'node:test';
import assert from 'node:assert/strict';
import { ROLES, THEMES } from '../src/constants.js';

test('ROLES constant definitions', async (t) => {
  await t.test('has all 4 core traditional roles', () => {
    assert.ok(ROLES.BABU, 'Babu role exists');
    assert.ok(ROLES.POLICE, 'Police role exists');
    assert.ok(ROLES.DAKAT, 'Dakat role exists');
    assert.ok(ROLES.CHOR, 'Chor role exists');
  });

  await t.test('verifies accurate traditional point values', () => {
    assert.equal(ROLES.BABU.points, 1000);
    assert.equal(ROLES.POLICE.points, 800);
    assert.equal(ROLES.DAKAT.points, 600);
    assert.equal(ROLES.CHOR.points, 0); // Default classic
  });

  await t.test('each role has Bengali and English titles and icons', () => {
    for (const [key, role] of Object.entries(ROLES)) {
      assert.ok(role.titleEn, `${key} has English title`);
      assert.ok(role.titleBn, `${key} has Bengali title`);
      assert.ok(role.icon, `${key} has icon`);
      assert.ok(role.className, `${key} has className`);
    }
  });
});

test('THEMES constant definitions', async (t) => {
  await t.test('has 4 notebook paper themes', () => {
    assert.equal(THEMES.length, 4);
    const themeIds = THEMES.map(th => th.id);
    assert.deepEqual(themeIds, ['khata', 'white', 'blank', 'chalk']);
  });
});
