<script setup lang="ts">
const base = import.meta.env.BASE_URL;
</script>

<template>
  <header>
    <h1>ENSAYOS SOBRE EL DESEO (I)</h1>
    <img id="sello-titulo" :src="`${base}imgs/sello-azul.webp`" alt="Sello semillero" />
  </header>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 2em;
  color: var(--colorFuente);
  text-align: center;
  margin-bottom: 1em;
}

#sello-titulo {
  display: block;
  margin: -2em auto 0 auto;
  width: 100px;
  height: auto;
  transform: translateX(100%) rotate(65deg);
  position: absolute;
  top: 2rem;
  right: 32%;
  transition:
    transform 280ms ease,
    top 280ms ease,
    right 280ms ease,
    width 280ms ease;
}

/* anchor the absolute seal to the header element */
header {
  position: relative;
}

/* On larger screens bring the seal closer to the title */
@media (min-width: 1200px) {
  h1 {
    margin-bottom: 3em;
  }

  #sello-titulo {
    transform: translateX(45%) rotate(55deg);
    top: 60px;
    right: 35%;
    width: 150px;
  }
}

@media (min-width: 1600px) {
  #sello-titulo {
    transform: translateX(30%) rotate(50deg);
    top: 38px;
    right: 40%;
  }
}
</style>
