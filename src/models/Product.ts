class Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;

  constructor(
    productID: number,
    productTitle: string,
    productPrice: number,
    productDescription: string,
    productCategory: string,
    productImage: string,
    productQuantity: number,
  ) {
    this.id = productID;
    this.title = productTitle;
    this.price = productPrice;
    this.description = productDescription;
    this.category = productCategory;
    this.image = productImage;
    this.quantity = productQuantity;
  }
}

export default Product;
