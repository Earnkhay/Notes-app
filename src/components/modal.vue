<script setup lang="ts">
import ButtonComp from "./ButtonComp.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["close"]);
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex"
  >
    <div
      class="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg"
    >
      <h2 class="text-xl font-semibold mb-4">
        <slot name="header">Modal title</slot>
      </h2>
      <div class="mb-4">
        <slot>Modal body</slot>
      </div>
      <div class="flex justify-between">
        <button-comp
          class="text-black bg-transparent mr-4"
          @click="$emit('close')"
        >
          <slot name="btnName">Cancel</slot>
        </button-comp>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>
