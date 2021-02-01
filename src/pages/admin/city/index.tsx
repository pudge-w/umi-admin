import {FC, useState, useEffect, useMemo} from 'react';
import {Table, Card, Button, Modal, Form, Input, Select, DatePicker, message} from 'antd';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {getCity, getCityList, delCityItem, addCityItem} from '@/utils/api';

interface CityType {
  id: number;
  nm: string;
  py: string;
}

const format = (sjc: string) => {
  let date = new Date(+sjc);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const min = date.getMinutes();
  const s = date.getSeconds();
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const City: FC = () => {

  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const [cts, setCts] = useState([]);
  const [data, setData] = useState([]);
  // const [list, setList] = useState([]);

  const [chooseCity, setChooseCity] = useState(''); 
  const [chooseUseCar, setChooseUseCar] = useState(''); 
  const [chooseOperating, setChooseOperating] = useState(''); 

  // 控制模态框的显示
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    (async() => {
      const res = await getCityList()
      let list = res.result;
      list = list.map((item: any) => {
        return item = {...item, key:item._id}
      })
      setData(list);
      // setList(list);
    })()
  }, [])

  const columns: any = [
    {
      title: '城市ID',
      dataIndex: '_id',
    },
    {
      title: '城市名称',
      dataIndex: 'city',
    },
    {
      title: '用车模式',
      dataIndex: 'useCar',
      render: (value: string) => value === '1' ? '禁停区' : '停车点'
    },
    {
      title: '营运模式',
      dataIndex: 'operating',
      render: (value: string) => value === '1' ? '自营' : '加盟'
    },
    {
      title: '城市管理员',
      dataIndex: 'admin',
    },
    {
      title: '城市开通时间',
      dataIndex: 'openTime',
      render: (value: string) => format(value)
    },
    {
      title: '操作',
      render: (value: any) => <Button onClick={deleteItem(value)}>删除</Button>
    }
  ]

  const deleteItem = (item:any) => {
    return () => {
      Modal.confirm({
        title: `你确定要删除${item.city}这条记录吗?`,
        icon: <ExclamationCircleOutlined />,
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          const res = await delCityItem({
            id: item._id
          })
          if (res.status === 0) {
            (async() => {
              const res = await getCityList()
              let list = res.result;
              list = list.map((item: any) => {
                return item = {...item, key:item._id}
              })
              setData(list);
              // setList(list);
            })()
          }
        },
        onCancel() {
          console.log('Cancel');
        },
      });
      // const res = await delCityItem({id})
      // console.log(res)
    }
  }

  // useEffect(() => {
  //   let newList: any = [...data];
  //   newList = newList.filter((item:any) => {
  //     return item.city.includes(chooseCity) && item.useCar.includes(chooseUseCar) && item.operating.includes(chooseOperating)
  //   })
  //   setList(newList);
  // }, [chooseCity, chooseUseCar, chooseOperating])

  const onFinish = (values:any) => {
    setChooseCity(values.city || '')
    setChooseUseCar(values.useCar || '')
    setChooseOperating(values.operating || '')
  }

  const handleChange = async (value:any) => {
    if (value) {
      const res = await getCity()
      setCts(res.cts);
    }
  }

  const onReset = () => {
    form.resetFields();
    setChooseCity('')
    setChooseUseCar('')
    setChooseOperating('')
    // setList(data);
  };

  const list1 = useMemo(() => {
    let newList: any = [...data];
    newList = newList.filter((item:any) => {
      return item.city.includes(chooseCity) && item.useCar.includes(chooseUseCar) && item.operating.includes(chooseOperating)
    })
    return newList;
  }, [chooseCity, chooseUseCar, chooseOperating, data])

  // 新增打开模态框
  const modelShow = (): void => {
    setIsModalVisible(true);
  }

  // 模态框确定的回调
  const handleOk = async (): Promise<void> => {
    // setIsModalVisible(false);
    let values = addForm.getFieldsValue()
    values = {
      ...values,
      openTime: moment(values.openTime).valueOf(),
      handleTime: Date.now()
    }
    const res = await addCityItem({...values});
    if (res.status === 0) {
      setIsModalVisible(false);
      (async() => {
        const res = await getCityList()
        let list = res.result;
        list = list.map((item: any) => {
          return item = {...item, key:item._id}
        })
        setData(list);
        // setList(list);
      })()
    } else {
      message.error(res.msg);
    }
  };

  // 模态框取消的回调
  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card>
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item 
            label="城市"
            name="city"
          >
            <Select style={{ width: 120 }} allowClear onDropdownVisibleChange={handleChange}>
              {
                cts.map((item: CityType) => {
                  return <Select.Option key={item.id} value={item.nm}>{item.nm}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="useCar"
            label="用车模式"
          >
            <Select style={{ width: 120 }} allowClear>
              <Select.Option value="1">禁停区</Select.Option>
              <Select.Option value="2">停车点</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="operating"
            label="营运模式"
          >
            <Select style={{ width: 120 }} allowClear>
              <Select.Option value="1">自营</Select.Option>
              <Select.Option value="2">加盟</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            {() => (
              <>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  查询
                </Button>
                <Button
                  htmlType="reset"
                  onClick={onReset}
                >
                  重置
                </Button>
              </>
            )}
          </Form.Item>
        </Form>
      </Card>
      
      <br />

      <Card title="高级表格">
        <Button type="primary" onClick={modelShow}>新增</Button>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form
            {...layout}
            name="basic"
            form={addForm}
          >
            <Form.Item
              label="城市"
              name="city"
              rules={[{ required: true }]}
            >
              <Select allowClear onDropdownVisibleChange={handleChange}>
                {
                  cts.map((item: CityType) => {
                    return <Select.Option key={item.id} value={item.nm}>{item.nm}</Select.Option>
                  })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="用车模式"
              name="useCar"
              rules={[{ required: true }]}
            >
              <Select allowClear>
                <Select.Option value="1">禁停区</Select.Option>
                <Select.Option value="2">停车点</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="营运模式"
              name="operating"
              rules={[{ required: true }]}
            >
              <Select allowClear>
                <Select.Option value="1">自营</Select.Option>
                <Select.Option value="2">加盟</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="管理员"
              name="admin"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="开通时间"
              name="openTime"
              rules={[{ required: true }]}
            >
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          </Form>
        </Modal>
        <Table 
          columns={columns} 
          dataSource={list1}
        />
      </Card>
    </>
  )
}

export default City;