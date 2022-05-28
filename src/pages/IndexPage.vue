<template>
  <q-page class="items-center justify-evenly">
    <stepper-component :steps="steps" />
  </q-page>
</template>

<script lang="ts">
import { Step } from 'components/models';
import PositionsSelectionComponent from 'src/components/PositionsSelectionComponent.vue';
import PlayerSelectionComponent from 'src/components/PlayersSelectionComponent.vue';
import PlayerPickComponent from 'src/components/PlayerPickComponent.vue';
import { defineComponent, ref, shallowRef } from 'vue';
import StepperComponent from '../components/StepperComponent.vue';
import { useFootballPlayersStore } from 'src/stores/football-players-store';

const positionsSelectionComponent = shallowRef(PositionsSelectionComponent);
const playersSelectionComponent = shallowRef(PlayerSelectionComponent);
const playerPickComponent = shallowRef(PlayerPickComponent);

export default defineComponent({
  name: 'IndexPage',
  components: { StepperComponent },
  setup () {
    const steps = ref<Step[]>([
      {
        step: 1,
        title: 'Select Positions',
        component: positionsSelectionComponent,
      },
      {
        step: 2,
        title: 'Select Players',
        component: playersSelectionComponent,
      },
      {
        step: 3,
        title: 'Pick Player',
        component: playerPickComponent,
      },
    ]);

    return { steps };
  },
  mounted() {
    const footballPlayersStore = useFootballPlayersStore();
    footballPlayersStore.getFootballPlayers();
  }
});
</script>
