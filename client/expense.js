const form = document.querySelector("form");
const ul = document.querySelector("ul");
form.addEventListener("submit", (e) => {
    const amount = e.target.amount.value;
    const itemName = e.target.itemName.value;
    const category = e.target.category.value;
    if(category === ""){
        alert("choose category")
        return;
    }
    const expenseDetails = {
        amount: amount,
        itemName: itemName,
        category: category
    };
    axios.post("http://localhost:3000/expense/add", expenseDetails)
        .then(res => {
            const id = res.data.id;
            const li = document.createElement("li");
            li.id = id;
            const buttonHTML = `
                <button type="button" class="btn btn-success edit-btn" style="margin-left:auto; margin-right:5px;">Edit</button>
                <button type="button" class="btn btn-danger delete-btn">Delete</button>
                `;
            li.innerHTML = `${amount}-${itemName}-${category} ${buttonHTML}`;
            li.classList.add("list-group-item");
            li.classList.add("d-flex")
            li.classList.add("justify-content-between")
            li.classList.add("align-items-center")
            ul.appendChild(li);
        })
        .catch(err => console.log(err))
});

document.addEventListener('DOMContentLoaded', () => {
    axios.get("http://localhost:3000/expense/getExpense")
        .then(result => {
            result.data.forEach(expense => {
                const amount = expense.amount;
                const itemName = expense.itemName;
                const category = expense.category;
                const li = document.createElement("li");
                li.id = expense.id;
                const buttonHTML = `
                <button type="button" class="btn btn-success edit-btn" style="margin-left:auto; margin-right:5px;">Edit</button>
                <button type="button" class="btn btn-danger delete-btn">Delete</button>
                `;
                li.innerHTML = `${amount} - ${itemName} - ${category} ${buttonHTML}`;
                li.classList.add("list-group-item");
                li.classList.add("d-flex")
                li.classList.add("justify-content-between")
                li.classList.add("align-items-center")
                ul.appendChild(li);
                const editBtn = li.querySelector(".edit-btn");
                const deleteBtn = li.querySelector(".delete-btn");
                editBtn.addEventListener("click", () => {
                    axios.delete(`http://localhost:3000/expense/delete/${editBtn.parentElement.id}`)
                        .then(res => {
                            document.getElementById('amount').value = amount;
                            document.getElementById('itemName').value = itemName;
                            document.getElementById('category').value = category;
                            editBtn.parentElement.remove();
                        }).catch(err => console.log(err));
                })
                deleteBtn.addEventListener("click", () => {
                    axios.delete(`http://localhost:3000/expense/delete/${deleteBtn.parentElement.id}`)
                        .then(res => {
                            deleteBtn.parentElement.remove();
                        }).catch(err => console.log(err));
                });
            });
        })
        .catch(err => console.log(err))
});