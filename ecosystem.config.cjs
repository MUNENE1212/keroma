module.exports = {
  apps: [
    {
      name: 'keroma',
      script: 'server.js',
      cwd: '/var/www/keroma',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
        HOSTNAME: '0.0.0.0',
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '512M',
      kill_timeout: 5000,
      listen_timeout: 10000,
    },
  ],
};
