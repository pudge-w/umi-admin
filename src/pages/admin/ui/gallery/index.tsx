import {FC, useState, useEffect} from 'react';
import { Row, Col, Card, Space, Modal, Image  } from 'antd';
import { getGalleryList } from '@/utils/api';

const Gallery: FC = () => {
  const [list, setList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    (async() => {
      const res = await getGalleryList();
      if (res.status === 0) {
        setList(res.list)
      }
    })()
  }, [])

  const cardClick = (url: string) => {
    return () => {
      setIsModalVisible(true)
      setCurrentUrl(url);
    }
  }


  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Row gutter={12}>
        {
          list.map((item: Array<string>, index) => {
            return (
              <Col key={index} span={index === 4 ? 4 : 5}>
                <Space direction="vertical">
                  {
                    item.map(child => {
                      return (
                        <Card
                          key={child}
                          onClick={cardClick(child)}
                          hoverable
                          style={{ width: '100%' }}
                          cover={<img alt="example" src={child} />}
                        >
                          <Card.Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                      )
                    })
                  }
                </Space>
              </Col>
            )
          })
        }
      </Row>
      <Modal 
        title="Basic Modal" 
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
      >
        <Image
          width={200}
          src={currentUrl}
          preview={false}
        />
      </Modal>
    </>
  )
}

export default Gallery;