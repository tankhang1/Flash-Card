<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn icon="west" flat to="/" />
        <q-toolbar-title style="font-size: 20px; text-align: center"
          >Preview Card</q-toolbar-title
        >
        <div>
          <q-btn icon="delete" flat />
          <q-btn icon="edit" flat />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-card
        bordered
        style="
          width: 80%;
          min-height: 400px;
          margin-left: auto;
          margin-right: auto;
        "
      >
        <q-card-section
          horizontal
          style="display: flexbox; align-items: center"
        >
          <div
            style="color: #7286d3; margin-left: auto; margin-right: auto"
            class="text-h6"
          >
            My Cat
          </div>
          <q-btn flat round style="color: #fdda0d" icon="star" />
        </q-card-section>

        <q-separator dark inset />
        <q-card-section style="font-size: 16px" v-if="showCard">
          <q-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            width="100%"
            height="50%"
          />
          This is my cat. In my house
        </q-card-section>
        <q-card-section style="font-size: 16px" v-else>
          <!-- <q-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            width="100%"
            height="50%"
          /> -->
          This is my cat. In my house
        </q-card-section>
        <div
          style="
            position: absolute;
            bottom: 10px;
            justify-content: center;
            display: flex;
            width: 100%;
          "
        >
          <q-btn
            label="Tap to flip it!"
            color="grey-6"
            flat
            no-caps
            @click="showCard = !showCard"
          />
        </div>
      </q-card>
    </q-page-container>
  </q-layout>
</template>
<style src="@quasar/quasar-ui-qflashcard/dist/index.css"></style>
<script>
export default {
  name: "PreviewCard",
  data() {
    return {
      showCard: false,
    };
  },
};
</script>
