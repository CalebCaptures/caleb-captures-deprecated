/* Element IDs */
const idAllTab = "allTab";
const idPortraitureTab = "portraitureTab";
const idEventTab = "eventTab";
const idVenueTab = "venueTab";
const idStreetTab = "streetTab";

/* Class Constants */
const classHide = "hide";
const classAll = "all";
const classPortraiture = "portraiture";
const classEvent = "event";
const classVenue = "venue";
const classStreet = "street";

/* List of Elements */
const listAllImages = document.querySelectorAll("#portfolio img");

/* Variables */
let hasAddedEventListeners = false;

/* Functions */
function addClassDisplay(className) {
    listAllImages.forEach(element => {
        const hasClassName = element.classList.contains(className);

        const isAllTabSelected = className === classAll;

        const shouldRemoveClassHide =
            hasClassName ||
            isAllTabSelected;

        if (shouldRemoveClassHide) {
            element.classList.remove(classHide);
        } else {
            element.classList.add(classHide);
        }
    })
}

function addTabEventListener(id, event) {
    document.addEventListener("DOMContentLoaded", function() {
        const button = document.getElementById(id);

        button.addEventListener("click", event);
    });
}

function showAllImages() {
    addClassDisplay(classAll);
}

function showPortraitureImages() {
    addClassDisplay(classPortraiture);
}

function showEventImages() {
    addClassDisplay(classEvent);
}

function showVenueImages() {
    addClassDisplay(classVenue);
}

function showStreetImages() {
    addClassDisplay(classStreet);
}

function addAllTabEventListeners() {
    if (!hasAddedEventListeners) {
        addTabEventListener(idAllTab, showAllImages);
        addTabEventListener(idPortraitureTab, showPortraitureImages);
        addTabEventListener(idEventTab, showEventImages);
        addTabEventListener(idVenueTab, showVenueImages);
        addTabEventListener(idStreetTab, showStreetImages);
    }

    hasAddedEventListeners = true;
}

addAllTabEventListeners();