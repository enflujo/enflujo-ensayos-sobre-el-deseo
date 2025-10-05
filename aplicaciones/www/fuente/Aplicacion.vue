<script setup lang="ts">
import Encabezado from '@/componentes/Encabezado.vue';
import Fondo from '@/componentes/Fondo.vue';
const base = import.meta.env.BASE_URL;
</script>

<template>
  <Fondo />
  <Encabezado />

  <main>
    <div class="col1">
      <img id="estampilla" :src="`${base}imgs/estampilla.webp`" alt="Estampilla" />
      <img id="selloRojo" :src="`${base}imgs/sello-rojo.webp`" alt="Sello Rojo" />
    </div>

    <span class="divisionVertical"></span>

    <section class="col2">
      <router-view />
    </section>
  </main>
</template>

<style lang="scss">
@use '@/scss/estilos.scss';

main {
  display: flex;
  width: 90vw;
  margin: 0 auto;
  padding-bottom: 4em;
}

#estampilla {
  height: 40vh;
  width: auto;
  margin: 0 auto;
  display: block;
}

.divisionVertical {
  border-left: 3px solid var(--colorFuente);
  margin: 0 2em;
  border-radius: 10px;
}

.col1 {
  width: 30%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
}

.col2 {
  width: 60%;
  min-width: 320px;
}

#selloRojo {
  position: absolute;
  top: 30%;
  right: 20%;
  width: 150px;
  transform: rotate(60deg);
  mix-blend-mode: multiply;
  opacity: 0.86;
  pointer-events: none;
}

@media (max-width: 768px) {
  main {
    flex-direction: column;
    gap: 1.2rem;
    width: 95vw;
  }

  .divisionVertical {
    display: none;
  }

  .col1 {
    width: 50%;
    order: 0;
    margin-bottom: 2em;
  }

  .col2 {
    width: 100%;
  }

  #estampilla {
    height: 15vh;
  }

  #selloRojo {
    top: 40%;
    right: 25%;
    width: 70px;
    transform: rotate(45deg);
  }
}
</style>
