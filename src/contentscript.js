import { getRandomAlphaCode } from './frontEnd/src/layouts/mainLayout/utils';


// Listening to messages
chrome.runtime.onMessage.addListener((msg, sender,senderRes) => {
    console.log("conetnt Script received : " + msg);
    
});

async function activityWatcher(){
    chrome.storage.local.get("alphaCode", shouldContinue);
    function shouldContinue(data) {
        let alphaCode = data.alphaCode;
        console.log("alphaCode is in content is : " + alphaCode);
        if (typeof alphaCode != "undefined") { chrome.storage.local.clear(); return; }
        //The number of seconds that have passed
        //since the user was active.
        let secondsSinceLastActivity = 0;

        //Five minutes. 60 x 5 = 300 seconds.
        let maxInactivity = 10;

        //Setup the setInterval method to run
        //every second. 1000 milliseconds = 1 second.
        let monitoring = setInterval(setAlphaCode, 1000);        
        function setAlphaCode(){
            secondsSinceLastActivity++;
            console.log("secondsSinceLastActivity" + secondsSinceLastActivity);
            //if the user has been inactive or idle for longer
            //then the seconds specified in maxInactivity
            if(secondsSinceLastActivity > maxInactivity) {
                const alphaCode = getRandomAlphaCode();
                chrome.runtime.sendMessage('', {
                    type: 'notification',
                    options: {
                        title: 'EduGlobe',
                        message: 'What is the name of the country with the flag',
                        iconUrl: `https://restcountries.eu/data/${alphaCode}.svg`,
                        type: 'basic'
                    } 
                });
                chrome.storage.local.set({alphaCode: alphaCode});
                console.log('User has been inactive for more than ' + maxInactivity + ' seconds.');
                maxInactivity = 3600;
                clearInterval(monitoring);
            }
        }
        //The function that will be called whenever a user is active
        function reset(){
            //reset the secondsSinceLastActivity letiable
            //back to 0
            secondsSinceLastActivity = 0;
        }

        //An array of DOM events that should be interpreted as user activity.
        let activityEvents = [
            'mousedown', 'mousemove', 'keydown',
            'scroll', 'touchstart'
        ];

        //add these events to the document. register the activity function as the listener parameter.
        activityEvents.forEach(function(eventName) {
            document.addEventListener(eventName, reset, true);
        });
    }
}

activityWatcher();
