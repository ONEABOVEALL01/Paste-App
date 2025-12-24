import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id: paramId } = useParams();
  const [searchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId") || paramId;

  const allPastes = useSelector((state) => state.paste.pastes || []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!pasteId) return;
    const paste = allPastes.find((p) => p._id === pasteId);
    if (paste) {
      setTitle(paste.title || "");
      setContent(paste.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [pasteId, allPastes]);

  const handleScroll = () => {
    if (lineRef.current && textareaRef.current) {
      lineRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lineCount = content ? content.split("\n").length : 1;

  return (
    <div>
      <div className="flex justify-center">
        <input
          className="border mt-[5vh] h-[6vh] w-[80vh] bg-[#fcfcfc] p-[2vh] border-black rounded-2xl"
          type="text"
          placeholder="Enter title here.."
          value={title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col border-2 justify-center rounded-2xl rounded-b-none mt-[10vh] h-[70vh] bg-[#9fe6e8] w-[110vh]">
          <div className="w-full h-[7vh] rounded-2xl flex gap-[1vh] justify-start items-center">
            <div className="h-[3vh] w-[3vh] bg-rose-400 rounded-full ml-[2vh]" />
            <div className="h-[3vh] w-[3vh] bg-yellow-400 rounded-full" />
            <div className="h-[3vh] w-[3vh] bg-green-400 rounded-full" />
          </div>

          <div className="flex border border-black border-r-0 rounded-l-xl rounded-b-none w-full h-[70vh] overflow-hidden">
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

            <textarea
              ref={textareaRef}
              value={content}
              placeholder="Enter your text here.."
              onChange={(e) => setContent(e.target.value)}
              onScroll={handleScroll}
              rows={20}
              disabled
              className="w-full resize-none outline-none px-2 py-2 leading-6 bg-[#ecf0f4]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
