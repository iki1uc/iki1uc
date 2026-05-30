function renderItems(items, container){
  container.innerHTML = '';
  items.forEach((it, idx)=>{
    const row = document.createElement('div');
    row.className = 'item';
    const mini = document.createElement('div');
    mini.className = 'mini-cube';
    mini.textContent = ['◻','◼','◇','◎'][Math.floor(rand()*4)];
    mini.style.background = `rgba(${50+Math.floor(rand()*200)},${50+Math.floor(rand()*200)},${50+Math.floor(rand()*200)},0.12)`;
    const txt = document.createElement('div');
    txt.textContent = it.text || `Fragment ${idx+1}`;
    row.appendChild(mini);
    row.appendChild(txt);
    container.appendChild(row);
    // occasional impulse from mini cube
    if(rand() < 0.06) SEEU.applyImpulse?.((rand()-0.5)*0.06,(rand()-0.5)*0.05);
  });
}
