/*
The bridge pattern can be used when you want to split up the abstractions and the actual implementation.
So that we can select the actual implementation at run-time.

Difference between bridge and adapter ?
--> The adapter pattern is mostly used to make some incompatible classes (or third party) working together.
--> The bridge pattern is usually designed up-front.
*/


interface Logger {
    log: (message: string) => void;
}

class InfoLogger implements Logger {
    log(message: string): void {
        console.log(`info: ${message}`);
    }
}

class WarningLogger implements Logger {
    log(message: string): void {
        console.log(`warning: ${message}`);
    }
}

class SimpleAccount {
    balance: number;
    constructor(balance: number) {
        this.balance = balance;
    }
    setLogger(logger: Logger) {
        this._logger = logger;
    }
    withdraw(amount: number) {
        this.balance -= amount;
    }
    get logger() {
        return this._logger
    }
    private _logger: Logger = new InfoLogger();
}

const account = new SimpleAccount(100);
account.logger.log('message');
account.withdraw(75);
if (account.balance < 50) {
    account.setLogger(new WarningLogger());
}
account.logger.log('message');
