// UI Rendering and Visual Helpers
import { state, translate as t } from './state.js';
import { DOM } from './dom.js';
import { THEMES } from './constants.js';

export function setTheme(themeId) {
  state.theme = themeId;
  const themeObj = THEMES.find(t => t.id === themeId) || THEMES[0];

  THEMES.forEach(t => {
    if (t.bodyClass) document.body.classList.remove(t.bodyClass);
  });
  if (themeObj.bodyClass) {
    document.body.classList.add(themeObj.bodyClass);
  }

  DOM.themeIcon.textContent = themeObj.icon;
  DOM.themeNameLabel.textContent = themeObj.label;
  try {
    localStorage.setItem('cpdb_theme', themeId);
  } catch (e) {}
}

export function cycleTheme() {
  const currentIndex = THEMES.findIndex(t => t.id === state.theme);
  const nextIndex = (currentIndex + 1) % THEMES.length;
  setTheme(THEMES[nextIndex].id);
}

export function updateChorToggleLabel() {
  DOM.labelChorPts.textContent = DOM.toggleChorPts.checked ? t('chorPts400') : t('chorPts0');
}

export function updateSinglePlayerOptionsVisibility() {
  const isSingle = DOM.selectMode.value === 'single';
  if (isSingle) {
    DOM.singlePlayerOptions.style.display = 'block';
    DOM.labelAlwaysPolice.textContent = DOM.toggleAlwaysPolice.checked ? t('toggleOn') : t('toggleOff');
    DOM.labelHideBabu.textContent = DOM.toggleHideBabu.checked ? t('toggleOn') : t('toggleOff');

    if (DOM.labelInputPlayers[0]) DOM.labelInputPlayers[0].textContent = t('labelPlayerYou');
    if (DOM.labelInputPlayers[1]) DOM.labelInputPlayers[1].textContent = t('labelBot1');
    if (DOM.labelInputPlayers[2]) DOM.labelInputPlayers[2].textContent = t('labelBot2');
    if (DOM.labelInputPlayers[3]) DOM.labelInputPlayers[3].textContent = t('labelBot3');

    if (DOM.inputPlayers[0]) DOM.inputPlayers[0].placeholder = t('youPlayer1');
    if (DOM.inputPlayers[1]) DOM.inputPlayers[1].placeholder = t('bot1');
    if (DOM.inputPlayers[2]) DOM.inputPlayers[2].placeholder = t('bot2');
    if (DOM.inputPlayers[3]) DOM.inputPlayers[3].placeholder = t('bot3');
  } else {
    DOM.singlePlayerOptions.style.display = 'none';

    if (DOM.labelInputPlayers[0]) DOM.labelInputPlayers[0].textContent = t('labelPlayerYou');
    if (DOM.labelInputPlayers[1]) DOM.labelInputPlayers[1].textContent = t('labelPlayer2');
    if (DOM.labelInputPlayers[2]) DOM.labelInputPlayers[2].textContent = t('labelPlayer3');
    if (DOM.labelInputPlayers[3]) DOM.labelInputPlayers[3].textContent = t('labelPlayer4');

    if (DOM.inputPlayers[0]) DOM.inputPlayers[0].placeholder = t('player1');
    if (DOM.inputPlayers[1]) DOM.inputPlayers[1].placeholder = t('player2');
    if (DOM.inputPlayers[2]) DOM.inputPlayers[2].placeholder = t('player3');
    if (DOM.inputPlayers[3]) DOM.inputPlayers[3].placeholder = t('player4');
  }
}

export function applyTranslations() {
  const lang = state.lang;
  const htmlRoot = document.getElementById('html-root');
  if (htmlRoot) htmlRoot.lang = lang;

  DOM.langToggleLabel.textContent = lang === 'en' ? '🇧🇩 বাংলা' : '🇬🇧 English';

  const subtitleEl = document.querySelector('.subtitle');
  if (subtitleEl) subtitleEl.textContent = t('subtitle');

  const soundIconEl = document.getElementById('sound-icon');
  const soundIconText = soundIconEl ? soundIconEl.textContent : '🔊';
  DOM.btnSound.innerHTML = `<span class="btn-icon" id="sound-icon">${soundIconText}</span> ${t('sound')}`;
  
  const rulesBtn = document.getElementById('btn-rules');
  if (rulesBtn) rulesBtn.textContent = t('rules');
  if (DOM.btnOnlineLobby) DOM.btnOnlineLobby.textContent = t('btnOnlineLobby');
  const settingsBtn = document.getElementById('btn-settings');
  if (settingsBtn) settingsBtn.textContent = t('settings');
  const resetBtn = document.getElementById('btn-reset-game');
  if (resetBtn) resetBtn.textContent = t('newGame');

  const pwaMsg = document.querySelector('#pwa-install-banner > div:first-child');
  if (pwaMsg) pwaMsg.textContent = t('installMsg');
  const pwaInstallBtn = document.getElementById('btn-pwa-install');
  if (pwaInstallBtn) pwaInstallBtn.textContent = t('install');

  const settingsTitle = document.querySelector('#modal-settings h2');
  if (settingsTitle) settingsTitle.textContent = t('settingsTitle');
  const gameModeLabel = document.querySelector('label[for="select-mode"]');
  if (gameModeLabel) gameModeLabel.textContent = t('gameModeLabel');
  const modeOptSingle = document.querySelector('#select-mode option[value="single"]');
  if (modeOptSingle) modeOptSingle.textContent = t('modeOptionSingle');
  const modeOptPass = document.querySelector('#select-mode option[value="pass"]');
  if (modeOptPass) modeOptPass.textContent = t('modeOptionPass');
  const targetRoundsLbl = document.querySelector('label[for="select-rounds"]');
  if (targetRoundsLbl) targetRoundsLbl.textContent = t('targetRoundsLabel');
  if (DOM.labelPlayerNamesHeading) DOM.labelPlayerNamesHeading.textContent = t('playerNamesHeading');
  updateSinglePlayerOptionsVisibility();
  const r5 = document.querySelector('#select-rounds option[value="5"]');
  if (r5) r5.textContent = t('round5');
  const r10 = document.querySelector('#select-rounds option[value="10"]');
  if (r10) r10.textContent = t('round10');
  const r15 = document.querySelector('#select-rounds option[value="15"]');
  if (r15) r15.textContent = t('round15');

  const settingsToggles = document.querySelectorAll('#modal-settings .toggle-row span:first-child');
  if (settingsToggles[0]) settingsToggles[0].textContent = t('chorPointsLabel');
  if (settingsToggles[1]) settingsToggles[1].textContent = t('alwaysPoliceLabel');
  if (settingsToggles[2]) settingsToggles[2].textContent = t('hideBabuLabel');

  const settingsNote = document.querySelector('#modal-settings > div > div[style*="font-size: 0.9rem"]');
  if (settingsNote) settingsNote.textContent = t('settingsNote');

  const saveSettingsBtn = document.getElementById('btn-save-settings');
  if (saveSettingsBtn) saveSettingsBtn.textContent = t('saveBtn');
  const closeSettingsBtn = document.getElementById('btn-close-settings');
  if (closeSettingsBtn) closeSettingsBtn.textContent = t('cancelBtn');

  DOM.labelAlwaysPolice.textContent = DOM.toggleAlwaysPolice.checked ? t('toggleOn') : t('toggleOff');
  DOM.labelHideBabu.textContent = DOM.toggleHideBabu.checked ? t('toggleOn') : t('toggleOff');
  updateChorToggleLabel();

  const confirmTitle = document.querySelector('#modal-confirm-reset h2');
  if (confirmTitle) confirmTitle.textContent = t('confirmResetTitle');
  const confirmMsg = document.querySelector('#modal-confirm-reset p');
  if (confirmMsg) {
    confirmMsg.innerHTML = `${t('confirmResetMsg')} <b>${lang === 'en' ? 'Round 1' : 'রাউন্ড ১'}</b>?`;
  }
  const confirmYes = document.getElementById('btn-confirm-reset-yes');
  if (confirmYes) confirmYes.textContent = t('yesRestart');
  const confirmNo = document.getElementById('btn-confirm-reset-no');
  if (confirmNo) confirmNo.textContent = t('cancelBtn');

  const rulesTitle = document.querySelector('#modal-rules h2');
  if (rulesTitle) rulesTitle.textContent = t('rulesTitle');
  const rulesContent = document.querySelector('#modal-rules .modal-card > div');
  if (rulesContent) {
    rulesContent.innerHTML = `
      <p><b>${t('rulesRolesHeader')}</b></p>
      <ul style="margin-left: 20px; margin-bottom: 12px;">
        <li>${t('rulesBabu')}</li>
        <li>${t('rulesPolice')}</li>
        <li>${t('rulesDakat')}</li>
        <li>${t('rulesChor')}</li>
      </ul>
      <p><b>${t('rulesFlowHeader')}</b></p>
      <ol style="margin-left: 20px; margin-bottom: 12px;">
        <li>${t('rulesStep1')}</li>
        <li>${t('rulesStep2')}</li>
        <li>${t('rulesStep3')}</li>
        <li>${t('rulesStep4')}</li>
        <li><b>${lang === 'en' ? 'Scoring:' : 'পয়েন্ট:'}</b> ${t('rulesStep5')}</li>
      </ol>
    `;
  }
  const closeRulesBtn = document.getElementById('btn-close-rules');
  if (closeRulesBtn) closeRulesBtn.textContent = t('gotIt');

  const gameOverTitle = document.querySelector('#modal-winner .modal-card > h2');
  if (gameOverTitle) gameOverTitle.textContent = t('gameOver');
  const replayBtn = document.getElementById('btn-winner-replay');
  if (replayBtn) replayBtn.textContent = t('playAnother');

  const passPeekBtn = document.getElementById('btn-pass-peek');
  if (passPeekBtn) passPeekBtn.textContent = t('passRevealBtn');
  const passNextBtn = document.getElementById('btn-pass-next');
  if (passNextBtn) passNextBtn.textContent = t('passHideBtn');
  const passHiddenP = document.querySelector('#pass-box-hidden p');
  if (passHiddenP) passHiddenP.textContent = t('passHiddenText');
  const passYouDrewP = document.querySelector('#pass-box-revealed > p:first-child');
  if (passYouDrewP) passYouDrewP.textContent = t('passYouDrew');

  const scoreHeader = document.querySelector('.scoreboard-header h2');
  if (scoreHeader) scoreHeader.textContent = t('scoreSheet');
  const scoreTarget = document.querySelector('.scoreboard-header > span');
  if (scoreTarget) scoreTarget.innerHTML = `${t('targetLabel')} <b id="score-sheet-target">${state.targetRounds}</b> ${t('rounds')}`;

  const totalRowTd = document.querySelector('table.khata-table tfoot tr td:first-child');
  if (totalRowTd) totalRowTd.textContent = t('total');

  const roundTh = document.querySelector('table.khata-table thead th:first-child');
  if (roundTh) roundTh.textContent = t('roundCol');

  if (state.mode === 'single') {
    DOM.labelMode.textContent = t('singlePlayerMode');
  } else {
    DOM.labelMode.textContent = t('passPlayMode');
  }

  if (state.currentRoundState && state.currentRoundState.step === 'IDLE') {
    state.players.forEach((p, idx) => {
      DOM.playerNames[idx].textContent = p.name;
      DOM.thPlayers[idx].textContent = p.name;
    });
  }

  document.querySelectorAll('.player-total-score').forEach((el, idx) => {
    const scoreSpan = el.querySelector(`#score-${idx}`);
    if (scoreSpan) {
      el.innerHTML = `${t('totalLabel')} <span id="score-${idx}">${scoreSpan.textContent}</span> ${t('pts')}`;
    }
  });

  document.querySelectorAll('.chit-front div:not(.chit-seal):not(.fold-line)').forEach(el => {
    if (el.textContent === 'CHIT' || el.textContent === 'চিরকুট') {
      el.textContent = lang === 'en' ? 'CHIT' : 'চিরকুট';
    }
  });
  document.querySelectorAll('.chit-front small').forEach(el => {
    if (el.textContent === 'Folded' || el.textContent === 'ভাঁজ') {
      el.textContent = lang === 'en' ? 'Folded' : 'ভাঁজ';
    }
  });

  if (state.currentRoundState && state.currentRoundState.step === 'IDLE') {
    DOM.announcementMain.textContent = `${t('round')} ${state.currentRound} ${t('of')} ${state.targetRounds}`;
    DOM.announcementSub.textContent = t('dealSub');
    DOM.btnActionMain.textContent = t('dealBtn');
  }
}

export function updateScoreboardUI() {
  state.players.forEach((p, idx) => {
    DOM.playerScores[idx].textContent = p.totalScore;
    DOM.totalVal[idx].textContent = p.totalScore;
  });

  DOM.scoreboardBody.innerHTML = '';
  state.roundHistory.forEach(item => {
    const tr = document.createElement('tr');
    const roundDetail = `<b>R${item.round}</b>`;
    let tdCols = `<td>${roundDetail}</td>`;

    item.scores.forEach((pts, pIdx) => {
      const role = item.assignments[pIdx];
      const ptsClass = pts > 0 ? 'pts-gain' : 'pts-zero';
      const roleNameDisplay = role.id === 'babu' ? t('roleBabu') : role.id === 'police' ? t('rolePolice') : role.id === 'dakat' ? t('roleDakat') : t('roleChor');
      tdCols += `<td><span class="${ptsClass}">+${pts}</span> <small>(${roleNameDisplay})</small></td>`;
    });

    tr.innerHTML = tdCols;
    DOM.scoreboardBody.appendChild(tr);
  });
}

export function renderChitBackContent(playerIdx, role) {
  const container = DOM.chitBacks[playerIdx];
  container.className = `chit-face chit-back ${role.className}`;
  container.innerHTML = `
    <div class="role-badge">${role.icon}</div>
    <div class="role-title-en">${role.titleEn}</div>
    <div class="role-title-bn">${role.titleBn}</div>
    <div class="role-points-val">${role.points} pts</div>
  `;
}

export function showFloatingPts(playerIdx, text, isGain) {
  const slot = DOM.playerSlots[playerIdx];
  const popup = document.createElement('div');
  popup.className = `floating-pts-popup ${isGain ? 'gain' : 'loss'}`;
  popup.textContent = text;
  slot.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 1800);
}

export function launchConfetti() {
  const canvas = DOM.modalWinner.querySelector('#confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const particles = [];
  const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2,
      speedX: Math.random() * 2 - 1,
      rot: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rot += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      ctx.restore();

      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });

    if (!DOM.modalWinner.classList.contains('hidden')) {
      requestAnimationFrame(animate);
    }
  }
  animate();
}
