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

export type MessagesFrontSendsToBack = MessageNewPlayerJoined;
export type MessagesBackSendsToFront = MessageInformPlayerId;