import React,{ useState }  from 'react';
import './App.css';

function App() { 
  const [filebase64,setFileBase64] = useState<string>("")

  document.getElementById('reloadBtn')?.addEventListener('click', () => {
    window.location.reload();
  })

  function convertFile(files: FileList|null) {
    
    if (files) {
      const fileRef = files[0] || ""
      const fileType: string= fileRef.type || ""
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload=(ev: any) => {
        // convert it to base64
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
    document.getElementById('choose-photo')!.style.display = "none"
    document.getElementById('photo-button')!.style.display = "none"
    document.getElementById('photo-button2')!.style.display = "flex"
    document.getElementById('form')!.style.display = "block"
  }


const apiCall = async (imageData: string) => {
  const url: string = `https://gptmail-server.herokuapp.com/apipic/`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
  },
    body: `${imageData}`,
  })
  const data = await res.json();
  console.log(data)
}
const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
const apiCall2 = async () => {
  await delay(5000);
  var requestOptions: object = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://gptmail-server.herokuapp.com/apires/", requestOptions)
    .then(response => response)
    .then(result => handleResult(result))
    .catch(error => console.log('error', error));
}


const handleResult = async (result:any) => {
  let data2 = await result.json();
  (document.getElementById('resImage') as HTMLInputElement).src = data2[0].url;
  (document.getElementById('resImage2') as HTMLInputElement).src = data2[1].url;
  (document.getElementById('resImage3') as HTMLInputElement).src = data2[2].url;
  (document.getElementById('resImage4') as HTMLInputElement).src = data2[3].url;
  //(document.getElementById('resImage5') as HTMLInputElement).src = data2[4].url;
  //(document.getElementById('resImage6') as HTMLInputElement).src = data2[5].url;
  //(document.getElementById('resImage7') as HTMLInputElement).src = data2[6].url;
  //(document.getElementById('resImage8') as HTMLInputElement).src = data2[7].url;
  //(document.getElementById('resImage9') as HTMLInputElement).src = data2[8].url;
  (document.getElementById('loader') as HTMLInputElement).style.display = "none";
  (document.getElementById('resImages') as HTMLInputElement).style.display = "block";
}

  document.getElementById('form-button')?.addEventListener('click', () => {
    (document.getElementById('main') as HTMLInputElement).style.display = "none";
    (document.getElementById('loader') as HTMLInputElement).style.display = "block";
    apiCall((document.getElementById('image-holder') as HTMLInputElement).src)
    apiCall2()
  })
  
  

  return (
    <div className='grid place-items-center h-screen'>
  <div id='main' className='grid place-items-center '>
    <h1 className=' text-blue-500 text-center mt-6 font-extrabold text-5xl'> OpenAI Photo Editor</h1>
    <h2 className=' text-slate-500 text-center mt-2 font-extrabold text-2xl'>AI Generated Image Variations</h2>
    <button id='photo-button2' className='bg-blue-500 absolute duration-1000 shadow-md mb-40 hover:bg-slate-200 fill-white hover:fill-black w-16 h-16 ml-72 rounded-full hidden justify-center items-center'>
      <input id='input2' type="file" onChange={(e)=> convertFile(e.target.files)} className=" opacity-0 w-24 ml-0 absolute" />
      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M6 19V7.5h3v6.55q2.4-3.65 6.35-5.85Q19.3 6 24 6q6.4 0 11.2 3.775Q40 13.55 41.45 19h-3.1Q36.9 14.8 33 11.9 29.1 9 24 9q-4.05 0-7.375 1.925T11.3 16h6.2v3Zm5.8 17.15h24.45l-7.35-9.8-6.6 8.55-4.65-6.35ZM9 44q-1.25 0-2.125-.875T6 41V23h3v18h30V23h3v18q0 1.25-.875 2.125T39 44Z"/></svg>
      </button>
    <div className=' bg-slate-500 h-72 mt-24 w-72 rounded-md text-center content-center'>
      <p id='choose-photo' className='text-white mt-4 font-serif font-medium text-xl'>Choose A Photo</p>
      <button id='photo-button' className='bg-blue-500 duration-1000 shadow-md hover:bg-slate-200 fill-white hover:fill-black w-32 h-12 ml-20 mt-20 rounded-md flex justify-center items-center'>
      <input id='input' type="file" onChange={(e)=> convertFile(e.target.files)} className=" opacity-0 w-24 ml-0 absolute" />
      <svg xmlns="http://www.w3.org/2000/svg"  height="48" width="48"><path d="M10 42 6 18h36l-4 24Zm2.5-3h23l2.85-18H9.65ZM20 29h8q.65 0 1.075-.45.425-.45.425-1.05 0-.65-.425-1.075Q28.65 26 28 26h-8q-.6 0-1.05.425-.45.425-.45 1.075 0 .6.45 1.05.45.45 1.05.45Zm-8-14q-.6 0-1.05-.45-.45-.45-.45-1.05 0-.65.45-1.075Q11.4 12 12 12h24q.65 0 1.075.425.425.425.425 1.075 0 .6-.425 1.05Q36.65 15 36 15Zm4-6q-.6 0-1.05-.45-.45-.45-.45-1.05 0-.65.45-1.075Q15.4 6 16 6h16q.65 0 1.075.425.425.425.425 1.075 0 .6-.425 1.05Q32.65 9 32 9Zm-3.5 30h23Z"/></svg>
      </button>
        
          { filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img id='image-holder' alt='' src={filebase64} width={300} />
            }
            
            </>
          }
    </div>
    <div id='form' className='hidden'>
    <button id='form-button' className='bg-blue-500 duration-1000 shadow-md hover:bg-slate-200 fill-white hover:fill-black w-32 h-12 mt-10 rounded-md flex justify-center items-center'>
    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.65 26.9v-9.45L18.7 21.4l-2.15-2.15 7.6-7.6 7.6 7.6-2.15 2.15-3.95-3.95v9.45ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30v-6.8h-7.3q-1.3 2-3.375 3.075Q26.25 36.35 24 36.35t-4.325-1.075Q17.6 34.2 16.3 32.2H9V39Zm15-5.65q2.05 0 3.7-1.175Q29.35 31 30.5 29.2H39V9H9v20.2h8.5q1.15 1.8 2.8 2.975T24 33.35ZM9 39h30Z"/></svg>
      </button>
    </div>
    </div>
    <div id='loader' role="status" className='hidden scale-150'>

    <svg aria-hidden="true" className="w-8 ml-20 h-8 mr-2 text-gray-200 animate-spin dark:text-slate-500 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
<h1 className=' text-blue-500 text-center font-extrabold text-xl'>One Moment Please</h1>    
    </div>
    <div id='resImages' className='hidden'>
    <div className=' bg-slate-500 h-96  w-96 rounded-md text-center content-center'>
        
          <div className="h-56 grid grid-cols-2 gap-4 content-start ...">
          { filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img id='resImage' className='hover:scale-150 duration-500 rounded-xl' alt='' src="" width={300} />
            }
            
            </>
            
          }
          { filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img id='resImage2' className='hover:scale-150 duration-500 rounded-xl' alt='' src="" width={300} />
            }
            
            </>
            
          }
          { filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img id='resImage3' className='hover:scale-150 duration-500 rounded-xl' alt='' src="" width={300} />
            }
            
            </>
            
          }
          { filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img id='resImage4' className='hover:scale-150 duration-500 rounded-xl' alt='' src="" width={300} />
            }
            
            </>
            
          }
          { /*filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img id='resImage5' className='hover:scale-150 duration-500 rounded-xl' alt='' src="" width={300} />
            }
            
            </>
            
          }
          { filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img id='resImage6' className='hover:scale-150 duration-500 rounded-xl' alt='' src="" width={300} />
            }
            
            </>
            
          }
          { filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img id='resImage7' className='hover:scale-150 duration-500 rounded-xl' alt='' src="" width={300} />
            }
            
            </>
            
          }
          { filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img id='resImage8' className='hover:scale-150 duration-500 rounded-xl' alt='' src="" width={300} />
            }
            
            </>
            
          }
          { filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img id='resImage9' className='hover:scale-150 duration-500 rounded-xl' alt='' src="" width={300} />
            }
            
            </>
            */
          }
          
    </div>
    <button id='reloadBtn' className='bg-blue-500 fixed duration-1000 shadow-md hover:bg-slate-200 fill-white hover:fill-black w-32 h-12 ml-32 mt-52 rounded-md flex justify-center items-center'>
<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z"/></svg>
      </button>

          </div>
    </div>
    </div>
  );

}

export default App;