import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { FootballPlayer, FootballPlayersStore } from './models';

export const useFootballPlayersStore = defineStore('football-players', {
  state: (): FootballPlayersStore => ({
    footballPlayers: [],
    selectedFootballPositions: [],
    selectedFootballPlayersNames: [],
    pickedFootballPlayerName: '',
    currentStep: 1,
  }),
  getters: {
    footballPositions: (state): string[] => {
      const positions = state.footballPlayers.map(
        ({ position }) => position
      );
      return Array.from(new Set(positions));
    },
    footballPlayersNamesBySelectedPositions: (state): string[] => {
      return state.footballPlayers
        .filter((player: FootballPlayer) =>
          state.selectedFootballPositions.includes(player.position)
        )
        .map((player: FootballPlayer) => player.name);
    },
    footballPlayersBySelectNames: (state): FootballPlayer[] => {
      return state.footballPlayers.filter(
        (player: FootballPlayer) =>
          state.selectedFootballPlayersNames.includes(player.name)
      );
    },
    pickedFootballPlayer: (state): FootballPlayer | undefined => {
      return state.footballPlayers.find(
        (player: FootballPlayer) =>
          player.name === state.pickedFootballPlayerName
      );
    }
  },
  actions: {
    async getFootballPlayers(): Promise<void> {
      const response = await api.get<FootballPlayer[]>('/football-players/master/players.json');
      this.footballPlayers = response.data;
    },
    updateFootballPositionsSelection(positions: string[]): void {
      this.selectedFootballPositions = positions;
    },
    updateFootballPlayersSelection(playersNames: string[]): void {
      this.selectedFootballPlayersNames = playersNames;
    },
    updatePickedFootballPlayerName(name: string): void {
      this.pickedFootballPlayerName = name;
    },
    resetSelectedFootballPositions(): void {
      this.selectedFootballPositions = [];
    },
    resetSelectedFootballPlayersNames(): void {
      this.selectedFootballPlayersNames = [];
    },
    resetStep(): void {
      this.currentStep = 1;
    },
  },
  persist: true
});
