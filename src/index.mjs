import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello JavaScript!</h1>
`;

//var x;

// closure
function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc();
