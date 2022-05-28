<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-checkbox
        v-model="footballPlayersStore.selectedFootballPositions"
        v-for="position in footballPlayersStore.footballPositions"
        :key="position"
        :val="position"
        :label="position"
        @update:model-value="onPositionsSelectionUpdate"
        color="teal"
      />
    </div>
  </div>
</template>

<script>
import { useFootballPlayersStore } from 'src/stores/football-players-store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PositionsSelectionComponent',
  setup() {
    const footballPlayersStore = useFootballPlayersStore();

    return {
      footballPlayersStore,
    };
  },
  methods: {
    onPositionsSelectionUpdate(positions) {
      this.footballPlayersStore.updateFootballPositionsSelection(positions);
    },
  },
});
</script>
