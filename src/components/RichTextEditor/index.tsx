import React, { useState } from 'react';
import type { BuiltInControlType, EditorState } from 'braft-editor';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

interface Props {
  value?: string;
  contentStyle?: React.CSSProperties;
  placeholder?: string;
  onChange?: (html: string) => void;
  hideFullScreen?: boolean;
}

/**
 * 富文本编辑器
 * @param props
 * @constructor
 */
const RichTextEditor: React.FC<Props> = (props) => {
  const {
    value = null,
    contentStyle = { height: 360 },
    placeholder,
    onChange,
    hideFullScreen = false,
  } = props;
  const [editorState, setEditorState] = useState<EditorState>(null);
  if (!editorState && value) {
    setEditorState(BraftEditor.createEditorState(value));
  }
  const submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    // const htmlContent = editorState.toHTML();
    // alert(htmlContent);
  };

  const handleEditorChange = (newVal: EditorState) => {
    setEditorState(newVal);
    onChange?.(newVal.toHTML());
  };

  // 要展示的操作按钮
  const controls: BuiltInControlType[] = [
    // 'headings',
    'bold',
    'italic',
    'underline',
    'strike-through',
    'separator',
    'list-ul',
    'list-ol',
    // 'blockquote',
    'separator',
    'link',
    // 'hr',
    'emoji',
    // 'code',
    'media',
    'separator',
    'undo',
    'redo',
    'separator',
    'fullscreen',
  ];
  if (hideFullScreen) {
    controls.splice(controls.indexOf('fullscreen'), 1);
  }

  return (
    <div className="rich-text-editor">
      {/*@ts-ignore*/}
      <BraftEditor
        contentStyle={contentStyle}
        placeholder={placeholder}
        value={editorState}
        controls={controls}
        imageControls={['remove']}
        media={{
          externals: {
            video: false,
            audio: false,
            embed: false,
          },
          accepts: {
            image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
            video: false,
            audio: false,
          },
          pasteImage: true,
        }}
        onChange={handleEditorChange}
        onSave={submitContent}
      />
    </div>
  );
};
export default RichTextEditor;
