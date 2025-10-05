<template>
  <section class="postales-view">
    <header>
      <h2>Postales</h2>
      <button :disabled="loading" @click="cargarPostales">Cargar postales</button>
    </header>

    <div v-if="loading">Cargando…</div>

    <ol v-else class="lista-postales">
      <li v-for="p in postales" :key="p.id">
        <time :datetime="p.creado">{{ formatoFecha(p.creado) }}</time>
        <p class="texto">{{ p.texto }}</p>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Postal {
  id: number;
  texto: string;
  creado: string;
}

const postales = ref<Postal[]>([]);
const loading = ref(false);

function formatoFecha(iso: string) {
  try {
    const d = new Date(iso || '');
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

async function cargarPostales() {
  loading.value = true;
  try {
    const res = await fetch('https://deseos-tally.enflujo.com/postales');
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    // server returns { items, count } — accept either that shape or a raw array
    const items = Array.isArray(data) ? data : data.items || [];
    // normalize fields: server uses `text` while UI expects `texto`
    postales.value = items.map((it: any) => ({
      id: it.id,
      texto: it.text ?? it.texto ?? '',
      creado: it.creado ?? it.created ?? '',
    }));
  } catch (e) {
    console.error('Error cargando postales', e);
    postales.value = [];
  } finally {
    loading.value = false;
  }
}

// Optionally load on mount
// cargarPostales()
</script>

<style scoped>
.postales-view {
  padding: 1rem;
}
.lista-postales {
  list-style: none;
  padding: 0;
}
.lista-postales li {
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding-bottom: 0.5rem;
}
.texto {
  white-space: pre-wrap;
}
button[disabled] {
  opacity: 0.6;
}
</style>
