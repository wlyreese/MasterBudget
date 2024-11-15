/* GLOBAL VARIABLES */
const transactionArray = parseJSON("transactionsObjects");





/* ----- ON START ----- */
renderTransactionsToDisplay();





/* ----- FORMATTING FUNCTIONS ----- */
/* CAPTIALZIE FIRST CHAR */
function captializeFirstChar(string){
    if(string.charAt(0) !== ' ' && !isNaN(string.charAt(0))){
        return string;
    }else{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

/* REMOVES ANY SPECIAL CHARACTERS, AND CONCATENATES A DOLLAR SIGN TO CHAR 0 */
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





/* ----- CONVERT TO/FROM JSON ----- */
/* JAVASCRIPT ----> JSON */
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

/* JSON -----> JAVASCIPT */
function parseJSON(name){
    const item = localStorage.getItem(`${name}`);
    return JSON.parse(item) == null ? [] : JSON.parse(item);
}




/* ----- RENDER FUNCTIONS ----- */

/* RENDERS THE ACCOUNTS LIST TO THE ADD SCREEN DROPDOWN */
function renderAccountDropdown(element){
    element.innerHTML = "";
    const accountArray = JSON.parse(localStorage.getItem("accountInformation"));

    accountArray.forEach(account => {
        const newOption = document.createElement("option");
        newOption.innerHTML = `${captializeFirstChar(account.name)}`
        element.appendChild(newOption);
    });

    const transactionAccountDropdown = document.querySelectorAll(".accountDropdown");

    transactionAccountDropdown.forEach(dropdown => {
    
        accountArray.forEach(account => {
            const newOption = document.createElement("option");
            newOption.innerHTML = `${captializeFirstChar(account.name)}`
            dropdown.appendChild(newOption);
        });
    });
};

/* RENDERS THE CATEGORIES LIST TO THE ADD SCREEN DROP DOWNS */
function renderCategoryDropdown(element){
    element.innerHTML = "";
    const budgetArray = JSON.parse(localStorage.getItem("myObject"));

    if(element.id === "budgetTypeDropdown"){
        element.innerHTML = "<option>Account Update</option>";
    }

    budgetArray.forEach(budget => {
        const newCategory = document.createElement("option");
        newCategory.innerHTML = `${captializeFirstChar(budget.name)}`
        element.appendChild(newCategory);
    });

    const transactionBudgetDropdown = document.querySelectorAll(".budgetDropdown");

    transactionBudgetDropdown.forEach(dropdown => {
        const budgetArray = JSON.parse(localStorage.getItem("myObject"));
    
        budgetArray.forEach(account => {
            const newOption = document.createElement("option");
            newOption.innerHTML = `${captializeFirstChar(account.name)}`
            dropdown.appendChild(newOption);
        });
    });
}

/* RENDERS THE TRANSACTION TO THE SCREEN */
function renderTransactionsToDisplay(){

    if(transactionArray === null){
        transactionArray ;
    }

    if(transactionArray.length !== 0){
        let counter = 0;

        transactionArray.forEach(transaction => {
            transaction.id = counter;
            counter++;
        });
    };



    document.getElementById("transactionDisplay").innerHTML = "";

    transactionArray.forEach(transaction => {
        const newUl = document.createElement("ul");

        newUl.innerHTML =  `
            <li>${captializeFirstChar(transaction.name)}</li>
            <li>${formatString(String(transaction.amount))}</li>
            <li>${transaction.account}</li>
            <li>${transaction.category}</li>
            <li>${transaction.date}</li>
            <button onclick="deleteTransaction(${transaction.id})">Delete</button>
        `

        document.getElementById("transactionDisplay").appendChild(newUl);
    });

    renderAccountDropdown(document.getElementById("accountTypeDropdown"));
    renderCategoryDropdown(document.getElementById("budgetTypeDropdown"));
}





/* ----- ADD/DELETE TRANSACTION SCREEN ----- */

/* CLOSES THE ADD TRANSACTION SCREEN */
function closeAddTransactionScreen(event){
    event.preventDefault();
    const addTransactionScreenContainer = document.getElementById("addTransactionScreenContainer").style.display = "none";
}

/* OPENS THE ADD TRANSACTION SCREEN */
function openAddTransactionScreen(){
    const budgetArray = JSON.parse(localStorage.getItem("myObject"));
    const accountArray = JSON.parse(localStorage.getItem("accountInformation"));
    if(budgetArray == '' || accountArray == ''){
        document.getElementById("noAccountOrBudgetWarning").style.display = "inline";
        return;
    }
    document.getElementById("addTransactionScreenContainer").style.display = "block";
}

/* CREATE NEW TRANSACTION OBJECT */
function createNewTransaction(element){
    element.preventDefault();

    const transactionNameInput = document.getElementById("transactionNameInput");
    const transactionAmountInput = document.getElementById("transactionAmountInput");
    const accountTypeDropdown = document.getElementById("accountTypeDropdown");
    const budgetTypeDropdown = document.getElementById("budgetTypeDropdown");
    const transactionDateInput = document.getElementById("transactionDateInput");


    const newTransactionObject = {
        id: transactionArray.length,
        name: `${captializeFirstChar(transactionNameInput.value)}`,
        amount: `${Number(transactionAmountInput.value)}`,
        account: `${accountTypeDropdown.value}`,
        category: `${budgetTypeDropdown.value}`,
        date: `${transactionDateInput.value}`
    };
    transactionArray.push(newTransactionObject);
    convertToJSON(transactionArray, "transactionsObjects");
    renderTransactionsToDisplay();
}

function deleteTransaction(id){
    const index = transactionArray.findIndex(transaction => transaction.id == id);
    transactionArray.splice(index, 1);
    convertToJSON(transactionArray, "transactionsObjects");
    renderTransactionsToDisplay();
}




/* ----- NO BUDGET CATEGORY OR ACCOUNT LISTED WARNING SCREEN ----- */

/* CLOSE THE NO CATEGORY OR BUDGET SCREEN */
function closeNoAccountOrBudgetWarning(){
    document.getElementById("noAccountOrBudgetWarning").style.display = "none";

}





