module.exports = {
  apps: [
    {
      name: 'ensayos-sobre-el-deseo',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: './aplicaciones/www/publico',
        PM2_SERVE_PORT: 4010,
      },
    },
    {
      name: 'hades',
      script: './aplicaciones/servidor/publico/aplicacion.js',
    },
  ],
};
