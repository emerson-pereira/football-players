export interface FootballPlayersStore {
  footballPlayers: FootballPlayer[],
  selectedFootballPositions: string[],
}

export interface FootballPlayer {
  name: string;
  age: number;
  position: string;
  nationality: string;
}
