import { find, propEq } from 'ramda';
import { Products } from './Products';

interface ProductType {
  id: string;
  name: string;
  description: string;
  // eslint-disable-next-line camelcase
  image_url: string;
  price: number;
  quantity: number;
}

const findProductByID = (id: string): ProductType | any => {
  const forCompare = propEq('id', id);

  return find(forCompare)(Products);
};

export default findProductByID;
