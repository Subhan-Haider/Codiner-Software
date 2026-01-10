import { CollectionConfig } from 'payload/types';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      admin: {
        description: 'Original price for showing discounts',
      },
    },
    {
      name: 'sku',
      type: 'text',
      unique: true,
      admin: {
        description: 'Stock Keeping Unit',
      },
    },
    {
      name: 'inventory',
      type: 'group',
      fields: [
        {
          name: 'quantity',
          type: 'number',
          defaultValue: 0,
          min: 0,
        },
        {
          name: 'trackInventory',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
      minRows: 1,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Additional categories or tags',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this product on the homepage',
      },
    },
    {
      name: 'variants',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'sku',
          type: 'text',
        },
        {
          name: 'inventory',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
  timestamps: true,
};
