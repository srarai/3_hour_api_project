let btn = document.getElementById('button')

btn.addEventListener('click',btnClicked)

function btnClicked(e){
    e.preventDefault()
    let amountText = document.getElementById("expenseAmount").value;
	let descriptionText = document.getElementById("Description").value;
	let categText = document.getElementById("Category").value;

    const obj = {
		// _id,
		amountText : amountText,
		descriptionText : descriptionText,
        categText : categText,
	};

    //uploading the details to the server and showing on the UI
    async function postRequest (){
        try{
            const resp = await axios.post("https://crudcrud.com/api/3224ab9db05448cf938d38575790a421/expenseDetails",obj)
            showExpenseList(resp.data)
        }
        catch(err){
			console.log(err);
		};
    }
    postRequest()		
}

function showExpenseList(data) {

	// creating li to display on the UI
	const li = document.createElement("li");
	li.id = `${data._id}`;
	li.appendChild(document.createTextNode(`${data.amountText}- ${data.descriptionText}-${data.categText}`));
	itemList.appendChild(li);

	// creating edit button
	let editbtn = document.createElement("button");
	editbtn.id = "edit";
	editbtn.appendChild(document.createTextNode("edit"));
	editbtn.onclick = function () {
		console.log("edit clicked");
		editUser(data.amountText,data.descriptionText,data.categText);
	};
	li.appendChild(editbtn);
    itemList.appendChild(li);

    // creating update button
    let update = document.createElement("button");
	update.id = "update";
	update.appendChild(document.createTextNode("update"));
	update.onclick = function () {
		console.log("update clicked");
		updatebtn(data._id);
	};
	li.appendChild(update);
    itemList.appendChild(li);

    // creating delete button
	let delBtn = document.createElement("button");
	delBtn.id = "delete";
	delBtn.appendChild(document.createTextNode("delete"));
	delBtn.onclick = function () {
		deleteUser(data._id);
	};
	li.appendChild(delBtn);
	itemList.appendChild(li);

}

// populating the values on the input field
function editUser(amountText,descriptionText,categText) {
	document.getElementById("expenseAmount").value = amountText;
	document.getElementById("Description").value = descriptionText;
	document.getElementById("Category").value = categText;      
 }

// update button functionality with same ID
async function updatebtn(dataId){
    try{
        const updatePost = await axios
        .put(
            `https://crudcrud.com/api/3224ab9db05448cf938d38575790a421/expenseDetails/${dataId}`,
            {
            amountText:document.getElementById("expenseAmount").value,
            descriptionText : document.getElementById("Description").value,
            categText : document.getElementById("Category").value,
            }
        )
    }
    catch(err){
        console.log(err);
    };	
}

// deleting the details on the server and also on the UI(remove user function)
async function deleteUser(userID) {
    try{const deletefun = await axios.delete(`https://crudcrud.com/api/3224ab9db05448cf938d38575790a421/expenseDetails/${userID}`)
        removeUser(userID)
        }catch(err){
			console.log(err);
		};		
}

// removing details on the UI
function removeUser(userID) {
	let ul = document.getElementById("itemList");
	let li = document.getElementById(userID);
	ul.removeChild(li);
}

// fetching details from the server to show on the screen when window opened or refreshed
window.addEventListener("DOMContentLoaded", async function(){
    try{
        const onDomLoad = await axios.get("https://crudcrud.com/api/3224ab9db05448cf938d38575790a421/expenseDetails")
        for (let i = 0; i < onDomLoad.data.length; i++) {
            showExpenseList(onDomLoad.data[i]);
    }
    }catch(err){
        console.log(err);
    };	
});