const form = document.querySelector("form");
const ul = document.querySelector("ul");
const token = localStorage.getItem("token");
form.addEventListener("submit", (e) => {
    e.preventDefault();
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
    axios.post("http://localhost:3000/expense/add", 
        expenseDetails,
        {headers: {"Authorization": token}},
    )
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
    axios.get("http://localhost:3000/expense/getExpense",{
        headers:{"Authorization" : token}     
    })
        .then(result => {
            console.log("=====>", result.data)
            const premium = result.data.premium;
            if (premium) {
                const premium = document.getElementById('premium');
                premium.innerHTML = `<h4>You are a premium user</h4><button type="button" class="btn btn-warning add" name="show-leaderboard" id="show-leaderboard" data-bs-toggle="modal" data-bs-target="#leaderboard">Show Leaderboard</button>`;
                premium.style.color = "yellow";
                const leaderboardItem = document.getElementById("leaderboard-items");
                axios.get("http://localhost:3000/premium/leaderboard", { headers: { "Authorization": token } })
                    .then(result => {
                        console.log("====>", result.data)
                        result.data.forEach(user => {
                            const li = document.createElement("li");
                            li.innerText = `${user.name} - ${user.totalexpense}`;
                            leaderboardItem.appendChild(li);
                        });
                    })
                    .catch(err => console.log(err));
            }
            result.data.expenses.forEach(expense => {
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
                    axios.delete(`http://localhost:3000/expense/delete/${editBtn.parentElement.id}`,{
                        headers :{"Authorization":token}
                    })
                        .then(res => {
                            document.getElementById('amount').value = amount;
                            document.getElementById('itemName').value = itemName;
                            document.getElementById('category').value = category;
                            editBtn.parentElement.remove();
                        }).catch(err => console.log(err));
                })
                deleteBtn.addEventListener("click", () => {
                    axios.delete(`http://localhost:3000/expense/delete/${deleteBtn.parentElement.id}`,{
                        headers :{"Authorization":token}

                    })
                        .then(res => {
                            deleteBtn.parentElement.remove();
                        }).catch(err => console.log(err));
                });
            });
        })
        .catch(err => console.log(err))
});

document.getElementById('buy-premium').addEventListener('click', async (e) => {
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { "Authorization": token } })
    console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            await axios.post("http://localhost:3000/purchase/updatetransactionstatus", {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } })

            alert("You are a Premium User Now");
            window.location.reload();
        }
    }
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed', async function (response) {
        await axios.post("http://localhost:3000/purchase/failedtransactionstatus", {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
        }, { headers: { "Authorization": token } })
        alert(response.error.description);
    });
})

function modalClose() {
    window.location.reload();
}