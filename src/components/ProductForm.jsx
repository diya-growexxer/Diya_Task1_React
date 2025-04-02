import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Modal, Switch, Rate, Descriptions, Tag } from 'antd';

const ProductForm = ({ visible, onCancel, onSubmit, initialValues, mode }) => {
  const [form] = Form.useForm();

  
  useEffect(() => {
    if (visible && initialValues) {
     
      setTimeout(() => {
        form.setFieldsValue({
          title: initialValues.title,
          price: initialValues.price,
          category: initialValues.category,
          brand: initialValues.brand,
          stock: initialValues.stock,
          rating: initialValues.rating,
          isAvailable: initialValues.isAvailable,
          description: initialValues.description
        });
      }, 0);
    } else if (!visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const now = new Date().toISOString();
      const productData = {
        ...values,
        createdAt: mode === 'add' ? now : initialValues?.createdAt,
        updatedAt: now,
      };
      onSubmit(productData);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const renderForm = () => {
    if (mode === 'view') {
      return (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Title" span={2}>
            {initialValues?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Brand">
            {initialValues?.brand}
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            <Tag color="blue">{initialValues?.category}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            ${initialValues?.price?.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Stock">
            <Tag color={initialValues?.stock > 5 ? 'green' : initialValues?.stock > 0 ? 'orange' : 'red'}>
              {initialValues?.stock} units
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Rating">
            <Rate disabled defaultValue={initialValues?.rating} allowHalf />
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={initialValues?.isAvailable ? 'green' : 'red'}>
              {initialValues?.isAvailable ? 'Available' : 'Out of Stock'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>
            {initialValues?.description || 'No description available'}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(initialValues?.createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            {new Date(initialValues?.updatedAt).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      );
    }

    return (
      <Form
        form={form}
        layout="vertical"
        preserve={false}
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input product title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input product price!' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            precision={2}
            prefix="$"
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please input product category!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: 'Please input product brand!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: 'Please input product stock!' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            precision={0}
          />
        </Form.Item>

        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: 'Please input product rating!' }]}
        >
          <Rate allowHalf />
        </Form.Item>

        <Form.Item
          name="isAvailable"
          label="Available"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={mode === 'view' ? 'View Product' : mode === 'edit' ? 'Edit Product' : 'Add Product'}
      open={visible}
      onCancel={onCancel}
      footer={mode === 'view' ? null : [
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {mode === 'edit' ? 'Update' : 'Add'}
        </Button>,
      ]}
      width={mode === 'view' ? 800 : 600}
    >
      {renderForm()}
    </Modal>
  );
};

export default ProductForm; 