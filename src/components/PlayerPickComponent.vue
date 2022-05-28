<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      v-for="player in footballPlayersStore.footballPlayersBySelectNames"
      :key="player.name"
      class="my-card q-pb-md"
      style="width: calc(100px + 10vw);"
    >
      <img :src="IMAGE_URL">

      <q-card-section class="q-pt-md">
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ player.name }}
          </div>
        </div>
      </q-card-section>

      <q-list>
        <q-item
          v-for="detail in getPlayerDetails(player)"
          :key="detail.label"
        >
          <q-item-section avatar>
            <q-icon color="gray" :name="detail.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ detail.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator class="q-mt-md" />

      <q-card-actions class="q-pb-none q-pt-md">
        <q-btn flat round icon="done" />
        <q-btn
          flat
          color="secondary"
          @click="onPlayerSelection(player)"
        >
          Pick Player
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { useFootballPlayersStore } from 'src/stores/football-players-store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlayerPickComponent',
  setup () {
    const footballPlayersStore = useFootballPlayersStore();

    const IMAGE_URL = 'https://images.unsplash.com/photo-1511886929837-354d827aae26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80&h=200';

    return {
      footballPlayersStore,
      IMAGE_URL
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
      console.log(player.name);
      this.footballPlayersStore.updateFootballPlayersSelection(
        players
      );
    }
  }
});
</script>
