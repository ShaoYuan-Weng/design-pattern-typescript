/*
The composite patterns can be used when we want to perform the same operation on a tree of objects.
Or to perform the same operation on the object themselves.

Uses cases:
Object trees or graph

*/

interface IOperation {
    open(): void;
}

abstract class Component implements IOperation {
    private readonly _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    abstract open();
}

class Composite extends Component {
    private children: Component[] = [];

    add(component: Component) {
        this.children.push(component);
    }

    open() {
        console.log(this.name);
        this.children.forEach(child => child.open());
    }
}

class FileImpl extends Component {
    constructor(name: string) {
        super(name);
    }

    open() {
        console.log(this.name);
    }
}

class Directory extends Component {
    private files: FileImpl[] = [];

    constructor(name: string) {
        super(name);
    }

    add(file: FileImpl) {
        this.files.push(file);
    }

    open() {
        console.log(`${this.name}`);

        this.files.forEach(file => file.open());
    }
}

const root = new Composite('root');
root.add(new FileImpl('file1'));

const dir1 = new Directory('dir1');
const dir2 = new Directory('dir2');

dir1.add(new FileImpl('file2'));
dir1.add(new FileImpl('file3'));
root.add(dir1);

dir2.add(new FileImpl('file4'));
dir2.add(new FileImpl('file5'));
root.add(dir2);

root.add(new FileImpl('File6'));

root.open();
