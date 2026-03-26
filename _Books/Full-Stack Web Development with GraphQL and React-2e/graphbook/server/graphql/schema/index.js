import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const typesArray = loadFilesSync(path.join(__dirname, "./*.graphql"));
const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;
