// Local storage for user's budgets

function saveCurrentBudgetToLocal(budget) {
    console.log('Saving budget:', budget);
    let budgetArray = getFromLocalStorage();
    // Check if a budget with the same ID already exists
    if (!budgetArray.some(item => item.id === budget.id)) {
        budgetArray.push(budget);
    }
    localStorage.setItem('budget', JSON.stringify(budgetArray));
}

function getFromLocalStorage() {
    console.log('Retrieving budget data');
    let budgetArray = JSON.parse(localStorage.getItem('budget'));
    if (!budgetArray) {
        console.log(`nothing's here`)
        return []; // Return an empty array instead of placeholder text
    }
    return budgetArray;
}

function clearLocalStorage() {
    console.log('Clearing all budget data');
    localStorage.removeItem('budget'); // Only clears the budget data
}

function removeBudgetFromLocalStorage(budgetId) {
    console.log(`Removing budget with ID: ${budgetId}`);
    let localStorageData = getFromLocalStorage();
    let index = localStorageData.findIndex(item => item.id === budgetId);
    if (index !== -1) {
        localStorageData.splice(index, 1);
        localStorage.setItem('budget', JSON.stringify(localStorageData));
    }
}



// Save total budget to local storage
function saveTotalBudget(amount) {
    console.log('Saving total budget:', amount);
    localStorage.setItem("totalBudget", amount);
}

// Retrieve total budget from local storage
function getTotalBudget() {
    console.log('Retrieving total budget', localStorage.getItem("totalBudget"));
    return localStorage.getItem("totalBudget") ? parseInt(localStorage.getItem("totalBudget")) : 0;
}

// Clear total budget from local storage
function clearTotalBudget() {
    console.log(`Clearing total budget it's now ${localStorage.getItem("totalBudget")}`);
    localStorage.removeItem("totalBudget");
}


export { saveTotalBudget, getTotalBudget, clearTotalBudget, saveCurrentBudgetToLocal, getFromLocalStorage, clearLocalStorage, removeBudgetFromLocalStorage };
