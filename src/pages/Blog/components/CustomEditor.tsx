import React from 'react';
import { useRecoilState } from 'recoil';
import { blogPostState } from '../../../recoil/BlogPostState';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CustomEditor() {
  const [blogPost, setBlogPost] = useRecoilState(blogPostState);

  return (
    <div id="editor">
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: 'Enter the content',
        }}
        data={blogPost.content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setBlogPost(prevData => ({
            ...prevData,
            content: data,
          }));
        }}
      />
    </div>
  );
}
