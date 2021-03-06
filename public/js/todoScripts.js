const checkBoxes = document.querySelectorAll('.inbox input[type="checkbox"]');
const deleteButton = document.querySelector("#delete");
checkBoxes.forEach((checkBox) =>
  checkBox.addEventListener("click", handleCheck)
);

deleteButton.addEventListener("click", handleDelete);
let lastChecked;

function handleCheck(e) {
  let inBetween = false;

  if (e.shiftKey && this.checked) {
    checkBoxes.forEach((checkBox) => {
      if (checkBox === this || checkBox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkBox.checked = true;
      }
    });
  }
  lastChecked = this;

  // check and post all boxes checked
  const element = [];
  const itemDescription = document.querySelectorAll(".inbox p");
  checkBoxes.forEach((checkBox, index) => {
    element.push({
      checked: checkBox.checked,
      text: itemDescription[index].innerHTML,
    });
  });

  fetch("/check", {
    method: "POST",
    body: JSON.stringify(element),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

function handleDelete() {
  const element = [];
  const itemDescription = document.querySelectorAll(".inbox p");
  checkBoxes.forEach((checkBox, index) => {
    if (!checkBox.checked) {
      element.push({
        checked: checkBox.checked,
        text: itemDescription[index].innerHTML,
      });
    }
  });

  fetch("/check", {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(element),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(function () {
    window.location.reload();
  });
}
