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

  const history = document.querySelector("#history");

  const operators = document.querySelectorAll("[data-key=operator]");

  const target = e.target;

  const { key } = target.dataset;

  const { previousKeyType } = displayArea.dataset;

  const value = result.textContent;

  const keyValue = target.value;

  const opData = {
    previousKeyType,
    key,
    keyValue,
    value,
    target,
    result,
    history,
    displayArea,
    operators,
    target
  };

  executeFn(opData);
};

const executeFn = (obj) => {
  const {
    previousKeyType,
    key,
    keyValue,
    value,
    result,
    history,
    displayArea,
    operators,
    target
  } = obj;

  displayArea.dataset.previousKeyType = key;

  const operatorsArr = [...operators];




  if (previousKeyType === undefined && key === "operator") {
    operatorsArr.forEach((operator) => operator.setAttribute("disabled", ""));
  } else if (key == "number") {
    operatorsArr.forEach((operator) => operator.removeAttribute("disabled"));
     value === "" || previousKeyType == "operator"
      ? (result.textContent = keyValue)
      : (result.textContent = `${value}${keyValue}`);
  } else if (previousKeyType === "number" && key === "operator") {
 
     target.classList.add('selected')
  
    history.textContent = value

    
   
  } else if (previousKeyType === "operator" && key === "operator") {
    operatorsArr.forEach((operator) => operator.setAttribute("disabled", ""));
  } else if (key == "equal") {
      const calcObj = {};
   const selected = document.querySelector('.selected');

    selected === null
      ? (calcObj)
      : ((calcObj["firstNumber"] = history.textContent),
        (calcObj["nextNumber"] = value),
        (calcObj["operator"] = selected.dataset.operator));

     
        calculation(calcObj, result, history);
  
  }

};

const calculation =(obj, result, history)=>{

  if (Object.keys(obj).length===0) {

    return;
  }

  const{firstNumber, nextNumber, operator}= obj;

  switch (operator) {
    case "plus":
     result.textContent = parseInt(firstNumber) + parseInt(nextNumber);

     history.textContent = result.textContent
     console.log(operator);
      break;
    case "subtract":
     result.textContent = parseInt(firstNumber) - parseInt(nextNumber);

     history.textContent = result.textContent;
        console.log(operator);
      break;
    case "divide":
     result.textContent = parseInt(firstNumber) / parseInt(nextNumber);

     history.textContent = result.textContent;
     
      break;
    case "multiply":
      result.textContent = parseInt(firstNumber) * parseInt(nextNumber);

      history.textContent = result.textContent;
      break;

    default:
      break;
  } 

}

   
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
