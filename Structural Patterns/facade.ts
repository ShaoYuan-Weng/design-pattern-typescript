/*
The facade pattern is used when we want to have a simplified interface for different classes so that the client
can easily access it.

Difference between facade and adapter:
Adapter pattern aims to create an interface so that we can work with external services and gives us the possibility to swap services
Facade pattern focuses on presenting a simplified interface to the client
*/

interface RequestedFile {
    name: string
}

interface DatabaseRequest {
    getFileFromDB: (id:number) => RequestedFile;
}

class DatabaseRequestImpl implements DatabaseRequest {
    getFileFromDB(id: number) {
        return {
            name: 'file'
        };
    }
}

interface CSVGenerator {
    createCSV: () => void;
}

class CSVGeneratorImpl implements CSVGenerator {
    createCSV() {
        console.log('creating CSV')
    }
}

interface PDFGenerator {
    addWaterMark: () => void;
    createPDF: () => void;
}

class PDFGeneratorImpl implements PDFGenerator {
    addWaterMark() {
        console.log('adding water mark')
    };

    createPDF() {
        console.log('creating PDF')
    }
}

interface FileRequestFacade {
    getFile: (id: number, dataType: string) => void
}

class FileRequestFacadeImpl implements FileRequestFacade {
    getFile(id: number, dataType: string) {
        const requestedFile = new DatabaseRequestImpl().getFileFromDB(id);
        switch (dataType) {
            case 'csv': {
                const csvGenerator = new CSVGeneratorImpl();
                const finalizedCSV = csvGenerator.createCSV();
                break;
            }
            case 'pdf': {
                const pdfGenerator = new PDFGeneratorImpl();
                const operatedPDF = pdfGenerator.addWaterMark();
                const finalizedPDF = pdfGenerator.createPDF();
                break;
            }
            default: throw new Error('not implemented');
        }
    }
}

const csvFile = new FileRequestFacadeImpl().getFile(3, 'csv');

const pdfFile = new FileRequestFacadeImpl().getFile(3, 'pdf');

const randomFile = new FileRequestFacadeImpl().getFile(3, 'random');
