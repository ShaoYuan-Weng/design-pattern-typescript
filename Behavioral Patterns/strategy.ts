/*
Strategy pattern makes it possible to select an algorithm on runtime.
It emphasizes on "how" things should be done (ex. with strategy A or strategy B)
*/

interface FlyBehavior {
    fly: () => void;
}

class FlyWithWings implements FlyBehavior {
    fly(): void {
        console.log('flying with wings');
    }
}

class FlyNoWay implements  FlyBehavior {
    fly(): void {
        console.log('cannot fly...')
    }
}

interface QuackBehavior {
    quack: () => void;
}

class Quack implements QuackBehavior {
    quack(): void {
        console.log('quack');
    }
}

class MuteQuack implements QuackBehavior {
    quack(): void {
        console.log('cannot quack...')
    }
}

interface FlyingAnimal {
    performFly: () => void;
    performQuack: () => void;
    setFlyBehavior: (flyBehavior: FlyBehavior) => void;
    setQuackBehavior: (quackBehavior: QuackBehavior) => void;
}

abstract class Duck implements FlyingAnimal {
    private flyBehavior: FlyBehavior;
    private quackBehavior : QuackBehavior;

    performFly(): void {
        this.flyBehavior.fly();
    }

    performQuack(): void {
        this.quackBehavior.quack();
    }

    setFlyBehavior(flyBehavior: FlyBehavior): void {
        this.flyBehavior = flyBehavior;
    }

    setQuackBehavior(quackBehavior: QuackBehavior): void {
        this.quackBehavior = quackBehavior;
    }
}

class MallardDuck extends Duck {
    constructor() {
        super();
        this.setQuackBehavior(new Quack());
        this.setFlyBehavior(new FlyWithWings());
    }
}

class PlasticDuck extends Duck {
    constructor() {
        super();
        this.setQuackBehavior(new MuteQuack());
        this.setFlyBehavior(new FlyNoWay());
    }
}

const mallardDuck = new MallardDuck();
mallardDuck.performQuack();
mallardDuck.performFly();

mallardDuck.setFlyBehavior(new FlyNoWay());
mallardDuck.setQuackBehavior(new MuteQuack());

mallardDuck.performQuack();
mallardDuck.performFly();




