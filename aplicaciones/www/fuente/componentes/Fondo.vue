<template>
  <svg id="fondo" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <filter id="roughpaper" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.35 0.45" result="noise" numOctaves="3" seed="20000" />

      <feDiffuseLighting in="noise" surfaceScale="0.25">
        <feDistantLight azimuth="90" elevation="65" />
      </feDiffuseLighting>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.5" />
      </feComponentTransfer>
    </filter>

    <rect x="0" y="0" width="100%" height="100%" filter="url(#roughpaper)" fill="none" />

    <filter id="pen-texture-1" x="0%" y="0%" filterUnits="objectBoundingBox" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.35 0.45" result="p1" numOctaves="3" />
      <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.9 1.0" result="f2"></feColorMatrix>
      <feComposite operator="in" in2="f2" in="SourceGraphic" result="f3"></feComposite>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.35" />
      </feComponentTransfer>
    </filter>

    <filter id="pen-texture-2">
      <feTurbulence baseFrequency="0.3" numOctaves="2" result="turbulence1" type="fractalNoise" />
      <feDisplacementMap in="SourceGraphic" in2="turbulence1" scale="0.8" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.28" />
      </feComponentTransfer>
    </filter>

    <filter id="pen-texture-3">
      <feTurbulence baseFrequency="0.3" numOctaves="2" result="turbulence1" type="fractalNoise" />
      <feDisplacementMap in="SourceGraphic" in2="turbulence1" result="JITTER" scale="0.8" />

      <feTurbulence baseFrequency="0.02" numOctaves="2" result="turbulence2" />

      <feColorMatrix
        in="turbulence2"
        result="colorized-turbo"
        type="matrix"
        values="0 0 1 0 0 
                0 0 1 0 0 
                0 0 1 0 0 
                0 0 0 0.9 0"
      />

      <feComposite in="SourceGraphic" in2="colorized-turbo" operator="in" result="GAPS" />
      <feComposite in="JITTER" in2="GAPS" operator="over" result="G" />

      <feComponentTransfer>
        <feFuncA type="linear" slope="0.32" />
      </feComponentTransfer>

      <feMerge>
        <feMergeNode in="G"></feMergeNode>
        <feMergeNode in="JITTER"></feMergeNode>
      </feMerge>
    </filter>
  </svg>
</template>

<style lang="scss" scoped>
#fondo {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
}
</style>
