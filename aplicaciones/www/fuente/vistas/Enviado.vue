<template>
  <div class="contenedorFuego">
    <div class="particulas">
      <div class="particula">D</div>
      <div class="particula">E</div>
      <div class="particula">S</div>
      <div class="particula">E</div>
      <div class="particula">O</div>
      <div class="particula">D</div>
      <div class="particula">E</div>
      <div class="particula">S</div>
      <div class="particula">E</div>
      <div class="particula">O</div>
    </div>

    <svg id="fuego" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="turb" x="-100%" y="-100%" width="300%" height="300%">
          <feTurbulence type="turbulence" baseFrequency="0.06" numOctaves="2.5" result="turbulence" seed="69" />
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="35" />
        </filter>
        <filter id="turb2" x="-100%" y="-100%" width="300%" height="300%">
          <feTurbulence type="turbulence" baseFrequency="0.08" numOctaves="1" result="turbulence" seed="169" />
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="35" />
        </filter>
        <radialGradient id="grad" cx="50%" cy="100%">
          <stop offset="0%" stop-color="#162b4a" />
          <stop offset="20%" stop-color="#162b4a" />
          <stop offset="60%" stop-color="#162b4a" />
          <stop offset="100%" stop-color="#ac1e0a" />
        </radialGradient>
      </defs>
      <g>
        <path d="M70 200 h60 l-30 -90z" filter="url(#turb)" fill="url(#grad)">
          <animate
            attributeName="d"
            values="M70 200 h60 l-30 -90z; M70 7200 h60 l-30 -90z"
            dur="100s"
            begin="0s"
            repeatCount="indefinite"
          />
        </path>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="0 0; 0 -7000"
          dur="100s"
          begin="0s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.contenedorFuego {
  position: relative;
  width: 60%;
  height: 100%;
}

#fuego {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
}

.particulas {
  position: absolute;
  width: 120px;
  height: 200px;
  bottom: 0;
  left: 50%;
}

.particula {
  position: absolute;
  bottom: 80px;
  color: var(--colorAzul);
  font-size: 16px;
  animation: fuego 2s linear infinite;
  opacity: 0;
}

@keyframes fuego {
  0% {
    transform: translateX(0) translateY(0) scale(1);
    opacity: 1;
    color: var(--colorRojo);
    filter: blur(0);
  }

  50% {
    transform: translateX(-10px) translateY(-80px) scale(1.2);
    color: var(--colorAzul);
    filter: blur(1px);
  }

  100% {
    transform: translateX(10px) translateY(-160px) scale(0.8);
    opacity: 0;
    color: #660000;
    filter: blur(2px);
  }
}

.particula:nth-child(1) {
  left: 3%;
  animation-delay: 0s;
}
.particula:nth-child(2) {
  left: 5%;
  animation-delay: 0.2s;
}
.particula:nth-child(3) {
  left: 15%;
  animation-delay: 0.4s;
}
.particula:nth-child(4) {
  left: 20%;
  animation-delay: 0.6s;
}
.particula:nth-child(5) {
  left: 5%;
  animation-delay: 0.8s;
}
.particula:nth-child(6) {
  left: 10%;
  animation-delay: 1s;
}
.particula:nth-child(7) {
  left: 12%;
  animation-delay: 1.2s;
}
.particula:nth-child(8) {
  left: 8%;
  animation-delay: 1.4s;
}
.particula:nth-child(9) {
  left: 15%;
  animation-delay: 1.6s;
}
.particula:nth-child(10) {
  left: 15%;
  animation-delay: 1.8s;
}
</style>
