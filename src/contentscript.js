/** This script is for each tab */

import { getRandomIndex, getAlphaCode } from "./frontEnd/src/mainLayout/utils";

// This checks if the current tab is running the monitoring 
let isRunning = false;

// Listening to messages
chrome.runtime.onMessage.addListener((msg, sender, senderRes) => {
    let maxInactivity = 120; // default
    // console.log(isRunning);

    chrome.storage.local.get("timeThreshold", (storage) => {
        if (typeof storage.timeThreshold === "number") {
            maxInactivity = storage.timeThreshold;
        }
        // only run if maxInactivity > 0 (i.e. time threshold is not disabled)
        // if already running a monitoring thread, do not start a new monitoring thread
        if (!isRunning && (maxInactivity > 0)) {
            isRunning = true;
            activityWatcher(msg.activeTab, maxInactivity);
        }
    });
});

function activityWatcher(currentTab, maxInactivity) {
    // An array of DOM events that should be interpreted as user activity and 
    // add these events to the document. register the activity function as the listener parameter.
    const activityEvents = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
    activityEvents.forEach((eventName) => {
        document.addEventListener(eventName, reset, true);
    });
    // The function that will be called whenever a user is active
    function reset() {
        chrome.storage.local.set({ monitoringTabId: currentTab });
        secondsSinceLastActivity = 0;
    }

    // The number of seconds that have passed since the user was active.
    let secondsSinceLastActivity = 0;

    function monitor() {
        let monitoring = setInterval(setCountryIdx, 1000);
        function setCountryIdx() {
            // console.log("running again");
            chrome.storage.local.get("monitoringTabId", (storage) => {
                // console.log("sorage.monitoringTabId : " + storage.monitoringTabId + "   currentTab : " + currentTab);
                // user is not active in the current tab, swtich to the active tab
                if (storage.monitoringTabId !== currentTab) {
                    clearInterval(monitoring);
                    // console.log("monitoring stopped");
                    isRunning = false;
                    chrome.runtime.sendMessage("", { type: "switchTab", monitoringTab: storage.monitoringTabId });
                } else {
                    secondsSinceLastActivity++;
                    // console.log("secondsSinceLastActivity" + secondsSinceLastActivity);
                    // if the user has been inactive or idle for longer then the seconds specified in maxInactivity
                    if (secondsSinceLastActivity > maxInactivity) {
                        const countryIdx = getRandomIndex();
                        chrome.runtime.sendMessage("", getNotificationOption(getAlphaCode(countryIdx)));
                        reset();
                        chrome.storage.local.set({ countryIdx: countryIdx });
                    }
                }
            });
        }
        // console.log("stop!");
    }
    // main
    // console.log("monitoring start");
    monitor();
}

function getNotificationOption(alphaCode) {
    return {
        type: "notification",
        options: {
            title: "EduGlobe",
            message: "Can you recognize this country? \nOpen EduGlobe to explore!",
            iconUrl: `https://restcountries.eu/data/${alphaCode}.svg`,
            type: "basic"
        }
    };
}