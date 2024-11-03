const editableSpan = document.querySelectorAll(".editableSpan");
const greenLi = document.querySelectorAll(".listTitleItem greenLi");
const budgetDiv = document.getElementById("budgetDiv");
const addCategoryContainer = document.getElementById("addCategoryContainer");
const cancelItemBtn = document.getElementById("cancelItemBtn");
const displayAddItemScreenBtn = document.getElementById("displayAddItemScreenBtn");
const addItemBtn = document.getElementById("addItemBtn");
const itemNameInput = document.getElementById("itemNameInput");
const budgetTotal = document.getElementById("budgetTotal");
const leftToBudgetDisplay = document.getElementById("leftToBudgetDisplay");

const itemArray = [{
    id: 0,
    name: "Eating Out"
},
{
    id: 1,
    name: "Clothes"
}];



const budgetNumInput = editableSpan[0];
const savingsGoalInput = editableSpan[1];

function formatString(amount){
    let cleanedString = amount.split(',').join('');

    if(cleanedString.includes("-")){
        cleanedString = cleanedString.replace(/-\$/, '-');
        cleanedString = '-$' + cleanedString.replace("-", '');
    }else{
        cleanedString = "$" + cleanedString.replace('$', '');
    }

    return cleanedString;
}

renderTitle()
renderList();

/* Editable inputs for header */


budgetNumInput.addEventListener("click", () => {
    budgetNumInput.setAttribute("contenteditable", "true");
    budgetNumInput.focus();

    budgetNumInput.addEventListener("blur", () => {
        budgetNumInput.removeAttribute("contenteditable");
        const formattedNum = formatString(budgetNumInput.textContent);
        budgetNumInput.textContent = formattedNum;
        updateBudgetDisplay();
    });

    budgetNumInput.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            const formattedNum = formatString(budgetNumInput.textContent);
            budgetNumInput.textContent = formattedNum;
            budgetNumInput.removeAttribute("contenteditable");
            updateBudgetDisplay();
        }
    });
});

savingsGoalInput.addEventListener("click", () => {
    savingsGoalInput.setAttribute("contenteditable", "true");
    savingsGoalInput.focus();

    savingsGoalInput.addEventListener("blur", () => {
        savingsGoalInput.removeAttribute("contenteditable");
        const formattedNum = formatString(savingsGoalInput.textContent);
        savingsGoalInput.textContent = formattedNum;
    });

    savingsGoalInput.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            savingsGoalInput.removeAttribute("contenteditable");
            const formattedNum = formatString(savingsGoalInput.textContent);
            savingsGoalInput.textContent = formattedNum;
        }
    });
});


document.getElementById("cancelItemBtn").addEventListener("click", (event) => {
    event.preventDefault();
    addCategoryContainer.style.display = "none";
});

document.getElementById("addItemBtn").addEventListener("click", (event) => {

    event.preventDefault();
    newID = itemArray.length + 1;
    newName = itemNameInput.value;
    itemArray.push({id: `${newID}`,
                    name: `${newName}`});

    addCategoryContainer.style.display = "none";

    renderTitle();
    renderList();

});


function displayAddItemScreen(){
    addCategoryContainer.style.display = "block";
}

function renderList(){

    itemArray.forEach((item) => {
        const newUl = document.createElement("ul");

        newUl.classList.add("horizotalListItem");
        newUl.id = `${item.id}`
        newUl.innerHTML = `
            <li class="listTitleItem">${item.name}</li>
            <li id="${item.id + "li"}" class="listTitleItem greenLi" onclick="makeEditable(this, ${item.id})">$200</li>
            <li class="listTitleItem">$400</li>
            <li class="listTitleItem">-$200</li>
            <button onclick="deleteItem(${item.id})"><i class="fa-solid fa-trash"></i></button>
        `;
        budgetDiv.appendChild(newUl);
    });
}

function renderTitle(){

    budgetDiv.textContent = " ";

    titleUl = document.createElement("ul");
    titleUl.classList.add("horizotalListHeader");

    titleUl.innerHTML = `
        <li class="listTitle">Item</li>
        <li class="listTitle">Budget</li>
        <li class="listTitle">Spent</li>
        <li class="listTitle">Actual: <span>-$10,000,000</span></li>
        <button onclick="displayAddItemScreen()"><i class="fa-solid fa-plus"></i></button>
    `

    budgetDiv.appendChild(titleUl);
}

function deleteItem(id){
    const item = itemArray[`${id}`];
    itemArray.splice(item, 1);

    renderTitle();
    renderList();
}

function makeEditable(element, id){
    element.setAttribute("contenteditable", "true");
    element.focus();

    element.addEventListener("blur", () => {
        element.removeAttribute("contenteditable");
        const formattedNum = formatString(element.textContent);
            element.textContent = formattedNum;
    });

    element.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            const formattedNum = formatString(element.textContent);
            element.textContent = formattedNum;
        }
    });
}

function updateBudgetDisplay(){
    const budgetTotalValue = budgetTotal.textContent; 
    return budgetTotalValue;
};

updateLeftToBudgetDisplay();

function updateLeftToBudgetDisplay(){
    const budgetNumber = Number(updateBudgetDisplay().slice(1).split(',').join(''));
    let leftToBudgetNumber = 0;

    for(let i = 0; i < itemArray.length; i++){
        const num = Number(document.getElementById(`${i + "li"}`).textContent.slice(1).split(",").join(''));
        leftToBudgetNumber += num;
    }
};

