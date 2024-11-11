/* ----- GLOBAL VARIABLES ----- */
const transactionArray = [{
    id: 0,
    name: "Walmart",
    amount: 10.99,
    account: "Checking",
    category: "Rent",
    date: "10/27/24"
},
{
    id: 1,
    name: "Water",
    amount: 100.99,
    account: "Checking",
    category: "Water",
    date: "10/28/24"
}];



/* ----- ON START ----- */
renderAccountDropdown();
renderCategoryDropdown();



/* ----- FORMATTING FUNCTIONS ----- */

function captializeFirstChar(string){
    if(string.charAt(0) !== ' ' && !isNaN(string.charAt(0))){
        return string;
    }else{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}



/* ----- RENDER FUNCTIONS ----- */

/* RENDERS THE ACCOUNTS LIST TO THE DROPDOWN */
function renderAccountDropdown(){
    const accountTypeDropdown = document.getElementById("accountTypeDropdown");
    const accountArray = JSON.parse(localStorage.getItem("accountInformation"));
    
    accountArray.forEach(account => {
        const newOption = document.createElement("option");
        newOption.innerHTML = `${captializeFirstChar(account.name)}`
        accountTypeDropdown.appendChild(newOption);
    })
}

/* RENDERS THE CATEGORIES LIST TO THE DROP DOWNS */
function renderCategoryDropdown(){
    const budgetTypeDropdown = document.getElementById("budgetTypeDropdown");
    const budgetArray = JSON.parse(localStorage.getItem("myObject"));

    budgetArray.forEach(budget => {
        const newCategory = document.createElement("option");
        newCategory.innerHTML = `${captializeFirstChar(budget.name)}`
        budgetTypeDropdown.appendChild(newCategory);
    })
}

/* RENDERS THE TRANSACTION TO THE SCREEN */
function renderTransactionsToDisplay(){


    transactionArray.forEach(transaction => {
        const newUl = document.createElement("ul");

        newUl.innerHTML =  `
            <li>${transaction.name}</li>
            <li>${transaction.amount}</li>
            <li>
                <select class="accountDropdown">
                    <option>Checking</option>
                </select>
            </li>
            <li>
                <select class="budgetDropdown">
                    <option>Rent</option>
                </select>
            </li>
            <li>10/27/24</li>
            <button>Delete</button>
        `

        document.getElementById("transactionDisplay").appendChild(newUl);
    })
}



/* ----- ADD TRANSACTION SCREEN ----- */

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
function createNewTransaction(){
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
    }

    console.log(newTransactionObject);
}



/* ----- NO BUDGET CATEGORY OR ACCOUNT LISTED WARNING SCREEN ----- */

/* CLOSE THE NO CATEGORY OR BUDGET SCREEN */
function closeNoAccountOrBudgetWarning(){
    document.getElementById("noAccountOrBudgetWarning").style.display = "none";

}