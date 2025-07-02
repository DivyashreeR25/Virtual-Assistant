let contacts = {
    "tanushree": "7348820642",  // Replace with actual phone numbers
    "Raghavan": "9986582424", 
    "Thanvi": "9866628051"
};
let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")


function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;  // More standard rate
    text_speak.pitch = 1;  // More natural pitch
    text_speak.volume = 1;  // Default volume
    text_speak.lang = "en-GB";  // Change to "hi-IN" for a more accurate Hindi voice
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    console.log(`Current hour: ${hours}`);  // To check the value of the hour
    if (hours >= 0 && hours < 12) {
        speak("Good Morning");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon");
    } else {
        speak("Good Evening");
    }
}

//window.addEventListener('load', () => {
//    wishMe();
// });
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition=new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())

}
btn.addEventListener("click", ()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})
function takeCommand(message){
    btn.style.display="flex"
      voice.style.display="none"
    if(message.includes("hello") || message.includes("hi") )
    {
        speak("Hello , how can i help you?")

    }
    else if(message.includes("who are you")){
        speak("I am your virtual personal assistant")
    }
    else if(message.includes("open youtube")){
        speak("Opening YouTube")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("Opening Instagram")
        window.open("https://www.instagram.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("Opening Google")
        window.open("https://www.google.com/","_blank")
    }
    
    else if (message.includes("open calculator")) {
        speak("Opening Calculator");
        window.open("calculator:", "_blank");  // For Windows
    } else if (message.includes("open notepad")) {
        speak("Opening Notepad");
        window.open("notepad:", "_blank");  // For Windows
    } 
    else if (message.includes("tell me a joke")) {
        let jokes = [
            "Why don't skeletons fight each other? They don't have the guts!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "I told my computer I needed a break, and now it won't stop sending me Kit-Kats!"
        ];
        let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(randomJoke);
    }
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak("The time is " + time);
    }
    else if(message.includes("date")){
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today is " + date);
    }
    else if (message.includes("call")) {
        let contactName = message.replace("call", "").trim(); // Extract the contact name
        if (contacts[contactName]) {
            speak(`Calling ${contactName}`);
            let phoneNumber = contacts[contactName];
            window.open(`tel:${phoneNumber}`, "_self"); // Use tel protocol to initiate the call
        } else {
            speak(`Sorry, I couldn't find the contact ${contactName}`);
        }
    }
    
    else if (message.includes("open whatsapp")) {
        speak("Opening Whatsapp");
        window.open("whatsapp://", "_blank");
    } 
   
    else if (message.includes("send a message to") || message.includes(" message to")) {
        let contactName = message.replace("send a message to", "").trim();  // Extract the contact's name from user input
    
        // Check if the contact exists in the list
        if (contacts[contactName]) {
            let phoneNumber = contacts[contactName];  // Get the phone number for the contact
            let textMessage = prompt("What message do you want to send?");  // Ask for the message content
    
            // Encode the message for URL format
            let encodedMessage = encodeURIComponent(textMessage);
    
            // Open WhatsApp with the given phone number and message
            window.open(`whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`, "_blank");
            speak(`Sending message to ${contactName}`);
        } else {
            speak("Sorry, I couldn't find that contact.");
        }
    }
    
     else {
        speak(`This is what i found on internet regarding ${message}`)
        window.open(`https://www.google.com/search?q=${message}`)
    }
}





