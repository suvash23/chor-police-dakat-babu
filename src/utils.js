// Pure utility helpers for game logic and formatting

/**
 * Generate random 4-letter + 4-digit room code (e.g., CHOR-3829)
 * @returns {string}
 */
export function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${rand}-${digits}`;
}

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} arr
 * @returns {Array}
 */
export function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Compute round scores given role assignments, target, and accused suspect
 * @param {Object} params
 * @returns {Array<number>} 4-player round scores
 */
export function computeRoundScores({ assignments, targetRole, accusedPlayerId, chorPoints = 0 }) {
  const scores = [0, 0, 0, 0];
  let babuId = null, policeId = null, dakatId = null, chorId = null;

  assignments.forEach((r, idx) => {
    if (r.id === 'babu') babuId = idx;
    if (r.id === 'police') policeId = idx;
    if (r.id === 'dakat') dakatId = idx;
    if (r.id === 'chor') chorId = idx;
  });

  scores[babuId] = 1000;

  const actualTargetId = (targetRole === 'chor') ? chorId : dakatId;
  const isCorrect = (accusedPlayerId === actualTargetId);

  if (isCorrect) {
    scores[policeId] = 800;
    scores[dakatId] = 600;
    scores[chorId] = chorPoints;
  } else {
    scores[policeId] = 0;
    if (targetRole === 'chor') {
      scores[chorId] = chorPoints + 800;
      scores[dakatId] = 600;
    } else {
      scores[dakatId] = 600 + 800;
      scores[chorId] = chorPoints;
    }
  }

  return { scores, isCorrect };
}
