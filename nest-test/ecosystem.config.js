module.exports = {
  apps : [{
    name: 'nest-app',
    script: '/app/dist/main.js',
    watch: true,
    ignore_watch : ["node_modules", "logs"]
  }]
};