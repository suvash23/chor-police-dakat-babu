// Main Application Entry Point
import { state, translate as t } from './state.js?v=1.1.0';
import { DOM } from './dom.js?v=1.1.0';
import { sound } from './audio.js?v=1.1.0';
import {
  setTheme,
  cycleTheme,
  applyTranslations,
  updateChorToggleLabel,
  updateSinglePlayerOptionsVisibility
} from './ui.js?v=1.1.0';
import {
  applySettings,
  resetMatch,
  handleMainActionButton,
  showPassPeekChit,
  handlePassNextPlayer,
  handleSuspectSlotClick
} from './game.js?v=1.1.0';
import { initPWA } from './pwa.js?v=1.1.0';
import {
  createOnlineRoom,
  joinOnlineRoom,
  leaveOnlineRoom,
  broadcastHostStartRound,
  sendChatMessage
} from './multiplayer.js?v=1.1.0';

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
    
    // Populate current custom names into inputs
    const names = state.customNames[state.mode] || ['', '', '', ''];
    DOM.inputPlayers.forEach((inp, idx) => {
      if (inp) inp.value = names[idx] || '';
    });

    updateChorToggleLabel();
    updateSinglePlayerOptionsVisibility();
    DOM.modalSettings.classList.remove('hidden');
  });

  DOM.selectMode.addEventListener('change', () => {
    const selectedMode = DOM.selectMode.value;
    const names = state.customNames[selectedMode] || ['', '', '', ''];
    DOM.inputPlayers.forEach((inp, idx) => {
      if (inp) inp.value = names[idx] || '';
    });
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

    // Save customized player names
    const updatedNames = DOM.inputPlayers.map(inp => inp ? inp.value.trim() : '');
    state.customNames[state.mode] = updatedNames;
    try {
      localStorage.setItem('cpdb_custom_names', JSON.stringify(state.customNames));
    } catch (e) {}

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

  // --- ONLINE MULTIPLAYER LOBBY EVENT LISTENERS ---
  if (DOM.btnOnlineLobby) {
    DOM.btnOnlineLobby.addEventListener('click', () => {
      // Pre-fill user name from state/localStorage
      const defaultName = state.customNames.single[0] || state.customNames.pass[0] || '';
      if (DOM.inputOnlineHostName && !DOM.inputOnlineHostName.value) {
        DOM.inputOnlineHostName.value = defaultName;
      }
      if (DOM.inputOnlineJoinName && !DOM.inputOnlineJoinName.value) {
        DOM.inputOnlineJoinName.value = defaultName;
      }

      // If already in an active room, show active room view; otherwise show tabs
      if (state.multiplayer && state.multiplayer.isOnline && state.multiplayer.roomCode) {
        DOM.panelActiveRoom.classList.remove('hidden');
        DOM.panelCreateRoom.classList.add('hidden');
        DOM.panelJoinRoom.classList.add('hidden');
        if (DOM.tabsOnlineRoom) DOM.tabsOnlineRoom.classList.add('hidden');
      } else {
        DOM.panelActiveRoom.classList.add('hidden');
        if (DOM.tabsOnlineRoom) DOM.tabsOnlineRoom.classList.remove('hidden');
        DOM.tabCreateRoom.click();
      }

      DOM.modalOnlineLobby.classList.remove('hidden');
    });
  }

  if (DOM.btnCloseOnlineLobby) {
    DOM.btnCloseOnlineLobby.addEventListener('click', () => {
      DOM.modalOnlineLobby.classList.add('hidden');
    });
  }

  if (DOM.tabCreateRoom && DOM.tabJoinRoom) {
    DOM.tabCreateRoom.addEventListener('click', () => {
      DOM.tabCreateRoom.classList.add('primary');
      DOM.tabJoinRoom.classList.remove('primary');
      DOM.panelCreateRoom.classList.remove('hidden');
      DOM.panelJoinRoom.classList.add('hidden');
    });

    DOM.tabJoinRoom.addEventListener('click', () => {
      DOM.tabJoinRoom.classList.add('primary');
      DOM.tabCreateRoom.classList.remove('primary');
      DOM.panelJoinRoom.classList.remove('hidden');
      DOM.panelCreateRoom.classList.add('hidden');
    });
  }

  // Create room button
  if (DOM.btnSubmitCreateRoom) {
    DOM.btnSubmitCreateRoom.addEventListener('click', async () => {
      const name = DOM.inputOnlineHostName.value.trim() || 'Host';
      const rounds = parseInt(DOM.selectOnlineRounds.value, 10) || 5;
      DOM.btnSubmitCreateRoom.disabled = true;
      DOM.btnSubmitCreateRoom.textContent = 'Creating room...';

      try {
        const code = await createOnlineRoom(name, rounds);
        DOM.displayRoomCode.textContent = code;
        if (DOM.tabsOnlineRoom) DOM.tabsOnlineRoom.classList.add('hidden');
        DOM.panelCreateRoom.classList.add('hidden');
        DOM.panelJoinRoom.classList.add('hidden');
        DOM.panelActiveRoom.classList.remove('hidden');
        DOM.btnLeaveOnlineRoom.classList.remove('hidden');
        DOM.hostStartActions.classList.remove('hidden');
        DOM.guestWaitingActions.classList.add('hidden');
        DOM.labelMode.textContent = `🌐 Room: ${code}`;
      } catch (err) {
        alert('Failed to create room: ' + err.message);
      } finally {
        DOM.btnSubmitCreateRoom.disabled = false;
        DOM.btnSubmitCreateRoom.textContent = '✨ Generate Room Code & Host';
      }
    });
  }

  // Join room button
  if (DOM.btnSubmitJoinRoom) {
    DOM.btnSubmitJoinRoom.addEventListener('click', async () => {
      const name = DOM.inputOnlineJoinName.value.trim() || 'Player';
      const code = DOM.inputOnlineRoomCode.value.trim().toUpperCase();
      if (!code) {
        alert('Please enter a valid room code!');
        return;
      }

      DOM.btnSubmitJoinRoom.disabled = true;
      DOM.btnSubmitJoinRoom.textContent = 'Joining room...';

      try {
        await joinOnlineRoom(code, name);
        DOM.displayRoomCode.textContent = code;
        if (DOM.tabsOnlineRoom) DOM.tabsOnlineRoom.classList.add('hidden');
        DOM.panelCreateRoom.classList.add('hidden');
        DOM.panelJoinRoom.classList.add('hidden');
        DOM.panelActiveRoom.classList.remove('hidden');
        DOM.btnLeaveOnlineRoom.classList.remove('hidden');
        DOM.hostStartActions.classList.add('hidden');
        DOM.guestWaitingActions.classList.remove('hidden');
        DOM.labelMode.textContent = `🌐 Room: ${code}`;
      } catch (err) {
        alert('Could not join room: ' + err.message);
      } finally {
        DOM.btnSubmitJoinRoom.disabled = false;
        DOM.btnSubmitJoinRoom.textContent = '🚀 Enter Game Room';
      }
    });
  }

  // Copy room code on click
  if (DOM.displayRoomCode) {
    DOM.displayRoomCode.addEventListener('click', () => {
      const code = DOM.displayRoomCode.textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
        alert(`Room Code copied: ${code}! Send it to 3 friends.`);
      }).catch(() => {});
    });
  }

  // Host starts game
  if (DOM.btnHostStartGame) {
    DOM.btnHostStartGame.addEventListener('click', async () => {
      DOM.btnHostStartGame.disabled = true;
      DOM.btnHostStartGame.textContent = 'Starting match...';
      try {
        await broadcastHostStartRound();
        DOM.modalOnlineLobby.classList.add('hidden');
      } catch (err) {
        alert('Error starting match: ' + err.message);
        DOM.btnHostStartGame.disabled = false;
      }
    });
  }

  // Leave room button
  if (DOM.btnLeaveOnlineRoom) {
    DOM.btnLeaveOnlineRoom.addEventListener('click', async () => {
      if (confirm('Are you sure you want to leave this online room?')) {
        await leaveOnlineRoom();
        DOM.labelMode.textContent = '🤖 Single-Player';
      }
    });
  }

  // --- TEAM CHAT EVENT LISTENERS ---
  if (DOM.btnToggleChat && DOM.chatWindow) {
    DOM.btnToggleChat.addEventListener('click', () => {
      const isHidden = DOM.chatWindow.classList.contains('hidden');
      if (isHidden) {
        DOM.chatWindow.classList.remove('hidden');
        state.multiplayer.unreadCount = 0;
        DOM.chatUnreadBadge.classList.add('hidden');
        DOM.inputChatMessage.focus();
      } else {
        DOM.chatWindow.classList.add('hidden');
      }
    });
  }

  if (DOM.btnCloseChat) {
    DOM.btnCloseChat.addEventListener('click', () => {
      DOM.chatWindow.classList.add('hidden');
    });
  }

  if (DOM.chatForm) {
    DOM.chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const txt = DOM.inputChatMessage.value.trim();
      if (!txt) return;
      DOM.inputChatMessage.value = '';
      await sendChatMessage(txt);
    });
  }

  if (DOM.chatQuickEmojis) {
    DOM.chatQuickEmojis.forEach(btn => {
      btn.addEventListener('click', async () => {
        await sendChatMessage(btn.textContent.trim());
      });
    });
  }
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

  try {
    const savedNames = localStorage.getItem('cpdb_custom_names');
    if (savedNames) {
      const parsed = JSON.parse(savedNames);
      if (parsed && typeof parsed === 'object') {
        state.customNames = Object.assign(state.customNames, parsed);
      }
    }
  } catch (e) {}

  setupEventListeners();
  applySettings(false);
  applyTranslations();
  resetMatch();
  initPWA();
}

window.addEventListener('DOMContentLoaded', initGame);
