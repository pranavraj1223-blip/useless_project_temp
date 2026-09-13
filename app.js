/**
 * CertiFate — Core Destiny Engine & Web Application Logic
 * Bureau of Cosmic Predestination
 * Upgraded with:
 * 1. Timeline Selection: Past vs. Future Trajectory
 * 2. Live Alphabetical Code Decoder for Names (A=1...Z=26)
 * 3. Timeline-Adaptive Answers (Creatures, Eras, and Epicenters)
 * 4. Cosmic Reincarnation Wealth & Material Destiny Prediction
 */

(function () {
  'use strict';

  // State
  let soundEnabled = true;
  let audioCtx = null;
  let selectedTimeline = 'past'; // 'past' | 'future'
  let selectedEpoch = 'All Antiquity';
  let currentCertData = null;

  // DOM Elements - Form & Controls
  const destinyForm = document.getElementById('destinyForm');
  const fullNameInput = document.getElementById('fullName');
  const birthDateInput = document.getElementById('birthDate');
  const nameCharBadge = document.getElementById('nameCharBadge');
  const randomizeBtn = document.getElementById('randomizeBtn');
  const generateBtnText = document.getElementById('generateBtnText');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundStatus = document.getElementById('soundStatus');
  const soundIcon = document.getElementById('soundIcon');

  // Timeline Selection Elements
  const timelineOptionPast = document.getElementById('timelineOptionPast');
  const timelineOptionFuture = document.getElementById('timelineOptionFuture');
  const subFilterLabel = document.getElementById('subFilterLabel');
  const epochChipsWrapper = document.getElementById('epochChipsWrapper');
  const quickSummonPills = document.getElementById('quickSummonPills');

  // Alphabetical Code Decoder Elements
  const alphaCodeBox = document.getElementById('alphaCodeBox');
  const alphaCodeSumBadge = document.getElementById('alphaCodeSumBadge');
  const alphaCodeBreakdown = document.getElementById('alphaCodeBreakdown');
  const alphaStockConnection = document.getElementById('alphaStockConnection');
  const alphaConnTicker = document.getElementById('alphaConnTicker');
  const alphaConnName = document.getElementById('alphaConnName');

  // Loading Sequence Elements
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingHeadline = document.getElementById('loadingHeadline');
  const loadingStepDesc = document.getElementById('loadingStepDesc');
  const progressFill = document.getElementById('progressFill');
  const loadingPercent = document.getElementById('loadingPercent');
  const protocolTag = document.getElementById('protocolTag');

  // Certificate Presentation Elements
  const certificateSection = document.getElementById('certificateSection');
  const certGrandTitle = document.getElementById('certGrandTitle');
  const certMinistry = document.getElementById('certMinistry');
  const certDecree = document.getElementById('certDecree');
  const certEraPill = document.getElementById('certEraPill');
  const certEraIcon = document.getElementById('certEraIcon');
  const certEraText = document.getElementById('certEraText');
  const certSubjectName = document.getElementById('certSubjectName');
  const certSubjectDob = document.getElementById('certSubjectDob');
  const certSerialNo = document.getElementById('certSerialNo');
  const certIssueDate = document.getElementById('certIssueDate');
  const certBarcodeNum = document.getElementById('certBarcodeNum');

  // Finding 1: Reincarnation
  const findingCardReincarnation = document.getElementById('findingCardReincarnation');
  const reincarnationBadgeIcon = document.getElementById('reincarnationBadgeIcon');
  const reincarnationBadgeTitle = document.getElementById('reincarnationBadgeTitle');
  const reincarnationHeadline = document.getElementById('reincarnationHeadline');
  const reincarnationSpecies = document.getElementById('reincarnationSpecies');
  const reincarnationCountry = document.getElementById('reincarnationCountry');
  const reincarnationCountryKey = document.getElementById('reincarnationCountryKey');
  const reincarnationDesc = document.getElementById('reincarnationDesc');

  // Finding 2: Geo-Destiny
  const findingCardGeodestiny = document.getElementById('findingCardGeodestiny');
  const geoBadgeIcon = document.getElementById('geoBadgeIcon');
  const geoBadgeTitle = document.getElementById('geoBadgeTitle');
  const geoDestinyHeadline = document.getElementById('geoDestinyHeadline');
  const geoCoordinates = document.getElementById('geoCoordinates');
  const geoResolvedLocation = document.getElementById('geoResolvedLocation');
  const geoResolvedLocationKey = document.getElementById('geoResolvedLocationKey');
  const geoDestinyDesc = document.getElementById('geoDestinyDesc');

  // Factor 3: Wealth Destiny Elements
  const findingCardFinancial = document.getElementById('findingCardFinancial');
  const wealthHeadline = document.getElementById('wealthHeadline') || document.getElementById('financialHeadline');
  const wealthNetWorth = document.getElementById('wealthNetWorth');
  const wealthHoldings = document.getElementById('wealthHoldings');
  const wealthDecreeText = document.getElementById('wealthDecreeText');

  // Certificate Actions
  const waxSeal = document.getElementById('waxSeal');
  const shareDestinyBtn = document.getElementById('shareDestinyBtn');
  const downloadImageBtn = document.getElementById('downloadImageBtn');
  const printCertBtn = document.getElementById('printCertBtn');
  const copySummaryBtn = document.getElementById('copySummaryBtn');
  const resetBtn = document.getElementById('resetBtn');
  const toastMessage = document.getElementById('toastMessage');

  // Ambient Starfield & Cosmic Pulse
  const starfieldCanvas = document.getElementById('starfieldCanvas');
  const cosmicPulseOverlay = document.getElementById('cosmicPulseOverlay');

  /* ==========================================================================
     Database: Timeline Archetypes & Focus Chips
     ========================================================================== */
  const TIMELINE_CONFIG = {
    past: {
      label: 'Attuned Historical Horizon:',
      epochs: ['All Antiquity', 'Ancient Egypt & Greece', 'Feudal Dynasties', 'Renaissance & Baroque', 'Prehistoric Era'],
      travelers: [
        { name: 'Arthur Dent', dob: '1978-03-11' },
        { name: 'Cleopatra Philopator', dob: '1969-08-12' },
        { name: 'Nikola Tesla', dob: '1856-07-10' },
        { name: 'Leonardo da Vinci', dob: '1952-04-15' },
        { name: 'Hypatia of Alexandria', dob: '1970-03-15' }
      ]
    },
    future: {
      label: 'Attuned Technological Horizon:',
      epochs: ['All Futures', 'Cyberpunk Sol-System (2150)', 'Off-World Colonies (2380)', 'Dyson Swarm Era (3100)', 'Post-Singularity Cosmos'],
      travelers: [
        { name: 'Commander Shepard', dob: '2054-04-11' },
        { name: 'Ada Lovelace 2.0', dob: '2092-12-10' },
        { name: 'Neo-Socrates', dob: '2110-09-22' },
        { name: 'Deckard Blade', dob: '2079-05-19' },
        { name: 'Captain Nyx Vance', dob: '2135-08-04' }
      ]
    }
  };

  /* ==========================================================================
     Database 1: Past Reincarnations (Historical / Ancient / Mythic)
     ========================================================================== */
  const PAST_REINCARNATIONS = [
    {
      species: 'Threskiornis aethiopicus (Sacred Golden Ibis)',
      title: 'Sacred Oracle Ibis of the Nile',
      era: 'Ptolemaic Egypt, 305 BCE',
      realm: 'The Nile Delta, Temple of Thoth',
      reason: 'Reborn in recognition of your profound patience with mortals. Granted divine status, daily offerings of sun-dried figs, and diplomatic immunity from Roman tax collectors.'
    },
    {
      species: 'Felis lybica (Philosopher Barn Cat of the Lyceum)',
      title: 'Existential Feline Thinker of Athens',
      era: 'Classical Greece, 340 BCE',
      realm: 'The Lyceum Groves, Ancient Athens',
      reason: 'Assigned to lounge in Aristotle’s lap while listening to lectures on virtue ethics, nodding sagely and sleeping 18 hours per solar cycle.'
    },
    {
      species: 'Bombyx mori (Imperial Silk Moth of Serenity)',
      title: 'Emperor’s Resplendent Imperial Silk Moth',
      era: 'Han Dynasty, 120 BCE',
      realm: 'Chang’an Imperial Palace Terraces',
      reason: 'Retroactive recompense for surviving terrestrial cubicle warfare. Awarded a tranquil life sipping sweet mulberry dew in the imperial gardens.'
    },
    {
      species: 'Equus caballus (Praetorian Chariot Stallion)',
      title: 'High Praetorian Golden Stallion',
      era: 'Imperial Rome, 180 CE',
      realm: 'Circus Maximus, Roman Empire',
      reason: 'Promoted to lead chariot racer with lifetime laurel wreaths, fresh Sicilian oats, and zero requirement to attend Senate meetings.'
    },
    {
      species: 'Corvus corax (Viking Skald Raven)',
      title: 'Allfather’s Prophetic Shadow Raven',
      era: 'Scandinavia, 870 CE',
      realm: 'Fjords of the Kingdom of Vestfold',
      reason: 'Commissioned to perch on dragon-headed longship prows, screeching dramatic poetic warnings to sea serpents.'
    },
    {
      species: 'Falco peregrinus (Astrological Falcon of Baghdad)',
      title: 'Grand Vizier’s Starlight Falcon',
      era: 'Abbasid Caliphate, 950 CE',
      realm: 'House of Wisdom, Baghdad',
      reason: 'Authorized to carry coded philosophical scrolls between astronomical observatories and enjoy silver-tipped leather perches.'
    },
    {
      species: 'Nyctereutes procyonoides (Enlightened Zen Tanuki)',
      title: 'Shape-Shifting Zen Tanuki of Heian-kyo',
      era: 'Classical Japan, 1050 CE',
      realm: 'Bamboo Groves of Kyoto Outskirts',
      reason: 'Granted spiritual mastery over bamboo forest illusions, warm sake flasks, and the ability to turn dry leaves into golden coins.'
    },
    {
      species: 'Canis lupus familiaris (Highland Castle Ghost Hound)',
      title: 'Noble Ghost Wolfhound of Skye',
      era: 'Scottish Highlands, 1340 CE',
      realm: 'Isle of Skye Castle Ruins',
      reason: 'Assigned to warm the great stone hearth during clan feasts, fetch roasted venison bones, and bark at passing bagpipers.'
    },
    {
      species: 'Columba livia (Renaissance Master Carrier Pigeon)',
      title: 'Machiavellian Master Dispatch Pigeon',
      era: 'Republic of Florence, 1495 CE',
      realm: 'Duomo Bell Towers, Florence',
      reason: 'Entrusted with secret diplomatic memos, while taking artistic liberties to drop paint-like droppings on rival merchant coats.'
    },
    {
      species: 'Mustela putorius furo (Alchemist’s Chaos Ferret)',
      title: 'Court Alchemist’s Philosopher Ferret',
      era: 'Holy Roman Empire, 1590 CE',
      realm: 'Golden Lane, Prague',
      reason: 'Permitted to steal mercury vials, inspect bubbling copper alembics, and sleep inside the Emperor’s velvet hat.'
    },
    {
      species: 'Tyto alba (Victorian Detective Barn Owl)',
      title: 'Scotland Yard Consulting Night Owl',
      era: 'Victorian London, 1888 CE',
      realm: 'Cobblestones of Baker Street & Thames',
      reason: 'Commissioned to judge the moral choices of Victorian pedestrians from baroque gas lamps amidst pea-soup fog.'
    },
    {
      species: 'Mammuthus primigenius (Tundra Hearth-Mammoth)',
      title: 'Ancient Woolly Mammoth of the Ice Age',
      era: 'Late Pleistocene, 12,000 BCE',
      realm: 'Glacial Steppes of Northern Eurasia',
      reason: 'Assigned to be an enormous, unbothered, majestic snow-plower with 9-foot curved ivory tusks and zero awareness of modern inflation.'
    }
  ];

  /* ==========================================================================
     Database 2: Future Reincarnations (Cyberpunk / Sci-Fi / Interstellar)
     ========================================================================== */
  const FUTURE_REINCARNATIONS = [
    {
      species: 'Hydrochoerus cyberneticus (Quantum Capybara)',
      title: 'Sentient Quantum Capybara of Sub-Orbital Bliss',
      era: 'Sol-Federation Era, 2380 CE',
      realm: 'Neo-Oslo Anti-Gravity Sky-Haven',
      reason: 'Assigned as eternal compensation for 21st-century digital fatigue. Equipped with superconducting fur and unlimited sub-orbital thermal hot-spring pods.'
    },
    {
      species: 'Smutsia nanotech (Titanium Cyber-Pangolin)',
      title: 'Nano-Alloy Armored Cyber-Pangolin',
      era: 'Neo-Tokyo Cyberpunk Horizon, 2142 CE',
      realm: 'Shinjuku Upper Megastructure Level 84',
      reason: 'Endowed with military-grade reflective chrome scales, high-speed neural hacking claws, and an insatiable appetite for rogue tracking algorithms.'
    },
    {
      species: 'Aurelia bioluminescens (Europa Void Jellyfish)',
      title: 'Bioluminescent Quantum Jellyfish',
      era: 'Jovian Colonization, 2590 CE',
      realm: 'Europa Sub-Crustal Hydrothermal Trench',
      reason: 'Free to drift through perpetual zero-pressure liquid oceans, communicating in hypnotic pulses of ultraviolet starlight.'
    },
    {
      species: 'Chinchilla lanigera aero (Martian Greenhouse Chinchilla)',
      title: 'Low-Gravity Martian Bio-Dome Chinchilla',
      era: 'Red Planet Republic, 2260 CE',
      realm: 'Olympus Mons Geodesic Agricultural Spire',
      reason: 'Reborn in 0.38g gravity to execute majestic 12-meter somersaults over hydroponic strawberries without breaking a sweat.'
    },
    {
      species: 'Salamandra helios (Dyson Swarm Solar Salamander)',
      title: 'Plasma-Skimming Dyson Swarm Salamander',
      era: 'Stellar Harvesting Age, 3120 CE',
      realm: 'Helios-9 Primary Solar Energy Ring',
      reason: 'Authorized to graze directly on pure magnetic solar flares, perfectly insulated by crystalline tungsten-carbide epidermal shields.'
    },
    {
      species: 'Procyon quantum (Orbital Sky-Station Raccoon)',
      title: 'Tachyonic Hardware-Heist Raccoon',
      era: 'Orbital Ring Megacity, 2210 CE',
      realm: 'Low Earth Orbit Freight Concourse Delta',
      reason: 'Promoted to supreme zero-gravity technician with the uncanny ability to bypass biometric quantum locks for freeze-dried sushi.'
    },
    {
      species: 'Cetacea stellaris (Deep-Space Cosmic Void Whale)',
      title: 'Sub-Space Resonant Void Whale',
      era: 'Deep Space Diaspora, 2740 CE',
      realm: 'Kuiper Belt Oort Cloud Outpost Zeta',
      reason: 'Endowed with warp-bubble echolocation to sing across solar systems and guide lost long-haul cargo freighters through asteroid belts.'
    },
    {
      species: 'Bradypus android (Antimatter-Cooled Sloth)',
      title: 'Sub-Atomic Android Sloth of Zen',
      era: 'Exoplanet Settlement, 2890 CE',
      realm: 'Kepler-186f Terraformed Canopy Ring',
      reason: 'Allocated for showing divine disregard for high-frequency trading. Moves at 0.002 km/h while powered by a perpetual antimatter micro-cell.'
    },
    {
      species: 'Canis digitalis (Holographic Cyber-Shiba)',
      title: 'Sentient Holographic Shiba Inu',
      era: 'Post-Physical Singularity, 2450 CE',
      realm: 'Metaverse Nexus Central Citadel',
      reason: 'Granted infinite digital treats, unhackable doge karma, and the right to bark at corrupt smart contracts until they self-terminate.'
    },
    {
      species: 'Lutra titanica (Titan Methane Sea-Otter)',
      title: 'Liquid Methane Hydrocarbon Sea Otter',
      era: 'Outer Moon Mining League, 2670 CE',
      realm: 'Kraken Mare Liquid Methane Sea, Titan',
      reason: 'Equipped with cryo-thermal insulated whiskers to float on liquid ethane holding hands with other otters under Saturn’s golden rings.'
    },
    {
      species: 'Trochilidae tachyon (Quantum Rift Hummingbird)',
      title: 'Sub-Atomic Tachyonic Hummingbird',
      era: 'Quantum Spacetime Era, 2199 CE',
      realm: 'CERN Geneva Quantum Rift Station',
      reason: 'Beats wings at 400,000 Hz, momentarily flickering into parallel universes to drink temporal nectar before returning to our timeline.'
    },
    {
      species: 'Mobula aetheria (Atmospheric Cloud Manta)',
      title: 'Solar-Sail Cloud Manta of Venus',
      era: 'Venusian Sky Cities, 2330 CE',
      realm: 'Aphrodite Terra Floating Aerostat Haven',
      reason: 'Glides serenely on dense sulfuric cloud thermals 50 kilometers above Venus, bathed in perpetual warm sunlight with zero ground commute.'
    }
  ];

  /* ==========================================================================
     Database 3: Geo-Destiny Epicenters (Past vs Future)
     ========================================================================== */
  const PAST_GEO_DESTINATIONS = [
    {
      lat: 31.2089,
      lon: 29.9092,
      place: 'Great Library of Alexandria, Egypt',
      epoch: 'Ptolemaic Kingdom (280 BCE)',
      reason: 'Your soul tether is anchored to the papyrus scent of the greatest lost repository of mortal knowledge.'
    },
    {
      lat: 32.5364,
      lon: 44.4208,
      place: 'Hanging Gardens of Babylon, Mesopotamia',
      epoch: 'Neo-Babylonian Empire (600 BCE)',
      reason: 'Vibrating in harmony with the stone irrigation fountains and date palms of King Nebuchadnezzar’s wonder.'
    },
    {
      lat: 37.9715,
      lon: 23.7257,
      place: 'The Acropolis Citadel, Athens, Greece',
      epoch: 'Golden Age of Pericles (447 BCE)',
      reason: 'A karmic debt regarding an unfinished debate about marble proportions binds your essence to this hill.'
    },
    {
      lat: 40.7509,
      lon: 14.4870,
      place: 'The Forum of Pompeii, Roman Empire',
      epoch: 'Bay of Naples (70 CE)',
      reason: 'Tethered to a terracotta bakery where your past self forgot to pay for four loaves of spiced spelt bread.'
    },
    {
      lat: 19.4326,
      lon: -99.1332,
      place: 'Tenochtitlan Templo Mayor, Aztec Empire',
      epoch: 'Lake Texcoco Valley (1325 CE)',
      reason: 'Aligned with the cosmic solar calendar stones and the scent of vanilla orchid gardens in the floating city.'
    },
    {
      lat: -13.1631,
      lon: -72.5450,
      place: 'Machu Picchu Citadel, Inca Empire',
      epoch: 'Cusco Cloud Forests (1450 CE)',
      reason: 'Granite alignment indicates your spirit was once a recalcitrant stone carver who took three-hour chicha breaks.'
    },
    {
      lat: 35.0116,
      lon: 135.7681,
      place: 'Kyoto Heian-kyo Imperial Palace, Japan',
      epoch: 'Classical Heian Period (794 CE)',
      reason: 'Permanently registered beside a tranquil moss pond where cherry blossoms fall in accordance with poetic law.'
    },
    {
      lat: 29.9792,
      lon: 31.1342,
      place: 'Great Pyramids of Giza, Old Kingdom Egypt',
      epoch: 'Fourth Dynasty (2560 BCE)',
      reason: 'Your astral frequency resonates directly with the Orion star alignment carved into the limestone bedrock.'
    },
    {
      lat: 51.1788,
      lon: -1.8262,
      place: 'Stonehenge Megalithic Circle, Britain',
      epoch: 'Bronze Age Wessex (2500 BCE)',
      reason: 'Cosmic records show your spiritual signature was stamped into the sarsen heel stone during a solstice ritual.'
    },
    {
      lat: 27.3292,
      lon: 68.1388,
      place: 'The Great Bath of Mohenjo-daro, Indus Valley',
      epoch: 'Harappan Civilization (2500 BCE)',
      reason: 'Bound to the world’s most advanced baked-brick hydraulic engineering and the peaceful rhythm of ancient commerce.'
    },
    {
      lat: 30.3285,
      lon: 35.4444,
      place: 'Petra Al-Khazneh Rose Treasury, Nabataean Kingdom',
      epoch: 'Arabian Desert Hub (100 BCE)',
      reason: 'Your spiritual anchor rests in a hidden sandstone chamber carved from red mountain cliffs along the incense route.'
    },
    {
      lat: 13.4125,
      lon: 103.8670,
      place: 'Angkor Wat Grand Temple, Khmer Empire',
      epoch: 'Siem Reap Basin (1150 CE)',
      reason: 'Attuned to the sandstone towers representing Mount Meru, guarded by giant stone Naga serpents.'
    }
  ];

  const FUTURE_GEO_DESTINATIONS = [
    {
      lat: 18.6500,
      lon: 226.2000,
      place: 'Olympus Mons Geodesic Colony Dome, Mars',
      epoch: 'Red Planet Republic (2260 CE)',
      reason: 'Bound to the highest volcanic caldera in the Solar System, overlooking terraformed iron valleys from 21 kilometers up.'
    },
    {
      lat: 35.6895,
      lon: 139.6917,
      place: 'Neo-Tokyo Orbital Skyport Alpha, Low Earth Orbit',
      epoch: 'Sol-System Megastructure (2180 CE)',
      reason: 'Tethered to the upper docking pylon of the orbital space elevator, rotating 400km above the shimmering neon metropolis.'
    },
    {
      lat: -89.9000,
      lon: 0.0000,
      place: 'Shackleton Crater Lunar Solar Spire, The Moon',
      epoch: 'Artemis Consortium (2195 CE)',
      reason: 'Locked onto the mountain of eternal sunlight where solar mirrors capture fusion-grade starlight 365 Earth days a year.'
    },
    {
      lat: -15.2000,
      lon: -92.4000,
      place: 'Europa Sub-Ocean Hydrothermal Haven, Jupiter Moon',
      epoch: 'Jovian Aquatic League (2590 CE)',
      reason: 'Submerged under 15 miles of ice near volcanic thermal vents, enveloped in warm water and starlit ice fissures.'
    },
    {
      lat: 68.0000,
      lon: -50.0000,
      place: 'Kraken Mare Floating Hydrocarbon Refinery, Titan',
      epoch: 'Outer Moon Syndicate (2670 CE)',
      reason: 'Floating on a glassy lake of liquid methane under the majestic golden curve of Saturn’s rings.'
    },
    {
      lat: 0.0000,
      lon: 0.0000,
      place: 'New Alexandria Quantum Archive, Lunar L4 Lagrange Node',
      epoch: 'Galactic Concord (2850 CE)',
      reason: 'Resting in deep gravitational equilibrium where 100 petabytes of all conscious terrestrial thoughts are preserved in synthetic diamonds.'
    },
    {
      lat: 64.1466,
      lon: -21.9426,
      place: 'Neo-Reykjavik Geothermal Fusion Spire, Iceland',
      epoch: 'Nordic Clean-Energy Core (2175 CE)',
      reason: 'Directly plugged into the magma-conduit power matrix, radiating limitless zero-carbon thermal energy across the North Atlantic.'
    },
    {
      lat: -3.4653,
      lon: -62.2159,
      place: 'Amazon Megastructure Biosphere Dome 9, Brazil',
      epoch: 'Planetary Ecological Restoration (2240 CE)',
      reason: 'Guarded by self-replicating drone flocks that maintain a hyper-diverse atmospheric sanctuary free from human pollution.'
    },
    {
      lat: -24.6272,
      lon: -70.4042,
      place: 'Atacama Deep-Space Laser Array, Chile',
      epoch: 'Interstellar Communications (2310 CE)',
      reason: 'Pinging terawatt communication pulses toward the Alpha Centauri colonies across the clear arid mountain desert.'
    },
    {
      lat: 11.3493,
      lon: 142.1995,
      place: 'Mariana Trench Abyssal Metro-City, Pacific Ocean',
      epoch: 'Sub-Surface Terrestrial Union (2400 CE)',
      reason: 'Protected by 11,000 meters of oceanic shield, this subterranean glowing city runs on geothermal mantle energy.'
    },
    {
      lat: -17.6509,
      lon: -149.4260,
      place: 'Polynesian Floating Seastead Confederation, South Pacific',
      epoch: 'Aquatic Solarpunk Age (2220 CE)',
      reason: 'Sailing perpetual trade winds on modular bio-composite catamarans powered by wave kinetics and micro-algae.'
    },
    {
      lat: 46.2330,
      lon: 6.0557,
      place: 'CERN Deep Ring Quantum Teleportation Hub, Geneva',
      epoch: 'Tachyonic Transit Grid (2205 CE)',
      reason: 'Your quantum coordinates coincide with the primary beam emitter where matter is translated across dimensional coordinates.'
    }
  ];

  /* ==========================================================================
     Deterministic Hashing Engine & Name Resonance Decoder
     ========================================================================== */
  function hashString(str) {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return Math.abs(hash);
  }

  /**
   * Decodes a name into its alphabetical resonance breakdown:
   * A=1, B=2, ..., Z=26
   */
  function calculateAlphabeticalCode(name) {
    const clean = (name || '').toUpperCase().replace(/[^A-Z]/g, '');
    if (!clean) {
      return {
        letters: [],
        sum: 0,
        breakdownStr: 'None',
        shortFormula: 'Empty'
      };
    }

    const letters = [];
    let sum = 0;
    for (let i = 0; i < clean.length; i++) {
      const char = clean[i];
      const code = char.charCodeAt(0) - 64; // A -> 1, B -> 2, etc.
      letters.push({ char, code });
      sum += code;
    }

    const breakdownStr = letters.map(item => `${item.char}(${item.code})`).join(' + ') + ` = ${sum}`;
    const shortFormula = letters.length > 5
      ? `${letters.slice(0, 4).map(l => `${l.char}(${l.code})`).join('+')}...(+${letters.length - 4}) = ${sum}`
      : breakdownStr;

    return {
      letters,
      sum,
      breakdownStr,
      shortFormula
    };
  }

  function getDeterministicSeed(name, dob, timeline) {
    const cleanName = (name || '').trim().toLowerCase();
    return hashString(`${cleanName}::${dob}::${timeline}::AKASHIC_2026`);
  }

  /* ==========================================================================
     Database 4: Species-Appropriate Wealth & Hoards (Creature-Specific Economies)
     ========================================================================== */
  const SPECIES_WEALTH_REGISTRY = {
    // === PAST ANIMAL HOARDS & WEALTH ===
    'Threskiornis aethiopicus (Sacred Golden Ibis)': {
      tier: 'Grand Papyrus Marsh Oligarch',
      getNetWorth: (s) => `${((s % 60 + 25) * 200).toLocaleString()} Sun-Dried Nile Mud-Snails & ${(s % 30 + 10) * 15} Sacred Lotus Pods`,
      holdings: 'Exclusive Shallows at the Temple of Thoth, Alabaster Roosting Pillar, Daily Fig Offerings',
      decree: 'Decreed divine wetland foraging hegemony; mortal priests forbidden from interrupting your sacred digestion.'
    },
    'Felis lybica (Philosopher Barn Cat of the Lyceum)': {
      tier: 'Aristotelian Lap Sovereign',
      getNetWorth: (s) => `${((s % 40 + 15) * 120).toLocaleString()} Optimal Sunbeams & ${(s % 30 + 10)} Plump Athenian Field-Mice`,
      holdings: 'Aristotle’s Wool Toga, High Olive Branch Napping Terrace, Unlimited Clay Bowls of Goat Milk',
      decree: 'Decreed sovereign right to knock terracotta amphorae off high shelves to study the physics of mortal hubris.'
    },
    'Bombyx mori (Imperial Silk Moth of Serenity)': {
      tier: 'Forbidden Orchard Mulberry Tycoon',
      getNetWorth: (s) => `${((s % 50 + 20) * 1000).toLocaleString()} Drops of Sweet Morning Dew & ${(s % 40 + 20) * 12} Crispy Mulberry Leaves`,
      holdings: 'The Empress’s Private Silk Pavilion, Shaded Mulberry Grove, Permanent Immunity from Lantern Flame Allure',
      decree: 'Enshrined in celestial tranquility with eternal immunity from predatory sparrows and sudden drafty winds.'
    },
    'Equus caballus (Praetorian Chariot Stallion)': {
      tier: 'Circus Maximus Oat Baron',
      getNetWorth: (s) => `${((s % 70 + 30) * 800).toLocaleString()} Bushels of Sicilian Spiced Oats & ${(s % 8 + 4)} Solid Golden Horseshoes`,
      holdings: 'Marble Paddock with Purple Silk Bedding, 6 Royal Grooming Attendants, Lifetime Exemption from Plow Duty',
      decree: 'Decreed legendary racing champion status; Emperor Caligula is strictly forbidden from forcing you into the Senate.'
    },
    'Corvus corax (Viking Skald Raven)': {
      tier: 'Shiny Bauble & Carrion Warlord',
      getNetWorth: (s) => `${((s % 50 + 20) * 350).toLocaleString()} Polished Silver Brooches & ${(s % 40 + 15) * 20} High-Grade Suet Balls`,
      holdings: 'The Carved Dragon Prow of the King’s Longship, Private Cliffside Bone Cache, 12 Stolen Viking Belt-Buckles',
      decree: 'Anointed chief omen deliverer across the North Sea; Norse sailors shall offer salted herrings before setting sail.'
    },
    'Falco peregrinus (Astrological Falcon of Baghdad)': {
      tier: 'Mesopotamian Thermal Sky-Baron',
      getNetWorth: (s) => `${((s % 45 + 15) * 90).toLocaleString()} Choice Desert Quails & ${(s % 20 + 8)} Silver-Embroidered Velvet Hoods`,
      holdings: 'Observatory Spire Perch, Diamond-Studded Jesses, Absolute Aerial Jurisdiction Over City Pigeons',
      decree: 'Declared supreme sovereign of Baghdad’s warm sky currents with royal diplomatic courier immunity.'
    },
    'Nyctereutes procyonoides (Enlightened Zen Tanuki)': {
      tier: 'Legendary Enchanted Sake Custodian',
      getNetWorth: (s) => `${((s % 60 + 30) * 1000).toLocaleString()} Magic Oak Leaves (Illusion Value: ${((s % 60 + 30) * 1000).toLocaleString()} Ryo) & ${(s % 20 + 8)} Ceramic Sake Gourds`,
      holdings: 'Ancient Hollow Cryptomeria Tree, Rain-Shelter Tea Pavilion, Magic Belly-Drumming Clearing',
      decree: 'Granted supreme karmic trickster rights; villagers shall leave out sweet rice cakes and fried tofu under every crescent moon.'
    },
    'Canis lupus familiaris (Highland Castle Ghost Hound)': {
      tier: 'Lord High Hearth Hogger',
      getNetWorth: (s) => `${((s % 50 + 20) * 15).toLocaleString()} Roasted Boar Marrow Bones & ${(s % 15 + 5)} Soft Sheepskin Rugs`,
      holdings: 'Prime Center-Spot in Front of the Great Hall Hearth, Private Rabbit Moor, The Chieftain’s Armchair',
      decree: 'Bestowed perpetual ear-scratch entitlement and the sovereign authority to bark at the fireplace for no reason.'
    },
    'Columba livia (Renaissance Master Carrier Pigeon)': {
      tier: 'Florentine Breadcrumb Don',
      getNetWorth: (s) => `${((s % 90 + 40) * 10000).toLocaleString()} Stale Brioche Crumbs & ${(s % 30 + 10)} Gilded Balcony Perches`,
      holdings: 'The Top Finial of Brunelleschi’s Duomo, Untaxed Plaza Feeding Rights, Absolute Immunity from Falcon Harassment',
      decree: 'Decreed the undisputed sovereign of Piazza del Duomo, possessing blackmail letters on every prominent merchant family.'
    },
    'Mustela putorius furo (Alchemist’s Chaos Ferret)': {
      tier: 'Shiny Chaos Hoarder Supreme',
      getNetWorth: (s) => `${((s % 60 + 20) * 60).toLocaleString()} Stolen Brass Watch-Gears, 300 Glass Stoppers & ${(s % 20 + 5)} Silver Spoons`,
      holdings: 'Secret Cache Behind the Alchemy Lab Baseboard, The Emperor’s Velvet Hat, 8 Knotted Woolen Socks',
      decree: 'Granted full immunity for knocking over colored potions and stashing shiny silverware under royal floorboards.'
    },
    'Tyto alba (Victorian Detective Barn Owl)': {
      tier: 'Gaslit London Rodent Baron',
      getNetWorth: (s) => `${((s % 50 + 20) * 180).toLocaleString()} Fat Thames Wharf Voles & ${(s % 30 + 12)} Brass Monocle Frames`,
      holdings: 'Baker Street Gaslamp Pinnacle, Big Ben Bell-Chamber Roost, The Foggy Airspace Over Whitechapel',
      decree: 'Vested with supreme detective authority; all pigeons and city bats shall yield right of way under pea-soup fog.'
    },
    'Mammuthus primigenius (Tundra Hearth-Mammoth)': {
      tier: 'Pleistocene Tundra Sovereign',
      getNetWorth: (s) => `${((s % 40 + 15) * 5).toLocaleString()} Tons of Crunchy Pine Shrubs & 2 Nine-Foot Ivory Power Tusks`,
      holdings: '15,000 Square Miles of Pristine Snow Steppes, 6 Natural Salt Licks, The Warmest Fur Coat on Earth',
      decree: 'Decreed too massive and majestic for any mortal or saber-toothed predator to ever tell you what to do.'
    },

    // === FUTURE ANIMAL HOARDS & WEALTH ===
    'Hydrochoerus cyberneticus (Quantum Capybara)': {
      tier: 'Sub-Orbital Thermal Lagoon Oligarch',
      getNetWorth: (s) => `${((s % 60 + 30) * 1000).toLocaleString()} Hydroponic Space-Melon Rinds & ${(s % 20 + 10)} Anti-Grav Spa Pods`,
      holdings: 'Zero-G Hot Spring Biosphere, 8 Butler Drone Scrubbers, Solar-Heated Sunbathing Platform',
      decree: 'Decreed absolute cosmic chill; all megacorporation executives are legally required to achieve tranquility in your presence.'
    },
    'Smutsia nanotech (Titanium Cyber-Pangolin)': {
      tier: 'Data-Termite Syndicate Tycoon',
      getNetWorth: (s) => `${((s % 50 + 20) * 25).toLocaleString()} Terabytes of Crunchy Corrupted Data-Ants & ${(s % 30 + 10)} Titanium Polishers`,
      holdings: 'Fiber-Optic Cable Burrow beneath Shinjuku, EMP-Proof Basking Coil, Black-Market Data Cache',
      decree: 'Sovereign rights to curl into an impenetrable chrome sphere whenever corporate quarterly meetings become tedious.'
    },
    'Aurelia bioluminescens (Europa Void Jellyfish)': {
      tier: 'Jovian Hydrothermal Vent Baron',
      getNetWorth: (s) => `${((s % 60 + 25) * 1500).toLocaleString()} Megajoules of Geothermal Vent Heat & ${(s % 40 + 15) * 1000} Micro-Plankton Swarms`,
      holdings: 'Exclusive Convection Current in Europa’s Ocean, Deep Geothermal Chimney, Starlight Choir Node',
      decree: 'Granted perpetual peaceful buoyancy throughout the ocean depths with zero gravitational compression.'
    },
    'Chinchilla lanigera aero (Martian Greenhouse Chinchilla)': {
      tier: 'Martian Hydroponic Strawberry Emperor',
      getNetWorth: (s) => `${((s % 50 + 20) * 640).toLocaleString()} Freeze-Dried Berry Clusters & ${(s % 30 + 10) * 150} Volcanic Pumice Dust-Baths`,
      holdings: 'Olympus Mons Biodome Bounce Complex, 0.38g Parabolic Somersault Ring, Air-Conditioned Burrow',
      decree: 'Decreed the fluffiest entity on Mars; colonists are legally mandated to marvel at your low-gravity hops.'
    },
    'Salamandra helios (Dyson Swarm Solar Salamander)': {
      tier: 'Solar Flare Energy Glutton',
      getNetWorth: (s) => `${((s % 70 + 30) * 12).toLocaleString()} Terawatt-Hours of Pure Coronal Plasma & ${(s % 15 + 5)} Molten Tungsten Basking Slabs`,
      holdings: 'Helios-9 Primary Prominence Grazing Arc, Magnetic Sunspot Lounger, Chromosphere Slipstream',
      decree: 'Exempt from all interstellar thermodynamics; free to toast both sides directly on the surface of the sun.'
    },
    'Procyon quantum (Orbital Sky-Station Raccoon)': {
      tier: 'Orbital Scrap & Freeze-Dried Sushi Hoarder',
      getNetWorth: (s) => `${((s % 60 + 20) * 800).toLocaleString()} Quantum Processor Chips & ${(s % 40 + 15) * 30} Smuggled Salmon Nigiri Rolls`,
      holdings: 'Station Freight Conduit 7, Master Decryption Laser-Paw, 14 Stolen Luxury Astro-Blankets',
      decree: 'Decreed officially untrappable by station security; rewarded with access to all high-tech garbage disposal chutes.'
    },
    'Cetacea stellaris (Deep-Space Cosmic Void Whale)': {
      tier: 'Cosmic Krill & Nebula Melody Sovereign',
      getNetWorth: (s) => `${((s % 80 + 30) * 10).toLocaleString()} Trillion Metric Tons of Stardust Krill & ${(s % 5 + 3)} Cosmic Echo-Symphonies`,
      holdings: 'The Entire Oort Cloud Singing Corridor, 6 Orbiting Gravitational Massagers, Private Asteroid Rubbing Post',
      decree: 'Sovereign master of deep-space acoustics; all warp vessels must drop to sub-light speeds to listen to your song.'
    },
    'Bradypus android (Antimatter-Cooled Sloth)': {
      tier: 'Perpetual Zero-Effort Overlord',
      getNetWorth: (s) => `${((s % 50 + 25) * 40000).toLocaleString()} Nano-Hours of Uninterrupted Slumber & ${(s % 20 + 8)} Synthetic Hibiscus Flowers`,
      holdings: 'Kepler Canopy Solar-Charged Bough, Automated Leaf-Feeder Drone, Complete Immunity from Urgency',
      decree: 'Decreed the ultimate philosophical monument to doing absolutely nothing; moving faster than 0.005 km/h is strictly outlawed.'
    },
    'Canis digitalis (Holographic Cyber-Shiba)': {
      tier: 'Intergalactic Doge Stash Monarch',
      getNetWorth: (s) => `${((s % 70 + 30) * 33333).toLocaleString()} Holographic Squeaky Toys & ${(s % 50 + 25) * 1000} Quantum Virtual Belly Rubs`,
      holdings: 'Metaverse Nexus Central Dog Park, Infinite Fetch Trajectory Beam, Unhackable Good Boy Certificate',
      decree: 'Decreed universally and undeniably The Goodest Boy in all simulated and unsimulated realities.'
    },
    'Lutra titanica (Titan Methane Sea-Otter)': {
      tier: 'Titan Kraken Mare Pebble Tycoon',
      getNetWorth: (s) => `${((s % 40 + 15) * 350).toLocaleString()} Cryo-Smooth Cryo-Pebbles & ${(s % 30 + 10) * 250} Methane Clams`,
      holdings: 'Prime Hand-Holding Raft in Kraken Mare, Saturn-View Ice Floe, Private Hydrocarbon Geyser',
      decree: 'Guaranteed floating sanctuary across all hydrocarbon seas with permanent right to hold hands while sleeping.'
    },
    'Trochilidae tachyon (Quantum Rift Hummingbird)': {
      tier: 'Multiversal Sugar-Water Syndicate',
      getNetWorth: (s) => `${((s % 60 + 20) * 75000000).toLocaleString()} Quanta of Chrono-Nectar & ${(s % 25 + 10) * 28} Parallel-Universe Blossoms`,
      holdings: 'CERN Quantum Rift Feeder, Time-Dilated Resting Perch, Instantaneous Trans-Dimensional Flightpath',
      decree: 'Free to sip nectar from tomorrow’s blossoms before they even open, defying all laws of linear spacetime.'
    },
    'Mobula aetheria (Atmospheric Cloud Manta)': {
      tier: 'Atmospheric Thermal Stratosphere Monarch',
      getNetWorth: (s) => `${((s % 50 + 20) * 1600).toLocaleString()} Kilometers of Pristine Sulfuric Jetstreams & ${(s % 30 + 10) * 400} Amber Cloud Vistas`,
      holdings: '50km High Aerostat Thermals, Direct Solar-Sail Recharging Ridge, Ground-Free Cloud Haven',
      decree: 'Exalted aloft in perpetual golden skies, forever unburdened by solid ground, planetary debt, or mortal gravity.'
    }
  };

  function predictCosmicWealth(timeline, seed, animal) {
    // Ultra-rare easter egg roll (~2% probability or forced via debug flag window.__forceUltraRare)
    const isUltraRare = Math.random() < 0.02 || Boolean(window.__forceUltraRare);

    if (isUltraRare) {
      const animalTitle = animal ? animal.title.toUpperCase() : 'COSMIC CREATURE';
      if (timeline === 'past') {
        return {
          tier: `👑 DIVINE APEX ${animalTitle} OF OLYMPUS`,
          netWorth: '∞ (Infinite) Sacred Ambrosia Bowls & 100% Unconditional Universal Petting Rights',
          holdings: 'The Golden Peak of Mount Olympus, The Eternal Feeder of the Gods, Absolute Sovereign Fealty from All Mortal Fauna',
          decree: 'Anointed supreme divine sacred mascot of the multiverse; all mortal emperors and gods exist merely to admire your majesty and scratch behind your ears.',
          isUltraRare: true
        };
      } else {
        return {
          tier: `🌌 TRANSCENDENT CYBER-COSMIC ${animalTitle}`,
          netWorth: '∞ (Infinity) Dark-Matter Crunchies & Pure Starlight Nectar',
          holdings: 'Entire Nebula Grazing Grounds, Orbital Laser-Pointer Fleet, Intergalactic Scratching Post of the Gods',
          decree: 'Decreed supreme apex ruler of the Milky Way, Andromeda, and adjacent dimensions; all galaxy-class civilizations exist merely to bring you warm blankets.',
          isUltraRare: true
        };
      }
    }

    if (animal && animal.species && SPECIES_WEALTH_REGISTRY[animal.species]) {
      const item = SPECIES_WEALTH_REGISTRY[animal.species];
      return {
        tier: item.tier,
        netWorth: item.getNetWorth(seed),
        holdings: item.holdings,
        decree: item.decree,
        isUltraRare: false
      };
    }

    // Fallback if species is undefined or not found
    return {
      tier: 'Noble Forest Patriarch',
      netWorth: `${((seed % 50 + 20) * 100).toLocaleString()} Choice Wild Berries & Pristine River Stones`,
      holdings: 'Sunlit Meadow Clearing, Private Drinking Brook, Absolute Territory Rights',
      decree: 'Decreed sovereign peaceful grazing and sleeping privileges across all realms by cosmic law.',
      isUltraRare: false
    };
  }

  /* ==========================================================================
     Web Audio API Celestial Sound Synthesizer
     ========================================================================== */
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  /* ==========================================================================
     Ambient Celestial Background Music Engine (Generative Web Audio)
     ========================================================================== */
  let ambientEngine = {
    isRunning: false,
    masterGain: null,
    droneOscs: [],
    filterNode: null,
    swellTimer: null
  };

  function startAmbientMusic() {
    if (!soundEnabled || ambientEngine.isRunning) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      ambientEngine.isRunning = true;
      const now = ctx.currentTime;

      // Master ambient gain node with slow, warm 2.5s fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.024, now + 2.5);
      masterGain.connect(ctx.destination);
      ambientEngine.masterGain = masterGain;

      // Warm Resonant Lowpass Filter for soft cosmic space pad
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(selectedTimeline === 'past' ? 340 : 420, now);
      filter.Q.setValueAtTime(1.8, now);
      filter.connect(masterGain);
      ambientEngine.filterNode = filter;

      // Slow Breathing LFO on filter cutoff (1 cycle every ~14 seconds)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.07, now);
      lfoGain.gain.setValueAtTime(80, now);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);

      // Multi-layer Chord Drone (Root + Fifth + Octave + Harmonic Tenth)
      const droneFreqs = selectedTimeline === 'past'
        ? [73.42, 110.00, 146.83, 185.00]  // D2, A2, D3, F#3 (Pythagorean cosmic major)
        : [65.41, 98.00, 130.81, 196.00];   // C2, G2, C3, G3 (Cyberpunk interstellar suspended)

      ambientEngine.droneOscs = [];

      droneFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        const detuneCents = (idx % 2 === 0 ? 1 : -1) * (3.5 + idx * 2);
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(detuneCents, now);

        const individualGain = idx === 0 ? 0.45 : idx === 1 ? 0.35 : 0.22;
        oscGain.gain.setValueAtTime(individualGain, now);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start(now);
        ambientEngine.droneOscs.push(osc);
      });

      if (soundToggleBtn) soundToggleBtn.classList.add('playing');

      // Schedule occasional soft celestial harmonic swells
      scheduleCelestialSwell();
    } catch (e) {
      // Fail silently if audio context unavailable
    }
  }

  function stopAmbientMusic() {
    if (!ambientEngine.isRunning) return;
    try {
      if (ambientEngine.swellTimer) {
        clearTimeout(ambientEngine.swellTimer);
        ambientEngine.swellTimer = null;
      }
      if (ambientEngine.masterGain && audioCtx) {
        const now = audioCtx.currentTime;
        ambientEngine.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          ambientEngine.droneOscs.forEach((osc) => {
            try { osc.stop(); osc.disconnect(); } catch (err) {}
          });
          ambientEngine.droneOscs = [];
          ambientEngine.isRunning = false;
        }, 1300);
      } else {
        ambientEngine.isRunning = false;
      }
      if (soundToggleBtn) soundToggleBtn.classList.remove('playing');
    } catch (e) {
      ambientEngine.isRunning = false;
    }
  }

  function updateAmbientTimeline() {
    if (!ambientEngine.isRunning || !ambientEngine.filterNode || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const targetFreq = selectedTimeline === 'past' ? 340 : 420;
      ambientEngine.filterNode.frequency.linearRampToValueAtTime(targetFreq, now + 1.5);
    } catch (e) {}
  }

  function scheduleCelestialSwell() {
    if (!ambientEngine.isRunning || !soundEnabled) return;
    const nextInterval = 6000 + Math.random() * 4500;
    ambientEngine.swellTimer = setTimeout(() => {
      triggerSingleCelestialChime();
      scheduleCelestialSwell();
    }, nextInterval);
  }

  function triggerSingleCelestialChime() {
    if (!ambientEngine.isRunning || !soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Pentatonic overtone chime frequencies
      const chimePool = selectedTimeline === 'past'
        ? [293.66, 329.63, 369.99, 440.00, 493.88, 587.33]
        : [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];

      const freq = chimePool[Math.floor(Math.random() * chimePool.length)];
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, now);

      const duration = 4.2;
      chimeGain.gain.setValueAtTime(0.0001, now);
      chimeGain.gain.linearRampToValueAtTime(0.022, now + 1.2);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ambientEngine.masterGain || ctx.destination);

      chimeOsc.start(now);
      chimeOsc.stop(now + duration);
    } catch (e) {}
  }

  function unlockAudioOnFirstInteraction() {
    const unlock = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().then(() => {
          if (soundEnabled && !ambientEngine.isRunning) {
            startAmbientMusic();
          }
        }).catch(() => {});
      } else if (soundEnabled && !ambientEngine.isRunning) {
        startAmbientMusic();
      }
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
      document.removeEventListener('touchstart', unlock);
    };

    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
  }

  function playTone(freq, type, duration, delay = 0, gainLevel = 0.1) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(gainLevel, ctx.currentTime + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      // Fail silently if audio is blocked
    }
  }

  function playWhoosh() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const duration = 0.52;

      // Filtered noise buffer creating a soft celestial whoosh
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.45;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(2.8, now);
      filter.frequency.setValueAtTime(280, now);
      filter.frequency.exponentialRampToValueAtTime(1500, now + duration * 0.4);
      filter.frequency.exponentialRampToValueAtTime(200, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + duration * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch (e) {
      // Fail silently without error
    }
  }

  function playPastChime() {
    // Warm Antique Pentatonic Chime (Acoustic Harpsichord-like resonance)
    playTone(293.66, 'triangle', 1.4, 0.0, 0.12); // D4
    playTone(369.99, 'sine', 1.4, 0.12, 0.10);    // F#4
    playTone(440.00, 'sine', 1.5, 0.24, 0.10);    // A4
    playTone(587.33, 'sine', 1.8, 0.38, 0.08);    // D5
  }

  function playFutureChime() {
    // Futuristic Cyber Synthesizer Chime (Warp Arpeggio)
    playTone(392.00, 'sawtooth', 1.0, 0.0, 0.06); // G4
    playTone(523.25, 'sine', 1.2, 0.08, 0.10);    // C5
    playTone(659.25, 'sine', 1.4, 0.18, 0.10);    // E5
    playTone(1046.50, 'sine', 1.6, 0.30, 0.08);   // C6
  }

  function playFanfare() {
    if (selectedTimeline === 'past') {
      // Grand Court Fanfare
      playTone(261.63, 'triangle', 2.0, 0.0, 0.14);
      playTone(329.63, 'sine', 2.2, 0.1, 0.12);
      playTone(392.00, 'sine', 2.4, 0.2, 0.12);
      playTone(523.25, 'triangle', 2.8, 0.35, 0.16);
      playTone(659.25, 'sine', 3.0, 0.5, 0.10);
    } else {
      // Cosmic Warp Fanfare
      playTone(220.00, 'sawtooth', 2.2, 0.0, 0.08);
      playTone(329.63, 'sine', 2.0, 0.1, 0.12);
      playTone(493.88, 'sine', 2.4, 0.22, 0.12);
      playTone(659.25, 'sine', 2.6, 0.36, 0.14);
      playTone(987.77, 'sine', 3.0, 0.52, 0.12);
    }
  }

  function playStampThud() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // 1. Deep Sub-bass Impact (Heft)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.26);
      gain.gain.setValueAtTime(0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.32);

      // 2. Tactile parchment seal transient
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = selectedTimeline === 'past' ? 'triangle' : 'sawtooth';
      snapOsc.frequency.setValueAtTime(360, now);
      snapOsc.frequency.exponentialRampToValueAtTime(75, now + 0.08);
      snapGain.gain.setValueAtTime(0.26, now);
      snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start(now);
      snapOsc.stop(now + 0.1);
    } catch (e) {
      // Fail silently without error
    }
  }

  /* ==========================================================================
     Typewriter Effect & Utilities
     ========================================================================== */
  function typewriter(element, fullText, speed = 16) {
    return new Promise((resolve) => {
      if (!element) {
        resolve();
        return;
      }
      if (element.__typewriterTimer) {
        clearInterval(element.__typewriterTimer);
        element.__typewriterTimer = null;
      }
      const cleanText = fullText || '';
      let charIndex = 0;
      element.innerHTML = '<span class="typewriter-cursor">|</span>';

      element.__typewriterTimer = setInterval(() => {
        charIndex++;
        const currentSlice = cleanText.slice(0, charIndex);
        if (charIndex >= cleanText.length) {
          clearInterval(element.__typewriterTimer);
          element.__typewriterTimer = null;
          element.textContent = cleanText;
          resolve();
        } else {
          element.innerHTML = `${escapeHTML(currentSlice)}<span class="typewriter-cursor">|</span>`;
        }
      }, speed);
    });
  }

  function flushTypewriters() {
    if (!currentCertData) return;
    const items = [
      { el: reincarnationHeadline, val: currentCertData.reincarnation.headline },
      { el: reincarnationSpecies, val: currentCertData.reincarnation.species },
      { el: geoDestinyHeadline, val: currentCertData.geo.headline },
      { el: geoResolvedLocation, val: currentCertData.geo.location },
      { el: wealthHeadline, val: currentCertData.wealth.tier },
      { el: wealthNetWorth, val: currentCertData.wealth.netWorth }
    ];
    items.forEach(({ el, val }) => {
      if (el) {
        if (el.__typewriterTimer) {
          clearInterval(el.__typewriterTimer);
          el.__typewriterTimer = null;
        }
        el.textContent = val;
      }
    });
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     Ambient Canvas Starfield & Cosmic Flash Pulse
     ========================================================================== */
  function initAmbientStarfield() {
    if (!starfieldCanvas) return;
    const ctx = starfieldCanvas.getContext('2d');
    if (!ctx) return;

    let width = (starfieldCanvas.width = window.innerWidth);
    let height = (starfieldCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = starfieldCanvas.width = window.innerWidth;
      height = starfieldCanvas.height = window.innerHeight;
    });

    const numParticles = 95;
    const particles = [];
    const colors = ['#ffffff', '#ffd700', '#64ffda', '#c084fc', '#fef0b8'];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        alpha: Math.random() * 0.7 + 0.2,
        alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.95 || p.alpha < 0.2) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.radius * 3.5;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  function triggerCosmicFlash() {
    if (!cosmicPulseOverlay) return;
    cosmicPulseOverlay.classList.remove('active-pulse');
    void cosmicPulseOverlay.offsetWidth; // Force reflow
    cosmicPulseOverlay.classList.add('active-pulse');
    setTimeout(() => {
      cosmicPulseOverlay.classList.remove('active-pulse');
    }, 950);
  }

  /* ==========================================================================
     UI & Timeline Interaction Controller
     ========================================================================== */
  function renderEpochChips() {
    const cfg = TIMELINE_CONFIG[selectedTimeline];
    subFilterLabel.textContent = cfg.label;
    epochChipsWrapper.innerHTML = '';

    cfg.epochs.forEach((epoch, index) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `epoch-chip ${index === 0 ? 'selected' : ''}`;
      chip.textContent = epoch;
      chip.addEventListener('click', () => {
        document.querySelectorAll('.epoch-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        selectedEpoch = epoch;
        playTone(520, 'sine', 0.12, 0, 0.06);
        showToast(`Attuned to epoch: ${epoch}`);
      });
      epochChipsWrapper.appendChild(chip);
    });

    // Populate quick summon travelers
    quickSummonPills.innerHTML = '';
    cfg.travelers.forEach(t => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'summon-pill';
      pill.textContent = t.name;
      pill.addEventListener('click', () => {
        fullNameInput.value = t.name;
        birthDateInput.value = t.dob;
        updateLiveAlphabeticalCode();
        updateCharCount();
        playTone(460, 'sine', 0.15, 0, 0.08);
        showToast(`Summoned traveler: ${t.name}`);
      });
      quickSummonPills.appendChild(pill);
    });

    // Update button text
    if (generateBtnText) {
      generateBtnText.textContent = selectedTimeline === 'past'
        ? 'Reincarnate into the Past'
        : 'Reincarnate into the Future';
    }
  }

  function setTimeline(timeline) {
    selectedTimeline = timeline;
    const isPast = timeline === 'past';

    timelineOptionPast.classList.toggle('active', isPast);
    timelineOptionFuture.classList.toggle('active', !isPast);

    const pastRadio = timelineOptionPast.querySelector('input');
    const futureRadio = timelineOptionFuture.querySelector('input');
    if (pastRadio) pastRadio.checked = isPast;
    if (futureRadio) futureRadio.checked = !isPast;

    renderEpochChips();

    if (isPast) {
      playPastChime();
      showToast('⏳ Trajectory set: The Ancient Past');
    } else {
      playFutureChime();
    }

    // Update ambient synthesizer timbre for new timeline
    updateAmbientTimeline();

    // Refresh live code preview with current timeline
    updateLiveAlphabeticalCode();
  }

  /* ==========================================================================
     Live Alphabetical Code Preview
     ========================================================================== */
  function updateLiveAlphabeticalCode() {
    const name = fullNameInput.value.trim();
    const alphaData = calculateAlphabeticalCode(name);

    if (!name || alphaData.letters.length === 0) {
      alphaCodeSumBadge.textContent = 'Harmonic Value: 0';
      alphaCodeBreakdown.innerHTML = '<span class="alpha-empty-hint">Enter your name to channel cosmic resonance...</span>';
      if (alphaStockConnection) alphaStockConnection.style.display = 'none';
      return;
    }

    // Update Sum Badge
    alphaCodeSumBadge.textContent = `Harmonic Value: ${alphaData.sum}`;

    // Render letter badges
    alphaCodeBreakdown.innerHTML = '';
    alphaData.letters.forEach((item, index) => {
      const badge = document.createElement('span');
      badge.className = 'alpha-char-badge';
      badge.innerHTML = `${item.char} <span class="alpha-char-val">${item.code}</span>`;
      alphaCodeBreakdown.appendChild(badge);

      if (index < alphaData.letters.length - 1) {
        const op = document.createElement('span');
        op.className = 'alpha-op';
        op.textContent = '+';
        alphaCodeBreakdown.appendChild(op);
      }
    });

    const equalsOp = document.createElement('span');
    equalsOp.className = 'alpha-op';
    equalsOp.textContent = '=';
    alphaCodeBreakdown.appendChild(equalsOp);

    const sumBadge = document.createElement('strong');
    sumBadge.style.color = '#ffd700';
    sumBadge.textContent = alphaData.sum;
    alphaCodeBreakdown.appendChild(sumBadge);

    if (alphaStockConnection) alphaStockConnection.style.display = 'none';
  }

  function updateCharCount() {
    const len = fullNameInput.value.length;
    nameCharBadge.textContent = `${len} char${len === 1 ? '' : 's'}`;
  }

  /* ==========================================================================
     Multi-Stage Loading Animation Controller
     ========================================================================== */
  function getLoadingSteps(timeline) {
    if (timeline === 'past') {
      return [
        { pct: 25, headline: 'Consulting Ancient Chrono-Ledgers...', desc: 'Deciphering hieroglyphic papyri and ancestral birth constellations...' },
        { pct: 55, headline: 'Auditing Feudal Karmic Debt...', desc: 'Calculating past-life tribute credits and medieval agricultural balances...' },
        { pct: 82, headline: 'Triangulating Ancient Geo-Destiny...', desc: 'Astral GPS locking coordinates onto lost temples and ancient wonders...' },
        { pct: 100, headline: 'Engraving Official Parchment...', desc: 'Inscribing decree of Retrograde Metempsychosis with royal seal...' }
      ];
    } else {
      return [
        { pct: 25, headline: 'Establishing Tachyonic Warp Link...', desc: 'Synchronizing quantum telemetry with orbital Dyson-swarm servers...' },
        { pct: 55, headline: 'Calculating Cyber-Karmic Staking...', desc: 'Evaluating algorithmic soul weight and neural bandwidth balances...' },
        { pct: 82, headline: 'Resolving Galactic Geo-Destiny...', desc: 'Chrono-satellites locking coordinates onto off-world colony nodes...' },
        { pct: 100, headline: 'Compiling Holographic Certificate...', desc: 'Notarizing cyber-decree into the permanent intergalactic blockchain...' }
      ];
    }
  }

  function runLoadingSequence(timeline) {
    const steps = getLoadingSteps(timeline);
    return new Promise((resolve) => {
      loadingOverlay.style.display = 'flex';
      loadingOverlay.setAttribute('aria-hidden', 'false');
      progressFill.style.width = '0%';
      loadingPercent.textContent = '0%';

      let currentStep = 0;
      const stepDuration = 380;

      function nextStep() {
        if (currentStep >= steps.length) {
          setTimeout(resolve, 150);
          return;
        }

        const step = steps[currentStep];
        progressFill.style.width = `${step.pct}%`;
        loadingPercent.textContent = `${step.pct}%`;
        loadingHeadline.textContent = step.headline;
        loadingStepDesc.textContent = step.desc;

        if (protocolTag) {
          const hex = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0');
          protocolTag.textContent = timeline === 'past' ? `CHRONO-RETRO: 0x${hex}` : `CHRONO-WARP: 0x${hex}`;
        }

        playTone(340 + currentStep * 110, timeline === 'past' ? 'triangle' : 'sine', 0.2, 0, 0.07);

        currentStep++;
        setTimeout(nextStep, stepDuration);
      }

      nextStep();
    });
  }

  /* ==========================================================================
     Main Generation Orchestrator
     ========================================================================== */
  async function handleGenerate(e) {
    if (e) e.preventDefault();

    const name = fullNameInput.value.trim();
    const dob = birthDateInput.value;

    if (!name) {
      showToast('⚠️ Please enter an Earthly Legal or Chosen Name.');
      fullNameInput.focus();
      return;
    }

    if (!dob) {
      showToast('⚠️ Please provide your Date of Terrestrial Arrival (DOB).');
      birthDateInput.focus();
      return;
    }

    // Soft celestial whoosh when generation begins
    playWhoosh();

    if (selectedTimeline === 'past') {
      playPastChime();
    } else {
      playFutureChime();
    }

    // Run the multi-stage visual loading animation
    const loadingPromise = runLoadingSequence(selectedTimeline);

    // Compute deterministic fate
    const seed = getDeterministicSeed(name, dob, selectedTimeline);
    const alphaData = calculateAlphabeticalCode(name);

    // 1. Reincarnation Form according to timeline
    const database = selectedTimeline === 'past' ? PAST_REINCARNATIONS : FUTURE_REINCARNATIONS;
    const animal = database[seed % database.length];
    const reincarnationData = {
      headline: animal.title,
      species: animal.species,
      realm: `${animal.realm} (${animal.era})`,
      desc: animal.reason
    };

    // 2. Geographical Location according to timeline
    const geoDB = selectedTimeline === 'past' ? PAST_GEO_DESTINATIONS : FUTURE_GEO_DESTINATIONS;
    const baseLoc = geoDB[seed % geoDB.length];
    const latJitter = ((seed % 1000) / 10000) - 0.05;
    const lonJitter = (((seed * 3) % 1000) / 10000) - 0.05;
    const finalLat = Number((baseLoc.lat + latJitter).toFixed(4));
    const finalLon = Number((baseLoc.lon + lonJitter).toFixed(4));
    const latStr = `${Math.abs(finalLat)}° ${finalLat >= 0 ? 'N' : 'S'}`;
    const lonStr = `${Math.abs(finalLon)}° ${finalLon >= 0 ? 'E' : 'W'}`;

    const geoData = {
      headline: baseLoc.place.split(',')[0],
      coordinates: `${latStr}, ${lonStr}`,
      location: `${baseLoc.place} [${baseLoc.epoch}]`,
      desc: baseLoc.reason
    };

    // 3. Wealth Destiny according to timeline (with ~2% ultra-rare Easter egg)
    const wealth = predictCosmicWealth(selectedTimeline, seed);

    // Format registry serial number & date
    const eraPrefix = selectedTimeline === 'past' ? 'PAST' : 'FUTR';
    const serialNo = `CF-2026-${eraPrefix}-${(seed % 9000 + 1000)}-${['ALPHA', 'BETA', 'OMEGA', 'PRIME', 'VOID'][seed % 5]}`;
    const dobDate = new Date(dob);
    const dobFormatted = dobDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const currentYear = new Date().getFullYear();

    await loadingPromise;

    // Store state for canvas exporter & clipboard
    currentCertData = {
      timeline: selectedTimeline,
      epoch: selectedEpoch,
      name: name,
      dob: dob,
      dobFormatted: dobFormatted,
      serialNo: serialNo,
      alpha: alphaData,
      wealth: wealth,
      reincarnation: reincarnationData,
      geo: geoData
    };

    // Render Certificate Static Metadata to DOM
    certSubjectName.textContent = name.toUpperCase();
    certSubjectDob.textContent = dobFormatted;
    certSerialNo.textContent = serialNo;
    certBarcodeNum.textContent = serialNo;
    certIssueDate.textContent = `${currentYear} A.D.`;

    // Timeline Pill & Theme Adaptations
    if (selectedTimeline === 'past') {
      certGrandTitle.textContent = 'CERTIFICATE OF ANCESTRAL & HISTORICAL REINCARNATION';
      certMinistry.textContent = 'THE SUPREME ASTRAL COUNCIL OF RETROGRADE METEMPSYCHOSIS';
      certDecree.textContent = 'THIS DULY ATTESTS THAT BY VIRTUE OF HISTORICAL KARMIC AUDIT & CELESTIAL DECREE:';
      certEraPill.className = 'cert-era-pill';
      certEraIcon.textContent = '⏳';
      certEraText.textContent = `ERA: THE ANCIENT PAST (${selectedEpoch.toUpperCase()})`;
      reincarnationCountryKey.textContent = 'Historical Realm / Haven:';
      geoResolvedLocationKey.textContent = 'Historical Epicenter:';
    } else {
      certGrandTitle.textContent = 'CERTIFICATE OF FORTHCOMING CYBER-COSMIC INCARNATION';
      certMinistry.textContent = 'THE INTERGALACTIC DIRECTORATE OF CHRONO-ADVANCED DESTINIES';
      certDecree.textContent = 'THIS DULY ATTESTS THAT BY VIRTUE OF QUANTUM STAKING & CHRONO-WARP LAW:';
      certEraPill.className = 'cert-era-pill future-era';
      certEraIcon.textContent = '🚀';
      certEraText.textContent = `ERA: THE DISTANT FUTURE (${selectedEpoch.toUpperCase()})`;
      reincarnationCountryKey.textContent = 'Futuristic Orbital Haven:';
      geoResolvedLocationKey.textContent = 'Galactic Node / Epicenter:';
    }

    // Prepare Secondary Descriptions
    reincarnationCountry.textContent = reincarnationData.realm;
    reincarnationDesc.textContent = reincarnationData.desc;
    geoCoordinates.textContent = geoData.coordinates;
    geoDestinyDesc.textContent = geoData.desc;
    wealthHoldings.textContent = wealth.holdings;
    wealthDecreeText.textContent = wealth.decree;

    // Reset headline/primary text for oracle typewriter animation
    reincarnationHeadline.textContent = '';
    reincarnationSpecies.textContent = '';
    geoDestinyHeadline.textContent = '';
    geoResolvedLocation.textContent = '';
    wealthHeadline.textContent = '';
    wealthNetWorth.textContent = '';

    // Stagger Preparation: hide finding boxes initially
    findingCardReincarnation.classList.remove('stagger-revealing');
    findingCardGeodestiny.classList.remove('stagger-revealing');
    findingCardFinancial.classList.remove('stagger-revealing', 'ultra-rare-tier');

    findingCardReincarnation.classList.add('stagger-hidden');
    findingCardGeodestiny.classList.add('stagger-hidden');
    findingCardFinancial.classList.add('stagger-hidden');

    if (wealth.isUltraRare) {
      findingCardFinancial.classList.add('ultra-rare-tier');
    }

    // Reveal Certificate section
    loadingOverlay.style.display = 'none';
    loadingOverlay.setAttribute('aria-hidden', 'true');
    certificateSection.style.display = 'block';

    // Cosmic Flash Pulse on generation & Fanfare
    triggerCosmicFlash();
    playFanfare();

    // Smooth scroll into certificate
    certificateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Suspenseful pause before first finding card reveals (~380ms)
    await new Promise((r) => setTimeout(r, 380));

    // Reveal Factor I: Reincarnation
    findingCardReincarnation.classList.remove('stagger-hidden');
    findingCardReincarnation.classList.add('stagger-revealing');
    playTone(392, 'triangle', 0.28, 0, 0.09);
    typewriter(reincarnationHeadline, reincarnationData.headline, 16);
    typewriter(reincarnationSpecies, reincarnationData.species, 14);

    // Staggered pause before Factor II (~420ms)
    await new Promise((r) => setTimeout(r, 420));

    // Reveal Factor II: Geographical Location
    findingCardGeodestiny.classList.remove('stagger-hidden');
    findingCardGeodestiny.classList.add('stagger-revealing');
    playTone(493.88, 'sine', 0.28, 0, 0.09);
    typewriter(geoDestinyHeadline, geoData.headline, 16);
    typewriter(geoResolvedLocation, geoData.location, 14);

    // Staggered pause before Factor III (~420ms)
    await new Promise((r) => setTimeout(r, 420));

    // Reveal Factor III: Wealth
    findingCardFinancial.classList.remove('stagger-hidden');
    findingCardFinancial.classList.add('stagger-revealing');
    if (wealth.isUltraRare) {
      playTone(659.25, 'triangle', 0.5, 0, 0.16);
      playTone(1046.5, 'sine', 0.65, 0.1, 0.14);
    } else {
      playTone(587.33, 'sine', 0.28, 0, 0.09);
    }
    typewriter(wealthHeadline, wealth.tier, 16);
    typewriter(wealthNetWorth, wealth.netWorth, 14);

    // After all 3 finding cards reveal, stamp the official seal with thunk
    setTimeout(() => {
      triggerSealStamp();
      showToast(wealth.isUltraRare
        ? '🌟 DIVINE REVELATION: Ultra-Rare Mythic Wealth Tier Decreed!'
        : '✨ Destiny Successfully Decreed & Notarized across Time!');
    }, 360);
  }

  /* ==========================================================================
     UI Utilities & Toast
     ========================================================================== */
  let toastTimer = null;
  function showToast(msg) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = msg;
    toastMessage.classList.add('show');
    toastTimer = setTimeout(() => {
      toastMessage.classList.remove('show');
    }, 3400);
  }

  function rollRandomSoul() {
    const list = TIMELINE_CONFIG[selectedTimeline].travelers;
    const choice = list[Math.floor(Math.random() * list.length)];
    fullNameInput.value = choice.name;
    birthDateInput.value = choice.dob;
    updateLiveAlphabeticalCode();
    updateCharCount();
    playTone(480, 'sine', 0.15, 0, 0.08);
    showToast(`🎲 Summoned traveler: ${choice.name}`);
  }

  function copyDestinySummary() {
    if (!currentCertData) return;
    const t = currentCertData;
    const timelineLabel = t.timeline === 'past' ? '⏳ THE ANCIENT PAST' : '🚀 THE DISTANT FUTURE';
    const text =
`📜 OFFICIAL CERTIFICATE OF DESTINY (CertiFate)
═════════════════════════════════════════════════════
Recipient: ${t.name}
Temporal Trajectory: ${timelineLabel} (${t.epoch})
Terrestrial Anchor: ${t.dobFormatted}
Registry Record: ${t.serialNo}

🐾 FACTOR I : REINCARNATION
Form: ${t.reincarnation.headline}
Allocated Species: ${t.reincarnation.species}
Realm / Haven: ${t.reincarnation.realm}
Destiny: ${t.reincarnation.desc}

📍 FACTOR II : GEOGRAPHICAL LOCATION
Epicenter: ${t.geo.headline}
Location: ${t.geo.location}
Coordinates: ${t.geo.coordinates}
Geomagnetic Tether: ${t.geo.desc}

💰 FACTOR III : WEALTH
Social Standing: ${t.wealth.tier}
Projected Net Worth: ${t.wealth.netWorth}
Allocated Holdings: ${t.wealth.holdings}
Destiny Decree: ${t.wealth.decree}

✍️ Notarized by:
• Pranav (Lord High Registrar of Metempsychosis)
• Sreehari (Chief Geocoding Cartographer)

Issued purely for recreational and reincarnational contemplation by the Supreme Astral Council.`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Complete fate verdict copied to clipboard!');
      }).catch(() => {
        showToast('📋 Fate verdict ready in memory.');
      });
    } else {
      showToast('📋 Fate verdict logged.');
    }
  }

  function triggerSealStamp() {
    setTimeout(() => {
      waxSeal.classList.remove('stamp-thump');
      const certFrame = document.getElementById('certificateElement');
      if (certFrame) certFrame.classList.remove('certificate-shudder');

      void waxSeal.offsetWidth;

      waxSeal.classList.add('stamp-thump');
      if (certFrame) certFrame.classList.add('certificate-shudder');

      playStampThud();
    }, 380);
  }

  /* ==========================================================================
     Event Listeners
     ========================================================================== */
  // Timeline Selection Listeners
  timelineOptionPast.addEventListener('click', () => setTimeline('past'));
  timelineOptionPast.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setTimeline('past');
    }
  });

  timelineOptionFuture.addEventListener('click', () => setTimeline('future'));
  timelineOptionFuture.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setTimeline('future');
    }
  });

  // Name & Form Listeners
  fullNameInput.addEventListener('input', () => {
    updateCharCount();
    updateLiveAlphabeticalCode();
  });

  destinyForm.addEventListener('submit', handleGenerate);
  randomizeBtn.addEventListener('click', rollRandomSoul);

  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundStatus.textContent = soundEnabled ? 'ON' : 'OFF';
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    showToast(soundEnabled ? '🔊 Celestial ambience active' : '🔇 Audio muted');

    if (soundEnabled) {
      soundToggleBtn.classList.add('playing');
      playTone(520, 'sine', 0.2);
      startAmbientMusic();
    } else {
      soundToggleBtn.classList.remove('playing');
      stopAmbientMusic();
    }
  });

  waxSeal.addEventListener('click', () => {
    waxSeal.classList.remove('stamp-thump');
    const certFrame = document.getElementById('certificateElement');
    if (certFrame) certFrame.classList.remove('certificate-shudder');
    void waxSeal.offsetWidth;

    waxSeal.classList.add('stamp-thump');
    if (certFrame) certFrame.classList.add('certificate-shudder');

    playStampThud();
    showToast('⚖️ Official Astral Wax Seal Verified & Undisputed!');
  });

  async function handleShareDestiny() {
    if (!currentCertData) return;
    flushTypewriters();
    showToast('📤 Preparing your destiny certificate for sharing...');
    playTone(520, 'sine', 0.18);

    try {
      if (window.CertiFateCanvasExporter && window.CertiFateCanvasExporter.getCertificateBlob) {
        const { blob, filename } = await window.CertiFateCanvasExporter.getCertificateBlob(currentCertData);
        const file = new File([blob], filename, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'CertiFate — My Predestined Destiny',
            text: `Behold my cosmic destiny: ${currentCertData.name} — ${currentCertData.reincarnation.headline}!`,
            files: [file]
          });
          showToast('🌟 Certificate shared successfully!');
          return;
        } else if (navigator.share) {
          await navigator.share({
            title: 'CertiFate — My Predestined Destiny',
            text: `Behold my cosmic destiny: ${currentCertData.name} — ${currentCertData.reincarnation.headline}!`,
            url: window.location.href
          });
          showToast('🌟 Destiny link shared!');
          return;
        }
      }

      // Fallback: download PNG directly if share sheet is unsupported
      if (window.CertiFateCanvasExporter) {
        window.CertiFateCanvasExporter.exportToPng(currentCertData);
        showToast('📥 Direct sharing unavailable — downloaded certificate PNG instead!');
      }
    } catch (err) {
      if (err && err.name === 'AbortError') {
        // User closed or canceled share sheet
        return;
      }
      console.warn('Share error fallback:', err);
      if (window.CertiFateCanvasExporter) {
        window.CertiFateCanvasExporter.exportToPng(currentCertData);
        showToast('📥 Downloaded certificate PNG to your device.');
      }
    }
  }

  if (shareDestinyBtn) {
    shareDestinyBtn.addEventListener('click', handleShareDestiny);
  }

  downloadImageBtn.addEventListener('click', () => {
    if (!currentCertData) return;
    flushTypewriters();
    showToast('🖼️ Rendering high-definition certificate image...');
    playTone(600, 'sine', 0.2);
    setTimeout(() => {
      if (window.CertiFateCanvasExporter) {
        window.CertiFateCanvasExporter.exportToPng(currentCertData);
        showToast('✅ Certificate PNG downloaded successfully!');
      }
    }, 100);
  });

  printCertBtn.addEventListener('click', () => {
    flushTypewriters();
    window.print();
  });

  copySummaryBtn.addEventListener('click', copyDestinySummary);

  resetBtn.addEventListener('click', () => {
    flushTypewriters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fullNameInput.focus();
    showToast('🔄 Ready for next reincarnation consultation.');
  });

  // Initial Boot
  unlockAudioOnFirstInteraction();
  initAmbientStarfield();
  renderEpochChips();
  if (!fullNameInput.value) {
    fullNameInput.value = 'Arthur Dent';
    birthDateInput.value = '1978-03-11';
  }
  updateCharCount();
  updateLiveAlphabeticalCode();

})();
