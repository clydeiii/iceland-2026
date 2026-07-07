/* ── Iceland field guide app ── */

// ---------- time in Iceland ----------
function icelandNow() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TRIP.tz, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short',
  }).formatToParts(now).reduce((o, p) => (o[p.type] = p.value, o), {});
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hour: (+parts.hour % 24) + (+parts.minute) / 60,
    hm: `${parts.hour}:${parts.minute}`,
    dow: parts.weekday,
  };
}
function slotFor(hour) {
  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 16) return 'midday';
  if (hour >= 16 && hour < 22) return 'evening';
  return 'night';
}
function dayFor(dateStr) {
  return DAYS.find(d => d.date === dateStr) || null;
}
function fmtDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US',
    { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

// ---------- link helpers ----------
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const gmapsSearch = p => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ', Iceland')}`;
const gmapsNav = p => `https://www.google.com/maps/dir/?api=1&destination=${p.lat}%2C${p.lng}&travelmode=driving`;

const ICONS = {
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  nav: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 3 3.8 10.2l7 2.9 2.9 7L21 3Z" stroke-linejoin="round"/></svg>',
  web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.7 2.6 4 5.8 4 9s-1.3 6.4-4 9c-2.7-2.6-4-5.8-4-9s1.3-6.4 4-9Z"/></svg>',
};
// ---------- pronunciation ----------
// Match the earliest Icelandic term appearing in a display name (tie: longest).
const PRON_KEYS = Object.keys(PRON).sort((a, b) => b.length - a.length);
function pronFor(name) {
  let best = null, bestIdx = Infinity;
  for (const k of PRON_KEYS) {
    const i = name.indexOf(k);
    if (i !== -1 && i < bestIdx) { best = k; bestIdx = i; }
  }
  return best;
}
function sayBtn(name) {
  const k = pronFor(name);
  if (!k) return '';
  return `<button class="say" data-word="${esc(k)}" aria-label="Hear ${esc(k)} in Icelandic" title="Hear it in Icelandic">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6.5 9H3v6h3.5L11 19V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9.2 9.2 0 0 1 0 13"/></svg>
  </button>`;
}
const audioCache = {};
let toastTimer = null;
function speak(word) {
  const p = PRON[word];
  if (!p) return;
  const a = audioCache[p.f] || (audioCache[p.f] = new Audio('audio/' + p.f + '.mp3'));
  a.currentTime = 0;
  a.play().catch(() => {});
  let toast = document.getElementById('pron-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'pron-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<b>${esc(word)}</b><span class="t">${esc(p.t)}</span>${p.g ? `<span class="g">${esc(p.g)}</span>` : ''}`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4500);
}
document.addEventListener('click', e => {
  const b = e.target.closest('.say');
  if (b) { e.preventDefault(); e.stopPropagation(); speak(b.dataset.word); }
});

function poiLinks(p, withNav) {
  let h = `<a class="chip" target="_blank" rel="noopener" href="${gmapsSearch(p)}">${ICONS.pin} Map</a>`;
  if (withNav && p.lat) h += `<a class="chip" target="_blank" rel="noopener" href="${gmapsNav(p)}">${ICONS.nav} Navigate</a>`;
  if (p.url) h += `<a class="chip" target="_blank" rel="noopener" href="${esc(p.url)}">${ICONS.web} Website</a>`;
  return `<div class="links">${h}</div>`;
}
function poiCard(p, withNav = false) {
  return `<div class="card"><h4>${esc(p.name)}${sayBtn(p.name)}</h4><p class="note">${esc(p.note)}</p>${poiLinks(p, withNav)}</div>`;
}
function block(title, kind, inner) {
  return inner ? `<div class="block ${kind}"><h3><span class="dot"></span>${esc(title)}</h3>${inner}</div>` : '';
}

// ---------- reveal-able codes ----------
function factHTML(k, b64) {
  if (!b64) return '';
  return `<div class="fact"><div class="k">${esc(k)}</div><button class="v reveal" data-code="${b64}">tap to show</button></div>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('.reveal');
  if (b) { b.textContent = atob(b.dataset.code); b.classList.remove('reveal'); }
});

function hotelCard(h, heading) {
  if (!h) return '';
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ', ' + h.address)}`;
  return `<div class="card hotel-card">
    <h4>${esc(h.name)}${sayBtn(h.name + ' ' + h.town)}</h4>
    <p class="addr">${esc(h.address)}</p>
    <div class="hotel-grid">
      <div class="fact"><div class="k">Check in</div><div class="v">${esc(h.checkin)}</div></div>
      <div class="fact"><div class="k">Check out</div><div class="v">${esc(h.checkout)}</div></div>
      ${factHTML('Confirmation', h.conf)}
      ${factHTML('Door PIN', h.pin)}
    </div>
    <div class="links">
      <a class="chip primary" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${h.lat}%2C${h.lng}&travelmode=driving">${ICONS.nav} Navigate</a>
      <a class="chip" target="_blank" rel="noopener" href="${mapUrl}">${ICONS.pin} Map</a>
      ${h.url ? `<a class="chip" target="_blank" rel="noopener" href="${h.url}">${ICONS.web} Website</a>` : ''}
    </div>
  </div>`;
}

// ---------- NOW view ----------
const SKY = {
  morning: { top: '#A9CBDC', mid: '#E7EFF2', low: '#F6E3B0', sun: '#F6CD74', dusk: false },
  midday:  { top: '#7FB4D1', mid: '#D9E9F0', low: '#EDF4F6', sun: '#F9DE8B', dusk: false },
  evening: { top: '#7C9BBD', mid: '#E7D8C2', low: '#F0B97C', sun: '#F2A54E', dusk: false },
  night:   { top: '#33455C', mid: '#5F7690', low: '#D99E63', sun: '#E8935A', dusk: true },
};
const GREET = { morning: 'Góðan daginn · good morning', midday: 'Góðan dag · good afternoon', evening: 'Gott kvöld · good evening', night: 'Góða nótt · light night' };

function paintSky(hour, slot) {
  const s = SKY[slot];
  document.getElementById('sky-top').setAttribute('stop-color', s.top);
  document.getElementById('sky-mid').setAttribute('stop-color', s.mid);
  document.getElementById('sky-low').setAttribute('stop-color', s.low);
  const sun = document.getElementById('sun');
  sun.setAttribute('fill', s.sun);
  // July Iceland: sun up ~03:00–24:00. Map the clock onto an arc.
  const t = Math.max(0, Math.min(1, (hour - 3) / 21));
  sun.setAttribute('cx', 40 + t * 320);
  sun.setAttribute('cy', 128 - Math.sin(t * Math.PI) * 92);
  document.getElementById('sky').classList.toggle('dusk', s.dusk);
}

function todayBanner(day, label) {
  const stats = day.miles
    ? `<div class="stats"><span><b>${day.miles}</b> mi</span><span><b>~${day.hours}</b> hrs drive</span><span>${esc(day.from)} → ${esc(day.to)}</span></div>`
    : `<div class="stats"><span>${esc(day.from)} → ${esc(day.to)}</span></div>`;
  return `<div class="today-banner">
    <div class="kicker">${esc(label)} · ${fmtDate(day.date)}</div>
    <h2>${esc(day.title)}${sayBtn(day.title)}</h2>
    <p>${esc(day.summary)}</p>${stats}
  </div>`;
}

function renderNow() {
  const t = icelandNow();
  const slot = slotFor(t.hour);
  paintSky(t.hour, slot);
  document.getElementById('greet').textContent = GREET[slot];

  const el = document.getElementById('now-content');
  const title = document.getElementById('now-title');
  const sub = document.getElementById('now-sub');
  let day = dayFor(t.date);
  let html = '';

  if (!day && t.date < TRIP.start) {
    const dLeft = Math.round((Date.parse(TRIP.start) - Date.parse(t.date)) / 864e5);
    title.textContent = `${dLeft} day${dLeft === 1 ? '' : 's'} to Iceland`;
    sub.textContent = `It’s ${t.hm} in Reykjavík right now. Here’s day one, ready when you are.`;
    html = todayBanner(DAYS[0], 'First up') + todayBanner(DAYS[1], 'Then')
      + block('On the route, day one', 'route', DAYS[1].stops.map(p => poiCard(p)).join(''));
  } else if (!day && t.date > TRIP.end) {
    title.textContent = 'Takk fyrir, Iceland';
    sub.textContent = 'The trip is done — the Days tab keeps the whole story.';
    html = todayBanner(DAYS[7], 'Remember this?');
  } else if (day) {
    const prevHotel = HOTELS[(DAYS[day.id - 1] || {}).hotel];  // where you woke up
    const tonight = HOTELS[day.hotel];
    sub.textContent = `${t.hm} in Iceland · Day ${day.id} of 8`;

    if (slot === 'morning') {
      title.textContent = day.id === 0 ? 'Flight day' : `Morning in ${prevHotel ? prevHotel.town : day.from}`;
      html = todayBanner(day, 'Today')
        + block(`Breakfast & a look around ${prevHotel ? prevHotel.town : ''}`, 'food', day.morning.map(p => poiCard(p, true)).join(''))
        + block('On today’s route', 'route', day.stops.map(p => poiCard(p, true)).join(''))
        + (tonight ? block(`Tonight: ${tonight.town}`, 'stay', hotelCard(tonight)) : '');
    } else if (slot === 'midday') {
      title.textContent = 'Lunch time';
      html = todayBanner(day, 'Today')
        + block('Lunch along the way', 'food', day.lunch.map(p => poiCard(p, true)).join(''))
        + block('Still ahead on the route', 'route', day.stops.map(p => poiCard(p, true)).join(''))
        + (tonight ? block(`Tonight: ${tonight.town}`, 'stay', hotelCard(tonight)) : '');
    } else if (slot === 'evening') {
      title.textContent = tonight ? `Evening in ${tonight.town}` : 'Evening';
      html = (tonight ? block(`Dinner in ${tonight.town}`, 'food', day.dinner.map(p => poiCard(p, true)).join('')) : '')
        + (tonight ? block('Your bed tonight', 'stay', hotelCard(tonight)) : '')
        + todayBanner(day, 'Today’s plan')
        + block('If there’s light left (there is)', 'route', day.stops.slice(-3).map(p => poiCard(p, true)).join(''));
    } else { // night
      const next = DAYS[day.id + 1];
      title.textContent = 'The light never quite leaves';
      html = (tonight ? block('Tonight', 'stay', hotelCard(tonight)) : '')
        + (next ? todayBanner(next, 'Tomorrow') : '')
        + (next ? block('Tomorrow’s route', 'route', next.stops.map(p => poiCard(p)).join('')) : '');
    }
    if (day.notes) html += `<div class="block"><h3><span class="dot"></span>Notes</h3><div class="card"><p class="note">${esc(day.notes)}</p></div></div>`;
  } else {
    title.textContent = 'Iceland';
    sub.textContent = '';
    html = todayBanner(DAYS[1], 'The trip');
  }
  el.innerHTML = html;
}

// ---------- DAYS view ----------
let selectedDay = null;
function renderDayStrip() {
  const t = icelandNow();
  const strip = document.getElementById('day-strip');
  strip.innerHTML = DAYS.map(d => {
    const h = HOTELS[d.hotel];
    return `<button class="day-pill ${d.date === t.date ? 'today-ring' : ''}" data-day="${d.id}">
      <div class="dow">${fmtDate(d.date).split(',')[0]}</div>
      <div class="num">${d.id === 0 ? '✈' : d.id}</div>
      <div class="town">${esc(h ? h.town : (d.id === 8 ? 'Fly home' : d.to))}</div>
    </button>`;
  }).join('');
  strip.querySelectorAll('.day-pill').forEach(b =>
    b.addEventListener('click', () => selectDay(+b.dataset.day)));
}
function selectDay(id) {
  selectedDay = id;
  document.querySelectorAll('.day-pill').forEach(b =>
    b.classList.toggle('active', +b.dataset.day === id));
  const d = DAYS[id];
  const h = HOTELS[d.hotel];
  const detail = document.getElementById('day-detail');
  detail.innerHTML = `
    <div class="leg">${esc(d.from)}${sayBtn(d.from)} <span class="arrow">→</span> ${esc(d.to)}${sayBtn(d.to)}</div>
    <div class="leg-meta">${fmtDate(d.date)}${d.miles ? ` · ${d.miles} mi · ~${d.hours} hrs driving` : ''}</div>
    <p class="leg-summary">${esc(d.summary)}</p>
    ${h ? block('Sleep', 'stay', hotelCard(h)) : ''}
    ${d.stops.length ? `<div class="block route"><h3><span class="dot"></span>The route, in order</h3><div class="card">${
      d.stops.map((p, i) => `<div class="stop"><div class="n">${i + 1}</div><div><h4>${esc(p.name)}${sayBtn(p.name)}</h4><p>${esc(p.note)}</p>${poiLinks(p, true)}</div></div>`).join('')
    }</div></div>` : ''}
    ${block('Lunch ideas', 'food', d.lunch.map(p => poiCard(p, true)).join(''))}
    ${block('Dinner ideas', 'food', d.dinner.map(p => poiCard(p, true)).join(''))}
    ${d.notes ? block('Notes', '', `<div class="card"><p class="note">${esc(d.notes)}</p></div>`) : ''}`;
}

// ---------- MAP view ----------
const DAY_COLORS = ['#888', '#2C7DA0', '#4F7742', '#B0578D', '#C4553B', '#7A6BB5', '#E9A03B', '#1D5972', '#5E8C61'];
let map = null, dayLayers = {};

function decodePoly(str) {
  let i = 0, lat = 0, lng = 0; const pts = [];
  while (i < str.length) {
    for (const which of [0, 1]) {
      let shift = 0, result = 0, b;
      do { b = str.charCodeAt(i++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
      const d = (result & 1) ? ~(result >> 1) : (result >> 1);
      if (which === 0) lat += d; else lng += d;
    }
    pts.push([lat / 1e5, lng / 1e5]);
  }
  return pts;
}
function poiMarker(p, color, extraHTML = '') {
  const icon = L.divIcon({ className: 'poi-dot', iconSize: [14, 14], iconAnchor: [7, 7],
    html: `<span style="background:${color}"></span>` });
  return L.marker([p.lat, p.lng], { icon })
    .bindPopup(`<b>${esc(p.name)}</b>${sayBtn(p.name)}<br>${esc(p.note || '')}${extraHTML}<br>
      <a target="_blank" rel="noopener" href="${gmapsNav(p)}">Navigate ↗</a>
      ${p.url ? ` · <a target="_blank" rel="noopener" href="${esc(p.url)}">Website ↗</a>` : ''}`);
}
function initMap() {
  if (map) return;
  map = L.map('map', { zoomControl: false }).setView([64.95, -18.8], 6);
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  DAYS.forEach(d => {
    const color = DAY_COLORS[d.id];
    const group = L.featureGroup();
    if (d.route && ROUTES[d.route])
      L.polyline(decodePoly(ROUTES[d.route].poly), { color, weight: 4, opacity: .85 }).addTo(group);
    d.stops.filter(p => p.lat).forEach(p => poiMarker(p, color).addTo(group));
    const h = HOTELS[d.hotel];
    if (h) L.marker([h.lat, h.lng], {
      icon: L.divIcon({ className: 'poi-dot', iconSize: [18, 18], iconAnchor: [9, 9],
        html: `<span style="background:#E9A03B;width:18px;height:18px"></span>` }),
    }).bindPopup(`<b>${esc(h.name)}</b><br>${esc(h.address)}<br>
        <a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${h.lat}%2C${h.lng}&travelmode=driving">Navigate ↗</a>`)
      .addTo(group);
    if (group.getLayers().length) { group.addTo(map); dayLayers[d.id] = group; }
  });

  const legend = document.getElementById('map-legend');
  const pills = [`<button class="leg-pill active" data-focus="all">All</button>`]
    .concat(DAYS.filter(d => dayLayers[d.id]).map(d =>
      `<button class="leg-pill" data-focus="${d.id}" style="color:${DAY_COLORS[d.id]}">Day ${d.id || '✈'}</button>`));
  legend.innerHTML = pills.join('');
  legend.querySelectorAll('.leg-pill').forEach(b => b.addEventListener('click', () => {
    legend.querySelectorAll('.leg-pill').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    focusDay(b.dataset.focus);
  }));

  // start focused on today's leg if mid-trip
  const today = dayFor(icelandNow().date);
  if (today && dayLayers[today.id]) {
    focusDay(String(today.id));
    const btn = legend.querySelector(`[data-focus="${today.id}"]`);
    if (btn) { legend.querySelector('.active').classList.remove('active'); btn.classList.add('active'); }
  }
}
function focusDay(which) {
  Object.entries(dayLayers).forEach(([id, g]) => {
    const on = which === 'all' || id === which;
    g.eachLayer(l => {
      if (l.setStyle) l.setStyle({ opacity: on ? .85 : .15 });
      if (l.setOpacity) l.setOpacity(on ? 1 : .25);
    });
  });
  if (which !== 'all' && dayLayers[which]) map.fitBounds(dayLayers[which].getBounds().pad(0.15));
  else {
    const all = L.featureGroup(Object.values(dayLayers));
    map.fitBounds(all.getBounds().pad(0.06));
  }
}

// ---------- INFO view ----------
function renderInfo() {
  const f = LOGISTICS.flights, c = LOGISTICS.car;
  document.getElementById('info-content').innerHTML = `
    <h2 class="view-title">The paperwork</h2>
    <p class="view-lede">Everything you’ll be asked for at a desk, in one place.</p>

    <div class="block"><h3><span class="dot"></span>Flights · Icelandair</h3>
      <div class="card">
        <div class="hotel-grid">
          <div class="fact"><div class="k">${esc(f.out.route)}</div><div class="v">${esc(f.out.date)} · ${esc(f.out.dep)} → ${esc(f.out.arr)}</div></div>
          <div class="fact"><div class="k">${esc(f.back.route)}</div><div class="v">${esc(f.back.date)} · ${esc(f.back.dep)} → ${esc(f.back.arr)}</div></div>
          ${factHTML('Confirmation', f.conf)}
          ${factHTML('Clyde Saga Club', f.saga)}
          ${factHTML('Clyde e-ticket', f.eticket)}
        </div>
        <p class="note" style="margin-top:10px">${esc(f.shuttle)}</p>
      </div></div>

    <div class="block"><h3><span class="dot"></span>Rental car · Budget</h3>
      <div class="card">
        <div class="hotel-grid">
          <div class="fact"><div class="k">Pick up</div><div class="v">${esc(c.pickup)}</div></div>
          <div class="fact"><div class="k">Drop off</div><div class="v">${esc(c.dropoff)}</div></div>
          ${factHTML('Budget conf', c.budgetConf)}
          ${factHTML('Amex conf', c.amexConf)}
        </div>
      </div></div>

    <div class="block stay"><h3><span class="dot"></span>All seven beds</h3>
      ${Object.values(HOTELS).map(h => hotelCard(h)).join('')}</div>

    <div class="block"><h3><span class="dot"></span>The list (other stuff)</h3>
      ${EXTRAS.map(p => poiCard(p)).join('')}</div>

    <div class="block"><h3><span class="dot"></span>Good to know</h3>
      <div class="card"><p class="note">${esc(LOGISTICS.emergency)}</p></div></div>`;
}

// ---------- CHAT ----------
const OR_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OR_MODEL = 'tencent/hy3:free';
const cookie = {
  get(name) {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  },
  set(name, val) {
    document.cookie = `${name}=${encodeURIComponent(val)}; max-age=31536000; path=/; SameSite=Lax; Secure`;
  },
  del(name) { document.cookie = `${name}=; max-age=0; path=/`; },
};
let chatHistory = [];

function tripBrief() {
  const t = icelandNow();
  const today = dayFor(t.date);
  const lines = DAYS.map(d => {
    const h = HOTELS[d.hotel];
    return `Day ${d.id} (${d.date}): ${d.from} -> ${d.to}. ${d.title}.` +
      (h ? ` Sleep: ${h.name}, ${h.address} (check-in ${h.checkin}).` : '') +
      (d.stops.length ? ` Stops: ${d.stops.map(s => s.name).join('; ')}.` : '');
  });
  return `You are the in-pocket travel guide for Clyde & Lucy's Iceland Ring Road trip, 8-16 July 2026 (counter-clockwise: south coast first).
Right now in Iceland it is ${t.dow} ${t.date}, ${t.hm}. ${today ? `They are on day ${today.id}: ${today.title}.` : ''}
Itinerary:\n${lines.join('\n')}
Extra wishes: Icelandic hot dog (Baejarins Beztu), Phallological Museum, cat walking tour, Kolaportid flea market (weekends only).
Rental car: Budget, KEF, drop-off 16 July 14:00. Flight home 16 July 17:00.
Be concise and phone-friendly. Give concrete, local, seasonal advice (July: midnight sun, puffins, lupines). Include opening hours or booking warnings when you know them. Use short paragraphs or tight lists. If asked for directions, name road numbers. Answer in the language you're asked in.`;
}

function mdLite(t) {
  // bot replies arrive as markdown; render just the parts that matter on a phone
  let h = esc(t)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/^#{1,4} (.+)$/gm, '<b>$1</b>')
    .replace(/^[-*] /gm, '• ');
  return h;
}

function addMsg(cls, text) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.className = 'msg ' + cls;
  div.textContent = text;
  log.appendChild(div);
  document.getElementById('chat-scroll').scrollTop = 1e9;
  return div;
}

function initChat() {
  const panel = document.getElementById('chat-key-panel');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');

  function syncKeyUI() {
    const has = !!cookie.get('orkey');
    panel.hidden = has;
    if (has && !document.getElementById('chat-log').children.length) {
      const hello = document.createElement('div');
      hello.className = 'chat-hello';
      hello.innerHTML = `<b>Halló!</b> I know the whole itinerary — ask me anything.<br>
        “What should we do near Vík tonight?” · “Is Dettifoss worth it in rain?”<br>
        <button class="btn ghost" id="key-forget" style="margin-top:10px">Forget saved key</button>`;
      document.getElementById('chat-log').appendChild(hello);
      hello.querySelector('#key-forget').addEventListener('click', () => {
        cookie.del('orkey');
        document.getElementById('chat-log').innerHTML = '';
        syncKeyUI();
      });
    }
  }
  document.getElementById('key-save').addEventListener('click', () => {
    const v = document.getElementById('key-input').value.trim();
    if (!v.startsWith('sk-or-')) { alert('That doesn’t look like an OpenRouter key (sk-or-…)'); return; }
    cookie.set('orkey', v);
    document.getElementById('key-input').value = '';
    syncKeyUI();
  });
  syncKeyUI();

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const key = cookie.get('orkey');
    const text = input.value.trim();
    if (!text) return;
    if (!key) { panel.hidden = false; return; }
    input.value = '';
    addMsg('user', text);
    chatHistory.push({ role: 'user', content: text });
    if (chatHistory.length > 16) chatHistory = chatHistory.slice(-16);
    const botDiv = addMsg('bot thinking', '…');
    form.querySelector('button').disabled = true;
    try {
      const res = await fetch(OR_URL, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + key,
          'Content-Type': 'application/json',
          'X-Title': 'Iceland Field Guide',
        },
        body: JSON.stringify({
          model: OR_MODEL,
          messages: [{ role: 'system', content: tripBrief() }, ...chatHistory],
          stream: true,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`${res.status}: ${errText.slice(0, 300)}`);
      }
      botDiv.textContent = '';
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '', full = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop();
        for (const line of lines) {
          const m = line.match(/^data: (.*)/);
          if (!m || m[1] === '[DONE]') continue;
          try {
            const d = JSON.parse(m[1]).choices?.[0]?.delta || {};
            if (d.reasoning && !full) {
              // hy3 thinks out loud before answering — show a live tail so it feels alive
              botDiv.classList.add('thinking');
              const tail = (botDiv.dataset.r = ((botDiv.dataset.r || '') + d.reasoning).slice(-90));
              botDiv.textContent = 'hugsa… ' + tail;
            }
            if (d.content) {
              botDiv.classList.remove('thinking');
              full += d.content; botDiv.innerHTML = mdLite(full);
            }
            document.getElementById('chat-scroll').scrollTop = 1e9;
          } catch { /* partial chunk */ }
        }
      }
      botDiv.classList.remove('thinking');
      if (!full) { botDiv.textContent = '(no reply — the free model may be busy; try again)'; }
      else { botDiv.innerHTML = mdLite(full); chatHistory.push({ role: 'assistant', content: full }); }
    } catch (err) {
      botDiv.className = 'msg err';
      botDiv.textContent = 'The guide couldn’t answer: ' + err.message +
        (String(err.message).includes('401') ? ' — the key may be wrong; use “Forget saved key” and re-paste it.' : '');
    } finally {
      form.querySelector('button').disabled = false;
    }
  });
}

// ---------- tabs & boot ----------
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.toggle('active', x === t));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + t.dataset.view));
  if (t.dataset.view === 'map') {
    const first = !map;
    initMap();
    setTimeout(() => {
      map.invalidateSize();
      if (first && !dayFor(icelandNow().date)) focusDay('all');
    }, 80);
  }
  if (t.dataset.view === 'now') renderNow();
  window.scrollTo(0, 0);
}));

renderNow();
renderDayStrip();
const boot = dayFor(icelandNow().date);
selectDay(boot ? boot.id : 1);
renderInfo();
initChat();
setInterval(renderNow, 5 * 60 * 1000); // keep the sky honest

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
