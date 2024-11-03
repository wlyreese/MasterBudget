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
    name: "Eating Out",
    budget: 100,
    spent: 50,
    actual: 50
},
{
    id: 1,
    name: "Clothes",
    budget: 100,
    spent: 120,
    actual: -20
}];



const budgetNumInput = editableSpan[0];
const savingsGoalInput = editableSpan[1];

function formatString(amount){
    // Remove existing commas and dollar signs
    let cleanedString = amount.replace(/[,\$]/g, '');
    let isNegative = cleanedString.includes('-');

    // Convert to number and format with commas
    let number = Number(cleanedString.replace('-', ''));
    let formattedNumber = number.toLocaleString();

    // Add the dollar sign and handle negative sign
    return isNegative ? '-$' + formattedNumber : '$' + formattedNumber;
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
        updateLeftToBudgetDisplay();
    });

    budgetNumInput.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            const formattedNum = formatString(budgetNumInput.textContent);
            budgetNumInput.textContent = formattedNum;
            budgetNumInput.removeAttribute("contenteditable");
            updateBudgetDisplay();
            updateLeftToBudgetDisplay();
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
            console.log(savingsGoalInput.value);
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
                    name: `${newName}`,
                    budget: 0,
                    spent: 0,
                    actual: 0});

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
            <li id="${item.id + "li"}" class="listTitleItem greenLi" onclick="makeEditable(this, ${item.id})">${formatString(String(item.budget))}</li>
            <li class="listTitleItem">${formatString(String(item.spent))}</li>
            <li class="listTitleItem">${formatString(String(item.actual))}</li>
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
        <li class="listTitle">Actual: <span>$0</span></li>
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

function makeEditable(element){
    element.setAttribute("contenteditable", "true");
    element.focus();

    element.addEventListener("blur", () => {
        element.removeAttribute("contenteditable");
        let text = element.textContent;
            if(text.includes("-")){
                const index = text.indexOf("-");
                text = text.slice(0, index) + text.slice(index + 1);
            }
        const formattedNum = formatString(element.textContent);
        element.textContent = formattedNum;
        updateLeftToBudgetDisplay();
    });

    element.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            element.removeAttribute("contenteditable");
            let text = element.textContent;
            if(text.includes("-")){
                const index = text.indexOf("-");
                text = text.slice(0, index) + text.slice(index + 1);
            }
            const formattedNum = formatString(text);
            element.textContent = formattedNum;
            console.log(text);
        }
            
            updateLeftToBudgetDisplay();
    });
}

updateBudgetDisplay();

function updateBudgetDisplay(){
    const budgetTotalValue = budgetTotal.textContent; 
    return budgetTotalValue;
};

function updateLeftToBudgetDisplay(){
    const leftToBudgetDisplay = document.getElementById("leftToBudgetDisplay");
    const budgetNumber = Number(updateBudgetDisplay().slice(1).split(',').join(''));
    let leftToBudgetNumber = 0;

    for(let i = 0; i < itemArray.length; i++){
        const num = Number(document.getElementById(`${i + "li"}`).textContent.slice(1).split(",").join(''));
        leftToBudgetNumber += num;
    }

    const formatedBudgetDisplay = formatString(String(budgetNumber - leftToBudgetNumber));
    leftToBudgetDisplay.textContent = formatedBudgetDisplay;
};