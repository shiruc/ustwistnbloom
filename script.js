const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.panel');
const themeToggle = document.getElementById('themeToggle');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const generatePreview = document.getElementById('generatePreview');
const promptInput = document.getElementById('promptInput');
const runPrompt = document.getElementById('runPrompt');
const savePrompt = document.getElementById('savePrompt');
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const sendChat = document.getElementById('sendChat');
const modelTabs = document.querySelectorAll('.tab');
const modelDetails = document.getElementById('modelDetails');
const copyKey = document.getElementById('copyKey');

const modelInfo = {
  alpha: {
    title: 'Alpha',
    description: 'Best for creative drafts, ideation, and summarization.',
    pills: ['128k context', 'Text + vision', 'Low latency'],
  },
  beta: {
    title: 'Beta',
    description: 'Balanced model for reasoning, code, and tool calling.',
    pills: ['200k context', 'Tool use', 'Reliable guardrails'],
  },
  gamma: {
    title: 'Gamma',
    description: 'High-precision model for analytics, QA, and data flows.',
    pills: ['64k context', 'Structured output', 'Cost optimized'],
  },
};

function setActiveSection(sectionId) {
  navItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.section === sectionId);
  });
  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === sectionId);
  });
}

navItems.forEach((item) => {
  item.addEventListener('click', () => setActiveSection(item.dataset.section));
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

if (fileInput) {
  fileInput.addEventListener('change', () => {
    fileList.innerHTML = '';
    Array.from(fileInput.files).forEach((file) => {
      const item = document.createElement('li');
      item.textContent = `${file.name} • ${(file.size / 1024).toFixed(1)} KB`;
      fileList.appendChild(item);
    });
  });
}

if (generatePreview) {
  generatePreview.addEventListener('click', () => {
    const previewBody = generatePreview.closest('.preview-body');
    if (!previewBody) return;
    previewBody.innerHTML = `
      <p class="muted">Preview generated from your latest draft.</p>
      <ul class="file-list">
        <li>Hero section updated ✓</li>
        <li>Primary CTA aligned ✓</li>
        <li>Analytics widgets refreshed ✓</li>
      </ul>
    `;
  });
}

function appendMessage(text, type) {
  const message = document.createElement('div');
  message.className = `chat-message ${type}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

if (sendChat) {
  sendChat.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    chatInput.value = '';
    window.setTimeout(() => {
      appendMessage('Draft ready. Adjust sliders for tone and temperature.', 'bot');
    }, 500);
  });
}

if (runPrompt) {
  runPrompt.addEventListener('click', () => {
    appendMessage('Running prompt test...', 'bot');
  });
}

if (savePrompt) {
  savePrompt.addEventListener('click', () => {
    const stored = promptInput.value || 'Untitled prompt saved.';
    appendMessage(`Saved: ${stored.slice(0, 40)}...`, 'bot');
  });
}

modelTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    modelTabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    const info = modelInfo[tab.dataset.model];
    if (!info) return;
    modelDetails.innerHTML = `
      <h3>${info.title}</h3>
      <p class="muted">${info.description}</p>
      <div class="pill-row">
        ${info.pills.map((pill) => `<span class="pill">${pill}</span>`).join('')}
      </div>
    `;
  });
});

if (copyKey) {
  copyKey.addEventListener('click', async () => {
    const key = 'sk-studio-drive-2024-demo';
    try {
      await navigator.clipboard.writeText(key);
      copyKey.textContent = 'Copied!';
      setTimeout(() => {
        copyKey.textContent = 'Copy key';
      }, 1500);
    } catch (error) {
      copyKey.textContent = 'Copy failed';
    }
  });
}

setActiveSection('overview');
