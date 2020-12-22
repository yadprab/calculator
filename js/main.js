const calcFn = () => {
  const themeSect = document.querySelector(".theme--section");

  const button = themeSect.querySelectorAll("button");

  const buttonArea = document.querySelector(".button--area");

  const keys = buttonArea.querySelectorAll("button");

  button.forEach((but) =>
    but.addEventListener("click", (e) => {
      themeFn(e, button);
    })
  );

  keys.forEach((buttons) => {
    buttons.addEventListener("click", calc);
  });

  setTheme(button);
};

const calc = (e) => {
  const result = document.querySelector("#result");

  const displayArea = document.querySelector(".text--area");

  const target = e.target;

  const type = target.dataset.key;

  displayArea.dataset.previousKeyType = type;

  const value = result.textContent;

  const previousType = displayArea.dataset.previousKeyType;

  const opData = {
    previousType,
    value,
    type,
    target,
    result,
  };

  executeFn(opData);
};

const executeFn = ({ previousType, value, type, target, result }) => {
  if (type == "number") {

    if (value==='') {

        result.textContent = target.value
        
    }
  }
};

/** theme functions area  */
const themeFn = (e, ele) => {
  const themeId = e.target.id;

  const parent = e.target;

  const stateObj = {
    theme: "",
    state: "",
    target: "",
    id: "",
  };

  ele.forEach((button) => button.classList.remove("active"));

  e.target.classList.add("active");

  switchTheme(themeId, stateObj, parent);
};

const switchTheme = (id, obj) => {
  switch (id) {
    case "light--theme":
      document.body.className = "light";

      obj.state = "active";

      obj.theme = document.body.className;

      obj.id = id;

      localStorage.setItem("calcTheme", JSON.stringify(obj));

      break;

    default:
      document.body.className = "dark";

      obj.state = "active";

      obj.theme = document.body.className;

      obj.id = id;

      localStorage.setItem("calcTheme", JSON.stringify(obj));

      break;
  }
};

const setTheme = (button) => {
  if (localStorage.getItem("calcTheme") === null) {
    return;
  }
  const themeData = JSON.parse(localStorage.getItem("calcTheme"));

  const { id, theme, state } = themeData;

  const filterId = [...button].filter((button) => button.id === id);

  themeAssign(filterId, theme, state);
};

const themeAssign = (element, theme, state) => {
  const [butElem] = element;

  document.body.className = theme;

  butElem.className = state;
};

//1.0 main function
window.addEventListener("DOMContentLoaded", calcFn);
