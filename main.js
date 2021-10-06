const data = {
  products: [
    {
      url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
      price: 700000,
      name: 'Sample Name 1',
    },
    {
      url: 'https://agbd.s3.amazonaws.com/media/images/c.jpg',
      price: 100000,
      name: 'Sample Name 2',
    },
    {
      url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
      price: 700000,
      name: 'Sample Name 3',
    },
    {
      url: 'https://agbd.s3.amazonaws.com/media/images/c.jpg',
      price: 100000,
      name: 'Sample Name 4',
    },
    {
      url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
      price: 700000,
      name: 'Sample Name 5',
    },
    {
      url: 'https://agbd.s3.amazonaws.com/media/images/c.jpg',
      price: 100000,
      name: 'Sample Name 6',
    },
  ],
  discount: 10,
  tax: 15,
};

import('./module.js').then((module) => module.addDatabase(data));
import('./module.js').then((module) => module.addProducts());
import('./module.js').then((module) => module.cardEvents());
import('./module.js').then((module) => module.searchEvent());
