class Player {
  getId() {
    return localStorage.getItem("playerId") ?? null;
  }

  setId(playerId: string) {
    localStorage.setItem("playerId", playerId);
  }
}

export const player = new Player();
