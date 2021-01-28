import { FC, useState } from 'react';
import { Space, Spin, Alert, Switch } from 'antd';
import Card from '../components/Card';
import { QuestionOutlined } from '@ant-design/icons';

const antIcon = <QuestionOutlined style={{ fontSize: 24 }} spin />;

const Buttons: FC = () => {
  const [loading, setLoading] = useState(false);
  const toggle = () => {
    setLoading(loading => !loading);
  }
  return (
    <Space className="Buttons" direction="vertical" style={{width: '100%'}}>
      <Card title="Spin用法">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
        <Spin indicator={antIcon} />
      </Card>

      <Card title="内容遮罩">
        <Spin spinning={loading}>
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
        <div style={{ marginTop: 16 }}>
          Loading state：
          <Switch checked={loading} onChange={toggle} />
        </div>
      </Card>
    </Space>
  )
}

export default Buttons;