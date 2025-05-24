class Player {
  getId() {
    return localStorage.getItem("playerId") ?? null;
  }

  setId(id: string) {
    localStorage.setItem("playerId", id);
  }
}

export const player = new Player();
