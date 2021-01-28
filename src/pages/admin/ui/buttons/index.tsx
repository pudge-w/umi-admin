import { FC, useState } from 'react';
import { Button, Space, notification } from 'antd';
import Card from '../components/Card';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

import pic from '../../../../assets/pic.png';

type SizeType = 'small' | 'middle' | 'large' | undefined;
type NotificationType = 'success' | 'info' | 'warning' | 'error';

// const Pic = () => <img src={require('../../../../assets/pic.jpg')} alt=""/>

const Buttons: FC = () => {

  const [size, setSize]: [SizeType, Function] = useState('large');

  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  return (
    <Space className="Buttons" direction="vertical" style={{width: '100%'}}>
      <Card title="基础按钮">
        <Button type="primary" size={size}>Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="primary" danger>Primary</Button>
        <Button type="dashed" danger>Dashed Button</Button>
        <Button type="primary" disabled>Primary Button</Button>
      </Card>

      <Card title="图形按钮">
        <Button icon={<PlusOutlined />}>添加</Button>
        <Button icon={<EditOutlined />}>编辑</Button>
        <Button icon={<DeleteOutlined />} type="primary">删除</Button>
        <Button shape="circle" icon={<SearchOutlined />} />
      </Card>

      <Card title="Loading...">
        <Button type="primary" loading>Loading</Button>
      </Card>

      <Card title="全局通知">
        <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </Card>

      <img src={pic} alt=""/>
      {/* <Pic /> */}
    </Space>
  )
}

export default Buttons;