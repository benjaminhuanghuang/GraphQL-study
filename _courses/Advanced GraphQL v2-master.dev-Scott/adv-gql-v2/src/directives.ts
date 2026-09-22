import { defaultFieldResolver, GraphQLSchema, GraphQLString } from "graphql";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";

import { formatDate } from "./utils";

export function dateDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName = "date",
): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (!directive) return fieldConfig;

      const { format: defaultFormat } = directive as { format?: string };
      const { resolve = defaultFieldResolver } = fieldConfig;

      return {
        ...fieldConfig,
        args: {
          ...fieldConfig.args,
          format: { type: GraphQLString },
        },
        async resolve(source, { format, ...rest }, context, info) {
          const result = (await resolve(source, rest, context, info)) as
            | string
            | number
            | Date
            | null
            | undefined;
          return result == null ? result : formatDate(result, format ?? defaultFormat);
        },
      };
    },
  });
}
