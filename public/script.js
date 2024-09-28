var modal = document.getElementById('myModal');
var btn = document.querySelector('.nsc-add-new-script');
var span = document.querySelector('.close');
var selectedScripts = [];
var addedScripts = []; // Track added scripts
var orderModal = document.getElementById('orderModal');
function openOrderModal(script) {
    orderModal.style.display = 'flex';
    document.querySelector('.order-modal-content h3').textContent = `Place Order for ${script}`;
}
function closeOrderModal() {
    orderModal.style.display = 'none';
}
// Open the modal
btn.onclick = function () {
    modal.style.display = 'flex';
    renderScriptList(); // Render script list each time the modal opens
}

// Close the modal
span.onclick = function () {
    modal.style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Toggle selection of scripts
function toggleSelection(item) {
    item.classList.toggle('selected');
}

// Render script list based on added scripts
function renderScriptList() {
    const scriptList = document.querySelector('.script-list');
    const scripts = ["Nifty 50", "Bank Nifty", "Reliance", "TCS"]; // Add more scripts as needed

    // Clear the existing list
    scriptList.innerHTML = '';

    scripts.forEach(script => {
        const li = document.createElement('li');
        li.textContent = script;

        // Disable or style already added scripts
        if (addedScripts.includes(script)) {
            li.style.color = '#aaa'; // Change color for already added scripts
            li.onclick = function () { return false; }; // Disable click
        } else {
            li.onclick = function () {
                toggleSelection(li);
            };
        }

        scriptList.appendChild(li);
    });
}

// Add selected scripts to the table
document.getElementById('addSelectedScripts').onclick = function () {
    const selectedItems = document.querySelectorAll('.script-list li.selected');
    selectedItems.forEach(item => {
        const scriptName = item.textContent;
        if (!addedScripts.includes(scriptName)) {
            addedScripts.push(scriptName); // Add to the added scripts list
        }
    });

    updateTable();
    modal.style.display = 'none'; // Close modal after selection
}

document.getElementById('addAllScripts').onclick = function () {
    const allItems = document.querySelectorAll('.script-list li');
    allItems.forEach(item => {
        const scriptName = item.textContent;
        if (!addedScripts.includes(scriptName)) {
            addedScripts.push(scriptName); // Add to the added scripts list
        }
    });

    updateTable();
    modal.style.display = 'none'; // Close modal after selection
}

// Update table with selected scripts
function updateTable() {
    const tbody = document.getElementById('dataTableBody');
    tbody.innerHTML = ''; // Clear existing rows

    addedScripts.forEach(script => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${script}</td>
                    <td id="${script}Bid" onclick="openOrderModal('${script}')">Loading...</td>
                    <td id="${script}Ask" onclick="openOrderModal('${script}')">Loading...</td>
                    <td id="${script}Ltp">Loading...</td>
                    <td id="${script}Change">Loading...</td>
                    <td id="${script}Percent">Loading...</td>
                    <td id="${script}High">Loading...</td>
                    <td id="${script}Low">Loading...</td>
                    <td id="${script}Open">Loading...</td>
                    <td><button onclick="removeScript(this)">Remove</button></td>
                `;
        tbody.appendChild(row);
    });
}
function submitOrder() {
    const buy = document.getElementById('buyCheckbox').checked;
    const sell = document.getElementById('sellCheckbox').checked;
    const orderType = document.getElementById('orderType').value;
    const lotSize = document.getElementById('lotSize').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    // Example: Process the order here
    console.log("Order Details:", {
        buy,
        sell,
        orderType,
        lotSize,
        quantity,
        price
    });

    // Close the modal after submitting the order
    closeOrderModal();
}

// Remove script from the table
function removeScript(button) {
    const row = button.parentElement.parentElement;
    const scriptName = row.cells[0].textContent;
    row.remove();
    addedScripts = addedScripts.filter(script => script !== scriptName); // Remove from addedScripts array
    renderScriptList(); // Re-render the script list to update availability
}

// Fetch market data for selected scripts
async function fetchMarketData() {
    let niftyPrice = 0; // To hold Nifty price
    let bankNiftyPrice = 0; // To hold Bank Nifty price

    for (const script of addedScripts) {
        try {
            const response = await fetch(`/${script.toLowerCase().replace(" ", "")}`);
            const data = await response.json();

            // Update the respective row
            document.getElementById(`${script}Bid`).textContent = `₹${data.regularMarketPrice.toFixed(2)}`;
            document.getElementById(`${script}Ask`).textContent = `₹${(data.regularMarketPrice - 1.26).toFixed(2)}`;
            document.getElementById(`${script}Ltp`).textContent = `₹${data.regularMarketPrice.toFixed(2)}`;
            document.getElementById(`${script}Change`).textContent = `₹${data.regularMarketChange.toFixed(2)}`;
            document.getElementById(`${script}Percent`).textContent = `${data.regularMarketChangePercent.toFixed(2)}%`;
            document.getElementById(`${script}High`).textContent = `₹${data.regularMarketDayHigh.toFixed(2)}`;
            document.getElementById(`${script}Low`).textContent = `₹${data.regularMarketDayLow.toFixed(2)}`;
            document.getElementById(`${script}Open`).textContent = `₹${data.regularMarketOpen.toFixed(2)}`;

            // Check if the script is Nifty or Bank Nifty to update the ticker
            if (script === "Nifty 50") {
                niftyPrice = data.regularMarketPrice;
            } else if (script === "Bank Nifty") {
                bankNiftyPrice = data.regularMarketPrice;
            }
        } catch (error) {
            console.error(`Error fetching data for ${script}:`, error);
        }
    }

    // Update the ticker text after fetching data
}
async function fetchData() {
    try {
        // Fetch Nifty price
        const niftyResponse = await fetch('/nifty50');
        const niftyData = await niftyResponse.json();
        const niftyPrice = niftyData.regularMarketPrice;

        // Fetch Bank Nifty price
        const bankNiftyResponse = await fetch('/banknifty');
        const bankNiftyData = await bankNiftyResponse.json();
        const bankNiftyPrice = bankNiftyData.regularMarketPrice;

        // Update the ticker text
        document.getElementById('tickerText').textContent =
            `Nifty: ${niftyPrice} | Bank Nifty: ${bankNiftyPrice}`;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('tickerText').textContent =
            'Error fetching data';
    }
}


// Fetch data every 5 seconds
setInterval(fetchMarketData, 500); // Adjust the interval as needed
fetchData();
const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector(".header");

const toggleNavbar = () => {
    // alert("Plz Subscribe ");
    nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());