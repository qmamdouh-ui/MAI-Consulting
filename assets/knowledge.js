/* Knowledge hub: search + level filter, and a summary pop-out for every article row.
   Every row is a real link to the article, so the page still works without JavaScript. */
(function(){
  var q=document.getElementById('kb-q'); if(!q) return;
  var res=document.getElementById('kb-results'), def=document.getElementById('kb-default'), cnt=document.getElementById('kb-count');
  var pop=document.getElementById('kb-pop'), lvl='', data=[];
  var LAB={assessment:'AI Readiness Assessment',policy:'AI Use Policy',training:'Team AI Training',support:'Fluency Support',agents:'Custom Agents & Tools',general:'Leadership & Perspective'};
  var MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  function fd(d){var p=d.split('-');return (+p[2])+' '+MON[+p[1]-1]+' '+p[0];}
  fetch('articles.json',{cache:'no-cache'}).then(function(r){return r.json();}).then(function(d){data=d.articles||[];}).catch(function(){});
  function rowHtml(a){
    var m=a.format+' · '+a.level+' · '+fd(a.date)+' · '+a.minutes+' min read';
    return '<a class="row" href="'+esc(a.slug)+'/" data-t="'+esc(a.title)+'" data-s="'+esc(a.summary)+'" data-m="'+esc(m)+'" data-v="'+esc(LAB[a.section]||'')+'" data-li="'+esc(a.linkedin_url||'')+'"><span class="rt">'+esc(a.title)+'</span><span class="rm">'+esc(a.format)+' &middot; '+a.minutes+' min</span></a>';
  }
  function run(){
    var t=q.value.trim().toLowerCase();
    if(!t&&!lvl){res.hidden=true;def.hidden=false;cnt.textContent='';return;}
    var words=t.split(/\s+/).filter(Boolean);
    var out=data.filter(function(a){
      if(lvl&&a.level!==lvl) return false;
      var hay=(a.title+' '+a.summary+' '+(a.tags||[]).join(' ')+' '+a.format+' '+(LAB[a.section]||'')).toLowerCase();
      return words.every(function(w){return hay.indexOf(w)>-1;});
    });
    res.innerHTML=out.map(rowHtml).join(''); res.hidden=false; def.hidden=true;
    cnt.textContent=out.length?out.length+(out.length===1?' article':' articles'):'No article matches. Try fewer words, or clear the filter.';
  }
  q.addEventListener('input',run);
  document.getElementById('kb-levels').addEventListener('click',function(e){var b=e.target.closest('.chip'); if(!b) return; lvl=b.getAttribute('data-lvl'); [].forEach.call(this.children,function(c){c.classList.toggle('on',c===b);}); run();});
  function openPop(r){
    document.getElementById('kb-pop-v').textContent=r.getAttribute('data-v');
    document.getElementById('kb-pop-t').textContent=r.getAttribute('data-t');
    document.getElementById('kb-pop-m').textContent=r.getAttribute('data-m');
    document.getElementById('kb-pop-s').textContent=r.getAttribute('data-s');
    document.getElementById('kb-pop-go').href=r.getAttribute('href');
    var li=r.getAttribute('data-li'), l=document.getElementById('kb-pop-li');
    if(li){l.href=li;l.hidden=false;}else{l.hidden=true;}
    pop.showModal();
  }
  document.addEventListener('click',function(e){
    var r=e.target.closest('a.row');
    if(!r||e.metaKey||e.ctrlKey||e.shiftKey||e.button||!pop||!pop.showModal) return;
    e.preventDefault(); openPop(r);
  });
  if(pop){
    document.getElementById('kb-pop-x').addEventListener('click',function(){pop.close();});
    pop.addEventListener('click',function(e){if(e.target===pop) pop.close();});
  }
  function hashOpen(){var h=location.hash.slice(1),el=h&&document.getElementById(h); if(el&&el.tagName==='DETAILS'){el.open=true; el.scrollIntoView({block:'start'});}}
  window.addEventListener('hashchange',hashOpen); hashOpen();
})();
