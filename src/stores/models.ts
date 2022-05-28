export interface FootballPlayersStore {
  footballPlayers: FootballPlayer[];
  selectedFootballPositions: string[];
  selectedFootballPlayersNames: string[];
  pickedFootballPlayerName: string;
  currentStep: number;
}

export interface FootballPlayer {
  name: string;
  age: number;
  position: string;
  nationality: string;
}
