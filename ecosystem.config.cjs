module.exports = {
  apps: [
    {
      name: 'keroma',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3005',
      cwd: '/var/www/keroma',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '768M',
    },
  ],
};