// Online Multiplayer & Real-Time Sync via Firebase Realtime Database
import { state, translate as t } from './state.js?v=1.1.0';
import { DOM } from './dom.js?v=1.1.0';
import { db, ref, set, get, push, onValue, off, update, remove, onDisconnect, serverTimestamp } from './firebase.js?v=1.1.0';
import { renderChitBackContent, showFloatingPts, updateScoreboardUI, launchConfetti } from './ui.js?v=1.1.0';
import { sound } from './audio.js?v=1.1.0';
import { ROLES } from './constants.js?v=1.1.0';
import { generateRoomCode } from './utils.js?v=1.1.0';

export { generateRoomCode };

let activeRoomRef = null;
let activePlayersRef = null;
let activeGameRef = null;
let activeChatRef = null;
let isApplyingRemoteUpdate = false;

export async function createOnlineRoom(hostName, targetRounds = 5) {
  const roomCode = generateRoomCode();
  state.multiplayer.isOnline = true;
  state.multiplayer.roomCode = roomCode;
  state.multiplayer.playerId = 0; // Host is Player 0
  state.multiplayer.isHost = true;
  state.multiplayer.playerName = hostName || 'Host';

  const roomData = {
    roomCode: roomCode,
    createdAt: Date.now(),
    targetRounds: targetRounds,
    hostId: 0,
    status: 'LOBBY', // 'LOBBY', 'PLAYING', 'FINISHED'
    players: {
      0: {
        id: 0,
        name: state.multiplayer.playerName,
        avatar: '👑',
        isHost: true,
        score: 0,
        connected: true
      }
    },
    gameState: {
      step: 'IDLE',
      currentRound: 1,
      assignments: [],
      babuPlayerId: null,
      policePlayerId: null,
      dakatPlayerId: null,
      chorPlayerId: null,
      targetSuspectRole: null,
      policeGuessedPlayerId: null,
      guessSuccess: false
    },
    chat: {}
  };

  const rRef = ref(db, `rooms/${roomCode}`);
  await set(rRef, roomData);

  // Setup disconnect cleanup
  onDisconnect(ref(db, `rooms/${roomCode}/players/0/connected`)).set(false);

  bindRoomListeners(roomCode);
  return roomCode;
}

export async function joinOnlineRoom(roomCode, playerName) {
  let code = roomCode.trim().toUpperCase();
  // If user pasted without dash (e.g. GACY6998) or with spaces, auto-format to GACY-6998
  code = code.replace(/\s+/g, '');
  if (!code.includes('-') && code.length === 8) {
    code = `${code.slice(0, 4)}-${code.slice(4)}`;
  }

  const roomSnapshot = await get(ref(db, `rooms/${code}`));

  if (!roomSnapshot.exists()) {
    throw new Error(`Room code "${code}" not found! Please verify the code.`);
  }

  const room = roomSnapshot.val();
  const players = room.players || {};
  const currentCount = Object.keys(players).length;

  if (currentCount >= 4) {
    throw new Error('Room is already full with 4 players!');
  }

  // Find next available slot index 0..3
  let slotIndex = null;
  for (let i = 0; i < 4; i++) {
    if (!players[i]) {
      slotIndex = i;
      break;
    }
  }

  if (slotIndex === null) {
    throw new Error('No available slot found in room.');
  }

  const avatars = ['🧑‍🎓', '👩‍💼', '🧑‍🎨', '👩‍🔬'];
  const newPlayer = {
    id: slotIndex,
    name: playerName || `Player ${slotIndex + 1}`,
    avatar: avatars[slotIndex] || '🧑‍🎓',
    isHost: false,
    score: 0,
    connected: true
  };

  await set(ref(db, `rooms/${code}/players/${slotIndex}`), newPlayer);
  onDisconnect(ref(db, `rooms/${code}/players/${slotIndex}/connected`)).set(false);

  state.multiplayer.isOnline = true;
  state.multiplayer.roomCode = code;
  state.multiplayer.playerId = slotIndex;
  state.multiplayer.isHost = false;
  state.multiplayer.playerName = newPlayer.name;

  bindRoomListeners(code);
  return code;
}

export function bindRoomListeners(roomCode) {
  unbindRoomListeners();

  activeRoomRef = ref(db, `rooms/${roomCode}`);
  activePlayersRef = ref(db, `rooms/${roomCode}/players`);
  activeGameRef = ref(db, `rooms/${roomCode}/gameState`);
  activeChatRef = ref(db, `rooms/${roomCode}/chat`);

  // Listen for players join/leave
  onValue(activePlayersRef, (snapshot) => {
    const playersObj = snapshot.val() || {};
    const playerList = Object.values(playersObj).filter(p => p !== null);
    state.multiplayer.connectedPlayers = playerList;

    renderLobbyPlayerList(playerList);

    // Sync to main game player array if match is starting or underway
    if (playerList.length === 4) {
      playerList.forEach((p, idx) => {
        if (state.players[idx]) {
          state.players[idx].name = p.name;
          state.players[idx].avatar = p.avatar;
          state.players[idx].totalScore = p.score || 0;
          DOM.playerNames[idx].textContent = p.name;
          DOM.playerAvatars[idx].textContent = p.avatar;
          DOM.thPlayers[idx].textContent = p.name;
        }
      });
    }
  });

  // Listen for game state updates
  onValue(activeGameRef, (snapshot) => {
    if (!snapshot.exists()) return;
    const remoteGame = snapshot.val();
    handleRemoteGameStateUpdate(remoteGame);
  });

  // Listen for live chat
  onValue(activeChatRef, (snapshot) => {
    const chatObj = snapshot.val() || {};
    renderChatMessages(chatObj);
  });
}

export function unbindRoomListeners() {
  if (activeRoomRef) off(activeRoomRef);
  if (activePlayersRef) off(activePlayersRef);
  if (activeGameRef) off(activeGameRef);
  if (activeChatRef) off(activeChatRef);
}

export async function leaveOnlineRoom() {
  if (state.multiplayer.roomCode && state.multiplayer.playerId !== null) {
    try {
      if (state.multiplayer.isHost) {
        await remove(ref(db, `rooms/${state.multiplayer.roomCode}`));
      } else {
        await remove(ref(db, `rooms/${state.multiplayer.roomCode}/players/${state.multiplayer.playerId}`));
      }
    } catch (e) {
      console.warn('Error on leave:', e);
    }
  }

  unbindRoomListeners();
  state.multiplayer.isOnline = false;
  state.multiplayer.roomCode = null;
  state.multiplayer.playerId = null;
  state.multiplayer.isHost = false;
  state.multiplayer.connectedPlayers = [];
  DOM.panelActiveRoom.classList.add('hidden');
  DOM.panelCreateRoom.classList.remove('hidden');
  DOM.panelJoinRoom.classList.add('hidden');
  if (DOM.tabsOnlineRoom) DOM.tabsOnlineRoom.classList.remove('hidden');
  DOM.btnLeaveOnlineRoom.classList.add('hidden');
}

export function renderLobbyPlayerList(players) {
  DOM.listOnlinePlayers.innerHTML = '';
  DOM.countConnectedPlayers.textContent = players.length;

  players.forEach((p, idx) => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.padding = '6px 12px';
    row.style.background = '#fff';
    row.style.border = '1.5px solid var(--ink-dark)';
    row.style.borderRadius = '6px';

    const isYou = p.id === state.multiplayer.playerId;
    row.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 1.3rem;">${p.avatar}</span>
        <b>${p.name}</b> ${isYou ? '<span style="color:var(--ink-green); font-size:0.85rem;">(You)</span>' : ''}
      </div>
      <div>
        ${p.isHost ? '<span style="background:#ffec99; border:1px solid #333; border-radius:10px; padding:1px 6px; font-size:0.75rem; font-weight:bold;">👑 Host</span>' : '<span style="color:var(--ink-green); font-size:0.9rem;">● Ready</span>'}
      </div>
    `;
    DOM.listOnlinePlayers.appendChild(row);
  });

  // Enable Start Game button if Host and 4 players ready
  if (state.multiplayer.isHost) {
    if (players.length === 4) {
      DOM.btnHostStartGame.disabled = false;
      DOM.btnHostStartGame.textContent = '🚀 Start Online Match (4/4 Ready)';
    } else {
      DOM.btnHostStartGame.disabled = true;
      DOM.btnHostStartGame.textContent = `⏳ Waiting for Players (${players.length}/4)...`;
    }
  }
}

export async function broadcastHostStartRound() {
  if (!state.multiplayer.isHost || !state.multiplayer.roomCode) return;

  // Perform random Fisher-Yates shuffle on Host
  let rolePool = [
    { ...ROLES.BABU },
    { ...ROLES.POLICE },
    { ...ROLES.DAKAT },
    { ...ROLES.CHOR }
  ];

  for (let i = rolePool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rolePool[i], rolePool[j]] = [rolePool[j], rolePool[i]];
  }

  let babuId = null, policeId = null, dakatId = null, chorId = null;
  rolePool.forEach((r, idx) => {
    if (r.id === 'babu') babuId = idx;
    if (r.id === 'police') policeId = idx;
    if (r.id === 'dakat') dakatId = idx;
    if (r.id === 'chor') chorId = idx;
  });

  const targetSuspect = Math.random() < 0.5 ? 'chor' : 'dakat';

  const newRoundData = {
    step: 'BABU_ANNOUNCED',
    currentRound: state.currentRound,
    assignments: rolePool,
    babuPlayerId: babuId,
    policePlayerId: policeId,
    dakatPlayerId: dakatId,
    chorPlayerId: chorId,
    targetSuspectRole: targetSuspect,
    policeGuessedPlayerId: null,
    guessSuccess: false
  };

  await update(ref(db, `rooms/${state.multiplayer.roomCode}`), {
    status: 'PLAYING',
    gameState: newRoundData
  });
}

export function handleRemoteGameStateUpdate(remoteGame) {
  isApplyingRemoteUpdate = true;
  state.currentRound = remoteGame.currentRound || 1;
  state.currentRoundState = Object.assign(state.currentRoundState, remoteGame);

  // Close online lobby modal once game starts
  if (remoteGame.step !== 'IDLE' && !DOM.modalOnlineLobby.classList.contains('hidden')) {
    DOM.modalOnlineLobby.classList.add('hidden');
  }

  DOM.labelCurrentRound.textContent = state.currentRound;

  // Step A: When Babu announces and chits are dealt
  if (remoteGame.step === 'BABU_ANNOUNCED' || remoteGame.step === 'GUESSING') {
    sound.playFlip();

    // Render each chit back
    remoteGame.assignments.forEach((role, idx) => {
      renderChitBackContent(idx, role);
    });

    // Reveal Babu and Police openly
    const babuIdx = remoteGame.babuPlayerId;
    const policeIdx = remoteGame.policePlayerId;

    DOM.chits.forEach((chit, idx) => {
      chit.classList.remove('shuffling');
      // Secret rule: In online multiplayer, each player also sees THEIR OWN chit!
      if (idx === babuIdx || idx === policeIdx || idx === state.multiplayer.playerId) {
        chit.classList.add('revealed');
      } else {
        chit.classList.remove('revealed');
      }
    });

    DOM.playerSlots.forEach(s => s.className = 'player-slot');
    DOM.playerSlots[policeIdx].classList.add('active-police');

    const babuName = state.players[babuIdx].name;
    const policeName = state.players[policeIdx].name;
    const targetName = remoteGame.targetSuspectRole === 'chor' ? t('chorTarget') : t('dakatTarget');

    DOM.announcementMain.innerHTML = `👑 <b>${babuName}</b> (${t('roleBabu')}): <br>"${policeName} (${t('rolePolice')}), ${t('babuFindOut')} <u>${targetName}</u> ${t('babuIs')}"`;
    DOM.announcementSub.textContent = `Police must choose between the 2 suspects!`;

    // Setup selectable slots
    const isPoliceMe = (policeIdx === state.multiplayer.playerId);
    const suspects = [remoteGame.dakatPlayerId, remoteGame.chorPlayerId];

    suspects.forEach(sIdx => {
      const slot = DOM.playerSlots[sIdx];
      slot.classList.add('suspect-selectable');
      if (!slot.querySelector('.suspect-hint')) {
        const hint = document.createElement('div');
        hint.className = 'suspect-hint';
        hint.textContent = t('suspectHint');
        slot.appendChild(hint);
      }
    });

    if (isPoliceMe) {
      DOM.btnActionMain.style.display = 'none';
      DOM.announcementSub.innerHTML = `🚨 <b>You are the Police! Click on a suspect to accuse them!</b>`;
    } else {
      DOM.btnActionMain.style.display = 'none';
      DOM.announcementSub.textContent = `Police (${policeName}) is currently choosing a suspect...`;
    }
  }

  // Step B: When round ends with police guess
  if (remoteGame.step === 'ROUND_OVER') {
    // Reveal all remaining chits
    DOM.chits.forEach(chit => chit.classList.add('revealed'));
    sound.playFlip();

    DOM.playerSlots.forEach(s => {
      s.classList.remove('suspect-selectable');
      const hint = s.querySelector('.suspect-hint');
      if (hint) hint.remove();
    });

    const isCorrect = remoteGame.guessSuccess;
    const accusedIdx = remoteGame.policeGuessedPlayerId;
    const policeIdx = remoteGame.policePlayerId;
    const targetRoleTitle = remoteGame.targetSuspectRole === 'chor' ? t('roleChor') : t('roleDakat');
    const actualTargetId = remoteGame.targetSuspectRole === 'chor' ? remoteGame.chorPlayerId : remoteGame.dakatPlayerId;

    if (isCorrect) {
      DOM.playerSlots[accusedIdx].classList.add('slot-caught');
      DOM.playerSlots[policeIdx].classList.add('slot-caught');
      showFloatingPts(policeIdx, '+800', true);
      sound.playSuccess();
      DOM.announcementMain.innerHTML = `🎉 <b>${t('correctGuess')}</b> ${state.players[policeIdx].name} ${t('caughtThe')} ${state.players[accusedIdx].name} (${targetRoleTitle})!`;
    } else {
      DOM.playerSlots[accusedIdx].classList.add('slot-wrong');
      DOM.playerSlots[policeIdx].classList.add('slot-wrong');
      DOM.playerSlots[actualTargetId].classList.add('slot-escaped');
      sound.playFail();
      DOM.announcementMain.innerHTML = `❌ <b>${t('wrongGuess')}</b> ${state.players[accusedIdx].name} was NOT the ${targetRoleTitle}!`;
    }

    updateScoreboardUI();

    if (state.multiplayer.isHost) {
      DOM.btnActionMain.style.display = 'inline-flex';
      DOM.btnActionMain.disabled = false;
      DOM.btnActionMain.textContent = `Next Round (Round ${state.currentRound + 1}) ➔`;
    } else {
      DOM.btnActionMain.style.display = 'none';
      DOM.announcementSub.textContent = 'Waiting for Host to start next round...';
    }
  }

  isApplyingRemoteUpdate = false;
}

export async function broadcastPoliceGuess(accusedIdx) {
  if (!state.multiplayer.isOnline || !state.multiplayer.roomCode) return;

  const targetRole = state.currentRoundState.targetSuspectRole;
  const actualTargetId = targetRole === 'chor' ? state.currentRoundState.chorPlayerId : state.currentRoundState.dakatPlayerId;
  const isCorrect = (accusedIdx === actualTargetId);

  // Compute scores
  const roundScores = [0, 0, 0, 0];
  const babuIdx = state.currentRoundState.babuPlayerId;
  const policeIdx = state.currentRoundState.policePlayerId;
  const dakatIdx = state.currentRoundState.dakatPlayerId;
  const chorIdx = state.currentRoundState.chorPlayerId;

  roundScores[babuIdx] = ROLES.BABU.points;
  if (isCorrect) {
    roundScores[policeIdx] = ROLES.POLICE.points;
    roundScores[dakatIdx] = ROLES.DAKAT.points;
    roundScores[chorIdx] = ROLES.CHOR.points;
  } else {
    roundScores[policeIdx] = 0;
    if (targetRole === 'chor') {
      roundScores[chorIdx] = ROLES.CHOR.points + ROLES.POLICE.points;
      roundScores[dakatIdx] = ROLES.DAKAT.points;
    } else {
      roundScores[dakatIdx] = ROLES.DAKAT.points + ROLES.POLICE.points;
      roundScores[chorIdx] = ROLES.CHOR.points;
    }
  }

  // Update players score on Firebase
  const updates = {};
  for (let i = 0; i < 4; i++) {
    const curScore = state.players[i].totalScore + roundScores[i];
    updates[`rooms/${state.multiplayer.roomCode}/players/${i}/score`] = curScore;
  }

  updates[`rooms/${state.multiplayer.roomCode}/gameState/step`] = 'ROUND_OVER';
  updates[`rooms/${state.multiplayer.roomCode}/gameState/policeGuessedPlayerId`] = accusedIdx;
  updates[`rooms/${state.multiplayer.roomCode}/gameState/guessSuccess`] = isCorrect;

  await update(ref(db), updates);
}

// TEAM CHAT FUNCTIONS
export async function sendChatMessage(text) {
  if (!text || !text.trim() || !state.multiplayer.roomCode) return;
  const msgRef = push(ref(db, `rooms/${state.multiplayer.roomCode}/chat`));
  await set(msgRef, {
    senderId: state.multiplayer.playerId,
    senderName: state.multiplayer.playerName || 'Player',
    text: text.trim().slice(0, 120),
    timestamp: Date.now()
  });
}

export function renderChatMessages(chatObj) {
  DOM.chatMessagesList.innerHTML = '';
  const messages = Object.values(chatObj || {}).sort((a, b) => a.timestamp - b.timestamp);

  if (messages.length === 0) {
    DOM.chatMessagesList.innerHTML = '<div style="text-align: center; color: var(--ink-pencil); font-size: 0.85rem;">Welcome to Team Chat! Chat with your friends in real-time.</div>';
    return;
  }

  messages.forEach(msg => {
    const isMe = msg.senderId === state.multiplayer.playerId;
    const bubble = document.createElement('div');
    bubble.style.maxWidth = '85%';
    bubble.style.alignSelf = isMe ? 'flex-end' : 'flex-start';
    bubble.style.background = isMe ? '#dbeafe' : '#f1f5f9';
    bubble.style.border = '1px solid ' + (isMe ? '#93c5fd' : '#cbd5e1');
    bubble.style.borderRadius = '8px';
    bubble.style.padding = '4px 8px';
    bubble.style.fontSize = '0.9rem';

    bubble.innerHTML = `
      <div style="font-size: 0.75rem; font-weight: bold; color: ${isMe ? '#1d4ed8' : '#475569'}; margin-bottom: 2px;">
        ${isMe ? 'You' : msg.senderName}
      </div>
      <div>${msg.text}</div>
    `;
    DOM.chatMessagesList.appendChild(bubble);
  });

  DOM.chatMessagesList.scrollTop = DOM.chatMessagesList.scrollHeight;

  // Badge notification if chat window is closed
  if (DOM.chatWindow.classList.contains('hidden') && messages.length > 0) {
    state.multiplayer.unreadCount++;
    DOM.chatUnreadBadge.textContent = state.multiplayer.unreadCount;
    DOM.chatUnreadBadge.classList.remove('hidden');
  }
}
