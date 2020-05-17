import { getRandomAlphaCode } from "./frontEnd/src/layouts/mainLayout/utils";


// Listening to messages
chrome.runtime.onMessage.addListener((msg, sender, senderRes) => {
    activityWatcher(msg.activeTab);
});

function activityWatcher(currentTab){
    // An array of DOM events that should be interpreted as user activity and 
    // add these events to the document. register the activity function as the listener parameter.
    const activityEvents = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
    activityEvents.forEach((eventName) => {
        document.addEventListener(eventName, reset, true);
    });
    // The function that will be called whenever a user is active
    function reset() {
        //reset the secondsSinceLastActivity letiable. back to 0
        chrome.storage.local.set({monitoringTabId: currentTab});
        secondsSinceLastActivity = 0;
    }

    // The number of seconds that have passed since the user was active.
    let secondsSinceLastActivity = 0;
    
    const maxInactivity = 6;
    function monitor() {
        let monitoring = setInterval(setAlphaCode, 10000);
        function setAlphaCode() {
            chrome.storage.local.get("monitoringTabId", (storage) => {
                console.log("sorage.monitoringTabId : " + storage.monitoringTabId + "   currentTab : " + currentTab);
                if (storage.monitoringTabId !== currentTab) { 
                    return; 
                } else {
                    secondsSinceLastActivity++;
                    console.log("secondsSinceLastActivity" + secondsSinceLastActivity);
                    // if the user has been inactive or idle for longer then the seconds specified in maxInactivity
                    if(secondsSinceLastActivity > maxInactivity) {
                        const alphaCode = getRandomAlphaCode();
                        chrome.runtime.sendMessage("", {
                            type: "notification",
                            options: {
                                title: "EduGlobe",
                                message: "Can you recognize this country? \nOpen Eduglobe it to explore!",
                                iconUrl: `https://restcountries.eu/data/${alphaCode}.svg`,
                                type: "basic"
                            } 
                        });
                        console.log("Push a notification!");
                        reset();
                        chrome.storage.local.set({alphaCode: alphaCode});
                    }
                }
            });
        }
    }
    // main
    monitor();
}
