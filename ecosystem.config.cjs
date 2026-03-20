module.exports = {
  apps: [{
    name: 'docketworks-website',
    script: 'dist/server/entry.mjs',
    cwd: '/opt/docketworks-website',
    env: {
      HOST: '127.0.0.1',
      PORT: 4321,
      NODE_ENV: 'production',
    },
  }],
};
