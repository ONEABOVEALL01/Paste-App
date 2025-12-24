import { div } from "motion/react-client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  const date = new Date();

const formatted = date.toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

  return (
    <div>
      <div className="flex justify-center">
        <input
          className="w-[80vh] border pl-[2vh] h-[6vh] border-black rounded-xl mt-[8vh] bg-white"
          type="search"
          placeholder="search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-[100vh] justify-center ml-[50vh] gap-5 mt-[5vh]">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (

               <div className="pasteText" >

                
                  <div
                key={paste?._id}
                className="border min-h-[10vh] bg-white w-[100vh] border-black rounded-2xl p-[3vh] flex flex-col justify-center"
              >

                <div className="text-3xl font-semibold text-gray-700">
                         {paste.title}
                </div>
             

                  <div className="h-[15vh] overflow-hidden mt-[3vh] ">

                       <div className="text-xl leading-7 tracking-tight text-gray-700">{paste.content}</div>

                  </div>

             

                <div className="flex gap-[1vh] h-[5vh] w-[40vh] justify-evenly relative -top-[22vh] -right-[50vh]">
                  <button className=" h-[4vh] rounded-2xl cursor-pointer w-[8vh]">
                    <a href={`/?pasteId=${paste?._id}`}><FaRegEdit size={20} /></a>
                  </button>
                  <button className=" h-[4vh] rounded-2xl w-[8vh] cursor-pointer">
                    <a href={`/pastes/${paste?._id}`}><GrFormView size={30} /></a>
                  </button>
                  <button
                    className=" h-[4vh] rounded-2xl w-[8vh] cursor-pointer"
                    onClick={() => handleDelete(paste?._id)}
                  >
                    <MdDelete size={20}/>

                  </button>
                  <button
                    className=" h-[4vh] rounded-2xl w-[8vh] cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to Clipboard");
                    }}
                  >
                    <FaRegCopy size={20}/>
                  </button>
                  <button
                    className="h-[4vh] rounded-2xl w-[8vh] cursor-pointer"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: paste.title,
                          text: paste.content,
                          url: window.location.origin + `/pastes/${paste._id}`
                        }).catch(console.error);
                      } else {
                        navigator.clipboard.writeText(window.location.origin + `/pastes/${paste._id}`);
                        toast.success("Paste URL copied to clipboard");
                      }
                    }}
                  >
                    <FaShareAlt size={20} />
                  </button>
                </div>

                <div className="text-green-600 font-semibold">{paste.createdAt}</div>
              </div>
               </div>


            
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
