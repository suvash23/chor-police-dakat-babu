// Main Application Entry Point
import { state, translate as t } from './state.js';
import { DOM } from './dom.js';
import { sound } from './audio.js';
import {
  setTheme,
  cycleTheme,
  applyTranslations,
  updateChorToggleLabel,
  updateSinglePlayerOptionsVisibility
} from './ui.js';
import {
  applySettings,
  resetMatch,
  handleMainActionButton,
  showPassPeekChit,
  handlePassNextPlayer,
  handleSuspectSlotClick
} from './game.js';
import { initPWA } from './pwa.js';

function setupEventListeners() {
  DOM.btnThemeSwitcher.addEventListener('click', () => {
    cycleTheme();
  });

  DOM.btnLangToggle.addEventListener('click', () => {
    state.lang = (state.lang === 'en') ? 'bn' : 'en';
    try {
      localStorage.setItem('cpdb_lang', state.lang);
    } catch (e) {}
    applyTranslations();
  });

  DOM.btnSound.addEventListener('click', () => {
    sound.enabled = !sound.enabled;
    DOM.soundIcon.textContent = sound.enabled ? '🔊' : '🔇';
  });

  DOM.btnRules.addEventListener('click', () => {
    DOM.modalRules.classList.remove('hidden');
  });

  DOM.btnCloseRules.addEventListener('click', () => {
    DOM.modalRules.classList.add('hidden');
  });

  DOM.btnSettings.addEventListener('click', () => {
    DOM.selectMode.value = state.mode;
    DOM.selectRounds.value = state.targetRounds;
    DOM.toggleChorPts.checked = state.chorPoints === 400;
    DOM.toggleAlwaysPolice.checked = state.alwaysPolice;
    DOM.toggleHideBabu.checked = state.hideBabu;
    updateChorToggleLabel();
    updateSinglePlayerOptionsVisibility();
    DOM.modalSettings.classList.remove('hidden');
  });

  DOM.selectMode.addEventListener('change', () => {
    updateSinglePlayerOptionsVisibility();
  });

  DOM.toggleAlwaysPolice.addEventListener('change', () => {
    DOM.labelAlwaysPolice.textContent = DOM.toggleAlwaysPolice.checked ? t('toggleOn') : t('toggleOff');
  });

  DOM.toggleHideBabu.addEventListener('change', () => {
    DOM.labelHideBabu.textContent = DOM.toggleHideBabu.checked ? t('toggleOn') : t('toggleOff');
  });

  DOM.btnCloseSettings.addEventListener('click', () => {
    DOM.modalSettings.classList.add('hidden');
  });

  DOM.toggleChorPts.addEventListener('change', updateChorToggleLabel);

  DOM.btnSaveSettings.addEventListener('click', () => {
    state.mode = DOM.selectMode.value;
    state.targetRounds = parseInt(DOM.selectRounds.value, 10);
    state.chorPoints = DOM.toggleChorPts.checked ? 400 : 0;
    state.alwaysPolice = (state.mode === 'single') ? DOM.toggleAlwaysPolice.checked : false;
    state.hideBabu = (state.mode === 'single') ? DOM.toggleHideBabu.checked : false;
    DOM.modalSettings.classList.add('hidden');
    applySettings(true);
  });

  DOM.btnResetGame.addEventListener('click', () => {
    DOM.modalConfirmReset.classList.remove('hidden');
  });

  DOM.btnConfirmResetYes.addEventListener('click', () => {
    DOM.modalConfirmReset.classList.add('hidden');
    resetMatch();
  });

  DOM.btnConfirmResetNo.addEventListener('click', () => {
    DOM.modalConfirmReset.classList.add('hidden');
  });

  DOM.btnActionMain.addEventListener('click', handleMainActionButton);

  DOM.btnPassPeek.addEventListener('click', showPassPeekChit);
  DOM.btnPassNext.addEventListener('click', handlePassNextPlayer);

  DOM.btnWinnerReplay.addEventListener('click', () => {
    DOM.modalWinner.classList.add('hidden');
    resetMatch();
  });

  DOM.playerSlots.forEach((slot, index) => {
    slot.addEventListener('click', () => {
      handleSuspectSlotClick(index);
    });
  });
}

function initGame() {
  try {
    const savedTheme = localStorage.getItem('cpdb_theme');
    if (savedTheme) state.theme = savedTheme;
  } catch (e) {}
  setTheme(state.theme);

  try {
    const savedLang = localStorage.getItem('cpdb_lang');
    if (savedLang === 'en' || savedLang === 'bn') state.lang = savedLang;
  } catch (e) {}

  setupEventListeners();
  applySettings(false);
  applyTranslations();
  resetMatch();
  initPWA();
}

window.addEventListener('DOMContentLoaded', initGame);
