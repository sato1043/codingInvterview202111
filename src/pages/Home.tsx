import React from 'react';
import useStore from '../store';

const Home: React.VFC = () => {
  const { user } = useStore();
  return (
    <div>
      Home
      <div>user.fullName: {user ? user.fullName : '(...now loading)'}</div>
    </div>
  );
};

export default Home;
