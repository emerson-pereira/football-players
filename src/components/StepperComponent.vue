<template>
  <div class="q-pa-md">

    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      active-color="blue"
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
            @click="$refs.stepper.next()"
            color="blue"
            :label="step === 3 ? 'Finish' : 'Continue'"
          />

          <q-btn
            v-if="step > 1"
            flat color="blue"
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
import {
  defineComponent,
  PropType,
  ref,
} from 'vue';
import { Step } from './models';

export default defineComponent({
  name: 'StepperComponent',
  props: {
    steps: {
      type: Array as PropType<Step[]>,
      default: () => []
    },
  },
  setup () {
    return {
      step: ref(1)
    }
  }

});
</script>
