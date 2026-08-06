import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "node:path";
const __dirname = import.meta.dirname; // Get the actual dirname
const graphQlDir = "./**/*.graphql"; // A string to specify where to search for .graphql files
const typesArray = loadFilesSync(path.join(__dirname, graphQlDir)); // Get all .graphql files
console.log(typesArray);
export const typeDefs = mergeTypeDefs([
    ...typesArray,
    'scalar DateTime'
]); // Merge all .graphql files
//# sourceMappingURL=typeDefs.js.map