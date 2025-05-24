type anyMessage = Record<string, unknown>;

// NEW PLAYER JOINED

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

// INFORM PLAYER ID

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

// EXISTING PLAYER JOINED

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

export type MessagesFrontSendsToBack =
  | MessageNewPlayerJoined
  | MessageExistingPlayerJoined;

export type MessagesBackSendsToFront = MessageInformPlayerId;
