type MessageNewPlayerJoined = {
  messageId: "newPlayerJoined";
};

export function generateMessageNewPlayerJoined(): MessageNewPlayerJoined {
  return {
    messageId: "newPlayerJoined",
  };
}

export function isMessageNewPlayerJoined(
  message: Record<string, unknown>
): message is MessageNewPlayerJoined {
  return (
    "messageId" in message &&
    (message as MessageNewPlayerJoined).messageId === "newPlayerJoined"
  );
}

export type MessagesFrontSendsToBack = MessageNewPlayerJoined;
