import { TemporaryServer } from "./tmpServer";

let server = new TemporaryServer();

// push a notification when receives notification from contentscript
chrome.runtime.onMessage.addListener(async (data) => {
    if (data.type === "notification") {
        chrome.notifications.create("", data.options);
    }
    else if (data.type === "switchTab") {
        await monitorActiveTab(data.monitoringTab);
    }
    else if (data.type === "getAllCoords") {
        const coords = server.getAllCoords(data.countryIdx);
        chrome.runtime.sendMessage({
            type: "getAllCoordsRes",
            coords: coords
        });
    }
});


chrome.runtime.sendMessage({
    type: "something_completed",
    data: {
        subject: "Loading",
        content: "Sending background to popup completed!"
    }
});



// send a msg to contentscript when a tab is created
chrome.tabs.onUpdated.addListener(async (activeTab, createInfo) => {
    // console.log("wait");
    const res = await monitorActiveTab(activeTab);
    // console.log(res);
});
async function monitorActiveTab(activeTab) {
    return chrome.storage.local.get("monitoringTabId", (storage) => {
        const monitoringTabId = storage.monitoringTabId;
        if (monitoringTabId === undefined) {
            chrome.storage.local.set({ monitoringTabId: activeTab });
        }
        else if (monitoringTabId !== activeTab) {
            // somehow it is never reset to false
            chrome.storage.local.set({ monitoringTabId: activeTab });
        }
        chrome.tabs.sendMessage(activeTab, { activeTab: activeTab });
    });
}

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    // alert("detached" + tabId.id); 
});
