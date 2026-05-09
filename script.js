// =========================
// PIXI.AI FULL SCRIPT
// =========================

const sendBtn =
document.getElementById("send-btn");

const voiceBtn =
document.getElementById("voice-btn");

const imageBtn =
document.getElementById("image-btn");

const imageUpload =
document.getElementById("image-upload");

const userInput =
document.getElementById("user-input");

const chatBox =
document.getElementById("chat-container");




// SEND BUTTON

sendBtn.addEventListener(
  "click",
  sendMessage
);




// ENTER KEY

userInput.addEventListener(

  "keypress",

  function(e){

    if(e.key === "Enter"){

      sendMessage();

    }

});




// =========================
// TEXT AI CHAT
// =========================

async function sendMessage(){

  const text =
  userInput.value.trim();

  if(text === "") return;



  // USER MESSAGE

  const userDiv =
  document.createElement("div");

  userDiv.className =
  "user-message";

  userDiv.innerText =
  text;

  chatBox.appendChild(userDiv);

  userInput.value = "";




  // BOT MESSAGE

  const botDiv =
  document.createElement("div");

  botDiv.className =
  "bot-message";

  botDiv.innerText =
  "Thinking...";

  chatBox.appendChild(botDiv);




  try{

    const response =
    await fetch(

      "https://openrouter.ai/api/v1/chat/completions",

      {

        method:"POST",

        headers:{


          "Content-Type":
          "application/json"

        },



        body: JSON.stringify({

          model:
          "openai/gpt-4o-mini",

          messages:[

            {
              role:"system",

              content:
              "You are Pixi.AI, a futuristic coder vibe AI assistant."
            },

            {
              role:"user",

              content:text
            }

          ]

        })

      }

    );



    const data =
    await response.json();




    if(data.choices){

      botDiv.innerText =

      data.choices[0]
      .message.content;

    }

    else{

      botDiv.innerText =
      "⚠ No response";

    }

  }



  catch(error){

    console.log(error);

    botDiv.innerText =
    "⚠ API Failed";

  }



  chatBox.scrollTop =
  chatBox.scrollHeight;

}





// =========================
// MIC FEATURE
// =========================

const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;



if(SpeechRecognition){

  const recognition =
  new SpeechRecognition();

  recognition.lang =
  "en-US";



  voiceBtn.addEventListener(

    "click",

    () => {

      recognition.start();

    }

  );



  recognition.onresult =

  function(event){

    const transcript =

    event.results[0][0]
    .transcript;

    userInput.value =
    transcript;

    sendMessage();

  };

}





// =========================
// IMAGE AI ANALYSIS
// =========================

imageBtn.addEventListener(

  "click",

  () => {

    imageUpload.click();

  }

);




imageUpload.addEventListener(

  "change",

  async function(){

    const file =
    this.files[0];

    if(!file) return;



    const reader =
    new FileReader();



    reader.onload =
    async function(e){



      // SHOW IMAGE

      const imgDiv =
      document.createElement("div");

      imgDiv.className =
      "user-message";



      const img =
      document.createElement("img");

      img.src =
      e.target.result;

      img.className =
      "chat-image";



      imgDiv.appendChild(img);

      chatBox.appendChild(imgDiv);




      // BOT ANALYSIS

      const botDiv =
      document.createElement("div");

      botDiv.className =
      "bot-message";

      botDiv.innerText =
      "Analyzing image...";

      chatBox.appendChild(botDiv);




      try{

        const response =
        await fetch(

          "https://openrouter.ai/api/v1/chat/completions",

          {

            method:"POST",

            headers:{


              "Content-Type":
              "application/json"

            },



            body: JSON.stringify({

              model:
              "openai/gpt-4o-mini",

              messages:[

                {
                  role:"user",

                  content:[

                    {
                      type:"text",

                      text:
                      "Describe this image in detail and explain everything visible."
                    },

                    {
                      type:"image_url",

                      image_url:{
                        url:e.target.result
                      }

                    }

                  ]

                }

              ]

            })

          }

        );



        const data =
        await response.json();




        if(data.choices){

          botDiv.innerText =

          data.choices[0]
          .message.content;

        }

        else{

          botDiv.innerText =
          "⚠ Could not analyze image";

        }

      }



      catch(error){

        console.log(error);

        botDiv.innerText =
        "⚠ Image analysis failed";

      }



      chatBox.scrollTop =
      chatBox.scrollHeight;

    };



    reader.readAsDataURL(file);

});
