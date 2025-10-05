<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps<{ modelValue?: string; autoFocus?: boolean }>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);

function onInput(e: Event) {
  const v = (e.target as HTMLTextAreaElement).value;
  emit('update:modelValue', v);
}

onMounted(() => {
  // por defecto enfocamos el campo al montar, a menos que autoFocus sea false
  if (props.autoFocus === false) return;

  // asegurar que el DOM esté listo: intentar focus en nextTick, requestAnimationFrame,
  // y usar un timeout de respaldo en casos donde algo más retrasa el render.
  nextTick(() => {
    const tryFocus = () => {
      if (!textareaRef.value) return false;
      try {
        textareaRef.value.focus();
        // mover cursor al final
        const len = textareaRef.value.value.length;
        textareaRef.value.setSelectionRange(len, len);
        return true;
      } catch {
        return false;
      }
    };

    // first attempt in next RAF
    requestAnimationFrame(() => {
      if (tryFocus()) return;
      // fallback: try again after a short timeout
      setTimeout(() => {
        tryFocus();
      }, 80);
    });
  });
});
</script>

<template>
  <div id="postal">
    <h2>¿Qué desea <span class="nuevaLinea">desear?</span></h2>
    <textarea
      ref="textareaRef"
      autofocus
      tabindex="0"
      placeholder=""
      :value="props.modelValue"
      @input="onInput"
    ></textarea>
  </div>
</template>

<style lang="scss">
h2 {
  font-family: var(--fuente2, 'Courier New'), Courier, monospace;
  color: var(--colorFuente, #111);
  margin: -2em 0 0.4em 0;
  display: block;
}

.nuevaLinea {
  display: block;
  margin-top: 0.2em;
}

#postal {
  width: 100%;
  height: 60vh;

  --postal-lh: 1.6rem;
  font-size: 1rem;
  line-height: var(--postal-lh);
  --postal-pad-top: 0.8rem;
  padding: var(--postal-pad-top) 0.6rem 0.6rem;
  --postal-line-offset: 0rem;

  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent calc(var(--postal-lh) - 1px),
    rgba(0, 0, 0, 0.06) calc(var(--postal-lh) - 1px),
    rgba(0, 0, 0, 0.06) var(--postal-lh)
  );
  background-size: 100% var(--postal-lh);
  background-repeat: repeat-y;
  background-position: 0 calc(var(--postal-pad-top) + var(--postal-line-offset));
  caret-color: var(--colorFuente, #111);
  resize: vertical;

  textarea {
    width: 100%;
    height: 100%;
    line-height: 1.9;
    font-family: var(--fuente2, 'Courier New'), Courier, monospace;
    border: none;
    border-radius: 4px;
    background: none;
    color: var(--colorAzul);
    margin-top: 0.9em;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
