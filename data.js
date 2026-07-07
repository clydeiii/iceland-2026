// ── Trip data: Clyde & Lucy, Iceland Ring Road, 8–16 July 2026 ──
// Booking codes / door PINs are base64'd so they aren't plain-text scrapeable
// in the public repo; the app decodes them on tap.

const B = s => atob(s);

const TRIP = {
  tz: 'Atlantic/Reykjavik',
  travelers: 'Clyde & Lucy',
  start: '2026-07-08',
  end: '2026-07-16',
};

const HOTELS = {
  dream: {
    name: 'Dream Guesthouse', town: 'Vík',
    address: 'Víkurbraut 10, 870 Vík',
    lat: 63.4187, lng: -19.0060,
    conf: 'NjAyMDgyMjUzMg==', pin: 'NzkyMA==',
    checkin: '17:00–18:00', checkout: '08:00–10:00',
  },
  oldairline: {
    name: 'Old Airline Guesthouse', town: 'Höfn',
    address: 'Hafnarbraut 24, 780 Höfn',
    lat: 64.2497, lng: -15.2020,
    conf: 'NTAwMjkyODAwMg==', pin: 'MjA1Ng==',
    checkin: '15:00–20:00', checkout: 'by 11:00',
  },
  seydis: {
    name: 'Seyðisfjörður Guesthouse', town: 'Seyðisfjörður',
    address: 'Hafnargata 4, 710 Seyðisfjörður',
    lat: 65.2624, lng: -14.0024,
    conf: 'NTcxMjQzMDE0Nw==', pin: 'MTcxOQ==',
    checkin: '16:00–22:00', checkout: 'by 11:00',
  },
  solgardar: {
    name: 'Guesthouse Solgardar', town: 'Akureyri',
    address: 'Brekkugata 6, 600 Akureyri',
    lat: 65.6839, lng: -18.0896,
    conf: 'Njc3MDU0NDMwMQ==', pin: 'MTg5Ng==',
    checkin: '16:00–22:00', checkout: 'by 11:00',
  },
  setrid: {
    name: 'Setrid Guesthouse', town: 'Borgarnes',
    address: 'Helgugata 5, 310 Borgarnes',
    lat: 64.5380, lng: -21.9210,
    conf: 'NTQ3NjA0NjkyMw==', pin: 'Mzk0NQ==',
    checkin: '16:00–21:00', checkout: 'by 11:00',
  },
  canopy: {
    name: 'Canopy by Hilton Reykjavík City Centre', town: 'Reykjavík',
    address: 'Smiðjustígur 4, 101 Reykjavík',
    lat: 64.1475, lng: -21.9347,
    conf: 'MzQ0NTMwODMwNQ==', pin: null,
    checkin: 'from 15:00', checkout: 'by 11:00',
    url: 'https://www.hilton.com/en/hotels/rekcopy-canopy-reykjavik-city-centre/',
  },
  citycenter: {
    name: 'City Center Hotel', town: 'Reykjavík',
    address: 'Austurstræti 6, 101 Reykjavík',
    lat: 64.1479, lng: -21.9401,
    conf: 'ODQ1NTU3MTI=', pin: null,
    checkin: 'from 14:00', checkout: 'by 11:00',
    url: 'https://www.citycenterhotel.is/',
  },
};

// POI helper shape: { name, note, lat, lng, url?, tags? }
const DAYS = [
  {
    id: 0, date: '2026-07-08', route: null,
    title: 'Fly BWI → Keflavík',
    from: 'Baltimore (BWI)', to: 'Keflavík Airport',
    hotel: null, miles: null, hours: null,
    summary: 'Overnight flight. Departs BWI 20:30, lands KEF 6:25 the next morning.',
    stops: [], morning: [], lunch: [], dinner: [],
    notes: 'Lava shuttle if needed: +354 519 4141. Icelandair conf: see Info tab.',
  },
  {
    id: 1, date: '2026-07-09', route: 'd1',
    title: 'South Coast waterfalls to Vík',
    from: 'Keflavík', to: 'Vík',
    hotel: 'dream', miles: 143, hours: 3.25,
    summary: 'Land 6:25, grab the rental (Budget, 7:00), then the greatest-hits south coast: two big waterfalls, a glacier tongue, puffin cliffs and the black beach.',
    stops: [
      { name: 'Seljalandsfoss', note: 'The waterfall you can walk behind — bring the rain shell. 10 min further on foot: hidden Gljúfrabúi falls inside a canyon slot.', lat: 63.6156, lng: -19.9886, url: 'https://www.south.is/en/place/seljalandsfoss-waterfall' },
      { name: 'Gljúfrabúi', note: 'Wade a few steps into the cleft for the secret waterfall chamber.', lat: 63.6203, lng: -19.9866 },
      { name: 'Skógafoss', note: '60 m curtain of water. Climb the 527 steps for the top view if legs allow.', lat: 63.5321, lng: -19.5114, url: 'https://www.south.is/en/place/skogafoss-waterfall' },
      { name: 'Sólheimajökull', note: 'Walk 15 min from the lot to stand at a real glacier tongue.', lat: 63.5303, lng: -19.3510 },
      { name: 'Dyrhólaey', note: 'Rock arch + lighthouse; best puffin odds in July. Check closures during nesting.', lat: 63.4028, lng: -19.1113 },
      { name: 'Reynisfjara', note: 'Black sand, basalt columns, Reynisdrangar sea stacks. NEVER turn your back on the waves — sneaker waves are real here.', lat: 63.4054, lng: -19.0448 },
    ],
    morning: [
      { name: 'Kaffi Duus (Keflavík)', note: 'Harbour-side coffee & breakfast 10 min from the airport if you want fuel before driving.', lat: 64.0067, lng: -22.5624, url: 'https://duus.is/' },
      { name: 'Skool Beans (Vík)', note: 'Espresso in a yellow school bus — for when you reach Vík.', lat: 63.4190, lng: -19.0104 },
    ],
    lunch: [
      { name: 'Gamla fjósið', note: 'Farm restaurant in an old cowshed near Skógafoss; famous beef soup.', lat: 63.5498, lng: -19.6470, url: 'https://www.gamlafjosid.is/' },
      { name: 'Mia’s Country Van', note: 'Fish & chips van under Seljalandsfoss. Cash-free, cult following.', lat: 63.6120, lng: -19.9920 },
    ],
    dinner: [
      { name: 'Smiðjan Brugghús', note: 'Vík’s craft brewery — burgers, ribs, local beer flights.', lat: 63.4183, lng: -19.0101, url: 'https://smidjanbrugghus.is/' },
      { name: 'The Soup Company', note: 'Hearty soups in bread bowls; the lamb one after a wet day is medicinal.', lat: 63.4187, lng: -19.0090, url: 'https://www.thesoupcompany.is/' },
      { name: 'Suður-Vík', note: 'The sit-down option on the hill; lamb, langoustine pasta, Asian twists.', lat: 63.4198, lng: -19.0072 },
    ],
    notes: 'Long day on no sleep — front-load the waterfalls, nap threshold permitting. Check-in 17:00–18:00.',
  },
  {
    id: 2, date: '2026-07-10', route: 'd2',
    title: 'Glaciers & the iceberg lagoon',
    from: 'Vík', to: 'Höfn',
    hotel: 'oldairline', miles: 168, hours: 3.5,
    summary: 'Canyon, national park, then icebergs: Fjaðrárgljúfur, Skaftafell (Svartifoss hike), Jökulsárlón lagoon and Diamond Beach, ending in langoustine country.',
    stops: [
      { name: 'Fjaðrárgljúfur', note: '2 km serpentine canyon, 100 m deep. Easy rim walk, ~1 hr.', lat: 63.7712, lng: -18.1719 },
      { name: 'Skaftafell / Vatnajökull NP', note: 'Hike to Svartifoss (basalt-column falls): 5.5 km round trip, ~1.5–2 hrs. Visitor centre has trail maps.', lat: 64.0166, lng: -16.9752, url: 'https://www.vatnajokulsthjodgardur.is/en' },
      { name: 'Jökulsárlón', note: 'Icebergs calving into the lagoon, seals cruising between them. Zodiac/amphibian boat tours if you fancy.', lat: 64.0480, lng: -16.1790, url: 'https://icelagoon.is/' },
      { name: 'Diamond Beach', note: 'Across the road: stranded ice chunks glittering on black sand.', lat: 64.0430, lng: -16.1755 },
    ],
    morning: [
      { name: 'Reynisfjara re-visit', note: 'If yesterday was rushed or crowded — mornings are quieter on the black beach.', lat: 63.4054, lng: -19.0448 },
      { name: 'Vík church viewpoint', note: '10-min walk up for the classic red-roof-over-the-sea photo before you leave town.', lat: 63.4215, lng: -19.0086 },
      { name: 'Skool Beans', note: 'School-bus coffee for the road.', lat: 63.4190, lng: -19.0104 },
    ],
    lunch: [
      { name: 'Systrakaffi', note: 'Cosy café in Kirkjubæjarklaustur, right by Fjaðrárgljúfur turn-off.', lat: 63.7883, lng: -18.0500 },
      { name: 'Glacier Goodies', note: 'Food truck at Skaftafell — lobster soup & fish and chips between hikes.', lat: 64.0159, lng: -16.9716 },
    ],
    dinner: [
      { name: 'Pakkhús', note: 'THE Höfn langoustine house, in an old harbour warehouse. No reservations — go early.', lat: 64.2506, lng: -15.2101, url: 'https://pakkhus.is/' },
      { name: 'Hafnarbúðin', note: 'Harbour shack doing the legendary langoustine baguette for half the price.', lat: 64.2503, lng: -15.2080 },
      { name: 'Otto Matur & Drykkur', note: 'Bistro in Höfn’s oldest house if Pakkhús is slammed.', lat: 64.2495, lng: -15.2094 },
    ],
    notes: 'Höfn = langoustine capital of Iceland. Check-in 15:00–20:00.',
  },
  {
    id: 3, date: '2026-07-11', route: 'd3',
    title: 'Eastfjords to the rainbow village',
    from: 'Höfn', to: 'Seyðisfjörður',
    hotel: 'seydis', miles: 172, hours: 3.75,
    summary: 'Slow coastal driving day — fjord after fjord, fishing villages, reindeer country — over the Fjarðarheiði pass into artsy Seyðisfjörður.',
    stops: [
      { name: 'Stokksnes / Vestrahorn', note: '15 min from Höfn: the most photogenic mountain in Iceland over black dunes (small fee at Viking Café).', lat: 64.2444, lng: -14.9750 },
      { name: 'Djúpivogur', note: 'Sleepy harbour village with the Eggin í Gleðivík egg sculptures. Good leg-stretch.', lat: 64.6560, lng: -14.2830 },
      { name: 'Petra’s Stone Collection', note: 'One woman’s lifetime of found minerals in Stöðvarfjörður — oddly moving.', lat: 64.8342, lng: -13.8698, url: 'https://steinapetra.is/' },
      { name: 'Seyðisfjörður rainbow street', note: 'Rainbow-painted lane leading to the powder-blue church. The town is the sight.', lat: 65.2609, lng: -14.0102 },
      { name: 'Tvísöngur sound sculpture', note: '15-min uphill walk to concrete domes that sing back at you over the fjord.', lat: 65.2662, lng: -13.9880 },
    ],
    morning: [
      { name: 'Ósland viewpoint', note: 'Short harbour-edge walk in Höfn; nesting birds and glacier views across the bay.', lat: 64.2440, lng: -15.2090 },
      { name: 'Langoustine lunch plan', note: 'The sheet says it: langoustine lunch in Höfn before you roll — Hafnarbúðin opens at 9.', lat: 64.2503, lng: -15.2080 },
      { name: 'Watch for reindeer', note: 'East Iceland is the only region with wild reindeer — scan hillsides all afternoon.', lat: 64.9, lng: -14.5 },
    ],
    lunch: [
      { name: 'Hafnarbúðin (Höfn)', note: 'Langoustine baguette to launch the day — trip-sheet approved.', lat: 64.2503, lng: -15.2080 },
      { name: 'Við Voginn (Djúpivogur)', note: 'Harbour-view fish & chips halfway up the fjords.', lat: 64.6558, lng: -14.2853 },
      { name: 'Langabúð', note: 'Café in Djúpivogur’s 1790 log warehouse — cakes and soup.', lat: 64.6565, lng: -14.2845 },
    ],
    dinner: [
      { name: 'Norð Austur Sushi & Bar', note: 'Improbably great sushi above the old hotel — Icelandic fish, Japanese hands. Book if you can.', lat: 65.2609, lng: -14.0100, url: 'https://www.nordaustur.is/' },
      { name: 'Kaffi Lára – El Grillo Bar', note: 'Burgers, lamb and the local El Grillo beer, named for the sunken WWII tanker in the fjord.', lat: 65.2607, lng: -14.0095 },
    ],
    notes: 'Check-in 16:00–22:00, so no rush — linger in the fjords.',
  },
  {
    id: 4, date: '2026-07-12', route: 'd4',
    title: 'Dettifoss & the Mývatn moonscape',
    from: 'Seyðisfjörður', to: 'Akureyri',
    hotel: 'solgardar', miles: 170, hours: 3.6,
    summary: 'Big geology day: Europe’s most powerful waterfall, boiling mud at Hverir, lava castles at Dimmuborgir, a soak at Mývatn Nature Baths, then Goðafoss on the way into Akureyri.',
    stops: [
      { name: 'Dettifoss (west bank)', note: 'Take Rd 862 — paved. 1 km walk to the thundering edge. Grey glacial water, 100 m wide.', lat: 65.8145, lng: -16.3850 },
      { name: 'Hverir / Námaskarð', note: 'Boiling mud pots, fumaroles, sulfur-orange earth. Smells like the underworld; looks like Mars.', lat: 65.6408, lng: -16.8080 },
      { name: 'Grjótagjá', note: 'The lava cave with the steaming blue pool (Jon Snow’s cave). Look, don’t bathe.', lat: 65.6262, lng: -16.8827 },
      { name: 'Dimmuborgir', note: '"Dark castles" — collapsed lava tube labyrinth. Easy 1-hr loop trails.', lat: 65.5910, lng: -16.9110 },
      { name: 'Mývatn Nature Baths', note: 'The Blue Lagoon’s quieter northern cousin. Milky-blue soak with a view. Towels rentable.', lat: 65.6303, lng: -16.8481, url: 'https://myvatnnaturebaths.is/' },
      { name: 'Goðafoss', note: '"Waterfall of the gods" — horseshoe falls right off the Ring Road, 40 min before Akureyri.', lat: 65.6827, lng: -17.5501 },
    ],
    morning: [
      { name: 'Rainbow street + Blue Church', note: 'Morning light on the fjord before the pass — photograph it empty.', lat: 65.2609, lng: -14.0102 },
      { name: 'Skaftfell Bistro', note: 'Art-centre café for coffee & waffles before the drive.', lat: 65.2600, lng: -14.0080 },
    ],
    lunch: [
      { name: 'Vogafjós Farm Resort', note: 'Eat next to the cows that made your mozzarella — Mývatn institution, geysir bread + smoked trout.', lat: 65.6055, lng: -16.9103, url: 'https://vogafjosfarmresort.is/' },
      { name: 'Daddi’s Pizza', note: 'Legendary little pizza hut at Mývatn; the smoked-trout pie works, trust it.', lat: 65.6420, lng: -16.9110 },
    ],
    dinner: [
      { name: 'Rub23', note: 'Akureyri’s fish & sushi flagship — pick your rub. Book ahead.', lat: 65.6836, lng: -18.0879, url: 'https://rub23.is/' },
      { name: 'Strikið', note: '5th-floor dining over the fjord; catch of the day + sunset that never ends.', lat: 65.6829, lng: -18.0892, url: 'https://strikid.is/' },
      { name: 'Greifinn', note: 'Casual family favourite — pizza and hamsteak, zero pretension.', lat: 65.6866, lng: -18.1004 },
      { name: 'Brynja', note: 'The famous ice cream — Akureyrians queue at midnight. Dessert is mandatory.', lat: 65.6740, lng: -18.0977 },
    ],
    notes: 'Longest sightseeing day. Baths towel = 800 ISK, bring swimsuits in day bag. Check-in 16:00–22:00.',
  },
  {
    id: 5, date: '2026-07-13', route: 'd5',
    title: 'Whales, then the long haul south',
    from: 'Akureyri', to: 'Borgarnes',
    hotel: 'setrid', miles: 195, hours: 3.75,
    summary: 'Morning whale watching from Akureyri (or detour to Húsavík, the whale capital), then the scenic haul across northwest Iceland with a crater climb near Borgarnes.',
    stops: [
      { name: 'Whale watching, Akureyri', note: 'Humpbacks in Eyjafjörður — 3-hr tours from the pier (Elding/Ambassador). Book the 8:30 or 9:00.', lat: 65.6885, lng: -18.0878, url: 'https://www.whalewatchingakureyri.is/' },
      { name: 'Húsavík (option)', note: 'The whale-watching capital + whale museum. Adds ~1.5 hrs of driving — worth it if the forecast is calm.', lat: 66.0449, lng: -17.3389, url: 'https://www.northsailing.is/' },
      { name: 'Staðarskáli', note: 'The famous N1 mid-way stop — every Icelander’s road-trip ritual. Gas, hot dogs, soft serve.', lat: 65.1266, lng: -21.0819 },
      { name: 'Grábrók crater', note: '20-min stair climb up a 3,400-year-old crater rim, right off Rd 1. Great leg-stretch, big views.', lat: 64.7708, lng: -21.5360 },
    ],
    morning: [
      { name: 'Akureyrarkirkja', note: 'The basalt-inspired church above town — 5 min from the guesthouse.', lat: 65.6795, lng: -18.0902 },
      { name: 'Botanical Garden', note: 'One of the world’s northernmost gardens, free, lovely with coffee in hand.', lat: 65.6720, lng: -18.0930 },
      { name: 'Kaffi Ilmur', note: 'Breakfast/brunch buffet in a cottage on the main drag.', lat: 65.6842, lng: -18.0885 },
    ],
    lunch: [
      { name: 'Naustið (Húsavík)', note: 'If you took the whale detour: fish skewers and plokkfiskur by the harbour.', lat: 66.0454, lng: -17.3428 },
      { name: 'Staðarskáli', note: 'Ring Road institution — hot dog + soft serve is the correct order.', lat: 65.1266, lng: -21.0819 },
    ],
    dinner: [
      { name: 'Settlement Center Restaurant', note: 'In the saga museum building — lamb shank and the vegetarian pan are stalwarts.', lat: 64.5389, lng: -21.9219, url: 'https://www.landnam.is/' },
      { name: 'La Colina', note: 'Neapolitan-ish pizza in Borgarnes; small, cheerful, reliable.', lat: 64.5395, lng: -21.9205 },
      { name: 'Blómasetrið – Kaffi Kyrrð', note: 'Dinner-lite option: soups & cakes inside a flower shop.', lat: 64.5390, lng: -21.9190 },
    ],
    notes: 'Whale tours run rain or shine; take the sea-sickness tablet 30 min before. Check-in 16:00–21:00.',
  },
  {
    id: 6, date: '2026-07-14', route: 'd6',
    title: 'Snæfellsnes loop to Reykjavík',
    from: 'Borgarnes', to: 'Reykjavík',
    hotel: 'canopy', miles: 46, hours: 1.5,
    summary: 'Decision day: the direct 1.5-hr drive to Reykjavík, or the full Snæfellsnes Peninsula loop — Kirkjufell, Arnarstapi cliffs, Djúpalónssandur — "Iceland in miniature" (adds ~5 hrs). The route below maps the full loop.',
    stops: [
      { name: 'Kirkjufell + Kirkjufellsfoss', note: 'Iceland’s most photographed mountain, with the little falls in front. 30-min stop.', lat: 64.9410, lng: -23.3067 },
      { name: 'Arnarstapi cliffs', note: 'Basalt arches (Gatklettur), nesting kittiwakes, and the 2.5 km coastal walk to Hellnar.', lat: 64.7674, lng: -23.6222 },
      { name: 'Djúpalónssandur', note: 'Black pebble beach with shipwreck iron and the four lifting stones — try the "weakling" one.', lat: 64.7519, lng: -23.9007 },
      { name: 'Búðakirkja (bonus)', note: 'The little black church on the lava field, on the south-coast route back.', lat: 64.8222, lng: -23.3850 },
    ],
    morning: [
      { name: 'Geirabakarí Kaffihús', note: 'Bakery with the fjord view (it played the Papa John’s in Walter Mitty). Kleinur for the road.', lat: 64.5439, lng: -21.9177 },
      { name: 'Englendingavík', note: 'Pretty cove walk below the old town before you drive.', lat: 64.5373, lng: -21.9236 },
    ],
    lunch: [
      { name: 'Stapinn (Arnarstapi)', note: 'Fish soup & fish and chips at the foot of the cliffs.', lat: 64.7680, lng: -23.6210 },
      { name: 'Samkomuhúsið Arnarstapi', note: 'The nicer sit-down in the old community hall.', lat: 64.7685, lng: -23.6200 },
    ],
    dinner: [
      { name: 'Sægreifinn (Sea Baron)', note: 'Harbour shack, the original lobster soup, grab-a-skewer counter. Cash-friendly, queue moves fast.', lat: 64.1508, lng: -21.9430 },
      { name: 'Messinn', note: 'Sizzling fish pans — the arctic char is the move. Book or go early.', lat: 64.1470, lng: -21.9370, url: 'https://messinn.com/' },
      { name: 'Íslenski Barinn', note: 'Icelandic comfort classics + local beers, steps from the Canopy.', lat: 64.1472, lng: -21.9340 },
    ],
    notes: 'Canopy has valet-adjacent parking pain — use Kolaport/Traðarkot car parks. Check-in from 15:00.',
  },
  {
    id: 7, date: '2026-07-15', route: null,
    title: 'Reykjavík on foot',
    from: 'Reykjavík', to: 'Reykjavík',
    hotel: 'citycenter', miles: 0, hours: 0,
    summary: 'Car stays parked. Hallgrímskirkja tower, Sun Voyager, Harpa, the old harbour, Laugavegur wandering — and a Sky Lagoon soak as the finale.',
    stops: [
      { name: 'Hallgrímskirkja', note: 'Ride the tower lift first thing (9:00) to beat the queue; the rocket-ship church is the city’s compass.', lat: 64.1417, lng: -21.9266, url: 'https://www.hallgrimskirkja.is/' },
      { name: 'Sun Voyager', note: 'The steel dream-boat on the waterfront — 10-min walk from Harpa.', lat: 64.1476, lng: -21.9222 },
      { name: 'Harpa', note: 'Honeycomb-glass concert hall; wander the lobby light for free.', lat: 64.1505, lng: -21.9324, url: 'https://www.harpa.is/en' },
      { name: 'Old Harbour', note: 'Boats, street food, the Whales of Iceland exhibit if weather turns.', lat: 64.1520, lng: -21.9440 },
      { name: 'Laugavegur & Skólavörðustígur', note: 'The main shopping/café drags — the rainbow street photo is Skólavörðustígur.', lat: 64.1445, lng: -21.9270 },
      { name: 'Sky Lagoon', note: 'Oceanfront infinity lagoon + the 7-step ritual. Book the evening slot as the trip finale.', lat: 64.1287, lng: -21.9440, url: 'https://www.skylagoon.com/' },
    ],
    morning: [
      { name: 'Brauð & Co', note: 'The cinnamon-roll place, in the graffiti-wrapped building by Hallgrímskirkja.', lat: 64.1428, lng: -21.9270, url: 'https://www.braudogco.is/' },
      { name: 'Reykjavik Roasters', note: 'Best flat white in town, vinyl on the turntable.', lat: 64.1434, lng: -21.9258 },
      { name: 'Sandholt', note: 'Proper bakery breakfast on Laugavegur if you want to sit.', lat: 64.1443, lng: -21.9295 },
    ],
    lunch: [
      { name: 'Bæjarins Beztu Pylsur', note: 'THE hot dog stand (est. 1937) — order "eina með öllu" (one with everything). On your list!', lat: 64.1486, lng: -21.9384, url: 'https://www.bbp.is/' },
      { name: 'Reykjavik Fish', note: 'Fish & chips by the harbour, plokkfiskur too.', lat: 64.1500, lng: -21.9450 },
      { name: 'Hlemmur Mathöll', note: 'Food hall at the old bus station — something for both of you.', lat: 64.1435, lng: -21.9150 },
    ],
    dinner: [
      { name: 'Messinn', note: 'If you missed it yesterday — the fish pans deserve two chances.', lat: 64.1470, lng: -21.9370, url: 'https://messinn.com/' },
      { name: 'Apotek', note: 'Old-pharmacy building, celebratory last-ish dinner vibes.', lat: 64.1477, lng: -21.9394, url: 'https://apotek.is/' },
      { name: 'Café Loki', note: 'Traditional plates (rye-bread ice cream!) opposite Hallgrímskirkja.', lat: 64.1419, lng: -21.9253 },
    ],
    notes: 'Hotel swap day: check out of Canopy by 11:00, City Center Hotel check-in from 14:00 — it’s a 4-min walk between them; ask to store bags.',
  },
  {
    id: 8, date: '2026-07-16', route: 'd8',
    title: 'Last morning & fly home',
    from: 'Reykjavík', to: 'KEF → BWI',
    hotel: null, miles: 30, hours: 0.8,
    summary: 'Checkout by 11:00. One last wander — flea market (weekends only, alas), museums, final hot dog — then drop the car at KEF by 14:00 for the 17:00 flight.',
    stops: [
      { name: 'Kolaportið flea market', note: 'The "cheap market" — NOTE: open weekends only, so today (Thursday) it’s closed. Fermented shark stalls survive inside.', lat: 64.1497, lng: -21.9398, url: 'https://kolaportid.is/' },
      { name: 'Icelandic Phallological Museum', note: 'Yes, the penis museum. 320+ specimens. Opens 10:00 — doable before the airport run.', lat: 64.1490, lng: -21.9328, url: 'https://phallus.is/' },
      { name: 'National Museum of Iceland', note: 'The settlement-to-now story, 1.5 hrs well spent if the weather is grim.', lat: 64.1417, lng: -21.9485, url: 'https://www.thjodminjasafn.is/english' },
      { name: 'Bæjarins Beztu (one for the road)', note: 'Final eina með öllu before the drive.', lat: 64.1486, lng: -21.9384 },
    ],
    morning: [
      { name: 'Sandholt breakfast', note: 'Last proper pastry. You’ve earned it.', lat: 64.1443, lng: -21.9295 },
    ],
    lunch: [
      { name: 'Airport timing', note: 'Car drop at Budget KEF by 14:00; flight FI 17:00, lands BWI 19:25. Eat in town or grab Loksins Bar at KEF.', lat: 63.9850, lng: -22.6056 },
    ],
    dinner: [],
    notes: 'Icelandair FI: KEF 17:00 → BWI 19:25. Duty-free liquor is genuinely cheaper at KEF arrivals/departures.',
  },
];

const EXTRAS = [
  { name: 'Bæjarins Beztu Pylsur', note: 'Icelandic hot dog — the list item. Day 7 lunch has it.', lat: 64.1486, lng: -21.9384, url: 'https://www.bbp.is/' },
  { name: 'Icelandic Phallological Museum', note: 'The penis museum. Reykjavík, opens 10:00 daily.', lat: 64.1490, lng: -21.9328, url: 'https://phallus.is/' },
  { name: 'Cat walking tour', note: 'Reykjavík’s free-roaming cats have their own walking tour — book ahead.', lat: 64.1450, lng: -21.9280, url: 'https://www.google.com/search?q=reykjavik+cat+walking+tour' },
  { name: 'Kolaportið (cheap market)', note: 'Weekend flea market by the harbour — weekends ONLY, which sadly misses your Tue–Thu city days. Vintage lopapeysur upstairs.', lat: 64.1497, lng: -21.9398, url: 'https://kolaportid.is/' },
];

const LOGISTICS = {
  flights: {
    conf: 'QlBHRzNT',
    out: { route: 'BWI → KEF', date: 'Wed 8 July', dep: '20:30', arr: '6:25 (9 July)' },
    back: { route: 'KEF → BWI', date: 'Thu 16 July', dep: '17:00', arr: '19:25' },
    saga: 'NDk5NjUzNjY5OQ==',
    eticket: 'MTA4NzM1OTIwNzU1Ng==',
    shuttle: 'Lava shuttle if needed: +354 519 4141',
  },
  car: {
    company: 'Budget, Keflavík Airport',
    budgetConf: 'NDkzMjA2MzFVUzM=',
    amexConf: 'Wk8tQVgxMDY0LTY5MDUw',
    pickup: 'KEF · Thu 9 July · 07:00',
    dropoff: 'KEF · Thu 16 July · 14:00',
  },
  emergency: '112 is Iceland’s emergency number. SafeTravel.is for road & weather alerts. Road conditions: road.is · Weather: vedur.is',
};
