module.exports = {
  apps: [
    {
      name: 'deseos-tally',
      script: './publico/aplicacion.js',
      // Ejecutar desde el directorio del servidor para que los .env locales
      // y rutas relativas funcionen como se espera.
      cwd: './aplicaciones/servidor',
      // Variables de entorno por defecto (puedes mantenerlas aquí o
      // actualizarlas con `pm2 restart ecosystem.config.cjs --update-env`).
      env: {
        PUERTO: '4011',
        AMBIENTE: 'desarrollo',
      },
    },
  ],
};
