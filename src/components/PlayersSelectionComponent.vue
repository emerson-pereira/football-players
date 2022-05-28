<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-checkbox
        v-model="footballPlayersStore.selectedFootballPlayersNames"
        v-for="playerName in footballPlayersStore.footballPlayersNamesBySelectedPositions"
        :key="playerName"
        :val="playerName"
        :label="playerName"
        @update:model-value="onPlayerSelectionUpdate"
        color="teal"
      />
    </div>
  </div>
</template>

<script>
import { useFootballPlayersStore } from 'src/stores/football-players-store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlayersSelectionComponent',
  setup () {
    const footballPlayersStore = useFootballPlayersStore();

    return {
      footballPlayersStore
    };
  },
  methods: {
    onPlayerSelectionUpdate(playersNames) {
      this.footballPlayersStore.updateFootballPlayersSelection(
        playersNames
      );
    }
  }
});
</script>
