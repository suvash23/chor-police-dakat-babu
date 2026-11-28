// Bilingual Translations Dictionary & Helper

export const TRANSLATIONS = {
      // --- Toolbar & Header ---
      singlePlayerMode:   { en: '🤖 Single-Player',      bn: '🤖 একক খেলোয়াড়' },
      passPlayMode:       { en: '👥 Pass-and-Play',       bn: '👥 পাস-অ্যান্ড-প্লে' },
      roundLabel:         { en: 'Round',                  bn: 'রাউন্ড' },
      sound:              { en: 'Sound',                  bn: 'শব্দ' },
      rules:              { en: '📖 Rules',               bn: '📖 নিয়ম' },
      settings:           { en: '⚙️ Settings',           bn: '⚙️ সেটিংস' },
      newGame:            { en: '↺ New Game',             bn: '↺ নতুন খেলা' },
      subtitle:           { en: 'Traditional Folded Chit Guessing Game • চোর পুলিশ ডাকাত বাবু', bn: 'চোর পুলিশ ডাকাত বাবু • ঐতিহ্যবাহী চিরকুট অনুমান খেলা' },

      // --- PWA Install banner ---
      installMsg:         { en: '📲 Install as App on your home screen for offline play!', bn: '📲 অফলাইনে খেলতে হোম স্ক্রিনে অ্যাপ হিসেবে ইন্সটল করুন!' },
      install:            { en: 'Install',                bn: 'ইন্সটল' },

      // --- Announcement / game flow ---
      dealBtn:            { en: '🃏 Deal & Shuffle',      bn: '🃏 ভাঁজ ও বিতরণ' },
      nextRoundBtn:       { en: 'Next Round',             bn: 'পরবর্তী রাউন্ড' },
      viewResults:        { en: '🏆 View Final Results',  bn: '🏆 চূড়ান্ত ফলাফল দেখুন' },
      round:              { en: 'Round',                  bn: 'রাউন্ড' },
      of:                 { en: 'of',                     bn: '/' },
      dealSub:            { en: 'Click "Deal & Shuffle Chits" to fold and shuffle the paper chits.', bn: '"ভাঁজ ও বিতরণ" বোতাম চাপুন। কাগজের চিরকুট ভাঁজ করে মেশানো হবে।' },
      shufflingMain:      { en: 'Shuffling & Folding Chits...', bn: 'চিরকুট মেশানো ও ভাঁজ হচ্ছে...' },
      shufflingSub:       { en: 'The 4 folded chits are being mixed on the notebook...', bn: 'খাতার উপর ৪টি ভাঁজ করা চিরকুট মেশানো হচ্ছে...' },

      // --- Babu announcement ---
      babuCommands:       { en: 'commands',               bn: 'আদেশ দিচ্ছেন' },
      babuFindOut:        { en: 'find out who the',       bn: 'খুঁজে বের করো কে সেই' },
      babuIs:             { en: 'is!',                    bn: '!' },
      anonBabu:           { en: 'Anonymous Babu',         bn: 'অজানা বাবু' },
      anonBabuCmd:        { en: 'commands from the shadows:', bn: 'আড়াল থেকে আদেশ দিচ্ছেন:' },
      anonBabuSub:        { en: 'Babu is hidden among the bots! Police must choose between all 3 suspects.', bn: 'বাবু লুকিয়ে আছেন! পুলিশকে ৩ জনের মধ্যে থেকে বেছে নিতে হবে।' },
      policeFindSub:      { en: 'Police must choose between the 2 remaining hidden players!', bn: 'পুলিশকে বাকি ২ জন লুকানো খেলোয়াড়ের মধ্যে থেকে বেছে নিতে হবে!' },
      policeLabel:        { en: 'Police',                 bn: 'পুলিশ' },

      // --- Guessing phase ---
      policeInspecting:   { en: 'is interrogating suspects...', bn: 'সন্দেহভাজনদের জিজ্ঞাসাবাদ করছে...' },
      botThinkingSub:     { en: 'Simulating bot thinking (1.5s)...', bn: 'বট ভাবছে (১.৫ সেকেন্ড)...' },
      clickAccuse:        { en: ', click on a suspect\'s slot to accuse them!', bn: ', কোনো সন্দেহভাজনের ঘরে ক্লিক করে অভিযোগ করো!' },
      hideBabuSub:        { en: 'Babu is also disguised! Pick the', bn: 'বাবুও ছদ্মবেশে আছেন! খুঁজে বের করো' },
      hideBabuSub2:       { en: 'among the 3 candidates.', bn: 'তিনজন সন্দেহভাজনের মধ্য থেকে।' },
      lookClosely:        { en: 'Look closely at their faces. Who is the', bn: 'ভালো করে দেখো। কে সেই' },
      suspectHint:        { en: 'Suspect?',              bn: 'সন্দেহভাজন?' },

      // --- Result stamps ---
      stampCaught:        { en: '🚨 CAUGHT! 🚨',          bn: '🚨 ধরা পড়েছে! 🚨' },
      stampInnocent:      { en: '❌ INNOCENT! ❌',         bn: '❌ নির্দোষ! ❌' },
      stampEscaped:       { en: '🏃 ESCAPED! 🏃',          bn: '🏃 বেঁচে গেল! 🏃' },
      wrongPick:          { en: 'Wrong Pick',              bn: 'ভুল পছন্দ' },
      bonusLabel:         { en: '+800 Bonus',              bn: '+৮০০ বোনাস' },

      // --- Result announcements ---
      correctGuess:       { en: 'Correct Guess!',          bn: 'সঠিক অনুমান!' },
      caughtThe:          { en: 'caught',                  bn: 'ধরে ফেলেছে' },
      policeSecured:      { en: 'Police secured their 800 points! All players retain their chits\' points.', bn: 'পুলিশ ৮০০ পয়েন্ট পেয়েছে! সবাই তাদের চিরকুটের পয়েন্ট পাবে।' },
      wrongGuess:         { en: 'Wrong Guess!',            bn: 'ভুল অনুমান!' },
      wasNotThe:          { en: 'was NOT the',             bn: 'সেই' },
      wasNotThe2:         { en: '',                        bn: 'ছিল না!' },
      escaped:            { en: 'escaped! Police gets',    bn: 'বেঁচে গেল! পুলিশ পাচ্ছে' },
      zeropts:            { en: '0 pts',                   bn: '০ পয়েন্ট' },
      steals:             { en: 'steals the',              bn: 'নিয়ে নিল' },
      pts800:             { en: '800 pts!',                bn: '৮০০ পয়েন্ট!' },

      // --- Scoreboard ---
      scoreSheet:         { en: '📊 Khata Score Sheet (হিসাব খাতা)', bn: '📊 হিসাব খাতা (Score Sheet)' },
      targetLabel:        { en: 'Target:',                bn: 'লক্ষ্য:' },
      rounds:             { en: 'Rounds',                 bn: 'রাউন্ড' },
      total:              { en: 'Total',                  bn: 'মোট' },
      roundCol:           { en: 'Round',                  bn: 'রাউন্ড' },

      // --- Player names ---
      youPlayer1:         { en: 'You (Player 1)',         bn: 'আপনি (খেলোয়াড় ১)' },
      player1:            { en: 'Player 1',               bn: 'খেলোয়াড় ১' },
      player2:            { en: 'Player 2',               bn: 'খেলোয়াড় ২' },
      player3:            { en: 'Player 3',               bn: 'খেলোয়াড় ৩' },
      player4:            { en: 'Player 4',               bn: 'খেলোয়াড় ৪' },
      bot1:               { en: 'Bot 1',                  bn: 'বট ১' },
      bot2:               { en: 'Bot 2',                  bn: 'বট ২' },
      bot3:               { en: 'Bot 3',                  bn: 'বট ৩' },

      // --- pts suffix ---
      pts:                { en: 'pts',                    bn: 'পয়েন্ট' },
      totalLabel:         { en: 'Total:',                 bn: 'মোট:' },

      // --- Settings modal ---
      settingsTitle:      { en: '⚙️ Game Settings',      bn: '⚙️ খেলার সেটিংস' },
      gameModeLabel:      { en: 'Game Mode:',             bn: 'খেলার ধরন:' },
      playerNamesHeading: { en: '👥 Player Names:',       bn: '👥 খেলোয়াড়দের নাম:' },
      labelPlayerYou:     { en: 'Player 1 (You):',        bn: 'খেলোয়াড় ১ (আপনি):' },
      labelPlayer2:       { en: 'Player 2:',              bn: 'খেলোয়াড় ২:' },
      labelPlayer3:       { en: 'Player 3:',              bn: 'খেলোয়াড় ৩:' },
      labelPlayer4:       { en: 'Player 4:',              bn: 'খেলোয়াড় ৪:' },
      labelBot1:          { en: 'Bot 1:',                 bn: 'বট ১:' },
      labelBot2:          { en: 'Bot 2:',                 bn: 'বট ২:' },
      labelBot3:          { en: 'Bot 3:',                 bn: 'বট ৩:' },
      modeOptionSingle:   { en: 'Single-Player (vs 3 Bots)', bn: 'একক খেলোয়াড় (৩ বটের বিরুদ্ধে)' },
      modeOptionPass:     { en: 'Pass-and-Play (4 Human Players)', bn: 'পাস-অ্যান্ড-প্লে (৪ জন মানুষ)' },
      targetRoundsLabel:  { en: 'Target Rounds:',        bn: 'মোট রাউন্ড:' },
      round5:             { en: '5 Rounds',               bn: '৫ রাউন্ড' },
      round10:            { en: '10 Rounds',              bn: '১০ রাউন্ড' },
      round15:            { en: '15 Rounds',              bn: '১৫ রাউন্ড' },
      chorPointsLabel:    { en: 'Chor Points:',           bn: 'চোরের পয়েন্ট:' },
      chorPts0:           { en: '0 Pts (Classic)',        bn: '০ পয়েন্ট (ক্লাসিক)' },
      chorPts400:         { en: '400 Pts',                bn: '৪০০ পয়েন্ট' },
      alwaysPoliceLabel:  { en: 'Player 1 Always Police:', bn: 'খেলোয়াড় ১ সবসময় পুলিশ:' },
      hideBabuLabel:      { en: 'Don\'t Reveal Saheb/Babu:', bn: 'সাহেব/বাবু গোপন রাখো:' },
      toggleOn:           { en: 'On',                    bn: 'চালু' },
      toggleOff:          { en: 'Off',                   bn: 'বন্ধ' },
      settingsNote:       { en: '* Note: Applying changes will restart the match with the new configuration.', bn: '* নোট: পরিবর্তন প্রয়োগ করলে নতুন কনফিগারেশনে ম্যাচ পুনরায় শুরু হবে।' },
      saveBtn:            { en: 'Save & Start Match',    bn: 'সংরক্ষণ করুন ও ম্যাচ শুরু করুন' },
      cancelBtn:          { en: 'Cancel',                bn: 'বাতিল' },

      // --- Rules modal ---
      rulesTitle:         { en: '📖 Traditional Rules & Points', bn: '📖 ঐতিহ্যবাহী নিয়ম ও পয়েন্ট' },
      rulesRolesHeader:   { en: 'Roles & Traditional Values:', bn: 'ভূমিকা ও পয়েন্ট:' },
      rulesBabu:          { en: '👑 Babu (Saheb) - 1000 Pts: Master role. Always safe, commands Police.', bn: '👑 বাবু (সাহেব) - ১০০০ পয়েন্ট: কর্তা ভূমিকা। সবসময় নিরাপদ, পুলিশকে নির্দেশ দেন।' },
      rulesPolice:        { en: '👮 Police - 800 Pts: Must identify who is the chosen suspect.', bn: '👮 পুলিশ - ৮০০ পয়েন্ট: সন্দেহভাজনকে চিহ্নিত করতে হবে।' },
      rulesDakat:         { en: '🦹 Dakat - 600 Pts: Dangerous robber hiding in disguise.', bn: '🦹 ডাকাত - ৬০০ পয়েন্ট: ছদ্মবেশে লুকিয়ে থাকা বিপজ্জনক ডাকাত।' },
      rulesChor:          { en: '🦹 Chor - 0 Pts (or 400 Pts): Sneaky thief hiding in disguise.', bn: '🥷 চোর - ০ পয়েন্ট (অথবা ৪০০): ছদ্মবেশে লুকিয়ে থাকা চতুর চোর।' },
      rulesFlowHeader:    { en: 'Gameplay Flow:', bn: 'খেলার প্রবাহ:' },
      rulesStep1:         { en: '4 folded chits are dealt to the 4 players.', bn: '৪টি ভাঁজ করা চিরকুট ৪ জন খেলোয়াড়কে দেওয়া হয়।' },
      rulesStep2:         { en: 'Babu and Police announce themselves automatically.', bn: 'বাবু ও পুলিশ স্বয়ংক্রিয়ভাবে নিজেদের পরিচয় দেয়।' },
      rulesStep3:         { en: 'Babu shouts orders: "Police, catch the Chor!" or "Police, catch the Dakat!"', bn: 'বাবু আদেশ দেন: "পুলিশ, চোরকে ধরো!" বা "পুলিশ, ডাকাতকে ধরো!"' },
      rulesStep4:         { en: 'Police must pick between the 2 remaining hidden players.', bn: 'পুলিশকে বাকি ২ জন লুকানো খেলোয়াড়ের মধ্য থেকে বেছে নিতে হবে।' },
      rulesStep5:         { en: 'Scoring: If Police guesses correctly, everyone keeps their points. If Police guesses wrong, Police gets 0 pts and the target gets the 800 pts!', bn: 'পয়েন্ট: পুলিশ সঠিক অনুমান করলে সবাই তাদের পয়েন্ট পায়। ভুল হলে পুলিশ ০ পয়েন্ট পায় এবং লক্ষ্য ব্যক্তি ৮০০ পয়েন্ট পায়!' },
      gotIt:              { en: 'Got it!',               bn: 'বুঝেছি!' },

      // --- Confirm Reset modal ---
      confirmResetTitle:  { en: '↺ Start New Game?',     bn: '↺ নতুন খেলা শুরু করবেন?' },
      confirmResetMsg:    { en: 'Are you sure you want to reset all scores and restart from Round 1?', bn: 'আপনি কি নিশ্চিত? সব পয়েন্ট মুছে রাউন্ড ১ থেকে শুরু হবে।' },
      yesRestart:         { en: 'Yes, Restart Match',    bn: 'হ্যাঁ, পুনরায় শুরু করুন' },

      // --- Pass & Play modal ---
      passTitle:          { en: '\'s Chit',               bn: '-এর চিরকুট' },
      passInstructions:   { en: 'Please pass the screen to', bn: 'অনুগ্রহ করে স্ক্রিনটি দিন' },
      passHideNote:       { en: 'Ensure nobody else looks!', bn: 'অন্য কেউ যেন না দেখে!' },
      passHiddenText:     { en: 'Tap below to privately peek at your chit.', bn: 'নিচে ট্যাপ করুন গোপনে আপনার চিরকুট দেখতে।' },
      passRevealBtn:      { en: '👀 Reveal My Chit',      bn: '👀 আমার চিরকুট দেখি' },
      passYouDrew:        { en: 'You have drawn:',        bn: 'আপনি পেয়েছেন:' },
      passHideBtn:        { en: '🔒 Hide Chit & Continue', bn: '🔒 চিরকুট লুকাও ও চালিয়ে যাও' },

      // Pass role advice
      passBabuAdvice:     { en: 'You are the Master (Saheb)! You will command the Police.', bn: 'আপনি কর্তা (সাহেব)! আপনি পুলিশকে নির্দেশ দেবেন।' },
      passPoliceAdvice:   { en: 'You are the Police! You will have to guess the suspect.', bn: 'আপনি পুলিশ! আপনাকে সন্দেহভাজনকে চিনতে হবে।' },
      passDakatAdvice:    { en: 'You are the Dakat! Keep a straight poker face.', bn: 'আপনি ডাকাত! চেহারায় ভাব দেখাবেন না।' },
      passChorAdvice:     { en: 'You are the Chor! Stay quiet and innocent.', bn: 'আপনি চোর! চুপচাপ নির্দোষের ভান করুন।' },

      // --- Winner modal ---
      gameOver:           { en: '🏆 Game Over!',          bn: '🏆 খেলা শেষ!' },
      champion:           { en: '🎉 Champion:',            bn: '🎉 চ্যাম্পিয়ন:' },
      points:             { en: 'Points',                 bn: 'পয়েন্ট' },
      firstPlace:         { en: '🥇 1st Place',           bn: '🥇 ১ম স্থান' },
      secondPlace:        { en: '🥈 2nd Place',           bn: '🥈 ২য় স্থান' },
      thirdPlace:         { en: '🥉 3rd Place',           bn: '🥉 ৩য় স্থান' },
      fourthPlace:        { en: '4th Place',              bn: '৪র্থ স্থান' },
      playAnother:        { en: '🎮 Play Another Game',   bn: '🎮 আবার খেলুন' },

      // --- Roles in scoreboard ---
      roleBabu:           { en: 'Babu',                   bn: 'বাবু' },
      rolePolice:         { en: 'Police',                 bn: 'পুলিশ' },
      roleDakat:          { en: 'Dakat',                  bn: 'ডাকাত' },
      roleChor:           { en: 'Chor',                   bn: 'চোর' },

      // --- Role name in target ---
      chorTarget:         { en: 'Chor (চোর)',              bn: 'চোর' },
      dakatTarget:        { en: 'Dakat (ডাকাত)',           bn: 'ডাকাত' },

      // --- Multiplayer & Online Mode ---
      onlineMode:         { en: '🌐 Online Room',         bn: '🌐 অনলাইন রুম' },
      modeOptionOnline:   { en: 'Online Multiplayer (Room Code)', bn: 'অনলাইন মাল্টিপ্লেয়ার (রুম কোড)' },
      btnOnlineLobby:     { en: '🌐 Online Room',         bn: '🌐 অনলাইন রুম' },
      onlineModalTitle:   { en: '🌐 Online Multiplayer Room', bn: '🌐 অনলাইন খেলার রুম' },
      createRoomTab:      { en: 'Create Room',            bn: 'নতুন রুম খুলুন' },
      joinRoomTab:        { en: 'Join Room',              bn: 'রুমে প্রবেশ করুন' },
      yourNameLabel:      { en: 'Your Name:',             bn: 'আপনার নাম:' },
      roomCodeLabel:      { en: 'Room Code:',             bn: 'রুম কোড:' },
      btnCreateRoomAction:{ en: '✨ Create Room',          bn: '✨ রুম তৈরি করুন' },
      btnJoinRoomAction:  { en: '🚀 Join Room',            bn: '🚀 প্রবেশ করুন' },
      roomCreatedMsg:     { en: 'Share this Room Code with 3 friends:', bn: 'এই রুম কোডটি ৩ জন বন্ধুর সাথে শেয়ার করুন:' },
      waitingForPlayers:  { en: 'Waiting for players to join...', bn: 'অন্যান্য খেলোয়াড়ের জন্য অপেক্ষা করছি...' },
      btnStartOnlineGame: { en: '🎮 Start Game (4/4 Ready)', bn: '🎮 খেলা শুরু করুন (৪/৪ প্রস্তুত)' },
      btnLeaveRoom:       { en: 'Leave Room',             bn: 'রুম ত্যাগ করুন' },
      chatTitle:          { en: '💬 Team Chat',           bn: '💬 টিম চ্যাট' },
      chatPlaceholder:    { en: 'Type a message...',       bn: 'বার্তা লিখুন...' },
      chatSend:           { en: 'Send',                   bn: 'পাঠান' },
      waitingHostStart:   { en: 'Waiting for Host to start the game...', bn: 'হোস্ট খেলা শুরু করার অপেক্ষায়...' },
      yourPrivateRole:    { en: 'Your Secret Chit:',      bn: 'আপনার গোপন চিরকুট:' },
      shareInviteLink:    { en: '🔗 Share Invite Link',   bn: '🔗 লিংক শেয়ার করুন' },
      copyRoomCode:       { en: '📋 Copy Code',           bn: '📋 কোড কপি' },
      linkCopied:         { en: 'Invite link copied to clipboard!', bn: 'আমন্ত্রণ লিংক কপি করা হয়েছে!' },
      codeCopied:         { en: 'Room code copied to clipboard!', bn: 'রুম কোড কপি করা হয়েছে!' },
      timerLabel:         { en: '⏱️ Time to Guess:',      bn: '⏱️ অনুমান করার সময়:' },
      timeUpWrong:        { en: 'Time is up! Police took too long to choose.', bn: 'সময় শেষ! পুলিশ নির্দিষ্ট সময়ে চোর ধরতে ব্যর্থ হলো।' },
    };

export function t(key, lang = 'en') {
  const entry = TRANSLATIONS[key];
  if (!entry) return key;
  return entry[lang] || entry['en'] || key;
}
