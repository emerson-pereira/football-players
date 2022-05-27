import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export interface FootballPlayer {
  name: string;
  age: number;
  position: string;
  nationality: string;
}

interface FootballPlayersStore {
  footballPlayers: FootballPlayer[],
}

export const useFootballPlayersStore = defineStore('football-players', {
  state: (): FootballPlayersStore => ({
    footballPlayers: [],
  }),
  getters: {
    footballPositions: (state): string[] => {
      const positions = state.footballPlayers.map(
        ({ position }) => position
      );
      return Array.from(new Set(positions));
    }
  },
  actions: {
    async getFootballPlayers(): Promise<void> {
      const response = await api.get<FootballPlayer[]>('/football-players/master/players.json');
      this.footballPlayers = response.data;
    }
  },
});
