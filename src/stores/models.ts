export interface FootballPlayersStore {
  footballPlayers: FootballPlayer[],
}

export interface FootballPlayer {
  name: string;
  age: number;
  position: string;
  nationality: string;
}
