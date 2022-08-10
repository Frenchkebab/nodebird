import { useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  /* 
    key 속성 안티패턴:
      게시글이 지워질 가능성이 있는 경우,
      순서가 달라질 수 있는 경우(삭제/추가) key를 index로 사용하면 안됨!!
      데이터 및 데이터의 순서가 바뀌지 않을 경우 key를 index로 사용해도 무방함!
  */
  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post, index) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
