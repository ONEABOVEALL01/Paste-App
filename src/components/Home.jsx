import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  const lineRef = useRef(null);
  
  const handleScroll = () => {
    if (lineRef.current && textareaRef.current) {
      lineRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };
  
  const lineCount = value.split("\n").length;
  const allPastes = useSelector((state) => state.paste.pastes)

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  
   useEffect(()=>{
    if(pasteId){
      const paste = allPastes.find((p) =>p._id === pasteId)
     setTitle(paste.title)
    setValue(paste.content)
    
    }
   
   },[pasteId])

   const date = new Date();

  const formatted = date.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

  function createPaste() {
    if (!title.trim()) {
    toast.error("Enter a title");
    return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: formatted,
    };

    

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }
  return (
    <div>
     
         <div className="flex justify-center">
        <input
          className="border mt-[5vh] h-[6vh] w-[80vh] bg-[#fcfcfc] p-[2vh] border-black rounded-2xl"
          type="text"
          placeholder="Enter title here.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="h-[6vh] w-[20vh] mt-[5vh] cursor-pointer rounded-2xl ml-[5vh] bg-indigo-400 font-semibold hover:bg-indigo-500 transition duration-200"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

<div className="flex justify-center">


      <div className="flex flex-col border-4 border-gray-700  justify-center rounded-2xl rounded-b-none mt-[10vh] h-[70vh] bg-[#9fe6e8] w-[110vh] ">

      <div className="w-full h-[7vh] rounded-2xl flex gap-[1vh] justify-start items-center ">

         <div className="h-[3vh] w-[3vh] bg-rose-400 rounded-full ml-[2vh]" ></div>
         <div className="h-[3vh] w-[3vh] bg-yellow-400 rounded-full" ></div>
         <div className="h-[3vh] w-[3vh] bg-green-400 rounded-full" ></div>

        </div>
  <div className="flex border border-black border-r-0  rounded-b-none w-full h-[70vh] overflow-hidden">

    {/* Line Numbers */}
    <div
      ref={lineRef}
      className="bg-[#0f1210] text-green-500 text-right px-2 py-2 select-none overflow-hidden"
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <div key={i} className="leading-6">
          {i + 1}
        </div>
      ))}
    </div>

    {/* Textarea */}
    <textarea
      ref={textareaRef}
      value={value}
      placeholder="Enter your text here.."
      onChange={(e) => setValue(e.target.value)}
      onScroll={handleScroll}
      rows={20}
      className="w-full resize-none outline-none px-2 py-2 leading-6 bg-white bg-[radial-gradient(circle,var(--color-neutral-200)_1px,transparent_1px)]
        bg-size-[10px_10px]"
    ></textarea>
  </div>
</div>

</div>


    </div>
  );
};

export default Home;


  const formatted = date.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

  function createPaste() {
    if (!title.trim()) {
    toast.error("Enter a title");
    return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: formatted,
    };

    

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }
  return (
    <div>
     
         <div className="flex justify-center">
        <input
          className="border mt-[5vh] h-[6vh] w-[80vh] bg-[#fcfcfc] p-[2vh] border-black rounded-2xl"
          type="text"
          placeholder="Enter title here.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="h-[6vh] w-[20vh] mt-[5vh] cursor-pointer rounded-2xl ml-[10vh] bg-indigo-400 font-semibold hover:bg-indigo-500 transition duration-200"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

<div className="flex justify-center">


      <div className="flex flex-col border-2  justify-center rounded-2xl rounded-b-none mt-[10vh] h-[70vh] bg-[#9fe6e8] w-[110vh] ">

      <div className="w-full h-[7vh] rounded-2xl flex gap-[1vh] justify-start items-center ">

         <div className="h-[3vh] w-[3vh] bg-rose-400 rounded-full ml-[2vh]" ></div>
         <div className="h-[3vh] w-[3vh] bg-yellow-400 rounded-full" ></div>
         <div className="h-[3vh] w-[3vh] bg-green-400 rounded-full" ></div>

        </div>
  <div className="flex border border-black border-r-0 rounded-l-xl rounded-b-none w-full h-[70vh] overflow-hidden">

    {/* Line Numbers */}
    <div
      ref={lineRef}
      className="bg-[#0f1210] text-green-500 text-right px-2 py-2 select-none overflow-hidden"
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <div key={i} className="leading-6">
          {i + 1}
        </div>
      ))}
    </div>

    {/* Textarea */}
    <textarea
      ref={textareaRef}
      value={value}
      placeholder="Enter your text here.."
      onChange={(e) => setValue(e.target.value)}
      onScroll={handleScroll}
      rows={20}
      className="w-full resize-none outline-none px-2 py-2 leading-6 bg-[#ecf0f4]"
    ></textarea>
  </div>
</div>

</div>


    </div>
  );
};

export default Home;

