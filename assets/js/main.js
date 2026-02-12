(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  if(stored === "light" || stored === "dark"){
    root.setAttribute("data-theme", stored);
  }

  function setTheme(t){
    root.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  }

  const btn = document.getElementById("themeToggle");
  if(btn){
    btn.addEventListener("click", function(){
      const cur = root.getAttribute("data-theme");
      const next = (cur === "light") ? "dark" : "light";
      setTheme(next);
      btn.setAttribute("aria-label", "Switch to " + (next === "light" ? "dark" : "light") + " theme");
    });
  }

  // Publications search
  const q = document.getElementById("pubSearch");
  if(q){
    q.addEventListener("input", function(){
      const term = q.value.trim().toLowerCase();
      document.querySelectorAll("[data-pub-item]").forEach(function(li){
        const text = li.textContent.toLowerCase();
        li.style.display = (term === "" || text.includes(term)) ? "" : "none";
      });
    });
  }

  // TCCB events render
  const evEl = document.getElementById("tccbEvents");
  const evJsonEl = document.getElementById("tccbData");
  if(evEl && evJsonEl){
    try{
      const data = JSON.parse(evJsonEl.textContent);
      const rows = data.events.map(function(e){
        const d = new Date(e.date + "T12:00:00");
        const dateStr = d.toLocaleDateString(undefined, {year:"numeric", month:"short", day:"numeric"});
        return `<tr>
          <td><div>${dateStr}</div><div class="muted">${escapeHtml(e.room)}</div></td>
          <td><div>${escapeHtml(e.speaker)}</div></td>
          <td><div class="muted">“${escapeHtml(e.talk)}”</div></td>
        </tr>`;
      }).join("");
      evEl.innerHTML = `<div class="card list"><h2>Upcoming schedule</h2>
        <table class="table"><tr><th>Date & location</th><th>Speaker</th><th>Title</th></tr>${rows}</table></div>`;
    }catch(err){
      // no-op
    }
  }

  function escapeHtml(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }
})();
