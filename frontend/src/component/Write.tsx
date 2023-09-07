import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header';

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택한 카테고리

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      selectedCategory,
      // 이곳에 이미지 파일 업로드 관련 정보를 추가할 수 있습니다.
    };

    // 게시글 데이터를 서버로 전송하거나 필요한 작업을 수행하세요.

    setTitle('');
    setContent('');
    setSelectedCategory('');
  };

  return (
    <div>
      <Header />

      <form onSubmit={handleSubmit}>
        <h2>게시글 작성</h2>
        <button type="submit">작성</button>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <div>
          <h3>카테고리 선택</h3>
          <div>
            <button
              type="button"
              onClick={() => handleCategoryChange('카테고리1')}
              className={selectedCategory === '카테고리1' ? 'selected' : ''}
            >
              카테고리1
            </button>
            <button
              type="button"
              onClick={() => handleCategoryChange('카테고리2')}
              className={selectedCategory === '카테고리2' ? 'selected' : ''}
            >
              카테고리2
            </button>
            <button
              type="button"
              onClick={() => handleCategoryChange('카테고리3')}
              className={selectedCategory === '카테고리3' ? 'selected' : ''}
            >
              카테고리3
            </button>
          </div>
        </div>
        <div>
          {/* 이미지 파일 업로드 필드를 추가하세요 */}
        </div>
      </form>
    </div>
  );
};

export default Write;
