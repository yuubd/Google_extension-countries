// push a notification when receives notification from contentscript
chrome.runtime.onMessage.addListener(async (data) => {
    if (data.type === "notification") {
        chrome.notifications.create("", data.options);
    } 
    else if (data.type === "switchTab") {
        // console.log("switch");
        await monitorActiveTab(data.moniroingTab);
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
            chrome.storage.local.set({monitoringTabId: activeTab});
        }
        else if (monitoringTabId !== activeTab) {
            // somehow it is never reset to false
            chrome.storage.local.set({monitoringTabId: activeTab});
        }
        chrome.tabs.sendMessage(activeTab, {activeTab: activeTab});
    });
}


chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    // alert("detached" + tabId.id); 
});
