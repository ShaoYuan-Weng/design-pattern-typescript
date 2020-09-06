/*
The adapter pattern is used when objects with different interfaces need to work together.

Use cases:
When integrating external systems, we don't want to be governed by the external interfaces
so we map our objects to external interfaces with adapters
*/

class Order {}

interface PaymentAdapter {
    pay(order: Order): boolean;
}

class StripeOrder {}

class StripeResult  {
    success: boolean;
}

class Stripe {
    doPayment(order: StripeOrder): StripeResult  {
        return  {success: true};
    }
}

class StripeAdapter implements PaymentAdapter {
    stripe = new Stripe();
    pay(order: Order): boolean {
        return this.stripe.doPayment(order as StripeOrder).success;
    }
}

class Webshop {
    adapter: PaymentAdapter = new StripeAdapter();
    doPayment(order: Order): void {
        this.adapter.pay(order)
    }
}
