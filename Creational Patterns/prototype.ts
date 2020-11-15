/*
The prototype pattern helps us leverage the creation of the expensive or complex class by making copies of existing instances of the class. This behavior can also be achieved by using the JavaScript build-in function clone()
*/

interface Customer {
  name: string;
  status: string;
  checkStatus: () => void;
}

class CustomerImpl implements Customer {
  name: string;
  status: string;

  constructor(name: string, status: string) {
    this.name = name;
    this.status = status;
  }

  checkStatus() {
    console.log(`Customer status: name: ${this.name}, status: ${this.status}`);
  }
}

class CustomerPrototype {
  proto: Customer;

  constructor(proto: Customer) {
    this.proto = proto;
  }

  clone() {
    return new CustomerImpl(this.proto.name, this.proto.status);
  }
}

const proto = new CustomerImpl('customer', 'ok');
const customerPrototype = new CustomerPrototype(proto);

const customer1 = customerPrototype.clone();
customer1.checkStatus();


// using JavaScript build-in function to create prototypes
const proto_javascript = new CustomerImpl('customer', 'pending');
const customer2 = Object.create(proto_javascript) as Customer;
customer2.checkStatus();
console.log(Object.getPrototypeOf(customer2));

