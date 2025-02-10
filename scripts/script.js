import { saveTotalBudget, getTotalBudget, clearTotalBudget, saveCurrentBudgetToLocal, getFromLocalStorage, clearLocalStorage, removeBudgetFromLocalStorage } from './local-storage.js';
// layout of local storage
// example of local storage: { id: 1, amount: 500, category: "Food" }
// adding a budget: saveCurrentBudgetToLocal({ id: 2, amount: 1000, category: "Rent" });
// retrieving all budgets: let budgets = getFromLocalStorage();console.log(budgets); // Returns an array of objects
// example of getting a specific budget: let budget = budgets.find(item => item.id === 2);console.log(budget); //ID 2
// removing a budget: removeBudgetFromLocalStorage(2); // Removes budget with ID 2

// layout of save total budget
// saving a total budget: saveTotalBudget(500);
// retrieving a total budget: console.log(getTotalBudget()); // 500
// clearing a total budget: clearTotalBudget();

// TB = Total Budget
const DisplayTB = document.getElementById('total-budget');
const InputTB = document.getElementById('total-budget-input');
const SaveTB = document.getElementById('set-total-budget'); // Button to save total budget
const ClearBudget = document.getElementById('clear-budgets'); // Button to clear total budget
const budgetCategory = document.getElementById('budget-category'); // Select element for budget category
const budgetAmount = document.getElementById('budget-amount'); // Input element for budget amount
const AddBudget = document.getElementById('submit'); // Button to add a budget
const BudgetList = document.getElementById('budget-list'); // UL element to display budgets
const remainingBudget = document.getElementById('remaining-budget'); // Display remaining budget

// Function to Load Existing Budgets from localStorage
async function LoadBudgets() {
    let budgets = getFromLocalStorage();
    console.log(budgets);
}

// Function to Save Total Budget to localStorage and update the display
function SaveTotalBudget(budget) {
    saveTotalBudget(budget);
    DisplayTB.textContent = `$${budget}`;
    InputTB.value = '';

}

// Event Listener for Saving Total Budget
SaveTB.addEventListener('click', () => {
    let verify = parseInt(InputTB.value);
    if (verify) {
        SaveTotalBudget(verify);
    } else {
        DisplayTB.textContent = 'Please enter a valid number';
        return;
    }
    DisplayRemainingBudget();
}); InputTB.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        SaveTB.click();
    }
});

// Function to Layout a Budget Item
function BudgetListLayout(budget) {
    return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${budget.category}: $${budget.amount}</span>
        <button class="btn btn-sm btn-danger removeIT">Delete</button>
    </li>
    `;
}

// Event Listener for Adding a New Budget
AddBudget.addEventListener('click', () => {
    let category = budgetCategory.value;
    let amount = parseInt(budgetAmount.value);
    if (!amount) {
        return; // Don't proceed if the amount is invalid
    }
    let budgets = getFromLocalStorage();
    let index = budgets.length ? budgets[budgets.length - 1].id + 1 : 1;
    saveCurrentBudgetToLocal({ id: index, amount, category });
    DisplayBudgetsList();
    DisplayRemainingBudget();
});

// Event Listener for Clearing All Budgets
ClearBudget.addEventListener('click', () => {
    clearLocalStorage();
    BudgetList.innerHTML = '';
});

// Function to Display All Budgets
function DisplayBudgetsList() {
    let budgets = getFromLocalStorage();
    BudgetList.innerHTML = '';
    budgets.forEach(budget => {
        BudgetList.innerHTML += BudgetListLayout(budget);
    });
    let removeButtons = document.querySelectorAll('.removeIT');
    removeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            removeBudgetFromLocalStorage(budgets[index].id); // Remove the budget by id
            DisplayBudgetsList(); // Refresh the list after removal
            DisplayRemainingBudget(); // Refresh the remaining budget
        });
    });
}

function MathItUp() {
    let OnPerson = getTotalBudget();
    let budgets = getFromLocalStorage();
    let total = 0;
    budgets.forEach(budget => {
        total += budget.amount;
    });
    total = OnPerson - total;
    return total;
}

function DisplayRemainingBudget() {
    let total = MathItUp();
    remainingBudget.textContent = `$${total}`;
}


function loadAll() {
    // Initial Check for Total Budget and Display
    getTotalBudget() ? DisplayTB.textContent = '$' + getTotalBudget() : DisplayTB.textContent = 'Please set a total budget';
    DisplayRemainingBudget();
    DisplayBudgetsList();
    LoadBudgets();
}

loadAll();