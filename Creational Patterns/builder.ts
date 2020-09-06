/*
Builder pattern can be useful when the object has many configuration parameters that can be optional.

Use cases:
It can be very useful when you write a test and want to easily adjust the object configuration parameters.
* */
class Supplier {
  constructor(name: string) {
    this.name = name;
  }

  public name: string;
}

class ProductDetail {
  constructor(description: string) {
    this.description = description;
  }

  public description: string;
}

class Product {
  public name: string;
  public price: number;
  public details: ProductDetail;
  public supplier: Supplier;

  constructor(name: string) {
    this.name = name;
  }
}

class ProductBuilder {
  name: string;
  price: number;
  detail: ProductDetail;
  supplier: Supplier;

  constructor(name: string) {
    this.name = name;
  }

  public addPrice(price: number): ProductBuilder {
    this.price = price;
    return this;
  }

  public addDetails(description: string): ProductBuilder {
    this.detail = new ProductDetail(description);
    return this;
  }

  public addSupplier(name: string): ProductBuilder {
    this.supplier = new Supplier(name);
    return this;
  }

  public build(): Product {
    const product = new Product(this.name);
    product.details = this.detail;
    product.supplier = this.supplier;
    product.price = this.price;
    return product;
  }
}

const builder = new ProductBuilder('product1');

const product = builder
  .addDetails('Details for product 1')
  .addPrice(99.99)
    .addSupplier('Supplier1')
  .build();

const product2 = builder
  .addDetails('Details for product 2')
  .addPrice(199.99)
  .addSupplier('Supplier2')
  .build();

console.log(product.name);
console.log(product.details?.description);
console.log(product.price);
console.log(product.supplier?.name);

console.log(product2.name);
console.log(product2.details?.description);
console.log(product2.price);
console.log(product2.supplier?.name);
console.log(product === product2);
