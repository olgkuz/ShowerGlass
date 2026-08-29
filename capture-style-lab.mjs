import { writeFileSync } from 'node:fs';

const [, , outputPath, variant = 'default'] = process.argv;
const response = await fetch('http://127.0.0.1:9223/json/new?http://localhost:4400/style-lab', {
  method: 'PUT',
});
const target = await response.json();
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let id = 0;
const pending = new Map();
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  const handler = pending.get(message.id);
  if (handler) {
    pending.delete(message.id);
    handler(message);
  }
});

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const requestId = ++id;
    pending.set(requestId, (message) => {
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    });
    socket.send(JSON.stringify({ id: requestId, method, params }));
  });
}

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844,
});
await send('Page.navigate', { url: 'http://localhost:4400/style-lab' });
await new Promise((resolve) => setTimeout(resolve, 1200));

if (variant === 'creative') {
  const expression = `(() => {
    const click = (text) => Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes(text))?.click();
    click('Творческий проект');
    click('Prata + Onest');
    click('По центру');
    click('На фоне');
    return true;
  })()`;
  await send('Runtime.evaluate', { expression });
  await new Promise((resolve) => setTimeout(resolve, 500));
  await send('Runtime.evaluate', {
    expression: `(() => {
      const preview = document.querySelector('.site-preview');
      if (preview) window.scrollTo(0, preview.getBoundingClientRect().top + window.scrollY - 12);
      return window.scrollY;
    })()`,
  });
  await new Promise((resolve) => setTimeout(resolve, 150));
}

const overflow = await send('Runtime.evaluate', {
  expression: `(() => { const element = document.querySelector('.site-preview'); const rect = element?.getBoundingClientRect(); return JSON.stringify({innerWidth, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight, scrollY, previewTop: rect?.top, previewHeight: rect?.height, preview: element?.className}); })()`,
  returnByValue: true,
});
console.log(overflow.result.value);

const screenshot = await send('Page.captureScreenshot', {
  format: 'png',
  fromSurface: true,
  captureBeyondViewport: false,
});
writeFileSync(outputPath, Buffer.from(screenshot.data, 'base64'));
socket.close();
