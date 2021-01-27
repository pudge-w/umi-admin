import { FC } from 'react';
import { Layout } from 'antd';
import { useHistory } from 'umi';

import { Typography } from 'antd';
const { Text, Link } = Typography;

const LayoutHeader: FC = () => {
  const history = useHistory()

  const exit = () => {
    history.push('/login')
  }

  return (
    <Layout.Header 
      className="site-layout-background" 
      style={{ padding: '0 20px', textAlign: 'right', borderBottom: '1px solid #1DA57A' }}
    >
      <Text style={{marginRight: 30}}>欢迎你，如深</Text>
      <Link onClick={exit}>
        退出
      </Link>
    </Layout.Header>
  )
}

export default LayoutHeader;