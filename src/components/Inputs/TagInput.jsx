import React, { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && tags.length) {
      setTags(tags.slice(0, -1)); // Son etiketi sil
    }
  };

  const handleRemove = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded p-2 min-h-[48px]">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-sky-100/70 text-sky-700 px-3 py-1 rounded text-sm"
        >
          {tag}{" "}
          <button
            type="button"
            className="text-sky-500 hover:text-sky-700 ml-2 font-bold cursor-pointer"
            onClick={() => handleRemove(index)}
          >
            &times;
          </button>
        </div>
      ))}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Etiket ekle ve enter'a bas"
        className="flex-1 outline-none text-sm p-1 border-none min-w-[120px]"
      />
    </div>
  );
};

export default TagInput;
