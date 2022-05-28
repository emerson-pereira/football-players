<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      v-for="player in footballPlayersStore.footballPlayersBySelectNames"
      :key="player.name"
      class="my-card q-pb-md"
      style="width: calc(100px + 10vw)"
    >
      <img :src="IMAGE_URL" />

      <q-card-section class="q-pt-md">
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ player.name }}
          </div>
        </div>
      </q-card-section>

      <q-list>
        <q-item v-for="detail in getPlayerDetails(player)" :key="detail.label">
          <q-item-section avatar>
            <q-icon color="gray" :name="detail.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ detail.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator class="q-mt-md" />

      <q-card-actions class="q-pb-none q-pt-md items-center justify-evenly">
        <q-btn
          color="secondary"
          icon-right="done"
          @click="onPlayerSelection(player)"
        >
          <span class="q-mx-md q-px-xs">Pick Player</span>
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="done" color="secondary" text-color="white" />
          <span class="q-ml-sm"> Choose {{ player.name }}? </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />

          <q-btn
            flat
            label="Confirm"
            color="primary"
            v-close-popup
            @click="onConfirmation"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useFootballPlayersStore } from 'src/stores/football-players-store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PlayerPickComponent',
  setup() {
    const footballPlayersStore = useFootballPlayersStore();

    const IMAGE_URL =
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80&h=200';

    return {
      footballPlayersStore,
      IMAGE_URL,
      confirm: ref(false),
      player: ref(),
    };
  },
  methods: {
    getPlayerDetails({ age, position, nationality }) {
      return [
        { label: `${age} Years Old`, icon: 'person' },
        { label: `Plays ${position}`, icon: 'sports_soccer' },
        { label: `From ${nationality}`, icon: 'room' },
      ];
    },
    onPlayerSelection(player) {
      this.confirm = true;
      this.player = player;
    },
    onConfirmation() {
      this.footballPlayersStore.updatePickedFootballPlayerName(
        this.player.name
      );
      this.footballPlayersStore.resetSelectedFootballPositions();
      this.footballPlayersStore.resetSelectedFootballPlayersNames();
      this.footballPlayersStore.resetStep();
    },
  },
});
</script>
