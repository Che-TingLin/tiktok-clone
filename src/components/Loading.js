import { Space, Spin } from 'antd';

const Loading = () => (
  <Space style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
    <Spin size="large">
      <div className="content" />
    </Spin>
  </Space>
);

export default Loading;
