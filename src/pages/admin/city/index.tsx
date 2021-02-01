import {FC, useState, useEffect} from 'react';
import {Table, Card, Radio, Divider, Button, Modal, Form, Input, Select} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {getCity, getCityList} from '@/utils/api';

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

const City: FC = () => {

  const [form] = Form.useForm();

  const [cts, setCts] = useState([]);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const [chooseCity, setChooseCity] = useState(''); 
  const [chooseUseCar, setChooseUseCar] = useState(''); 
  const [chooseOperating, setChooseOperating] = useState(''); 

  useEffect(() => {
    (async() => {
      const res = await getCityList()
      let list = res.result;
      list = list.map((item: any) => {
        return item = {...item, key:item._id}
      })
      setData(list);
      setList(list);
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
    }
  ]

  useEffect(() => {
    let newList: any = [...data];
    newList = newList.filter((item:any) => {
      return item.city.includes(chooseCity) && item.useCar.includes(chooseUseCar) && item.operating.includes(chooseOperating)
    })
    setList(newList);
  }, [chooseCity, chooseUseCar, chooseOperating])

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
    setList(data);
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


      <Card title="高级表格">
        <Table 
          columns={columns} 
          dataSource={list}
        />
      </Card>
    </>
  )
}

export default City;