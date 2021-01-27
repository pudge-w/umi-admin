import { Menu } from 'antd';
import { useCallback } from 'react';
import { useHistory, useDispatch } from 'umi';
import { 
  MailOutlined, 
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const menuList = [
  {
    title: '首页',
    key: '/admin/home',
    icon: <MailOutlined />
  },
  {
    title: 'UI',
    key: '/admin/ui',
    icon: <AppstoreOutlined />,
    children: [
      {
        title: '按钮',
        key: '/admin/ui/buttons',
      },
      {
        title: '弹框',
        key: '/admin/ui/modals',
      },
      {
        title: 'Loading',
        key: '/admin/ui/loadings',
      },
      {
        title: '通知提醒',
        key: '/admin/ui/notification',
      },
      {
        title: '全局Message',
        key: '/admin/ui/messages',
      },
      {
        title: 'Tab页签',
        key: '/admin/ui/tabs',
      },
      {
        title: '图片画廊',
        key: '/admin/ui/gallery',
      },
      {
        title: '轮播图',
        key: '/admin/ui/carousel',
      }
    ]
  },
  {
    title: '表单',
    key: '/admin/form',
    icon: <BarChartOutlined />,
    children: [
      {
        title: '登录',
        key: '/admin/form/login',
      },
      {
        title: '注册',
        key: '/admin/form/reg',
      }
    ]
  },
  {
    title: '表格',
    key: '/admin/table',
    icon: <CloudOutlined />,
    children: [
      {
        title: '基础表格',
        key: '/admin/table/basic',
      },
      {
        title: '高级表格',
        key: '/admin/table/high',
      }
    ]
  },
  {
    title: '富文本',
    key: '/admin/rich',
    icon: <ShopOutlined />,
  },
  {
    title: '城市管理',
    key: '/admin/city',
    icon: <TeamOutlined />,
  },
  {
    title: '订单管理',
    key: '/admin/order',
    icon: <UserOutlined />,
    children: [
      {
        title: '订单详情',
        key: 'detail'
      },
      {
        title: '结束订单',
        key: 'finish'
      }
    ]
  },
  {
    title: '员工管理',
    key: '/admin/user',
    icon: <UploadOutlined />,
  },
  {
    title: '车辆地图',
    key: '/admin/bikeMap',
    icon: <VideoCameraOutlined />,
  },
  {
    title: '图标',
    key: '/admin/charts',
    icon: <UploadOutlined />,
  },
  {
    title: '权限设置',
    key: '/admin/permission',
    icon: <MailOutlined />,
  },
];

const LayoutMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = useCallback((e: any) => {
    // dispatch({
    //   type: 'admin/changeTitle',
    //   payload: e.domEvent.target.innerText
    // })
    history.push(e.key);
  }, [])

  return (
    <Menu onClick={handleClick} mode="vertical" theme="dark">
      {
        menuList.map(item => {
          if (item.children) {
            return (
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
                {
                  item.children.map(child => {
                    return (
                      <Menu.Item key={child.key}>{child.title}</Menu.Item>
                    )
                  })
                }
              </SubMenu>
            )
          } else {
            return <Menu.Item key={item.key} icon={item.icon}>{item.title}</Menu.Item>
          }
        })
      }
      {/* <Menu.Item key="1111" icon={<MailOutlined />}>Option 1</Menu.Item>
      <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu> */}
    </Menu>
  )
}

export default LayoutMenu;