/*
The singleton pattern is used when we want to make sure that we have only one unique instance of the object.

If we want this to work, we can only have one Singleton class. We can ensure this by making the constructor private.

*/

export class Singleton {
    private constructor() {
    }
    static instance: DatabaseConnection;
    static getInstance(): DatabaseConnection {
        if (this.instance !== undefined) {
            return this.instance;
        }
        return new DatabaseConnection('');
    }
}

class DatabaseConnection {
    host: string;
    constructor(host: string) {
        this.host = host;
    }
}

const connection1 = Singleton.getInstance();
const connection2 = Singleton.getInstance();
