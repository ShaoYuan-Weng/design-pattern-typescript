/*
The decorator pattern can be useful when you want to dynamically change the behavior of an object at run time.
It lets you attach new behaviours to any (existing) object.

Decorator link with react? -> Higher Order Component
Higher Order Components work the same way as decorators. We can add new functionalities to existing components at run time.
*/

interface Datasource {
    writeData(data: string): void;
    readData(): string;
}

class DatasourceDecorator implements Datasource{
    source: Datasource;

    constructor(source: Datasource) {
        this.source = source;
    }

    readData(): string {
        return this.source.readData();
    }

    writeData(data: string): void {
        this.source.writeData(data);
    }
}

class FileDataSource implements Datasource{
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    readData(): string {
        console.log(`Read the data to file: ${this.name}`);
        return `Read the data to file: ${this.name}`
    }

    writeData(data: string): void {
        console.log(`Write the data to file: ${this.name}`)
    }
}

class Encryption extends DatasourceDecorator{
    constructor(source: Datasource) {
        super(source);
    }

    readData() : string{
        return this.decode(super.readData());
    }

    writeData(data: string) {
        super.writeData(this.encode(data));
    }

    encode(data: string) : string{
        console.log('Encoding');
        return `Encoding... ${data}`;
    }

    decode(data: string){
        console.log('Decoding');
        return `Decoding...`
    }
}
class Compression extends DatasourceDecorator{
    constructor(source: Datasource) {
        super(source);
    }

    readData(): string {
        return this.decompress(super.readData());
    }

    writeData(data: string) {
        return this.compress(super.readData());
    }

    compress(data: string): string {
        console.log('Compressing');
        return `Compressing...`
    }

    decompress(data: string): string {
        console.log('Decompressing');
        return `Decompressing...`
    }
}

const records = 'Name,Salary\\nJohn Smith,100000\\nSteven Jobs,912000'
const compression = new Compression(new Encryption(new FileDataSource('fileName')));

compression.writeData(records);
compression.readData();
