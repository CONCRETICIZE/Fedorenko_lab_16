const stageInputs = [...document.querySelectorAll("[data-stage]")];
const progressCount = document.querySelector("#progress-count");
const progressFill = document.querySelector("#progress-fill");
const progressBar = document.querySelector('[role="progressbar"]');
const storageKey = "fedorenko-lab16-stages";

function updateProgress() {
  const complete = stageInputs.filter((input) => input.checked).length;
  const total = stageInputs.length;
  const percentage = total ? (complete / total) * 100 : 0;

  progressCount.textContent = `${complete} / ${total}`;
  progressFill.style.width = `${percentage}%`;
  progressBar.setAttribute("aria-valuenow", String(complete));
}

try {
  const savedStages = JSON.parse(localStorage.getItem(storageKey) || "{}");
  stageInputs.forEach((input) => {
    if (typeof savedStages[input.dataset.stage] === "boolean") {
      input.checked = savedStages[input.dataset.stage];
    }
  });
} catch {
  localStorage.removeItem(storageKey);
}

stageInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const savedStages = Object.fromEntries(
      stageInputs.map((stage) => [stage.dataset.stage, stage.checked]),
    );
    localStorage.setItem(storageKey, JSON.stringify(savedStages));
    updateProgress();
  });
});

updateProgress();