import React,{ useState }  from 'react';
import './App.css';

function App() { 
  const [filebase64,setFileBase64] = useState<string>("")


  // The Magic all happens here.
  function convertFile(files: FileList|null) {
    if (files) {
      const fileRef = files[0] || ""
      const fileType: string= fileRef.type || ""
      console.log("This file upload is of type:",fileType)
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
  }

  return (
  <div className='grid place-items-center'>
    <h1 className=' text-blue-500 text-center mt-6 font-extrabold text-5xl'> OpenAI Photo Editor</h1>
    <button id='photo-button2' className='bg-blue-500 absolute duration-1000 shadow-md hover:bg-slate-200 fill-white hover:fill-black w-16 h-16 ml-72 rounded-full hidden justify-center items-center'>
      <input id='input2' type="file" onChange={(e)=> convertFile(e.target.files)} className=" opacity-0 w-24 ml-0 absolute" />
      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M6 19V7.5h3v6.55q2.4-3.65 6.35-5.85Q19.3 6 24 6q6.4 0 11.2 3.775Q40 13.55 41.45 19h-3.1Q36.9 14.8 33 11.9 29.1 9 24 9q-4.05 0-7.375 1.925T11.3 16h6.2v3Zm5.8 17.15h24.45l-7.35-9.8-6.6 8.55-4.65-6.35ZM9 44q-1.25 0-2.125-.875T6 41V23h3v18h30V23h3v18q0 1.25-.875 2.125T39 44Z"/></svg>
      </button>
    <div className=' bg-slate-500 h-72 mt-48 w-72 rounded-md text-center content-center'>
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

    </div>
  );

}

export default App;