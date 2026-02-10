'use client';

import styles from '@components/TipTapEditor.module.css';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TipTapEditorProps {
  content?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
}

function TipTapEditor({ content = '', placeholder, onChange }: TipTapEditorProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    immediatelyRender: false,
  });

  const containerClasses = Utilities.classNames(styles.root, isFocused && styles.focused);

  return (
    <div className={containerClasses}>
      <EditorContent editor={editor} />
      {editor && editor.isEmpty && placeholder && !isFocused && <div className={styles.placeholder}>{placeholder}</div>}
    </div>
  );
}

export default TipTapEditor;
