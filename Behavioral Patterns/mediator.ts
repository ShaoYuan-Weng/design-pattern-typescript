/*
The mediator pattern encapsulates the communication between classes, thus reduces the coupling of the classes and makes the code easier to change.
*/

class Button {
  private mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }

  press() {
    this.mediator.press();
  }
}

class PowerSupplier {
  mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }

  turnOn() {
    console.log('Turn on the fan');
  }

  turnOff() {
    console.log('Turn off the fan');
  }
}

class Fan {
  mediator: Mediator;
  isOn: boolean = false;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }

  turnOn() {
    this.mediator.start();
    this.isOn = true;
  }

  turnOff() {
    this.mediator.stop();
    this.isOn = false;
  }
}

class Mediator {
  fan: Fan;
  button: Button;
  powerSupplier: PowerSupplier;

  constructor() {
    this.fan = new Fan(this);
    this.button = new Button(this);
    this.powerSupplier = new PowerSupplier(this);
  }

  press() {
    if (this.fan.isOn) {
      this.fan.turnOff();
    } else {
      this.fan.turnOn();
    }
  }

  start() {
    this.powerSupplier.turnOn();
  }

  stop() {
    this.powerSupplier.turnOff();
  }
}

const mediator = new Mediator();
mediator.button.press();
mediator.button.press();