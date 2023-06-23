<script setup lang="ts">
import modal from "../components/modal.vue";
import ButtonComp from "../components/ButtonComp.vue";
import NotesDetails from "../components/NotesDetails.vue";
import NoteForm from "../components/NoteForm.vue";
import { storeToRefs } from "pinia";
import { useNoteStore } from "../stores/noteStore";

const noteStore = useNoteStore();

const { modalTitle, showModal } = storeToRefs(noteStore);
</script>

<template>
  <div>
    <div
      class="flex flex-wrap justify-center sm:justify-between gap-6 py-8 px-4 md:p-10 nav"
    >
      <div class="flex items-center">
        <span
          ><img src="/edit_note.svg" alt="notes icon" class="w-3/4 sm:w-full"
        /></span>
        <h1 class="header">Notes App</h1>
      </div>

      <button-comp class="w-1/2 sm:w-1/4" @click="noteStore.openModal(null)"
        >Add Note</button-comp
      >
    </div>

    <h1 class="header p-2">Welcome to your Notes App</h1>

    <NotesDetails />

    <modal :isOpen="showModal" @close="noteStore.closeModal">
      <template v-slot:header>{{ modalTitle }}</template>
      <NoteForm />
      <template v-slot:button>
        <button-comp @click="noteStore.saveNote">Save</button-comp>
      </template>
    </modal>
  </div>
</template>
