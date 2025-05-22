type MessageNewPlayerJoined = {
  messageId: "newPlayerJoined";
};

export function generateMessageNewPlayerJoined(): MessageNewPlayerJoined {
  return {
    messageId: "newPlayerJoined",
  };
}

export type MessagesFrontSendsToBack = MessageNewPlayerJoined;