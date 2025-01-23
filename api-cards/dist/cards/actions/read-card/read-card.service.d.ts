export declare class ReadCardService {
    findAll(connection: any): Promise<any[]>;
    findOne(id: number, connection: any): Promise<{
        title: any;
        createdAt: any;
        descriptions: any;
    } | null>;
}
