import { createContext, useState } from "react";
import run from "../config/gemini";

export const context = createContext();

const ContextProvider = (props) => {

   const[input , setInput] = useState("");
   const[recentPrompt,setRecentPrompt] = useState("");
   const[PrevPromts,setPrevPromts]= useState([]);
   const[showResult,setShowResult]=useState(false);
   const[loading,setLoading]=useState(false);
   const[resultData,setResultData]=useState("");


   const delayPara = (index,nextword)=>{       //timing effect
        setTimeout(function () {
             setResultData(prev=>prev+nextword);
        },75*index)
   }

   const newChat = () =>{
       setLoading(false)
       setShowResult(false)

   }

    const onSent = async (prompt) => {

       setResultData("")
       setLoading(true)
       setShowResult(true)   //show the data which is in console
      
       let response;
       if(prompt !== undefined)
         {
             response = await run(prompt);
             setRecentPrompt(prompt)
         }
       else
       {
            setPrevPromts(prev=>[...prev , input])
            setRecentPrompt(input)
            response = await run(input)
       }

      //  setRecentPrompt(input)
      //  setPrevPromts(prev=>[...prev,input])          //will store the previous response
      //  const response = await run(input)
       let responseArray = response.split("**");    // this will used for bold the string where ** is present
       let newResponse="";                            
       for(let i=0; i< responseArray.length; i++)
         {
              if( i === 0 || i%2 !== 1)
               {
                  newResponse += responseArray[i];
               }
               else{
                  newResponse += "<b>"+responseArray[i]+"</b>";
               }
         }

       let newResponse2 = newResponse.split("*").join("</br>");               //this is define bcz to break the line where * is present

      //  setResultData(newResponse2)    //add data that display to user

      let newResponseArray = newResponse2.split(" ");                       // new words are generated according to delayaPara
      for( let i=0; i<newResponseArray.length;i++)
         {
             const nextword = newResponseArray[i];
             delayPara(i,nextword+" ")                                   //reaponse does not have space so that we have to provide it after each word so that effectively generate response
         }
       setLoading(false)         //make it false bcz loading has to be remove in oerder to display data
       setInput("")             //input again will set

    }

    

     const contextValue = {
           PrevPromts,
           setPrevPromts,
           onSent,
           setRecentPrompt,
           recentPrompt,
           showResult,
           loading,
           resultData,
           input,
           setInput,
           newChat
     }
  
     return (
         <context.Provider value={contextValue}>
            {props.children}
         </context.Provider>
     )
}
export default ContextProvider;