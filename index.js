const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Show" type defines the queryable fields for every show in our data source.
  type Show {
    title: String
    network: String
    genre: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "shows" query returns an array of zero or more Show (defined above).
  type Query {
    shows: [Show]
    show(title: String): Show
  }
`;

const shows = [
    {
      title: `Game of Thrones`,
      network: `HBO`,
      genre: `Fantasy`
    },
    {
      title: `The Bachelor`,
      network: `ABC`,
      genre: `Reality`
    },
    {
      title: `The Expanse`,
      network: `Amazon Prime Video`,
      genre: `Sci-Fi`
    },
    {
      title: `Parks and Rec`,
      network: `NBC`,
      genre: `Comedy`
    },
    {
      title: `The Witcher`,
      network: `Netflix`,
      genre: `Fantasy`
    },
    {
      title: `Handmaid's Tale`,
      network: `Hulu`,
      genre: `Drama`
    }
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves shows from the "shows" array above.
const resolvers = {
  Query: {
    shows: () => shows,
    show: (_, {title}) => {
      return shows.find(show => show.title == title)
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
