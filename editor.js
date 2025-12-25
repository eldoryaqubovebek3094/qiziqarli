// editor.js — Client-side JSON editor (download/copy only)
let currentFile = null;
let currentGrade = '1';
let jsonData = null;

function $(id){return document.getElementById(id);} 

async function fetchJson(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error('Fetch failed: '+res.status);
  return await res.json();
}

function renderEntries(){
  const list = $('entries-list');
  list.innerHTML = '';
  const arr = (jsonData && jsonData[currentGrade]) ? jsonData[currentGrade] : [];
  if(!Array.isArray(arr)) { list.textContent = 'Tanlangan grade uchun massiv topilmadi.'; return; }

  arr.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'question';
    el.style.display = 'flex';
    el.style.justifyContent = 'space-between';
    el.style.alignItems = 'center';

    const left = document.createElement('div');
    left.style.flex = '1';

    const pre = document.createElement('pre');
    pre.style.margin = '0';
    pre.textContent = JSON.stringify(item, null, 2);
    left.appendChild(pre);

    const right = document.createElement('div');
    right.style.marginLeft = '12px';

    const del = document.createElement('button');
    del.textContent = 'O\'chirish';
    del.className = 'button';
    del.onclick = ()=>{ if(confirm('O\'chirmoqchimisiz?')) { jsonData[currentGrade].splice(idx,1); renderEntries(); } };

    const edit = document.createElement('button');
    edit.textContent = 'Tahrirlash';
    edit.className = 'button';
    edit.style.marginLeft = '8px';
    edit.onclick = ()=>{ populateFormWith(item, idx); };

    right.appendChild(edit);
    right.appendChild(del);

    el.appendChild(left);
    el.appendChild(right);
    list.appendChild(el);
  });
}

function clearForm(){ $('add-form').innerHTML = ''; }

function populateFormWith(item, idx){
  buildFormFields();
  const form = $('add-form');
  // set values
  for(const k in item){
    const inp = form.querySelector(`[name="${k}"]`);
    if(inp) inp.value = item[k];
  }
  // change add button to save
  $('add-btn').textContent = 'Saqlash (yangilash)';
  $('add-btn').onclick = (e)=>{ e.preventDefault(); saveEdit(idx); };
}

function saveEdit(idx){
  const newObj = collectFormValues();
  jsonData[currentGrade][idx] = newObj;
  renderEntries();
  resetAddButton();
}

function resetAddButton(){
  $('add-btn').textContent = 'Qo\'shish';
  $('add-btn').onclick = (e)=>{ e.preventDefault(); addEntry(); };
}

function buildFormFields(){
  const form = $('add-form');
  form.innerHTML = '';
  // fields depend on file type
  if(currentFile === 'test.json'){
    // question, options[4], correct (index)
    form.appendChild(makeInput('question','Savol matni'));
    for(let i=0;i<4;i++) form.appendChild(makeInput(`option${i}`,'Variant '+(i+1)));
    form.appendChild(makeInput('correct','To\'g\'ri variant indeksi (0-3)'));
  } else if(currentFile === 'problems.json'){
    form.appendChild(makeInput('problem','Masala matni'));
    form.appendChild(makeInput('answer','To\'g\'ri javob (raqam)'));
  } else if(currentFile === 'games.json'){
    form.appendChild(makeInput('q','Savol (ifoda)'));
    form.appendChild(makeInput('a','Javob (raqam)'));
  } else if(currentFile === 'comparison.json'){
    form.appendChild(makeInput('left','Chap raqam'));
    form.appendChild(makeInput('right','O\'ng raqam'));
    form.appendChild(makeInput('correct','To\'g\'ri belgisi: <, =, yoki >'));
  }
  form.appendChild(makeInput('note','Izoh (ixtiyoriy)'));
}

function makeInput(name, label){
  const wr = document.createElement('div');
  wr.style.margin = '6px 0';
  const lab = document.createElement('label'); lab.textContent = label; lab.htmlFor = name;
  const inp = document.createElement('input'); inp.name = name; inp.id = name; inp.style.width='100%'; inp.style.padding='8px';
  wr.appendChild(lab); wr.appendChild(document.createElement('br')); wr.appendChild(inp);
  return wr;
}

function collectFormValues(){
  const form = $('add-form');
  const obj = {};
  const fm = new FormData(form);
  if(currentFile === 'test.json'){
    obj.question = fm.get('question')||'';
    obj.options = [];
    for(let i=0;i<4;i++) obj.options.push(fm.get('option'+i) || '');
    obj.correct = parseInt(fm.get('correct')||'0');
  } else if(currentFile === 'problems.json'){
    obj.problem = fm.get('problem')||'';
    obj.answer = isNaN(Number(fm.get('answer'))) ? fm.get('answer') : Number(fm.get('answer'));
  } else if(currentFile === 'games.json'){
    obj.q = fm.get('q')||'';
    obj.a = isNaN(Number(fm.get('a'))) ? fm.get('a') : Number(fm.get('a'));
  } else if(currentFile === 'comparison.json'){
    obj.left = isNaN(Number(fm.get('left'))) ? fm.get('left') : Number(fm.get('left'));
    obj.right = isNaN(Number(fm.get('right'))) ? fm.get('right') : Number(fm.get('right'));
    obj.correct = fm.get('correct')||'';
  }
  // optional note
  const note = fm.get('note'); if(note) obj._note = note;
  return obj;
}

async function loadSelected(){
  currentFile = $('file-select').value;
  currentGrade = $('grade-select').value;
  $('editor-area').style.display = 'none';
  try{
    jsonData = await fetchJson(currentFile);
  }catch(err){
    alert('Faylni yuklashda xato: '+err.message+'\n(Statik hostingda faylga yozish imkoni yo\'q. Editor faqat yuklab olish uchun mos.)');
    return;
  }
  // ensure grade key exists and is array
  if(!jsonData[currentGrade]) jsonData[currentGrade] = [];
  $('editor-title').textContent = `${currentFile} — ${currentGrade}-sinf`;
  buildFormFields();
  resetAddButton();
  renderEntries();
  $('editor-area').style.display = 'block';
}

function addEntry(){
  const obj = collectFormValues();
  if(!jsonData[currentGrade]) jsonData[currentGrade] = [];
  jsonData[currentGrade].push(obj);
  renderEntries();
  // clear fields
  const inputs = $('add-form').querySelectorAll('input'); inputs.forEach(i=>i.value='');
}

function downloadJson(){
  const blob = new Blob([JSON.stringify(jsonData, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = currentFile;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function copyToClipboard(){
  navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2)).then(()=>{
    alert('JSON clipboardga nusxalandi.');
  }, (err)=>{ alert('Clipboardga nusxalash xatosi: '+err); });
}

// init
window.addEventListener('DOMContentLoaded', ()=>{
  $('load-btn').addEventListener('click', loadSelected);
  $('add-btn').addEventListener('click', (e)=>{ e.preventDefault(); addEntry(); });
  $('download-btn').addEventListener('click', (e)=>{ e.preventDefault(); downloadJson(); });
  $('copy-btn').addEventListener('click', (e)=>{ e.preventDefault(); copyToClipboard(); });
  // server save
  const saveBtn = $('save-server-btn');
  if(saveBtn) saveBtn.addEventListener('click', (e)=>{ e.preventDefault(); saveToServer(); });
});

async function saveToServer(){
  const url = $('server-url').value || 'http://localhost:8001/save-json';
  const token = $('server-token').value || '';
  if(!currentFile || !jsonData){ alert('Avval JSONni yuklang yoki tahrir qiling.'); return; }
  try{
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token },
      body: JSON.stringify({ filename: currentFile, data: jsonData })
    });
    const j = await res.json();
    if(res.ok){ alert('Serverga saqlandi: '+ (j.filename || currentFile)); }
    else { alert('Server xatosi: '+(j.error || res.statusText)); }
  }catch(err){ alert('Serverga ulanishda xato: '+err.message); }
};
