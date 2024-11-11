const itemEditableSpan = document.querySelectorAll("listTitleItem greenLi");

/* TO DO */
/* STORE ACCOUNT NAMES AND AMOUNTS AS A JSON DATA STRUCTURE SO THEY CAN BE IMPORTED AND REFRECNED BETWEEN PAGES AND FILES. NEEDS TO COMMUNICATE WITH THE TRANSACTION SCREEN*/

const headerArray = () => {
    const retrievedObjectString = localStorage.getItem('myObject');
    const retrievedObject = JSON.parse(retrievedObjectString);
    console.log(retrievedObject);
    if(retrievedObject == null || retrievedObject == ''){
        return [];
    }else{
        return retrievedObject;
    }
}

const accountJSON = () => {
    parsedAccountInformation = JSON.parse(localStorage.getItem('accountInformation'));
    console.log(parsedAccountInformation);
    if(parsedAccountInformation === null || parsedAccountInformation === undefined){
        return [];
    }else{
        return parsedAccountInformation;
    }

}

const accountAmounts = accountJSON();
console.log(accountAmounts);
const itemArray = headerArray();
/* ON START */
renderList();


/* TEXT/NUMBER FORMATTERS */

/* Captialize first letter */
function captializeFirstChar(string){
    if(string.charAt(0) !== ' ' && !isNaN(string.charAt(0))){
        return string;
    }else{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

captializeFirstChar("string");

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
    updateLeftToBudgetDisplay();
    if(itemArray == undefined){
        return;
    }

    itemArray.forEach(item => {
        let index = itemArray.indexOf(item);
        item.id = index;
    });
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

    renderAccounts();
};



/* Used to render title and all items on list */
function renderTitle(){
    const budgetDiv = document.getElementById("budgetDiv");
    budgetDiv.textContent = "";

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

function renderAccounts(){
    const accountsDiv = document.getElementById("accountsDiv");
    accountsDiv.innerHTML = `<button onclick="openAccountScreen()">Add Account</button>`;

    let id = 0;

    if(accountAmounts == null || accountAmounts == undefined){
        const noAccountsH5 = document.createElement("h5");
        noAccountsH5.innerHTML = `NO ACCOUNTS`;
        accountsDiv.appendChild(noAccountsH5);
    }

    console.log(accountAmounts);
    accountAmounts.forEach(account => {
        account.id = id;
        id++;
    });

    accountAmounts.forEach(account => {
        const newH5 = document.createElement("h5");
        newH5.innerHTML = `
        ${captializeFirstChar(account.name)}: <button class="deleteAccountButton" onclick="deleteAccount(${account.id})" ><i class="fa-solid fa-trash"></i></button><span>${formatString(String(account.amount))}</span>
        `
        accountsDiv.appendChild(newH5);
    })

    convertToJSON(accountAmounts, "accountInformation");
};


/* Calculate and render Left to budget display */
function updateLeftToBudgetDisplay(){
    let totalAllocated = 0;
    const totalBudget = removeSymbolsAndConvertToNumber(document.getElementById("budgetTotal").textContent);
    const saveGoal = removeSymbolsAndConvertToNumber(document.getElementById("saveGoalTotal").textContent);

    if(itemArray == undefined || itemArray.length === 0){
        leftToBudget = totalBudget - saveGoal;
        document.getElementById("leftToBudgetDisplay").textContent = formatString(String(leftToBudget));
    }else{
        itemArray.forEach(item => {
            totalAllocated = item.budget + totalAllocated;
        });
        let leftToBudget = totalBudget - saveGoal - totalAllocated;
        document.getElementById("leftToBudgetDisplay").textContent = formatString(String(leftToBudget));
    }
};



/* Create and append a new ul for display */
function addItemToDisplay(event){
    event.preventDefault();
    let id;

    const input = document.getElementById("itemNameInput").value;
    console.log(itemArray);
    if(itemArray === undefined){
        id = 0;
    }else{
        id = itemArray.length;
    }

    const newObject = {
        id: `${id}`,
        name: `${input}`,
        budget: 0,
        spent: 0,
        actual: 0
    }


    addCategoryContainer.style.display = "none";
    itemArray.push(newObject);
    convertToJSON(itemArray, "myObject");
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

    convertToJSON(itemArray, "myObject");
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
        convertToJSON(itemArray, "myObject");
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

/* STORE DATA IN JSON */
function convertToJSON(itemArray, name){
    
    if(itemArray[0] !== null){
        itemArray.slice([0], 1);
    }

    if(itemArray == null || itemArray == undefined){
        itemArray
    }


    const myArrayOfObjects = JSON.stringify(itemArray);
    localStorage.setItem(`${name}`, myArrayOfObjects);
    console.log(JSON.stringify(itemArray));
}

/* UTILITY FUNCTION TO DELETE STORED JSON */
function removeItem(item){
    localStorage.removeItem(item);
}

/* USED TO OPEN THE ADD ACCOUNT SCREEN */
function openAccountScreen() {
    const addAccountScreen = document.getElementById("addAccountScreen").style.display = "block";
}

/* USED TO CLOSE THE ADD ACCOUNT SCREEN */

function closeAddAccountScreen(event){
    event.preventDefault();
    const addAccountScreen = document.getElementById("addAccountScreen").style.display = "none";
    document.getElementById("accountNameInput").value = '';
}

/* ADD NEW ACCOUNT TO DISPLAY */
function addNewAccount(event){
    event.preventDefault();
    
    accountAmounts.push({
        id: accountAmounts.length,
        name: `${document.getElementById("accountNameInput").value}`,
        amount: 0
    });
    document.getElementById("accountNameInput").value = '';
    const addAccountScreen = document.getElementById("addAccountScreen").style.display = "none";
    renderList();
}

/* DELETE AN ACCOUNT FROM THE DISPLAY */

function deleteAccount(id){

    const index = accountAmounts.findIndex(account => account.id === id);
    console.log(index);
    accountAmounts.splice(index, 1);
    renderList();
}