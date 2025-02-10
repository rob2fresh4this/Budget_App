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
const SaveTB = document.getElementById('set-total-budget');// Button to save total budget
const ClearBudget = document.getElementById('clear-budgets');// Button to clear total budget
const budgetCategory = document.getElementById('budget-category');// Select element for budget category
const budgetAmount = document.getElementById('budget-amount');// Input element for budget amount
const AddBudget = document.getElementById('submit');// Button to add a budget

