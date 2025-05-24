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
    (message as MessageNewPlayerJoined).messageId === "newPlayerJoined"
  );
}

export type MessagesFrontSendsToBack = MessageNewPlayerJoined;
