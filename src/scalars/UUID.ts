import { GraphQLScalarType, Kind, ValueNode } from "graphql";

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validate(uuid: unknown): string | never {
    if (typeof uuid !== "string" || !regex.test(uuid)) {
        throw new Error("invalid uuid");
    }
    return uuid;
}

export const CustomUuidScalar = new GraphQLScalarType({
    name: "UUID",
    description: "A simple UUID parser",
    serialize: (value: string) => validate(value),
    parseValue: (value: string) => validate(value),
    parseLiteral: (ast: ValueNode) => {
        if (ast.kind === Kind.INT) {
            return validate(ast.value);
        }
        return null;
    },
});
