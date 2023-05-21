import { Modal, Spin } from 'antd';

const Loader = ({ visible }) => {
  return (
    <Modal
      open={visible}
      closable={false}
      footer={null}
      centered
      destroyOnClose
      maskClosable={false}
    >
      <Spin />
      <p>Loading...</p>
    </Modal>
  );
};

export default Loader;
