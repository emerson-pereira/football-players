<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="footballPlayersStore.currentStep"
      ref="stepper"
      animated
      active-color="blue"
      @before-transition="beforeTransition"
    >
      <q-step
        v-for="step in steps"
        :key="step.step"
        :name="step.step"
        :prefix="step.step"
        :title="step.title"
      >
        <component :is="step.component"></component>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="footballPlayersStore.currentStep < steps.length"
            @click="$refs.stepper.next()"
            color="blue"
            label="Continue"
          />

          <q-btn
            v-if="footballPlayersStore.currentStep > 1"
            flat
            color="blue"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script lang="ts">
import { useFootballPlayersStore } from 'src/stores/football-players-store';
import { defineComponent, PropType } from 'vue';
import { Step } from './models';

export default defineComponent({
  name: 'StepperComponent',
  props: {
    steps: {
      type: Array as PropType<Step[]>,
      default: () => [],
    },
  },
  setup() {
    const footballPlayersStore = useFootballPlayersStore();

    return {
      footballPlayersStore,
    };
  },
  methods: {
    beforeTransition(newVal: number, oldVal: number): void {
      const isBackToStep1 = newVal === 1 && oldVal === 2;
      if (isBackToStep1) {
        this.footballPlayersStore.resetSelectedFootballPlayersNames();
      }
    },
  },
});
</script>
