import { TemporaryServer } from "./tmpServer";
import { getTwoLetterCode, getRandomIndex, getAlphaCode } from "./frontEnd/src/mainLayout/utils";

let server = new TemporaryServer();

// push a notification when receives notification from contentscript
chrome.runtime.onMessage.addListener(async (data) => {
    // if (data.type === "notification") {
    //     chrome.notifications.create("", data.options);
    // }
    // else if (data.type === "switchTab") {
    //     await monitorActiveTab(data.monitoringTab);
    // }
    if (data.type === "getAllCoords") {
        const coords = server.getAllCoords(data.countryIdx);
        chrome.runtime.sendMessage({
            type: "getAllCoordsRes",
            coords: coords
        });
    }
    // else if (data.type === "changeIcon") {
    //     chrome.browserAction.setIcon({ path: "https://www.countryflags.io/kr/flat/48.png" });
    // }
});

// send a msg to contentscript when a tab is created
// chrome.tabs.onUpdated.addListener(async (activeTab, createInfo) => {
//     // console.log("wait");
//     const res = await monitorActiveTab(activeTab);
//     // console.log(res);
// });
// async function monitorActiveTab(activeTab) {
//     return chrome.storage.local.get("monitoringTabId", (storage) => {
//         const monitoringTabId = storage.monitoringTabId;
//         if (monitoringTabId === undefined) {
//             chrome.storage.local.set({ monitoringTabId: activeTab });
//         }
//         else if (monitoringTabId !== activeTab) {
//             // somehow it is never reset to false
//             chrome.storage.local.set({ monitoringTabId: activeTab });
//         }
//         chrome.tabs.sendMessage(activeTab, { activeTab: activeTab });
//     });
// }
// chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
//     // alert("detached" + tabId.id); 
// });

// const countryIdx = getRandomIndex();
// const twoLetterCode = getTwoLetterCode(countryIdx);
// chrome.browserAction.setIcon({ path: `https://www.countryflags.io/${twoLetterCode}/flat/64.png` });
// chrome.storage.local.set({ countryIdx: countryIdx });
function activityWatcher(maxInactivity) {
    let secondsSinceLastActivity = 0;
    function monitor() {
        let monitoring = setInterval(setCountryIdx, 1000);
        function setCountryIdx() {
            secondsSinceLastActivity++;
            if (secondsSinceLastActivity > maxInactivity) {
                const countryIdx = getRandomIndex();
                const twoLetterCode = getTwoLetterCode(countryIdx);
                const alphaCode = getAlphaCode(countryIdx);
                chrome.browserAction.setIcon({ path: `https://www.countryflags.io/${twoLetterCode}/flat/64.png` });
                chrome.storage.local.set({ countryIdx: countryIdx });
                // chrome.notifications.create("",
                //     {
                //         title: "EduGlobe",
                //         message: "Can you recognize this country? \nOpen EduGlobe to explore!",
                //         iconUrl: `https://restcountries.eu/data/${alphaCode}.svg`,
                //         type: "basic"
                //     }
                // );
                secondsSinceLastActivity = 0;
            }
        }
    }
    monitor();
}
activityWatcher(1800);
