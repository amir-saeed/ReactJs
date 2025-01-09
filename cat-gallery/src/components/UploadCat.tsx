import React, { useState } from 'react';
import { Form, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../config';

interface UploadRequestOption {
  file: File;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

const UploadCat: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUpload = async ({ file }: { file: File }): Promise<void> => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/upload', {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      message.success('Cat uploaded successfully!');
      navigate('/');
    } catch (error) {
      message.error(`Failed to upload cat image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a Cat Image</h2>
      <Form>
        <Form.Item
          name="image"
          rules={[{ required: true, message: 'Please select an image!' }]}
        >
          <Upload
            accept="image/*"
            customRequest={({ file, onSuccess, onError }: UploadRequestOption) => {
              handleUpload({ file: file as File })
                .then(() => onSuccess?.('ok'))
                .catch(onError);
            }}
            showUploadList={false}
          >
            <Button 
              icon={<UploadOutlined />} 
              loading={loading}
              type="primary"
              size="large"
            >
              Select Image
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadCat;