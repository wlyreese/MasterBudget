const itemEditableSpan = document.querySelectorAll("listTitleItem greenLi");

const headerArray = [];

const itemArray = [];
/* ON START */
renderList();

/* TEXT/NUMBER FORMATTERS */
/* FORMATTER FOR TO ADD DOLLAR AND REARRANGE NEGATIVE SIGNS */
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

/* Removes everyhting and leaves a raw number */
function removeSymbolsAndConvertToNumber(input) {
    // Remove all non-numeric characters except the decimal point
    const cleanedString = input.replace(/[^\d.-]/g, '');
  
    // Convert the cleaned string to a number
    let number = parseFloat(cleanedString);
  
    return isNaN(number) ? 0 : number
}  

/* Tests if the string contains illegal chars */
function containsOtherChars(input) {
    // Regular expression to match any character that is not a digit, a dot, a minus sign, or a dollar sign
    const regex = /[^-\d,.$]/;
    return regex.test(input);
}


/* -----Functions----- */
/* Used to render the title of the budget items display */
function renderList(){
    renderTitle();
    if(itemArray.length !== 0){
        itemArray[0].id = 0;
    }
    const budgetDivDisplay = document.getElementById("budgetDiv");

    itemArray.forEach(item => {
        const newUl = document.createElement("ul");
        newUl.classList.add("horizotalListItem");
        newUl.id = `${item.id}`
        newUl.innerHTML = `
        <li class="listTitleItem">${item.name}</li>
        <li id="${item.id + "li"}" class="listTitleItem greenLi" onclick="makeEditable(this, ${item.id})">${formatString((String(item.budget)))}</li>
        <li class="listTitleItem">${formatString(String(item.spent))}</li>
        <li class="listTitleItem">${formatString(String(item.actual))}</li>
        <button onclick="deleteItem(${item.id})"><i class="fa-solid fa-trash"></i></button>
        `;
        
        budgetDivDisplay.appendChild(newUl);
    });

    updateLeftToBudgetDisplay();
}



/* Used to render title and all items on list */
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



/* Calculate and render Left to budget display */
function updateLeftToBudgetDisplay(){
    let totalAllocated = 0;
    const totalBudget = removeSymbolsAndConvertToNumber(document.getElementById("budgetTotal").textContent);
    const saveGoal = removeSymbolsAndConvertToNumber(document.getElementById("saveGoalTotal").textContent)
    itemArray.forEach(item => {
        totalAllocated = item.budget + totalAllocated;
    });
    let leftToBudget = totalBudget - saveGoal - totalAllocated;
    document.getElementById("leftToBudgetDisplay").textContent = formatString(String(leftToBudget));
}



/* Create and append a new ul for display */
function addItemToDisplay(event){
    event.preventDefault();

    const input = document.getElementById("itemNameInput").value;
    const id = itemArray.length;
    console.log(id);

    const newObject = {
        id: `${id}`,
        name: `${input}`,
        budget: 0,
        spent: 0,
        actual: 0
    }

    addCategoryContainer.style.display = "none";
    itemArray.push(newObject);
    renderList();
}


/* Allows green plus button to display the add item screen */
function displayAddItemScreen(){
    const addCategoryContainer = document.getElementById("addCategoryContainer");
    const input = document.getElementById("itemNameInput")

    input.value = '';
    addCategoryContainer.style.display = "block";
}



/* Allows the cancel button to add the add item screen */
function cancelAddItem(event){
    event.preventDefault();
    const addCategoryContainer = document.getElementById("addCategoryContainer");

    addCategoryContainer.style.display = "none";

}


/* Remove an ul from the display */
function deleteItem(id){
    const index = itemArray.findIndex(item => item.id === id);
    itemArray.splice(index, 1);

    renderList();
}


/* Allows the "budget" item spans to updated and update values in array */
function makeEditable(element, id){
    element.setAttribute("contenteditable", "true");
    element.focus();


    const arrayItem = itemArray[id];

    element.addEventListener("blur", () => {
        element.removeAttribute("contenteditable");
        tempFormattedText = formatString(String(containsOtherChars(element.textContent) ? 0 : element.textContent));
        tempDataFormattedNum = removeSymbolsAndConvertToNumber(element.textContent);

        arrayItem.budget = tempDataFormattedNum;
        element.textContent = tempFormattedText;

        updateLeftToBudgetDisplay();
    });

    element.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            element.removeAttribute("contenteditable");
        }
    });
}



/* Edit the budget number internally and externally */
function editBudget(element){
    element.setAttribute("contenteditable", "true");
    element.focus();  
    element.textContent = "";

    element.addEventListener("blur", () => {
        element.removeAttribute("contenteditable");
        tempFormattedText = formatString(String(containsOtherChars(element.textContent) ? 0 : element.textContent));

        element.textContent = tempFormattedText;
        updateLeftToBudgetDisplay();
    });

    element.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            element.removeAttribute("contenteditable");
        }
    });
}



/* Edit the save goal number */
function editSaveGoal(element){
    element.setAttribute("contenteditable", "true");
    element.focus();  
    element.textContent = "";

    element.addEventListener("blur", () => {
        element.removeAttribute("contenteditable");
        tempFormattedText = formatString(String(containsOtherChars(element.textContent) ? 0 : element.textContent));

        element.textContent = tempFormattedText;
        updateLeftToBudgetDisplay();
    });

    element.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            element.removeAttribute("contenteditable");
        }
    });
}