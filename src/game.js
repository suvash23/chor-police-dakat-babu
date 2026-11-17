// Core Game Flow Logic
import { state, translate as t } from './state.js';
import { DOM } from './dom.js';
import { ROLES } from './constants.js';
import { sound } from './audio.js';
import {
  renderChitBackContent,
  showFloatingPts,
  updateScoreboardUI,
  launchConfetti
} from './ui.js';

export function resetMatch() {
  state.currentRound = 1;
  state.roundHistory = [];
  state.players.forEach(p => p.totalScore = 0);
  updateScoreboardUI();
  prepareNewRoundUI();
}

export function prepareNewRoundUI() {
  state.currentRoundState.step = 'IDLE';
  DOM.labelCurrentRound.textContent = state.currentRound;

  // Reset chits to folded state
  DOM.chits.forEach((chit, idx) => {
    chit.classList.remove('revealed', 'shuffling');
    DOM.chitBacks[idx].className = 'chit-face chit-back';
    DOM.chitBacks[idx].innerHTML = '';
    DOM.playerSlots[idx].className = 'player-slot';

    // Remove stamps, badges and floating popups
    const stamps = DOM.playerSlots[idx].querySelectorAll('.result-stamp, .suspect-hint, .floating-pts-popup');
    stamps.forEach(el => el.remove());
  });

  DOM.announcementMain.textContent = `${t('round')} ${state.currentRound} ${t('of')} ${state.targetRounds}`;
  DOM.announcementSub.textContent = t('dealSub');
  DOM.btnActionMain.textContent = t('dealBtn');
  DOM.btnActionMain.style.display = 'inline-flex';
  DOM.btnActionMain.disabled = false;
}

export function handleMainActionButton() {
  sound.init();

  if (state.currentRoundState.step === 'IDLE') {
    startShuffleAndDeal();
  } else if (state.currentRoundState.step === 'ROUND_OVER') {
    proceedToNextRoundOrFinish();
  }
}

export function startShuffleAndDeal() {
  state.currentRoundState.step = 'SHUFFLING';
  DOM.btnActionMain.disabled = true;
  DOM.announcementMain.textContent = t('shufflingMain');
  DOM.announcementSub.textContent = t('shufflingSub');
  sound.playShuffle();

  // Trigger CSS shaking animation
  DOM.chits.forEach(chit => chit.classList.add('shuffling'));

  let rolePool = [
    { ...ROLES.BABU },
    { ...ROLES.POLICE },
    { ...ROLES.DAKAT },
    { ...ROLES.CHOR }
  ];

  if (state.mode === 'single' && state.alwaysPolice) {
    const remainingRoles = [
      { ...ROLES.BABU },
      { ...ROLES.DAKAT },
      { ...ROLES.CHOR }
    ];
    for (let i = remainingRoles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingRoles[i], remainingRoles[j]] = [remainingRoles[j], remainingRoles[i]];
    }
    rolePool = [
      { ...ROLES.POLICE },
      remainingRoles[0],
      remainingRoles[1],
      remainingRoles[2]
    ];
  } else {
    for (let i = rolePool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rolePool[i], rolePool[j]] = [rolePool[j], rolePool[i]];
    }
  }

  state.currentRoundState.assignments = rolePool;

  state.currentRoundState.assignments.forEach((r, idx) => {
    if (r.id === 'babu') state.currentRoundState.babuPlayerId = idx;
    if (r.id === 'police') state.currentRoundState.policePlayerId = idx;
    if (r.id === 'dakat') state.currentRoundState.dakatPlayerId = idx;
    if (r.id === 'chor') state.currentRoundState.chorPlayerId = idx;
  });

  state.currentRoundState.suspectPlayerIds = [
    state.currentRoundState.dakatPlayerId,
    state.currentRoundState.chorPlayerId
  ];

  state.currentRoundState.targetSuspectRole = Math.random() < 0.5 ? 'chor' : 'dakat';

  setTimeout(() => {
    DOM.chits.forEach(chit => chit.classList.remove('shuffling'));

    state.currentRoundState.assignments.forEach((role, idx) => {
      renderChitBackContent(idx, role);
    });

    if (state.mode === 'pass') {
      startPassAndPlaySequence();
    } else {
      revealBabuAndPolice();
    }
  }, 1400);
}

export function startPassAndPlaySequence() {
  state.currentRoundState.step = 'PASS_REVEAL';
  state.currentRoundState.passCurrentPlayerIndex = 0;
  showPassAndPlayModal(0);
}

export function showPassAndPlayModal(playerIdx) {
  const player = state.players[playerIdx];
  DOM.passPlayerTitle.textContent = `${player.name}${t('passTitle')}`;
  DOM.passPlayerInstructions.innerHTML = `${t('passInstructions')} <b>${player.name}</b>. ${t('passHideNote')}`;
  DOM.passBoxHidden.classList.remove('hidden');
  DOM.passBoxRevealed.classList.add('hidden');
  DOM.modalPassPlay.classList.remove('hidden');
}

export function showPassPeekChit() {
  sound.playFlip();
  const pIdx = state.currentRoundState.passCurrentPlayerIndex;
  const role = state.currentRoundState.assignments[pIdx];

  DOM.passChitPreviewArea.innerHTML = `
    <div class="chit-face chit-back ${role.className}" style="position:relative; width:100%; height:100%; border-radius:6px; box-shadow: 2px 4px 10px rgba(0,0,0,0.2);">
      <div class="role-badge">${role.icon}</div>
      <div class="role-title-en">${role.titleEn}</div>
      <div class="role-title-bn">${role.titleBn}</div>
      <div class="role-points-val">${role.points} pts</div>
    </div>
  `;

  let roleAdvice = '';
  if (role.id === 'babu') roleAdvice = t('passBabuAdvice');
  else if (role.id === 'police') roleAdvice = t('passPoliceAdvice');
  else if (role.id === 'dakat') roleAdvice = t('passDakatAdvice');
  else if (role.id === 'chor') roleAdvice = t('passChorAdvice');

  DOM.passRoleDesc.textContent = roleAdvice;
  DOM.passBoxHidden.classList.add('hidden');
  DOM.passBoxRevealed.classList.remove('hidden');
}

export function handlePassNextPlayer() {
  DOM.modalPassPlay.classList.add('hidden');
  state.currentRoundState.passCurrentPlayerIndex++;

  if (state.currentRoundState.passCurrentPlayerIndex < 4) {
    setTimeout(() => {
      showPassAndPlayModal(state.currentRoundState.passCurrentPlayerIndex);
    }, 300);
  } else {
    revealBabuAndPolice();
  }
}

export function revealBabuAndPolice() {
  state.currentRoundState.step = 'BABU_ANNOUNCED';
  const babuIdx = state.currentRoundState.babuPlayerId;
  const policeIdx = state.currentRoundState.policePlayerId;
  const babuPlayer = state.players[babuIdx];
  const policePlayer = state.players[policeIdx];

  sound.playFlip();

  const shouldHideBabu = (state.mode === 'single' && state.hideBabu);

  if (!shouldHideBabu) {
    DOM.chits[babuIdx].classList.add('revealed');
  }
  DOM.chits[policeIdx].classList.add('revealed');

  DOM.playerSlots[policeIdx].classList.add('active-police');

  const targetRoleName = state.currentRoundState.targetSuspectRole === 'chor' ? t('chorTarget') : t('dakatTarget');

  if (shouldHideBabu) {
    DOM.announcementMain.innerHTML = `👑 <b>${t('anonBabu')}</b> ${t('anonBabuCmd')} <br>"${policePlayer.name} (${t('rolePolice')}), ${t('babuFindOut')} <u>${targetRoleName}</u> ${t('babuIs')}"`;
    DOM.announcementSub.textContent = t('anonBabuSub');
  } else {
    DOM.announcementMain.innerHTML = `👑 <b>${babuPlayer.name}</b> (${t('roleBabu')}) ${t('babuCommands')}: <br>"${policePlayer.name} (${t('rolePolice')}), ${t('babuFindOut')} <u>${targetRoleName}</u> ${t('babuIs')}"`;
    DOM.announcementSub.textContent = t('policeFindSub');
  }
  DOM.btnActionMain.style.display = 'none';

  setTimeout(() => {
    setupGuessingPhase();
  }, 1200);
}

export function setupGuessingPhase() {
  state.currentRoundState.step = 'GUESSING';
  const policeIdx = state.currentRoundState.policePlayerId;
  const isPoliceBot = state.players[policeIdx].isBot;
  const targetRoleName = state.currentRoundState.targetSuspectRole === 'chor' ? 'Chor' : 'Dakat';
  const shouldHideBabu = (state.mode === 'single' && state.hideBabu);

  let selectableSuspectIds = [...state.currentRoundState.suspectPlayerIds];
  if (shouldHideBabu) {
    selectableSuspectIds = [0, 1, 2, 3].filter(idx => idx !== policeIdx);
  }
  state.currentRoundState.activeSelectableIds = selectableSuspectIds;

  selectableSuspectIds.forEach(suspectIdx => {
    const slot = DOM.playerSlots[suspectIdx];
    slot.classList.add('suspect-selectable');

    if (!slot.querySelector('.suspect-hint')) {
      const hint = document.createElement('div');
      hint.className = 'suspect-hint';
      hint.textContent = t('suspectHint');
      slot.appendChild(hint);
    }
  });

  if (isPoliceBot) {
    DOM.announcementMain.textContent = `🤔 ${state.players[policeIdx].name} (${t('rolePolice')}) ${t('policeInspecting')}`;
    DOM.announcementSub.textContent = t('botThinkingSub');

    setTimeout(() => {
      const botChoice = selectableSuspectIds[Math.floor(Math.random() * selectableSuspectIds.length)];
      executePoliceGuess(botChoice);
    }, 1600);
  } else {
    DOM.announcementMain.textContent = `👮 ${state.players[policeIdx].name}${t('clickAccuse')}`;
    if (shouldHideBabu) {
      DOM.announcementSub.textContent = `${t('hideBabuSub')} ${targetRoleName} ${t('hideBabuSub2')}`;
    } else {
      DOM.announcementSub.textContent = `${t('lookClosely')} ${targetRoleName}?`;
    }
  }
}

export function handleSuspectSlotClick(clickedPlayerIdx) {
  if (state.currentRoundState.step !== 'GUESSING') return;

  const policeIdx = state.currentRoundState.policePlayerId;
  if (state.players[policeIdx].isBot) return;

  const candidateList = state.currentRoundState.activeSelectableIds || state.currentRoundState.suspectPlayerIds;
  if (candidateList.includes(clickedPlayerIdx)) {
    executePoliceGuess(clickedPlayerIdx);
  }
}

export function executePoliceGuess(accusedPlayerIdx) {
  state.currentRoundState.step = 'ROUND_OVER';
  state.currentRoundState.policeGuessedPlayerId = accusedPlayerIdx;

  DOM.playerSlots.forEach(slot => {
    slot.classList.remove('suspect-selectable');
    const hint = slot.querySelector('.suspect-hint');
    if (hint) hint.remove();
  });

  DOM.chits.forEach(chit => chit.classList.add('revealed'));
  sound.playFlip();

  const policeIdx = state.currentRoundState.policePlayerId;
  const targetRole = state.currentRoundState.targetSuspectRole;
  const actualTargetPlayerId = (targetRole === 'chor') ? state.currentRoundState.chorPlayerId : state.currentRoundState.dakatPlayerId;

  const isCorrect = (accusedPlayerIdx === actualTargetPlayerId);
  state.currentRoundState.guessSuccess = isCorrect;

  const roundScores = [0, 0, 0, 0];
  const babuIdx = state.currentRoundState.babuPlayerId;
  const dakatIdx = state.currentRoundState.dakatPlayerId;
  const chorIdx = state.currentRoundState.chorPlayerId;

  roundScores[babuIdx] = ROLES.BABU.points;

  if (isCorrect) {
    roundScores[policeIdx] = ROLES.POLICE.points;
    roundScores[dakatIdx] = ROLES.DAKAT.points;
    roundScores[chorIdx] = ROLES.CHOR.points;
    sound.playSuccess();
  } else {
    roundScores[policeIdx] = 0;
    if (targetRole === 'chor') {
      roundScores[chorIdx] = ROLES.CHOR.points + ROLES.POLICE.points;
      roundScores[dakatIdx] = ROLES.DAKAT.points;
    } else {
      roundScores[dakatIdx] = ROLES.DAKAT.points + ROLES.POLICE.points;
      roundScores[chorIdx] = ROLES.CHOR.points;
    }
    sound.playFail();
  }

  state.players.forEach((p, idx) => {
    p.totalScore += roundScores[idx];
  });

  state.roundHistory.push({
    round: state.currentRound,
    scores: [...roundScores],
    assignments: [...state.currentRoundState.assignments],
    isCorrect,
    targetRole,
    accusedPlayerId: accusedPlayerIdx
  });

  const policeName = state.players[policeIdx].name;
  const accusedName = state.players[accusedPlayerIdx].name;
  const targetRoleTitle = targetRole === 'chor' ? t('roleChor') : t('roleDakat');

  if (isCorrect) {
    DOM.playerSlots[accusedPlayerIdx].classList.add('slot-caught');
    const caughtStamp = document.createElement('div');
    caughtStamp.className = 'result-stamp stamp-caught';
    caughtStamp.innerHTML = `${t('stampCaught')}<br><small>(${targetRoleTitle})</small>`;
    DOM.playerSlots[accusedPlayerIdx].querySelector('.chit-wrapper').appendChild(caughtStamp);

    DOM.playerSlots[policeIdx].classList.add('slot-caught');
    showFloatingPts(policeIdx, '+800', true);

    DOM.announcementMain.innerHTML = `🎉 <b>${t('correctGuess')}</b> ${policeName} ${t('caughtThe')} ${accusedName} (${targetRoleTitle})!`;
    DOM.announcementSub.textContent = t('policeSecured');
  } else {
    DOM.playerSlots[accusedPlayerIdx].classList.add('slot-wrong');
    const innocentStamp = document.createElement('div');
    innocentStamp.className = 'result-stamp stamp-innocent';
    innocentStamp.innerHTML = `${t('stampInnocent')}<br><small>${t('wrongPick')}</small>`;
    DOM.playerSlots[accusedPlayerIdx].querySelector('.chit-wrapper').appendChild(innocentStamp);

    DOM.playerSlots[policeIdx].classList.add('slot-wrong');
    showFloatingPts(policeIdx, `0 ${t('pts')}`, false);

    DOM.playerSlots[actualTargetPlayerId].classList.add('slot-escaped');
    const escapedStamp = document.createElement('div');
    escapedStamp.className = 'result-stamp stamp-escaped';
    escapedStamp.innerHTML = `${t('stampEscaped')}<br><small>${t('bonusLabel')}</small>`;
    DOM.playerSlots[actualTargetPlayerId].querySelector('.chit-wrapper').appendChild(escapedStamp);

    const bonusTotal = roundScores[actualTargetPlayerId];
    showFloatingPts(actualTargetPlayerId, `+${bonusTotal}`, true);

    const actualTargetName = state.players[actualTargetPlayerId].name;
    DOM.announcementMain.innerHTML = `❌ <b>${t('wrongGuess')}</b> ${accusedName} ${t('wasNotThe')} ${targetRoleTitle}${state.lang === 'bn' ? ' ' + t('wasNotThe2') : '!'}`;
    DOM.announcementSub.innerHTML = `${actualTargetName} ${t('escaped')} <b>${t('zeropts')}</b>, ${state.lang === 'en' ? 'and ' : ''}${actualTargetName} ${t('steals')} <b>${t('pts800')}</b>`;
  }

  updateScoreboardUI();

  DOM.btnActionMain.style.display = 'inline-flex';
  DOM.btnActionMain.disabled = false;
  if (state.currentRound >= state.targetRounds) {
    DOM.btnActionMain.textContent = t('viewResults');
  } else {
    DOM.btnActionMain.textContent = `${t('nextRoundBtn')} (${t('round')} ${state.currentRound + 1}) ➔`;
  }
}

export function proceedToNextRoundOrFinish() {
  if (state.currentRound >= state.targetRounds) {
    showFinalWinnerModal();
  } else {
    state.currentRound++;
    prepareNewRoundUI();
  }
}

export function showFinalWinnerModal() {
  sound.playWinFanfare();

  const sorted = [...state.players].sort((a, b) => b.totalScore - a.totalScore);
  const winner = sorted[0];

  DOM.winnerHeadline.textContent = `${t('champion')} ${winner.name} (${winner.totalScore} ${t('points')})!`;

  DOM.winnerRankingsList.innerHTML = '';
  sorted.forEach((p, rank) => {
    const item = document.createElement('div');
    item.className = `winner-rank-item ${rank === 0 ? 'first' : ''}`;

    let medal = '🎖️';
    if (rank === 0) medal = t('firstPlace');
    else if (rank === 1) medal = t('secondPlace');
    else if (rank === 2) medal = t('thirdPlace');
    else medal = t('fourthPlace');

    item.innerHTML = `
      <div>${medal} - ${p.avatar} ${p.name}</div>
      <div>${p.totalScore} pts</div>
    `;
    DOM.winnerRankingsList.appendChild(item);
  });

  DOM.modalWinner.classList.remove('hidden');
  launchConfetti();
}

export function applySettings(shouldReset = true) {
  ROLES.CHOR.points = state.chorPoints;

  if (state.mode === 'single') {
    state.players = [
      { id: 0, name: t('youPlayer1'), avatar: '🧑‍🎓', isBot: false, totalScore: 0 },
      { id: 1, name: t('bot1'), avatar: '🤖', isBot: true, totalScore: 0 },
      { id: 2, name: t('bot2'), avatar: '🤖', isBot: true, totalScore: 0 },
      { id: 3, name: t('bot3'), avatar: '🤖', isBot: true, totalScore: 0 }
    ];
    DOM.labelMode.textContent = t('singlePlayerMode');
  } else {
    state.players = [
      { id: 0, name: t('player1'), avatar: '🧑‍💼', isBot: false, totalScore: 0 },
      { id: 1, name: t('player2'), avatar: '👩‍💼', isBot: false, totalScore: 0 },
      { id: 2, name: t('player3'), avatar: '🧑‍🎓', isBot: false, totalScore: 0 },
      { id: 3, name: t('player4'), avatar: '👩‍🏫', isBot: false, totalScore: 0 }
    ];
    DOM.labelMode.textContent = t('passPlayMode');
  }

  DOM.labelTargetRounds.textContent = state.targetRounds;
  DOM.scoreSheetTarget.textContent = state.targetRounds;

  state.players.forEach((p, idx) => {
    DOM.playerNames[idx].textContent = p.name;
    DOM.playerAvatars[idx].textContent = p.avatar;
    DOM.thPlayers[idx].textContent = p.name;
  });

  if (shouldReset) {
    resetMatch();
  }
}
