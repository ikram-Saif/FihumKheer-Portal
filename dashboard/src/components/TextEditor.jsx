import { useEffect, useRef } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';

import { strapiToTiptap, tiptapToStrapi } from '../utils/editorUtils';



export default function TextEditor({ content, form }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '', // Start empty, let useEffect handle it to avoid hydration mismatch
    onUpdate({ editor }) {
      // 1. Get JSON from Tiptap
      const json = editor.getJSON();
      // 2. Convert to Strapi Blocks format
      const strapiBlocks = tiptapToStrapi(json);
      // 3. Update Formik
      if (form && form.setFieldValue) {
        form.setFieldValue('description', strapiBlocks);
      }
    },
  });

  // Effect to sync initial content from parent
  // Effect to sync initial content from parent
  const hasLoadedRef = useRef(false);

  // Effect to sync initial content from parent
  useEffect(() => {
    // Only set content if editor is ready and content exists
    if (!editor || !content || content.length === 0 || hasLoadedRef.current) return;

    console.log("TextEditor: Force loading content", content);

    try {
      if (Array.isArray(content)) {
        const tiptapContent = strapiToTiptap(content);
        // usage of setTimeout to ensure editor is fully ready/rendered
        setTimeout(() => {
          // Verify again before setting
          if (!hasLoadedRef.current) {
            console.log("TEST: TextEditor content set successfully with items:", tiptapContent.content.length);
            editor.commands.setContent(tiptapContent);
            hasLoadedRef.current = true;
          }
        }, 0);
      }
    } catch (e) {
      console.error("Failed to parse initial content", e);
    }

  }, [content, editor]);


  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content className="min-h-[200px]" />
    </RichTextEditor>
  );
}