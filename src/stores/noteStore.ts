import { reactive, ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";

interface Note {
  id: number | null;
  title: string;
  description: string;
  updatedAt?: number;
}

export const useNoteStore = defineStore("note", () => {
  const showModal = ref(false);
  const notes = ref<Note[]>([]);
  const noteForm = reactive<Note>({
    id: null,
    title: "",
    description: "",
  });

  function saveNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes.value));
  }

  const wordCount = computed(() => {
    return noteForm.description.split(/\s+/).filter((word) => word !== "")
      .length;
  });

  const modalTitle = computed(() => {
    return noteForm.id ? "Edit Note" : "Add New Note";
  });

  const openModal = (note?: Note | null) => {
    showModal.value = true;
    if (note) {
      noteForm.id = note.id;
      noteForm.title = note.title;
      noteForm.description = note.description;
    } else {
      noteForm.id = null;
      noteForm.title = "";
      noteForm.description = "";
    }
  };

  const closeModal = () => {
    showModal.value = false;
  };

  const saveNote = () => {
    if (noteForm.title.trim() !== "") {
      if (noteForm.id) {
        const noteIndex = notes.value.findIndex(
          (note) => note.id === noteForm.id
        );
        if (noteIndex !== -1) {
          notes.value[noteIndex].title = noteForm.title;
          notes.value[noteIndex].description = noteForm.description;
          notes.value[noteIndex].updatedAt = Date.now();
          saveNotesToLocalStorage();
          alert("Note updated successfully");
        }
      } else {
        const newNote: Note = {
          id: Date.now(),
          title: noteForm.title,
          description: noteForm.description,
          updatedAt: Date.now(),
        };
        notes.value.push(newNote);
        saveNotesToLocalStorage();
        alert("New note added successfully");
      }
      closeModal();
    } else {
      alert("please add a note");
    }
    sortNotesByUpdatedAt();
  };

  const deleteNote = (note: Note) => {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      const noteIndex = notes.value.findIndex((n) => n.id === note.id);
      if (noteIndex !== -1) {
        notes.value.splice(noteIndex, 1);
        saveNotesToLocalStorage();
        sortNotesByUpdatedAt();
        alert("Note deleted successfully");
      }
    }
  };

  const sortNotesByUpdatedAt = () => {
    notes.value.sort((a, b) => b.updatedAt! - a.updatedAt!);
  };

  onMounted(() => {
    notes.value = JSON.parse(localStorage.getItem("notes") || "[]");
    sortNotesByUpdatedAt();
  });

  return {
    showModal,
    noteForm,
    notes,
    modalTitle,
    wordCount,
    openModal,
    deleteNote,
    closeModal,
    saveNote,
  };
});
