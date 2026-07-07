# word: (transliteration, gloss-or-None)
PRON = {
  "Keflavík": ("KEP-la-veek", "driftwood bay"),
  "Vík": ("VEEK", "bay"),
  "Höfn": ("HUP'n — almost one syllable", "harbour"),
  "Seyðisfjörður": ("SAY-this-FYUR-thur", "fjord of Seyðis"),
  "Akureyri": ("AH-ku-RAY-ree", "field sandbank"),
  "Borgarnes": ("BOR-gar-ness", "rocky headland"),
  "Reykjavík": ("RAY-kya-veek", "smoky bay"),
  "Snæfellsnes": ("SNYE-fetls-ness", "snow-mountain peninsula"),
  "Seljalandsfoss": ("SEL-ya-lands-foss", "foss = waterfall"),
  "Gljúfrabúi": ("GLYOO-vra-BOO-ee", "canyon dweller"),
  "Skógafoss": ("SKOH-ga-foss", "forest waterfall"),
  "Sólheimajökull": ("SOHL-hay-ma-YO-kutl", "jökull = glacier"),
  "Dyrhólaey": ("DIR-hoh-la-ay", "door-hill island"),
  "Reynisfjara": ("RAY-nis-FYAH-ra", "fjara = beach"),
  "Fjaðrárgljúfur": ("FYATH-rowr-GLYOO-vur", "feather-river canyon"),
  "Skaftafell": ("SKAF-ta-fetl", None),
  "Vatnajökull": ("VAT-na-YO-kutl", "lakes glacier"),
  "Svartifoss": ("SVAR-ti-foss", "black waterfall"),
  "Jökulsárlón": ("YO-kul-SOWR-lohn", "glacier-river lagoon"),
  "Stokksnes": ("STOHKS-ness", None),
  "Vestrahorn": ("VES-tra-horn", "western horn"),
  "Djúpivogur": ("DYOO-pee-VOH-gur", "deep inlet"),
  "Tvísöngur": ("TVEE-seun-gur", "twin song"),
  "Dettifoss": ("DET-tee-foss", "tumbling waterfall"),
  "Hverir": ("KVEH-rir", "hot springs"),
  "Námaskarð": ("NOW-ma-skarth", "mine pass"),
  "Grjótagjá": ("GRYOH-ta-gyow", "rocky fissure"),
  "Dimmuborgir": ("DIM-mu-BOR-gir", "dark castles"),
  "Mývatn": ("MEE-vahtn", "midge lake"),
  "Goðafoss": ("GO-tha-foss", "waterfall of the gods"),
  "Húsavík": ("HOO-sa-veek", "house bay"),
  "Staðarskáli": ("STAH-thar-SKOW-lee", None),
  "Grábrók": ("GROW-brohk", None),
  "Kirkjufell": ("KIR-kyu-fetl", "church mountain"),
  "Kirkjufellsfoss": ("KIR-kyu-fetls-foss", "church mountain falls"),
  "Arnarstapi": ("AR-nar-STAH-pee", "eagle crag"),
  "Djúpalónssandur": ("DYOO-pa-LOHNS-SAN-dur", "deep lagoon sands"),
  "Búðakirkja": ("BOO-tha-KIR-kya", "the black church at Búðir"),
  "Hallgrímskirkja": ("HATL-greems-KIR-kya", "Hallgrímur's church"),
  "Harpa": ("HAR-pa", "harp"),
  "Laugavegur": ("LOY-ga-VEH-gur", "wash-springs road"),
  "Skólavörðustígur": ("SKOH-la-VUR-thu-STEE-gur", "the rainbow street"),
  "Kolaportið": ("KO-la-POR-tith", "the coal port"),
  "Bæjarins Beztu Pylsur": ("BYE-ya-rins BES-tu PIL-sur", "the town's best hot dogs"),
  "eina með öllu": ("AY-na meth UT-lu", "one with everything"),
  "Smiðjan Brugghús": ("SMITH-yan BRUG-hoos", "the smithy brewhouse"),
  "Suður-Vík": ("SU-thur-VEEK", "south Vík"),
  "Pakkhús": ("PAHK-hoos", "the warehouse"),
  "Hafnarbúðin": ("HAP-nar-BOO-thin", "the harbour shop"),
  "Systrakaffi": ("SIS-tra-KAF-fee", "the sisters' café"),
  "Langabúð": ("LOWN-ga-booth", "the long store"),
  "Við Voginn": ("VITH VOH-gin", "by the cove"),
  "Norð Austur": ("NORTH OY-stur", "north east"),
  "Kaffi Lára": ("KAF-fee LOW-ra", None),
  "Vogafjós": ("VOH-ga-FYOHS", "cowshed by the cove"),
  "Rub23": None,
  "Strikið": ("STRIH-kith", "the stroll street"),
  "Greifinn": ("GRAY-vin", "the count"),
  "Brynja": ("BRIN-ya", None),
  "Kaffi Ilmur": ("KAF-fee IL-mur", "café aroma"),
  "Akureyrarkirkja": ("AH-ku-RAY-rar-KIR-kya", "Akureyri church"),
  "Naustið": ("NOY-stith", "the boathouse"),
  "Geirabakarí": ("GAY-ra-BAH-ka-ree", "Geiri's bakery"),
  "Englendingavík": ("ENG-len-din-ga-veek", "Englishmen's bay"),
  "Blómasetrið – Kaffi Kyrrð": ("BLOH-ma-SET-rith · KAF-fee KIRTH", "flower centre · café calm"),
  "Sægreifinn": ("SYE-gray-vin", "the sea baron"),
  "Messinn": ("MES-sin", "the mess hall"),
  "Íslenski Barinn": ("EES-len-skee BAH-rin", "the Icelandic bar"),
  "Brauð & Co": ("BROYTH og KOH", "brauð = bread"),
  "Sandholt": ("SAND-holt", None),
  "Hlemmur Mathöll": ("HLEM-mur MAT-hutl", "Hlemmur food hall"),
  "Gamla fjósið": ("GAM-la FYOH-sith", "the old cowshed"),
  "Ósland": ("OHS-land", None),
  "Setrid Guesthouse": ("SET-rith", None),
  "Guesthouse Solgardar": ("SOHL-gar-thar", "sun gardens"),
}
# TTS text overrides where the display key isn't the pure Icelandic to speak
SAY = {
  "Bæjarins Beztu Pylsur": "Bæjarins bestu pylsur",
  "Blómasetrið – Kaffi Kyrrð": "Blómasetrið, Kaffi Kyrrð",
  "Brauð & Co": "Brauð og kó",
  "Setrid Guesthouse": "Setrið",
  "Guesthouse Solgardar": "Sólgarðar",
  "Suður-Vík": "Suður-Vík",
}
import re, unicodedata
def slug(s):
    s = s.replace('ð','d').replace('Ð','D').replace('þ','th').replace('Þ','Th').replace('æ','ae').replace('Æ','Ae').replace('ö','o').replace('Ö','O')
    s = unicodedata.normalize('NFKD', s).encode('ascii','ignore').decode()
    return re.sub(r'[^a-z0-9]+','-', s.lower()).strip('-')
if __name__ == '__main__':
    import json, wave, os, subprocess, tempfile, pathlib
    from piper import PiperVoice
    SITE = pathlib.Path(__file__).resolve().parent.parent
    v = PiperVoice.load('./voices/is_IS-salka-medium.onnx')
    os.makedirs(SITE / 'audio', exist_ok=True)
    out = {}
    for word, info in PRON.items():
        if info is None: continue
        s = slug(word)
        wav = os.path.join(tempfile.gettempdir(), f'{s}.wav')
        with wave.open(wav, 'wb') as w:
            v.synthesize_wav(SAY.get(word, word), w)
        # MP3 via ffmpeg — Chrome would not decode afconvert's AAC/M4A output
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', wav,
                        '-codec:a', 'libmp3lame', '-q:a', '7',
                        str(SITE / 'audio' / f'{s}.mp3')], check=True)
        out[word] = {"f": s, "t": info[0], **({"g": info[1]} if info[1] else {})}
    with open(SITE / 'pron.js', 'w') as f:
        f.write("// Pronunciations: Piper TTS (is_IS-salka, trained on Iceland's open Talromur corpus)\n")
        f.write("const PRON = " + json.dumps(out, ensure_ascii=False) + ";\n")
    print(f"{len(out)} words -> audio/, pron.js written")

# Regenerate:
#   pip install piper-tts && python -m piper.download_voices is_IS-salka-medium --data-dir ./voices
#   python tools/pron.py   (needs ffmpeg; writes site/audio/*.mp3 + site/pron.js)
