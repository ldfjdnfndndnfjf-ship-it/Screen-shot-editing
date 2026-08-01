const followedChannels = new Set();

function markFollowed(btn, channelNum) {
  btn.innerText = "Followed ✔";
  btn.classList.add("followed");
  followedChannels.add(channelNum);

  if (followedChannels.size === 3) {
    document.getElementById("verifyBtn").removeAttribute("disabled");
  }
}

function unlockTool() {
  if (followedChannels.size === 3) {
    document.getElementById("lockOverlay").style.display = "none";
    document.getElementById("mainToolContent").style.display = "block";
  }
}

const fileInput = document.getElementById('fileInput');
const workspace = document.getElementById('workspace');
const imageSource = document.getElementById('imageSource');
const canvasWrapper = document.getElementById('canvasWrapper');

let cropper = null;

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    imageSource.src = event.target.result;
    workspace.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

function scanAndMakeTextEditable() {
  if (!imageSource.src) return;

  Tesseract.recognize(
    imageSource.src,
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data }) => {
    const scaleX = imageSource.clientWidth / imageSource.naturalWidth;
    const scaleY = imageSource.clientHeight / imageSource.naturalHeight;

    data.words.forEach(word => {
      const textNode = document.createElement('div');
      textNode.className = 'editable-text-node';
      textNode.contentEditable = 'true';
      textNode.innerText = word.text;
      
      const bbox = word.bbox;
      textNode.style.left = `${bbox.x0 * scaleX}px`;
      textNode.style.top = `${bbox.y0 * scaleY}px`;
      
      let calculatedSize = Math.min(Math.max((bbox.y1 - bbox.y0) * scaleY, 14), 22);
      textNode.style.fontSize = `${calculatedSize}px`;

      makeElementInteractive(textNode);
      canvasWrapper.appendChild(textNode);
    });
  });
}

function switchTab(tab) {
  document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  document.getElementById('editControls').style.display = 'none';
  document.getElementById('cropControls').style.display = 'none';
  document.getElementById('filterControls').style.display = 'none';
  document.getElementById('eraserControls').style.display = 'none';

  if (cropper) {
    cropper.destroy();
    cropper = null;
  }

  if (tab === 'edit') document.getElementById('editControls').style.display = 'flex';
  if (tab === 'crop') {
    document.getElementById('cropControls').style.display = 'flex';
    cropper = new Cropper(imageSource, { aspectRatio: NaN, viewMode: 1 });
  }
  if (tab === 'filters') document.getElementById('filterControls').style.display = 'flex';
  if (tab === 'eraser') document.getElementById('eraserControls').style.display = 'flex';
}

function addTextOverlay() {
  const textNode = document.createElement('div');
  textNode.className = 'editable-text-node';
  textNode.contentEditable = 'true';
  textNode.innerText = 'Edit Text';
  textNode.style.color = document.getElementById('textColor').value;
  textNode.style.fontSize = `${document.getElementById('textSize').value}px`;
  textNode.style.top = '20%';
  textNode.style.left = '20%';

  makeElementInteractive(textNode);
  canvasWrapper.appendChild(textNode);
}

function addEraserBlock() {
  const eraserNode = document.createElement('div');
  eraserNode.className = 'eraser-node';
  eraserNode.style.backgroundColor = document.getElementById('eraserColor').value;

  makeElementInteractive(eraserNode);
  canvasWrapper.appendChild(eraserNode);
}

function makeElementInteractive(elm) {
  let p1 = 0, p2 = 0, p3 = 0, p4 = 0;

  elm.onmousedown = (e) => {
    if (document.activeElement === elm) return;
    e.preventDefault();
    p3 = e.clientX;
    p4 = e.clientY;
    document.onmouseup = closeDrag;
    document.onmousemove = drag;
  };

  function drag(e) {
    e.preventDefault();
    p1 = p3 - e.clientX;
    p2 = p4 - e.clientY;
    p3 = e.clientX;
    p4 = e.clientY;
    elm.style.top = `${elm.offsetTop - p2}px`;
    elm.style.left = `${elm.offsetLeft - p1}px`;
  }

  function closeDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function applyFilters() {
  const b = document.getElementById('bright').value;
  const c = document.getElementById('contrast').value;
  const g = document.getElementById('gray').value;
  imageSource.style.filter = `brightness(${b}%) contrast(${c}%) grayscale(${g}%)`;
}

function applyCrop() {
  if (!cropper) return;
  const canvas = cropper.getCroppedCanvas();
  imageSource.src = canvas.toDataURL();
  cropper.destroy();
  cropper = null;
  switchTab('edit');
}

function cancelCrop() {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  switchTab('edit');
}

function exportImage() {
  const nodes = document.querySelectorAll('.editable-text-node, .eraser-node');
  nodes.forEach(n => n.style.border = 'none');

  html2canvas(canvasWrapper, { scale: 2 }).then(canvas => {
    const a = document.createElement('a');
    a.download = 'edited-screenshot.png';
    a.href = canvas.toDataURL('image/png');
    a.click();

    nodes.forEach(n => {
      if (n.classList.contains('editable-text-node')) n.style.border = '1px dashed transparent';
      if (n.classList.contains('eraser-node')) n.style.border = '1px dashed #94a3b8';
    });
  });
}
