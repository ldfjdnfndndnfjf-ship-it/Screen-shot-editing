:root {
  --bg: #090d16;
  --surface: #131b2e;
  --accent: #38bdf8;
  --danger: #ef4444;
  --success: #10b981;
  --text: #f8fafc;
  --border: #1e293b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

body {
  background-color: var(--bg);
  color: var(--text);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.banner {
  text-align: center;
  margin-bottom: 2rem;
}

.banner h1 {
  font-size: 2.2rem;
  letter-spacing: 1px;
  color: var(--accent);
  text-transform: uppercase;
}

.dev-tag {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0.3rem;
  color: #a855f7;
}

.disclaimer {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 0.2rem;
}

.main-card {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}

.upload-zone {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border: 2px dashed var(--border);
  border-radius: 12px;
}

.btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.primary-btn {
  background: var(--accent);
  color: #000;
  border: none;
}

.primary-btn:hover {
  background: #0284c7;
  color: #fff;
}

.success-btn {
  background: var(--success) !important;
  color: #fff !important;
  border: none !important;
}

.danger-btn {
  background: var(--danger) !important;
  color: #fff !important;
  border: none !important;
}

.action-bar {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tool-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.tool-btn.active, .tool-btn:hover {
  background: var(--border);
  color: var(--accent);
}

.control-panel {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  background: rgba(0,0,0,0.2);
  padding: 0.8rem;
  border-radius: 8px;
  flex-wrap: wrap;
}

.control-panel label {
  font-size: 0.85rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.canvas-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  text-align: center;
  overflow: auto;
  border-radius: 8px;
  background: #000;
}

#imageSource {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.editable-text-node {
  position: absolute;
  min-width: 10px;
  outline: none;
  border: 1px dashed transparent;
  cursor: text;
  padding: 1px 2px;
  white-space: pre;
  background: rgba(255, 255, 255, 0.85);
  color: #000;
  user-select: text;
  -webkit-user-select: text;
}

.editable-text-node:hover, .editable-text-node:focus {
  border-color: var(--accent);
  background: #ffffff;
  box-shadow: 0 0 5px rgba(56, 189, 248, 0.8);
}

.eraser-node {
  position: absolute;
  top: 30%;
  left: 30%;
  width: 80px;
  height: 30px;
  border: 1px dashed #94a3b8;
  cursor: move;
  resize: both;
  overflow: hidden;
}

.lock-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(9, 13, 22, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.lock-card {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 420px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.8);
}

.lock-card h2 {
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.lock-desc {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.channel-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.channel-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,0.3);
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.channel-item span {
  font-size: 0.95rem;
  font-weight: 600;
}

.follow-btn {
  background: #25d366;
  color: #fff;
  text-decoration: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.follow-btn.followed {
  background: #334155;
  color: #94a3b8;
  pointer-events: none;
}

.verify-btn {
  width: 100%;
  background: var(--accent);
  color: #000;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.verify-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
