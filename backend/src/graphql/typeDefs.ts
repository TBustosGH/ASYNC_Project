import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "node:path";


const __dirname: string = import.meta.dirname;  // Get the actual dirname
const graphQlDir: string = "./**/*.graphql";    // A string to specify where to search for .graphql files

const typesArray = loadFilesSync(path.join(__dirname, graphQlDir)); // Get all .graphql files

export const typeDefs = mergeTypeDefs([
    ...typesArray,
    'scalar DateTime'
]);  // Merge all .graphql files