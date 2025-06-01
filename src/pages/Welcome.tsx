import {useModel} from '@umijs/max';
import {theme} from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  return (
    <div>
      <h1>我是主页</h1>
    </div>
  );
};

export default Welcome;
