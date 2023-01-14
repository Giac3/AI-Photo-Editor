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
  }

  return (
  <div className='grid place-items-center'>
    <h1 className=' text-blue-500 text-center mt-6 font-extrabold text-5xl'> OpenAI Photo Editor</h1>
    <div className=' bg-slate-500 h-72 mt-48 w-72 rounded-md text-center content-center'>
      <p className='text-white mt-4 font-serif font-medium text-xl'>Choose A Photo</p>
      <button className='bg-blue-500 duration-1000 shadow-md hover:bg-slate-200 fill-white hover:fill-black w-32 h-12 ml-20 mt-20 rounded-md flex justify-center items-center'>
      <input type="file" onChange={(e)=> convertFile(e.target.files)} className=" opacity-0 w-24 ml-0 absolute" />
      <svg xmlns="http://www.w3.org/2000/svg"  height="48" width="48"><path d="M10 42 6 18h36l-4 24Zm2.5-3h23l2.85-18H9.65ZM20 29h8q.65 0 1.075-.45.425-.45.425-1.05 0-.65-.425-1.075Q28.65 26 28 26h-8q-.6 0-1.05.425-.45.425-.45 1.075 0 .6.45 1.05.45.45 1.05.45Zm-8-14q-.6 0-1.05-.45-.45-.45-.45-1.05 0-.65.45-1.075Q11.4 12 12 12h24q.65 0 1.075.425.425.425.425 1.075 0 .6-.425 1.05Q36.65 15 36 15Zm4-6q-.6 0-1.05-.45-.45-.45-.45-1.05 0-.65.45-1.075Q15.4 6 16 6h16q.65 0 1.075.425.425.425.425 1.075 0 .6-.425 1.05Q32.65 9 32 9Zm-3.5 30h23Z"/></svg>
      </button>
      
          { filebase64 &&
            <>
            {(filebase64.indexOf("image/") > -1) && 
            <img className='mt-24' alt='' src={filebase64} width={300} />
            }
            
            </>
          }
    </div>
    </div>
  );

}

export default App;