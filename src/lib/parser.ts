import { Client } from 'ecstar';

import P from 'parsimmon';

const stringInSingleQuote = P.string("'")
  .then(P.regex(/[^']+/))
  .skip(P.string("'"));
const stringInDoubleQuote = P.string('"')
  .then(P.regex(/[^"]+/))
  .skip(P.string('"'));
const stringInBackQuote = P.string('`')
  .then(P.regex(/[^`]+/))
  .skip(P.string('`'));

const stringInQuotes = P.alt(
  stringInSingleQuote,
  stringInDoubleQuote,
  stringInBackQuote
);

const stringble = P.regexp(/[^\s]+/);

const Pstring = P.lazy(() => P.alt(stringInQuotes, stringble));

const number = P.regexp(/[0-9]+/).map((result) => Number(result));

const boolean = P.alt(
  P.string('true').result(true),
  P.string('false').result(false)
);

const lessThan = P.string('<');
const greaterThan = P.string('>');
const atSign = P.string('@');
const snowflake = P.regex(/[0-9]{17,19}/);
const mention = lessThan.then(atSign.then(snowflake)).skip(greaterThan);

type PType<T, N extends string> = T extends P.Parser<infer U>
  ? P.Node<N, U>
  : never;

type ParseResult =
  (
    | PType<typeof mention, 'mention'>
    | PType<typeof boolean, 'boolen'>
    | PType<typeof Pstring, 'string'>
    | PType<typeof number, 'number'>
  )[]

const buildParser = (...parsers: [P.Parser<unknown>, string][]) => {
  return P.alt(...parsers.map(([parser, name]) => parser.node(name))).sepBy(
    P.whitespace
  ) as P.Parser<ParseResult>;
};

export const parse = buildParser(
  [mention, 'mention'],
  [boolean, 'boolean'],
  [Pstring, 'string'],
  [number, 'number']
)


export type parsed = { commandName: string; args: ParseResult };

export const parser = (client: Client, content: string): parsed => {
  const mentionPrefix = `<@!${client.user?.id}>`;

  const result = parse.parse(content)

  if (result.status) {
    const [prefixAndCommandName, ...args] = result.value

    let commandName: string

    if (content.startsWith(mentionPrefix)) {
      // Allow @mention Command and @mentionCommand
      commandName = [prefixAndCommandName.value, args[0]]
        .join('')
        .slice(mentionPrefix.length);
    } else {
      commandName = prefixAndCommandName.name === "string" ? prefixAndCommandName.value.slice(client.options.prefix.length) : ""
    }

    return { commandName, args };
  }

  return { commandName: "parse error", args: [] }
};
