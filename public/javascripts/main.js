let GameArray = [];

let GameObject = function (pID, pTitle, pGenre, pLink, pPriority) {
    this.ID = generateID();
    this.title = pTitle;
    this.genre = pGenre;
    this.link = pLink;
    this.prio = pPriority;
}

GameArray.push(new GameObject(1, "Persona 3", "RPG", "https://store.steampowered.com/app/2161700/Persona_3_Reload/", 1));
GameArray.push(new GameObject(2, "Call of Duty", "FPS", "https://store.steampowered.com/app/1938090/Call_of_Duty/", 2));
GameArray.push(new GameObject(3, "XCOM", "Strategy", "https://store.steampowered.com/app/200510/XCOM_Enemy_Unknown/", 3));

document.addEventListener("DOMContentLoaded", function (event) {

    createBacklog();

    document.getElementById("addButton").addEventListener("click", function () {
        GameArray.push(new GameObject((GameArray.length + 1), document.getElementById("title").value, selectedType, document.getElementById("link").value,
            document.getElementById("priority").value));

        alert(document.getElementById("title").value + " has been added to the backlog!")
        document.getElementById("title").value = "";
        document.getElementById("link").value = "";
        document.getElementById("priority").value = "";

        createBacklog();
    })

    $(document).bind("change", "#genre", function (event, ui) {
        selectedType = document.getElementById("genre").value;
    });

    $(document).bind("change", "#selectFilter", function (event, ui) {
        filteredGenre = document.getElementById("selectFilter").value;
    });

    document.getElementById("filterButton").addEventListener("click", createFilteredList);

    document.getElementById("searchButton").addEventListener("click", searchBacklog);
})

// Functions Below

function createBacklog() {
    let table = document.getElementById("tableID");
    table.innerHTML = "";
    table.innerHTML = "<thead><th>ID</th><th>Title</th><th>Genre</th><th>Link</th><th>Priority</th></thead>"

    let backlogUL = document.getElementById("backlogUL");
    backlogUL.innerHTML = "";

    GameArray.forEach(function (element,) {
        const newRow = document.createElement("tr");
        const tdID = document.createElement("td");
        const tdTitle = document.createElement("td");
        const tdGenre = document.createElement("td");
        const tdLink = document.createElement("td");
        const tdPrio = document.createElement("td");

        tdID.textContent = element.ID;
        tdPrio.textContent = element.prio;
        tdTitle.textContent = element.title;
        tdGenre.textContent = element.genre;
        tdLink.textContent = element.link;

        newRow.appendChild(tdID);
        newRow.appendChild(tdTitle);
        newRow.appendChild(tdGenre);
        newRow.appendChild(tdLink);
        newRow.appendChild(tdPrio);
        table.appendChild(newRow);

        let li = document.createElement("li");
        let link = document.createElement("a");
        link.href = element.link;
        link.target = "_blank";
        link.className = "ui-btn ui-btn-icon-right ui-icon-carat-r";
        link.innerHTML = element.ID + " -  " + element.title + " (" + element.genre + ")";
        li.appendChild(link);
        backlogUL.appendChild(li);
    })


    let rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        let currentRow = table.rows[i];
        let createClickHandler =
            function (row) {
                return function () {
                    let cell = row.getElementsByTagName("td")[0];
                    let whichID = cell.innerHTML;
                    // alert(whichID);
                    openYouTube(whichID);
                }
            }
        currentRow.onclick = createClickHandler(currentRow);
    }
}

function openYouTube(which) {
    for (i = 0; i < GameArray.length; i++) {
        if (which == GameArray[i].ID) {
            window.open(GameArray[i].link);
        }
    }
}

function createFilteredList() {
    let filteredUL = document.getElementById("filteredUL");
    filteredUL.innerHTML = "";

    GameArray.forEach(function (game,) {
        if (game.genre == document.getElementById("selectFilter").value) {
            let li = document.createElement("li");
            let link = document.createElement("a");
            link.href = game.link;
            link.target = "_blank";
            link.className = "ui-btn ui-btn-icon-right ui-icon-carat-r";
            link.innerHTML = game.ID + "-  " + game.title + " (" + game.genre + ")";
            li.appendChild(link);
            filteredUL.appendChild(li);
        }
    })

}

function searchBacklog() {
    let searchEntry = document.getElementById("searchEntry");

    GameArray.forEach(function (game,) {
        if (game.title.toLowerCase() == searchEntry.value.toLowerCase()) {
            let li = document.createElement("li");
            let link = document.createElement("a");
            link.href = game.link;
            link.target = "_blank";
            link.className = "ui-btn ui-btn-icon-right ui-icon-carat-r";
            link.innerHTML = game.ID + "-  " + game.title + " (" + game.genre + ")";
            li.appendChild(link);
            filteredUL.appendChild(li);
        }
    })

    searchEntry.innerHTML = "";
}

function generateID() {
    let newID = Math.random().toString(16).slice(5);
    return newID;
}
