type anyMessage = Record<string, unknown>;

// NEW PLAYER JOINED (Front to Back)

const newPlayerJoined = "newPlayerJoined";

type MessageNewPlayerJoined = {
  messageId: typeof newPlayerJoined;
};

export function generateMessageNewPlayerJoined(): MessageNewPlayerJoined {
  return {
    messageId: newPlayerJoined,
  };
}

export function isMessageNewPlayerJoined(
  message: anyMessage
): message is MessageNewPlayerJoined {
  return (
    "messageId" in message &&
    (message as MessageNewPlayerJoined).messageId === newPlayerJoined
  );
}

// INFORM PLAYER ID (Back to Front)

const informPlayerId = "informPlayerId";

type MessageInformPlayerId = {
  messageId: typeof informPlayerId;
  playerId: string;
};

export function generateMessageInformPlayerId(
  playerId: string
): MessageInformPlayerId {
  return {
    messageId: informPlayerId,
    playerId,
  };
}

export function isMessageInformPlayerId(
  message: anyMessage
): message is MessageInformPlayerId {
  return (
    "messageId" in message &&
    (message as MessageInformPlayerId).messageId === informPlayerId
  );
}

// EXISTING PLAYER JOINED (Front to Back)

const existingPlayerJoined = "existingPlayerJoined";

type MessageExistingPlayerJoined = {
  messageId: typeof existingPlayerJoined;
  playerId: string;
};

export function generateMessageExistingPlayerJoined(
  playerId: string
): MessageExistingPlayerJoined {
  return {
    messageId: existingPlayerJoined,
    playerId,
  };
}

export function isMessageExistingPlayerJoined(
  message: anyMessage
): message is MessageExistingPlayerJoined {
  return (
    "messageId" in message &&
    (message as MessageExistingPlayerJoined).messageId === existingPlayerJoined
  );
}

// PLAYER READY TO PLAY (Back to Front)

const playerReadyToPlay = "playerReadyToPlay";

type MessagePlayerReadyToPlay = {
  messageId: typeof playerReadyToPlay;
};

export function generateMessagePlayerReadyToPlay(): MessagePlayerReadyToPlay {
  return {
    messageId: playerReadyToPlay,
  };
}

export function isMessagePlayerReadyToPlay(
  message: anyMessage
): message is MessagePlayerReadyToPlay {
  return (
    "messageId" in message &&
    (message as MessagePlayerReadyToPlay).messageId === playerReadyToPlay
  );
}

// REQUEST PLAY (Front to Back)

const requestPlay = "requestPlay";

type MessageRequestPlay = {
  messageId: typeof requestPlay;
};

export function generateMessageRequestPlay(): MessageRequestPlay {
  return {
    messageId: requestPlay,
  };
}

export function isMessageRequestPlay(
  message: anyMessage
): message is MessageRequestPlay {
  return (
    "messageId" in message &&
    (message as MessageRequestPlay).messageId === requestPlay
  );
}

// INFORM GAME STATE (Back to Front)

export type GameState = {
  id: string;
  players: string[];
  state: "waitingForPlayers" | "playing" | "finished";
  cells: Array<{ id: string }>;
};

const informGameState = "informGameState";

type MessageInformGameState = {
  messageId: typeof informGameState;
  gameState: GameState;
};

export function generateMessageInformGameState(
  gameState: MessageInformGameState["gameState"]
): MessageInformGameState {
  return {
    messageId: informGameState,
    gameState,
  };
}

export function isMessageInformGameState(
  message: anyMessage
): message is MessageInformGameState {
  return (
    "messageId" in message &&
    (message as MessageInformGameState).messageId === informGameState
  );
}

export type MessagesFrontSendsToBack =
  | MessageNewPlayerJoined
  | MessageExistingPlayerJoined
  | MessageRequestPlay;

export type MessagesBackSendsToFront =
  | MessageInformPlayerId
  | MessagePlayerReadyToPlay
  | MessageInformGameState;
