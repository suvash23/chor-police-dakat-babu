// Live Game State Management
import { t } from './translations.js';

export const state = {
  mode: 'single', // 'single' or 'pass'
  theme: 'khata', // 'khata', 'white', 'blank', 'chalk'
  lang: 'en',     // 'en' or 'bn'
  targetRounds: 5,
  currentRound: 1,
  chorPoints: 0, // 0 or 400
  alwaysPolice: false, // Single player: Player 1 is always police
  hideBabu: false, // Single player: Don't reveal Babu chit during announcement
  players: [
    { id: 0, name: 'You (Player 1)', avatar: '🧑‍🎓', isBot: false, totalScore: 0 },
    { id: 1, name: 'Bot 1', avatar: '🤖', isBot: true, totalScore: 0 },
    { id: 2, name: 'Bot 2', avatar: '🤖', isBot: true, totalScore: 0 },
    { id: 3, name: 'Bot 3', avatar: '🤖', isBot: true, totalScore: 0 }
  ],
  roundHistory: [], // array of { round, scores, roles, ... }
  currentRoundState: {
    step: 'IDLE', // 'IDLE', 'SHUFFLING', 'PASS_REVEAL', 'BABU_ANNOUNCED', 'GUESSING', 'ROUND_OVER'
    assignments: [], // index 0..3 -> role object
    babuPlayerId: null,
    policePlayerId: null,
    dakatPlayerId: null,
    chorPlayerId: null,
    targetSuspectRole: null, // 'chor' or 'dakat'
    suspectPlayerIds: [], // the 2 player indices holding Chor and Dakat
    policeGuessedPlayerId: null,
    guessSuccess: false,
    passCurrentPlayerIndex: 0,
    activeSelectableIds: []
  }
};

/**
 * Convenient translation helper bound to current state language
 * @param {string} key
 * @returns {string}
 */
export function translate(key) {
  return t(key, state.lang);
}
