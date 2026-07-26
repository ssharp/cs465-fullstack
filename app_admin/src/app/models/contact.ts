export interface Contact {
    id: string, // Internal primary key in MongoDB
    name: string,
    email: string,
    tag: string,
    message: string,
}