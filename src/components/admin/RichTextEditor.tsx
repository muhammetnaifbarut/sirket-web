'use client'

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-lg p-4 text-gray-400 text-sm bg-gray-50">
      Editör yükleniyor...
    </div>
  ),
})

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

const TOOLBAR = [
  [{ header: [1, 2, 3, 4, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video'],
  ['clean'],
]

const FORMATS = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'align',
  'list', 'bullet',
  'indent',
  'blockquote', 'code-block',
  'link', 'image', 'video',
]

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  return (
    <div className="rich-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{ toolbar: TOOLBAR }}
        formats={FORMATS}
        placeholder={placeholder ?? 'Yazınızı buraya yazın...'}
      />
      <style jsx global>{`
        .rich-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: #d1d5db;
          background: #f9fafb;
        }
        .rich-editor .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: #d1d5db;
          font-family: var(--font-sans);
          font-size: 15px;
          min-height: 380px;
        }
        .rich-editor .ql-editor {
          min-height: 380px;
          line-height: 1.7;
        }
        .rich-editor .ql-editor p { margin-bottom: 0.75rem; }
        .rich-editor .ql-editor h1 { font-size: 1.875rem; font-weight: 800; margin: 1.25rem 0 0.75rem; }
        .rich-editor .ql-editor h2 { font-size: 1.5rem;   font-weight: 700; margin: 1rem 0 0.5rem; }
        .rich-editor .ql-editor h3 { font-size: 1.25rem;  font-weight: 700; margin: 0.85rem 0 0.5rem; }
        .rich-editor .ql-editor blockquote {
          border-left: 4px solid #714B67;
          padding-left: 1rem;
          color: #4b5563;
          font-style: italic;
        }
      `}</style>
    </div>
  )
}
