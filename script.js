const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

function appendValue(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function deleteLast(){
    display.value = display.value.slice(0,-1);
}

function calculate(){

    try{

        const expression = display.value;
        const result = eval(expression);

        display.value = result;

        saveHistory(`${expression} = ${result}`);

    }catch{
        display.value = "Error";
    }
}

function sqrt(){
    display.value = Math.sqrt(eval(display.value));
}

function square(){
    display.value = Math.pow(eval(display.value),2);
}

function sin(){
    display.value = Math.sin(eval(display.value));
}

function cos(){
    display.value = Math.cos(eval(display.value));
}

function tan(){
    display.value = Math.tan(eval(display.value));
}

function log(){
    display.value = Math.log10(eval(display.value));
}

function copyResult(){

    navigator.clipboard.writeText(display.value);

    alert("Copied!");
}

function saveHistory(item){

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    history.unshift(item);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    loadHistory();
}

function loadHistory(){

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    historyList.innerHTML = "";

    history.forEach(entry=>{

        let li=document.createElement("li");

        li.textContent=entry;

        historyList.appendChild(li);
    });
}

loadHistory();

document.addEventListener("keydown",(e)=>{

    const key=e.key;

    if(
        "0123456789+-*/.%".includes(key)
    ){
        appendValue(key);
    }

    if(key==="Enter"){
        calculate();
    }

    if(key==="Backspace"){
        deleteLast();
    }

    if(key==="Escape"){
        clearDisplay();
    }
});

document
.getElementById("themeToggle")
.addEventListener("click",()=>{

    document.body.classList.toggle("light");
});