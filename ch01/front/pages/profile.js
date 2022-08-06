import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  const followerList = [{ nickname: 'frenchkebab' }, { nickname: 'junghyun' }, { nickname: 'hermine' }];
  const followingList = [{ nickname: 'frenchkebab' }, { nickname: 'junghyun' }, { nickname: 'hermine' }];

  return (
    <>
      <Head>
        <title>Profile | NodeBird</title>
      </Head>

      <AppLayout>
        <NicknameEditForm />
        <FollowList header="following list" data={followingList} />
        <FollowList header="follower list" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
