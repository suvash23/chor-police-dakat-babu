// DOM Element References

export const DOM = {
      labelMode: document.getElementById('label-mode'),
      labelCurrentRound: document.getElementById('label-current-round'),
      labelTargetRounds: document.getElementById('label-target-rounds'),
      scoreSheetTarget: document.getElementById('score-sheet-target'),
      btnThemeSwitcher: document.getElementById('btn-theme-switcher'),
      themeIcon: document.getElementById('theme-icon'),
      themeNameLabel: document.getElementById('theme-name-label'),
      btnLangToggle: document.getElementById('btn-lang-toggle'),
      langToggleLabel: document.getElementById('lang-toggle-label'),
      btnSound: document.getElementById('btn-toggle-sound'),
      soundIcon: document.getElementById('sound-icon'),
      btnRules: document.getElementById('btn-rules'),
      btnSettings: document.getElementById('btn-settings'),
      btnResetGame: document.getElementById('btn-reset-game'),
      btnActionMain: document.getElementById('btn-action-main'),
      announcementMain: document.getElementById('announcement-main'),
      announcementSub: document.getElementById('announcement-sub'),
      gameBoard: document.getElementById('game-board'),
      scoreboardBody: document.getElementById('scoreboard-body'),
      totalVal: [
        document.getElementById('total-val-0'),
        document.getElementById('total-val-1'),
        document.getElementById('total-val-2'),
        document.getElementById('total-val-3')
      ],
      playerSlots: [
        document.getElementById('slot-0'),
        document.getElementById('slot-1'),
        document.getElementById('slot-2'),
        document.getElementById('slot-3')
      ],
      playerNames: [
        document.getElementById('name-0'),
        document.getElementById('name-1'),
        document.getElementById('name-2'),
        document.getElementById('name-3')
      ],
      playerAvatars: [
        document.getElementById('avatar-0'),
        document.getElementById('avatar-1'),
        document.getElementById('avatar-2'),
        document.getElementById('avatar-3')
      ],
      playerScores: [
        document.getElementById('score-0'),
        document.getElementById('score-1'),
        document.getElementById('score-2'),
        document.getElementById('score-3')
      ],
      chits: [
        document.getElementById('chit-0'),
        document.getElementById('chit-1'),
        document.getElementById('chit-2'),
        document.getElementById('chit-3')
      ],
      chitBacks: [
        document.getElementById('chit-back-0'),
        document.getElementById('chit-back-1'),
        document.getElementById('chit-back-2'),
        document.getElementById('chit-back-3')
      ],
      thPlayers: [
        document.getElementById('th-player-0'),
        document.getElementById('th-player-1'),
        document.getElementById('th-player-2'),
        document.getElementById('th-player-3')
      ],

      // Modals
      modalConfirmReset: document.getElementById('modal-confirm-reset'),
      btnConfirmResetYes: document.getElementById('btn-confirm-reset-yes'),
      btnConfirmResetNo: document.getElementById('btn-confirm-reset-no'),

      modalSettings: document.getElementById('modal-settings'),
      selectMode: document.getElementById('select-mode'),
      playerNamesGroup: document.getElementById('player-names-group'),
      labelPlayerNamesHeading: document.getElementById('label-player-names-heading'),
      inputPlayers: [
        document.getElementById('input-player-0'),
        document.getElementById('input-player-1'),
        document.getElementById('input-player-2'),
        document.getElementById('input-player-3')
      ],
      labelInputPlayers: [
        document.getElementById('label-input-p0'),
        document.getElementById('label-input-p1'),
        document.getElementById('label-input-p2'),
        document.getElementById('label-input-p3')
      ],
      selectRounds: document.getElementById('select-rounds'),
      toggleChorPts: document.getElementById('toggle-chor-pts'),
      labelChorPts: document.getElementById('label-chor-pts'),
      singlePlayerOptions: document.getElementById('single-player-options'),
      toggleAlwaysPolice: document.getElementById('toggle-always-police'),
      labelAlwaysPolice: document.getElementById('label-always-police'),
      toggleHideBabu: document.getElementById('toggle-hide-babu'),
      labelHideBabu: document.getElementById('label-hide-babu'),
      btnSaveSettings: document.getElementById('btn-save-settings'),
      btnCloseSettings: document.getElementById('btn-close-settings'),

      modalRules: document.getElementById('modal-rules'),
      btnCloseRules: document.getElementById('btn-close-rules'),

      modalPassPlay: document.getElementById('modal-pass-play'),
      passPlayerTitle: document.getElementById('pass-player-title'),
      passPlayerInstructions: document.getElementById('pass-player-instructions'),
      passBoxHidden: document.getElementById('pass-box-hidden'),
      passBoxRevealed: document.getElementById('pass-box-revealed'),
      btnPassPeek: document.getElementById('btn-pass-peek'),
      btnPassNext: document.getElementById('btn-pass-next'),
      passChitPreviewArea: document.getElementById('pass-chit-preview-area'),
      passRoleDesc: document.getElementById('pass-role-desc'),

      modalWinner: document.getElementById('modal-winner'),
      winnerHeadline: document.getElementById('winner-headline'),
      winnerRankingsList: document.getElementById('winner-rankings-list'),
      btnWinnerReplay: document.getElementById('btn-winner-replay'),

      // Online Multiplayer Lobby
      btnOnlineLobby: document.getElementById('btn-online-lobby'),
      modalOnlineLobby: document.getElementById('modal-online-lobby'),
      tabsOnlineRoom: document.getElementById('tabs-online-room'),
      tabCreateRoom: document.getElementById('tab-create-room'),
      tabJoinRoom: document.getElementById('tab-join-room'),
      panelCreateRoom: document.getElementById('panel-create-room'),
      panelJoinRoom: document.getElementById('panel-join-room'),
      panelActiveRoom: document.getElementById('panel-active-room'),
      inputOnlineHostName: document.getElementById('input-online-host-name'),
      selectOnlineRounds: document.getElementById('select-online-rounds'),
      btnSubmitCreateRoom: document.getElementById('btn-submit-create-room'),
      inputOnlineJoinName: document.getElementById('input-online-join-name'),
      inputOnlineRoomCode: document.getElementById('input-online-room-code'),
      btnSubmitJoinRoom: document.getElementById('btn-submit-join-room'),
      displayRoomCode: document.getElementById('display-room-code'),
      countConnectedPlayers: document.getElementById('count-connected-players'),
      listOnlinePlayers: document.getElementById('list-online-players'),
      hostStartActions: document.getElementById('host-start-actions'),
      btnHostStartGame: document.getElementById('btn-host-start-game'),
      guestWaitingActions: document.getElementById('guest-waiting-actions'),
      btnLeaveOnlineRoom: document.getElementById('btn-leave-online-room'),
      btnCloseOnlineLobby: document.getElementById('btn-close-online-lobby'),

      // Team Chat Drawer
      chatWidget: document.getElementById('chat-widget'),
      btnToggleChat: document.getElementById('btn-toggle-chat'),
      chatUnreadBadge: document.getElementById('chat-unread-badge'),
      chatWindow: document.getElementById('chat-window'),
      btnCloseChat: document.getElementById('btn-close-chat'),
      chatMessagesList: document.getElementById('chat-messages-list'),
      chatForm: document.getElementById('chat-form'),
      inputChatMessage: document.getElementById('input-chat-message'),
      chatQuickEmojis: document.querySelectorAll('.chat-quick-emoji')
    };

