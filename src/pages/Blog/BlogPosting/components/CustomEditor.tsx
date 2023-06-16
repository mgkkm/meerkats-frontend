import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { blogPostState, isEditState } from '../../../../recoil/BlogPostState';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CustomEditor() {
  const [blogPost, setBlogPost] = useRecoilState(blogPostState);
  const isEdit = useRecoilValue(isEditState);
  let contentData;

  if (isEdit) {
    contentData = blogPost.content;
  }

  return (
    <div id="editor">
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: 'Enter the content',
        }}
        data={contentData}
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
