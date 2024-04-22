// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_S4T6yPXYUhhfPbdIXaeOcuHcVImEPwU",
  authDomain: "agritracking-ceb9a.firebaseapp.com",
  projectId: "agritracking-ceb9a",
  storageBucket: "agritracking-ceb9a.appspot.com",
  messagingSenderId: "130366030796",
  appId: "1:130366030796:web:e43cdbbb1c071bef0b1369"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const budgetForm = document.getElementById('budgetForm');
const budgetAlerts = document.getElementById('budgetAlerts');

// Add expense
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = new Date().toLocaleDateString();
  
  db.collection('expenses').add({
    category,
    amount,
    date
  })
  .then(() => {
    console.log("Expense added successfully");
    expenseForm.reset();
    displayExpenses();
  })
  .catch((error) => {
    console.error("Error adding expense: ", error);
  });
});

// Display expenses
function displayExpenses() {
  db.collection('expenses').get()
  .then((querySnapshot) => {
    expenseList.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = `
        <tr>
          <td>${data.category}</td>
          <td>${data.amount}</td>
          <td>${data.date}</td>
        </tr>
      `;
      expenseList.innerHTML += row;
    });
  })
  .catch((error) => {
    console.error("Error getting expenses: ", error);
  });
}

// Set budget
budgetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const category = document.getElementById('budgetCategory').value;
  const budgetAmount = parseFloat(document.getElementById('budgetAmount').value);

  db.collection('budgets').doc(category).set({
    amount: budgetAmount
  })
  .then(() => {
    console.log("Budget set successfully");
    budgetAlerts.innerHTML = '';
    displayExpenses();
  })
  .catch((error) => {
    console.error("Error setting budget: ", error);
  });
});