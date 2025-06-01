#!/usr/bin/env node
const { spawn } = require('child_process');

// Run the start:local script
const child = spawn('npm', ['run', 'start:local'], {
  stdio: 'inherit',
  shell: true
});

child.on('close', (code) => {
  process.exit(code);
});