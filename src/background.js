// push a notification when receives notification from contentscript
chrome.runtime.onMessage.addListener(data => {
    if (data.type === "notification") {
        chrome.notifications.create("", data.options);
    }
});

// send a msg to contentscript when a tab is created
chrome.tabs.onUpdated.addListener(function(activeTab, createInfo) {
    chrome.storage.local.get("monitoringTabId", (storage) => {
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
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    // alert("detached" + tabId.id); 
});
