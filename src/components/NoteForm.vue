<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNoteStore } from "../stores/noteStore";

const noteStore = useNoteStore();

const { wordCount, noteForm } = storeToRefs(noteStore);
</script>
<template>
  <form>
    <input
      type="text"
      v-model="noteForm.title"
      class="input p-2 my-4"
      placeholder="Title"
    />
    <div class="mb-3 text-end">
      <textarea
        class="input"
        name="description"
        v-model="noteForm.description"
        cols="30"
        rows="5"
        placeholder="Description"
      ></textarea>
      <small>{{ wordCount }} words</small>
    </div>
  </form>
</template>
