<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNoteStore } from "../stores/noteStore";

const noteStore = useNoteStore();

const { notes } = storeToRefs(noteStore);
</script>

<template>
  <div>
    <div v-if="notes.length == 0">
      <h1 class="header text-red-600 py-12">! No notes added yet</h1>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8"
      v-else
    >
      <div
        class="card flex flex-col"
        v-for="note in notes"
        :key="String(note.id)"
      >
        <div class="flex justify-between">
          <h1 class="font-bold text-2xl break-words">{{ note.title }}</h1>
          <div>
            <span
              class="material-symbols-outlined text-green-500 mr-1"
              @click="noteStore.openModal(note)"
            >
              edit
            </span>
            <span
              class="material-symbols-outlined text-red-500"
              @click="noteStore.deleteNote(note)"
            >
              delete
            </span>
          </div>
        </div>
        <div class="py-3">
          <p class="break-words">{{ note.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
