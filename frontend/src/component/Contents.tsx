import React from 'react'
import '../css/Contents.css'
import TopPosts from './TopPosts'
//컨텐츠 정렬 필요
const Contents = () => {
  return (
    <div>
      <TopPosts/>
        <div id='Contents-box'>
          <div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
          <div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
          <div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
    </div>
  )
}

export default Contents