import { Appbar } from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { ImageUpload } from "../components/ImageUpload"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"

export const Publish = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  })

  useEffect(() => {
    return () => {
      editor?.destroy()
    }
  }, [editor])

  const handlePublish = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content, // sending TipTap's HTML markup
          imageurl: localStorage.getItem("url"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      )

      toast.success("Blog posted successfully!")
      localStorage.removeItem("url")
      navigate(`/blog/${response.data.id}`)
    } catch (err) {
      toast.error("Error publishing blog")
      console.error(err)
    }
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 mb-4"
            placeholder="Title"
          />

          {/* TipTap Editor */}
          <div className="border rounded p-2 bg-white mb-4 min-h-[200px]">
            <EditorContent editor={editor} />
          </div>

          <div className="mt-4 inline-flex items-center text-sm">
            <ImageUpload />
          </div>

          <button
            onClick={handlePublish}
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  )
}
