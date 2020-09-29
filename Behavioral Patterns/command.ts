/*
Command pattern turns requests into objects so that we can do specific operations to the requests (store, queue, undo ...)
*/

interface Operation {
    execute: () => void;
}

class TextFile { // Receiver
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    open() {
        console.log(`Text ${this.name} is opened`)
    }

    save() {
        console.log(`Text ${this.name} is saved`);
    }
}

class OpenTextFile implements Operation { // Command
    TextFileFile: TextFile;

    constructor(textFile: TextFile) {
        this.TextFileFile = textFile;
    }

    execute() {
        this.TextFileFile.open();
    }
}

class SaveTextFile implements Operation {
    TextFile: TextFile;

    constructor(textFile: TextFile) {
        this.TextFile = textFile;
    }

    execute() {
        this.TextFile.save();
    }
}

class TextFileOperationExecutor { // Invoker
    operationHistory: Operation[] = [];

    executeOperation(operation: Operation) {
        this.operationHistory.push(operation);
        operation.execute();
    }

    showHistory() {
        console.log(this.operationHistory);
    }
}

// Client
const executor = new TextFileOperationExecutor();
const file1 = new TextFile('file1');
executor.executeOperation(new OpenTextFile(file1));
executor.executeOperation(new SaveTextFile(file1));
executor.showHistory();
