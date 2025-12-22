const units = [
  {
    id: "archer",
    name: "Bogenschütze",
    englishName: "Archer",
    type: "Standard",
    image: "images/archer.svg",
    counters: {
      strong: ["skirmisher", "scorpion"],
      medium: ["mangonel"],
      weak: ["scout", "knight"],
    },
  },
  {
    id: "skirmisher",
    name: "Plänkler",
    englishName: "Skirmisher",
    type: "Standard",
    image: "images/skirmisher.svg",
    counters: {
      strong: ["scout", "knight"],
      medium: ["mangonel"],
      weak: ["scorpion"],
    },
  },
  {
    id: "scout",
    name: "Späher",
    englishName: "Scout Cavalry",
    type: "Standard",
    image: "images/scout_cavalry.svg",
    counters: {
      strong: ["spearman"],
      medium: ["camel"],
      weak: ["monk"],
    },
  },
  {
    id: "spearman",
    name: "Speerkämpfer",
    englishName: "Spearman",
    type: "Standard",
    image: "images/spearman.svg",
    counters: {
      strong: ["archer"],
      medium: ["militia"],
      weak: ["scorpion"],
    },
  },
  {
    id: "militia",
    name: "Miliz",
    englishName: "Militia",
    type: "Standard",
    image: "images/militia.svg",
    counters: {
      strong: ["archer"],
      medium: ["scout"],
      weak: ["hand_cannoneer"],
    },
  },
  {
    id: "knight",
    name: "Ritter",
    englishName: "Knight",
    type: "Standard",
    image: "images/knight.svg",
    counters: {
      strong: ["pikeman", "monk"],
      medium: ["camel"],
      weak: ["scorpion"],
    },
  },
  {
    id: "pikeman",
    name: "Pikenier",
    englishName: "Pikeman",
    type: "Standard",
    image: "images/pikeman.svg",
    counters: {
      strong: ["archer"],
      medium: ["militia"],
      weak: ["hand_cannoneer"],
    },
  },
  {
    id: "camel",
    name: "Kamelreiter",
    englishName: "Camel Rider",
    type: "Standard",
    image: "images/camel.svg",
    counters: {
      strong: ["pikeman", "monk"],
      medium: ["archer"],
      weak: ["scorpion"],
    },
  },
  {
    id: "mangonel",
    name: "Mangonel",
    englishName: "Mangonel",
    type: "Standard",
    image: "images/mangonel.svg",
    counters: {
      strong: ["knight", "scout"],
      medium: ["camel"],
      weak: ["monk"],
    },
  },
  {
    id: "scorpion",
    name: "Skorpion",
    englishName: "Scorpion",
    type: "Standard",
    image: "images/scorpion.svg",
    counters: {
      strong: ["knight", "camel"],
      medium: ["mangonel"],
      weak: ["monk"],
    },
  },
  {
    id: "monk",
    name: "Mönch",
    englishName: "Monk",
    type: "Standard",
    image: "images/monk.svg",
    counters: {
      strong: ["scout"],
      medium: ["archer"],
      weak: ["skirmisher"],
    },
  },
  {
    id: "hand_cannoneer",
    name: "Handkannonier",
    englishName: "Hand Cannoneer",
    type: "Standard",
    image: "images/hand_cannoneer.svg",
    counters: {
      strong: ["knight"],
      medium: ["scorpion"],
      weak: ["skirmisher"],
    },
  },
  {
    id: "samurai",
    name: "Samurai",
    englishName: "Samurai",
    type: "Unique",
    image: "images/samurai.svg",
    counters: {
      strong: ["hand_cannoneer"],
      medium: ["archer"],
      weak: ["scorpion"],
    },
  },
  {
    id: "berserk",
    name: "Berserker",
    englishName: "Berserk",
    type: "Unique",
    image: "images/berserk.svg",
    counters: {
      strong: ["archer"],
      medium: ["hand_cannoneer"],
      weak: ["scorpion"],
    },
  },
  {
    id: "huskarle",
    name: "Huskarle",
    englishName: "Huskarl",
    type: "Unique",
    image: "images/huskarle.svg",
    counters: {
      strong: ["hand_cannoneer"],
      medium: ["scorpion"],
      weak: ["militia"],
    },
  },
  {
    id: "mangudai",
    name: "Mangudai",
    englishName: "Mangudai",
    type: "Unique",
    image: "images/mangudai.svg",
    counters: {
      strong: ["skirmisher"],
      medium: ["camel"],
      weak: ["scorpion"],
    },
  },
  {
    id: "jaguar",
    name: "Jaguar-Krieger",
    englishName: "Jaguar Warrior",
    type: "Unique",
    image: "images/jaguar_warrior.svg",
    counters: {
      strong: ["archer"],
      medium: ["hand_cannoneer"],
      weak: ["scorpion"],
    },
  },
];

const unitById = new Map(units.map((unit) => [unit.id, unit]));

const optionContainer = document.getElementById("options");
const unitImage = document.getElementById("unitImage");
const unitName = document.getElementById("unitName");
const unitType = document.getElementById("unitType");
const questionText = document.getElementById("question");
const result = document.getElementById("result");
const counterOverview = document.getElementById("counterOverview");
const uniqueToggle = document.getElementById("uniqueToggle");
const showHints = document.getElementById("showHints");
const newQuestionButton = document.getElementById("newQuestion");
const overviewList = document.getElementById("overviewList");

let currentUnit = null;
let currentStrength = "strong";

const strengthLabels = {
  strong: "starker",
  medium: "mittlerer",
  weak: "schwacher",
};

const strengthPillClass = {
  strong: "strong",
  medium: "medium",
  weak: "weak",
};

const strengthTitles = {
  strong: "Stark",
  medium: "Mittel",
  weak: "Schwach",
};

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function getAvailableUnits() {
  return units.filter((unit) =>
    uniqueToggle.checked ? true : unit.type === "Standard"
  );
}

function unitLabel(unitId) {
  const unit = unitById.get(unitId);
  return unit ? `${unit.name} (${unit.englishName})` : unitId;
}

function createUnitBadge(unitId) {
  const unit = unitById.get(unitId);
  const badge = document.createElement("span");
  badge.className = "unit-badge";

  const img = document.createElement("img");
  img.src = unit?.image ?? "";
  img.alt = unit?.name ?? unitId;

  const text = document.createElement("span");
  text.textContent = unit ? `${unit.name} · ${unit.englishName}` : unitId;

  badge.appendChild(img);
  badge.appendChild(text);
  return badge;
}

function pickQuestion() {
  const pool = getAvailableUnits();
  if (pool.length === 0) {
    return;
  }
  currentUnit = pool[Math.floor(Math.random() * pool.length)];
  const strengths = Object.keys(currentUnit.counters).filter(
    (strength) => currentUnit.counters[strength].length > 0
  );
  currentStrength = strengths[Math.floor(Math.random() * strengths.length)];

  const options = new Set(currentUnit.counters[currentStrength]);
  const otherUnitIds = units
    .map((unit) => unit.id)
    .filter((id) => !options.has(id) && id !== currentUnit.id);

  while (options.size < 4 && otherUnitIds.length > 0) {
    const candidate =
      otherUnitIds[Math.floor(Math.random() * otherUnitIds.length)];
    options.add(candidate);
  }

  renderQuestion(shuffle(Array.from(options)));
}

function renderQuestion(options) {
  unitImage.src = currentUnit.image;
  unitImage.alt = currentUnit.name;
  unitName.textContent = `${currentUnit.name} (${currentUnit.englishName})`;
  unitType.textContent = `${currentUnit.type}-Einheit`;
  questionText.textContent = `Welche Einheit ist ein ${strengthLabels[currentStrength]} Counter gegen ${currentUnit.name}?`;
  result.textContent = "";
  optionContainer.innerHTML = "";
  counterOverview.innerHTML = "";

  options.forEach((optionId) => {
    const button = document.createElement("button");
    button.className = "option";
    button.dataset.unitId = optionId;
    button.appendChild(createUnitBadge(optionId));
    button.addEventListener("click", () => handleAnswer(optionId, button));
    optionContainer.appendChild(button);
  });
}

function handleAnswer(answerId, button) {
  const correctOptions = currentUnit.counters[currentStrength];
  const isCorrect = correctOptions.includes(answerId);

  document.querySelectorAll(".option").forEach((option) => {
    option.disabled = true;
    const optionId = option.dataset.unitId;
    if (correctOptions.includes(optionId)) {
      option.classList.add("correct");
    }
  });

  if (!isCorrect) {
    button.classList.remove("correct");
    button.classList.add("wrong");
  }

  const correctLabels = correctOptions.map(unitLabel).join(", ");
  result.textContent = isCorrect
    ? "Richtig!"
    : `Leider falsch. Richtige Antwort: ${correctLabels}.`;

  if (showHints.checked) {
    renderCounterOverview();
  }
}

function renderCounterOverview() {
  counterOverview.innerHTML = "";
  Object.entries(currentUnit.counters).forEach(([strength, items]) => {
    const group = document.createElement("div");
    group.className = "counter-group";

    const title = document.createElement("strong");
    const pill = document.createElement("span");
    pill.className = `pill ${strengthPillClass[strength]}`;
    pill.textContent = strengthTitles[strength];
    title.appendChild(pill);

    const list = document.createElement("div");
    list.className = "counter-list";
    items.forEach((unitId) => {
      list.appendChild(createUnitBadge(unitId));
    });

    group.appendChild(title);
    group.appendChild(list);
    counterOverview.appendChild(group);
  });
}

function renderOverviewList() {
  overviewList.innerHTML = "";
  const pool = getAvailableUnits();

  pool.forEach((unit) => {
    const card = document.createElement("div");
    card.className = "overview-card";

    const header = document.createElement("div");
    header.className = "overview-header";

    const image = document.createElement("img");
    image.src = unit.image;
    image.alt = unit.name;

    const title = document.createElement("div");
    title.innerHTML = `<strong>${unit.name}</strong><span>${unit.englishName}</span>`;

    header.appendChild(image);
    header.appendChild(title);
    card.appendChild(header);

    const groups = document.createElement("div");
    groups.className = "overview-groups";

    Object.entries(unit.counters).forEach(([strength, items]) => {
      const group = document.createElement("div");
      group.className = "overview-group";

      const label = document.createElement("span");
      label.className = `pill ${strengthPillClass[strength]}`;
      label.textContent = strengthTitles[strength];

      const list = document.createElement("div");
      list.className = "counter-list";
      items.forEach((unitId) => list.appendChild(createUnitBadge(unitId)));

      group.appendChild(label);
      group.appendChild(list);
      groups.appendChild(group);
    });

    card.appendChild(groups);
    overviewList.appendChild(card);
  });
}

[newQuestionButton, uniqueToggle, showHints].forEach((element) =>
  element.addEventListener("click", () => {
    pickQuestion();
    renderOverviewList();
  })
);

pickQuestion();
renderOverviewList();
