module.exports = {
  apps: [
    {
      name: 'ds-api',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 2403,
      },
    },
  ],
};
