/*
The factory pattern is used to hide the logic for creating an object (abstraction).
The creating of the object is the responsibility of the factory.
*/

interface LoggerInterface {
    log: (message: string) => void;
}

class LogToFile implements LoggerInterface {
    log(message: string): void {
        console.log(`log to file ${message}`);
    }
}

class LogToMemory implements  LoggerInterface {
    log(message: string): void {
        console.log(`log to memory ${message}`);
    }
}

class LogToDatabase implements LoggerInterface {
    host: string;
    constructor(host: string) {
        this.host = host;
    }
    log(message: string): void {
        console.log(`log to database ${message}`);
    }
}

class LogToRemote implements  LoggerInterface {
    log(message: string): void {
        console.log(`log to remote ${message}`);
    }
}

class LoggerFactory {
    createDatabaseLogger(host: string): LoggerInterface {
        return new LogToDatabase(host);
    }
    createFileLogger(): LoggerInterface {
        return new LogToFile();
    }
    createRemoteLogger(): LoggerInterface {
        return new LogToRemote();
    }
    createMemoryLogger(): LoggerInterface {
        return new LogToMemory();
    }
}

const databaseLog = new LoggerFactory().createDatabaseLogger('');
databaseLog.log('database log');
const fileLog = new LoggerFactory().createFileLogger();
fileLog.log('file log');
const remoteLog = new LoggerFactory().createRemoteLogger();
remoteLog.log('remote log');
const memoryLog = new LoggerFactory().createMemoryLogger();
memoryLog.log('memory log');
