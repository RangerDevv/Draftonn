import { Client, Account, ID, Databases, Permission, Role, Teams, Storage, Models } from 'appwrite';

const client = new Client();

export const appwriteClient = client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('648bc5020fbda818412e');

export const appwriteDatabases = new Databases(appwriteClient);
export const appwriteStorage = new Storage(appwriteClient);
export const appwriteUser = new Account(appwriteClient);
export const appwriteTeams = new Teams(appwriteClient);
    