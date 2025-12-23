const buildings = [
  {
    id: "barracks",
    name: "Baracken",
  },
  {
    id: "archery",
    name: "Bogenschießanlage",
  },
  {
    id: "stable",
    name: "Stall",
  },
  {
    id: "other",
    name: "Weitere Gebäude",
  },
];

const units = [
  {
    id: "archer",
    name: "Bogenschütze",
    englishName: "Archer",
    type: "Standard",
    building: "archery",
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
    building: "archery",
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
    building: "stable",
    image: "images/scout_cavalry.svg",
    counters: {
      strong: ["spearman", "pikeman"],
      medium: ["camel"],
      weak: ["monk"],
    },
  },
  {
    id: "spearman",
    name: "Speerkämpfer",
    englishName: "Spearman",
    type: "Standard",
    building: "barracks",
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
    building: "barracks",
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
    building: "stable",
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
    building: "barracks",
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
    building: "stable",
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
    building: "other",
    image: "images/mangonel.svg",
    counters: {
      strong: ["knight", "camel"],
      medium: ["scout"],
      weak: ["monk"],
    },
  },
  {
    id: "scorpion",
    name: "Skorpion",
    englishName: "Scorpion",
    type: "Standard",
    building: "other",
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
    building: "other",
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
    building: "archery",
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
    building: "other",
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
    building: "other",
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
    building: "other",
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
    building: "other",
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
    building: "other",
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
const counterMenu = document.getElementById("counterMenu");

let currentUnit = null;
let currentStrength = "strong";
let selectedMenuUnit = null;

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

function createBuildingColumn(buildingId, title, items, renderItem) {
  const column = document.createElement("div");
  column.className = "building-column";

  const heading = document.createElement("div");
  heading.className = "building-title";
  heading.textContent = title;

  const list = document.createElement("div");
  list.className = "building-units";

  items.forEach((item) => list.appendChild(renderItem(item)));

  column.appendChild(heading);
  column.appendChild(list);
  return column;
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

  renderQuestion(shuffle([...pool]));
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

  const grouped = groupUnits(options);
  buildings.forEach((building) => {
    const unitsForBuilding = grouped[building.id] ?? [];
    if (unitsForBuilding.length === 0) {
      return;
    }
    const column = createBuildingColumn(
      building.id,
      building.name,
      unitsForBuilding,
      (unit) => {
        const button = document.createElement("button");
        button.className = "option";
        button.dataset.unitId = unit.id;
        button.appendChild(createUnitBadge(unit.id));
        button.addEventListener("click", () => handleAnswer(unit.id, button));
        return button;
      }
    );
    optionContainer.appendChild(column);
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

function groupUnits(unitList) {
  return unitList.reduce((acc, unit) => {
    const key = buildings.some((b) => b.id === unit.building)
      ? unit.building
      : "other";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(unit);
    return acc;
  }, {});
}

function renderCounterMenu() {
  counterMenu.innerHTML = "";
  const availableUnits = getAvailableUnits();
  const grouped = groupUnits(availableUnits);

  const highlightMap = new Map();
  if (selectedMenuUnit) {
    Object.entries(selectedMenuUnit.counters).forEach(([strength, ids]) => {
      ids.forEach((id) => {
        const available = availableUnits.some((unit) => unit.id === id);
        if (available) {
          highlightMap.set(id, strength);
        }
      });
    });
  }

  buildings.forEach((building) => {
    const unitsForBuilding = grouped[building.id] ?? [];
    if (unitsForBuilding.length === 0) {
      return;
    }
    const column = createBuildingColumn(
      building.id,
      building.name,
      unitsForBuilding,
      (unit) => {
        const button = document.createElement("button");
        button.className = "menu-unit";
        button.dataset.unitId = unit.id;
        button.appendChild(createUnitBadge(unit.id));
        if (selectedMenuUnit?.id === unit.id) {
          button.classList.add("selected");
        }
        const highlight = highlightMap.get(unit.id);
        if (highlight) {
          button.classList.add(`highlight-${highlight}`);
        }
        button.addEventListener("click", () => {
          selectedMenuUnit = unit;
          renderCounterMenu();
        });
        return button;
      }
    );
    counterMenu.appendChild(column);
  });
}

[newQuestionButton, uniqueToggle, showHints].forEach((element) =>
  element.addEventListener("click", () => {
    pickQuestion();
    renderCounterMenu();
  })
);

pickQuestion();
renderCounterMenu();
