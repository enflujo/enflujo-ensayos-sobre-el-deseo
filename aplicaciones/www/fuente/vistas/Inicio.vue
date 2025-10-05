<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CampoTexto from '@/componentes/CampoTexto.vue';

const texto = ref('');
const enviando = ref(false);
const router = useRouter();

async function enviarTexto() {
  if (enviando.value) return;
  enviando.value = true;
  try {
    const res = await fetch('https://deseos-tally.enflujo.com/postal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: texto.value }),
    });
    if (!res.ok) throw new Error(String(res.status));
    texto.value = '';
    // navegar a pantalla de éxito
    router.push({ name: 'enviado' });
  } catch (e) {
    console.error('error al enviar postal', e);
  } finally {
    enviando.value = false;
  }
}
</script>

<template>
  <div class="col2">
    <CampoTexto v-model="texto" />
    <span class="nota">Su mensaje es anónimo.</span>
    <button class="botonEnviar" :disabled="enviando || texto.length < 3" @click="enviarTexto">
      {{ enviando ? 'Enviando...' : 'Enviar' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/scss/estilos.scss';

.home {
  display: flex;
  width: 100%;
}

.col2 {
  width: 60%;
}

#estampilla {
  height: 30vh;
}

.divisionVertical {
  border-left: 3px solid var(--colorFuente);
  margin: 0 2em;
}

.botonEnviar {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1.5px dotted var(--colorRojo);
  background: none;
  color: var(--colorAzul);
  cursor: pointer;
  position: relative;
  width: 100%;

  &::before {
    content: '';
    border: 1.5px dotted var(--colorRojo);
    padding: 1px;
    width: 99.5%;
    display: block;
    height: 80%;
    position: absolute;
    border-radius: 6px;
    top: 10%;
    left: 0.25%;
  }

  &:hover {
    background: var(--colorRojo);
    color: white;

    &::before {
      border-color: white;
    }
  }
}

.botonEnviar[disabled] {
  opacity: 0.25;
  cursor: not-allowed;
  filter: grayscale(30%) brightness(0.96);
}

@media (max-width: 768px) {
  .home {
    flex-direction: column;
    gap: 1rem;
  }

  .col1 {
    display: none;
  }

  .col2 {
    width: 100%;
  }
  .botonEnviar {
    width: 100%;
    box-sizing: border-box;
  }
}

.nota {
  display: block;
  font-size: 0.9rem;
  color: var(--colorFuente);
  margin-top: 0.4rem;
}
</style>
