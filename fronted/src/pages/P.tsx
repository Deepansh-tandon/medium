import { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,

} from "draft-js";
import "draft-js/dist/Draft.css";
import { AppBar } from "../components/AppBar";
import axios from 'axios';
import { BU } from "../config";
import { useNavigate } from "react-router-dom";

export const P = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const saveContent = async () => {
    const content = editorState.getCurrentContent();
    const plainTextContent = content.getPlainText(); // Get plain text

    const postData = {
      title: title,
      content: plainTextContent, // Send plain text instead of raw content
    };

    try {
      const response = await axios.post(`${BU}/api/v1/blogs`, postData, {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
        }
      });
      console.log("Data saved:", response.data);
      navigate(`/blog/${response.data}`);
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <>
      <AppBar />
      <div className="min-h-screen p-8 bg-gray-100 p-4 flex flex-col items-center w-full">
        {/* Editor Container */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-fit p-6 pt-8">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl font-bold outline-none mb-6 text-gray-800"
          />

          {/* Editor */}
          <div className="border border-gray-200 p-4 rounded-lg bg-gray-50 min-h-[350px]">
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              handleKeyCommand={handleKeyCommand}
              placeholder="Tell your story..."
            />
          </div>

          {/* Formatting Options */}
          <div className="mt-4">
            <button
              onClick={handleBoldClick}
              className="text-sm px-3 py-2 text-white bg-blue-500 rounded"
            >
              Bold
            </button>
            <button
              onClick={saveContent}
              className="text-sm px-3 py-2 ml-2 text-white bg-green-500 rounded"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
