import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

interface Author {
  id: string;
  name: string;
  age: number | null;
  books: Book[];
}

interface Book {
  id: string;
  title: string;
  publishedYear: string;
  author: Author;
}

const typeDefs = `#graphql
  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }

  type Book {
    id: ID!
    title: String
    publishedYear: String
    author: Author
  }

  type Query {
    authors: [Author]
    books: [Book]
  }

  type Mutation {
    addAuthor(name: String!, age: Int): Author
    addBook(title: String!, publishedYear: String): Book
  }
`;

const authors: Author[] = [
  {
    id: "1",
    name: "Kate Chopin",
    age: null,
    books: []
  },
  {
    id: "2",
    name: "Paul Auster",
    age: null,
    books: []
  },
];

const books: Book[] = [
  {
    id: "1",
    title: "The Awakening",
    publishedYear: "1899",
    author: authors[0]
  },
  {
    id: "2",
    title: "City of Glass",
    publishedYear: "1985",
    author: authors[1]
  },
  {
    id: "3",
    title: "At Fault",
    publishedYear: "1890",
    author: authors[0]
  },
  {
    id: "4",
    title: "Moon Palace",
    publishedYear: "1989",
    author: authors[1]
  }
];

// Update the authors' books arrays
authors[0].books = books.filter(book => book.author.id === authors[0].id);
authors[1].books = books.filter(book => book.author.id === authors[1].id);

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
  Mutation: {
    addAuthor: (_: unknown, { name, age }: { name: string; age?: number }) => {
      const author: Author = {
        id: String(authors.length + 1),
        name,
        age: age || null,
        books: [],
      };
      authors.push(author);
      return author;
    },
    addBook: (_: unknown, { title, publishedYear }: { title: string; publishedYear?: string }) => {
      const author = authors[0];
      const book: Book = {
        id: String(books.length + 1),
        title,
        publishedYear: publishedYear || new Date().getFullYear().toString(),
        author: {
          ...author,
          books: [...author.books]
        }
      };
      books.push(book);
      author.books.push(book);
      return book;
    },
  },
  Author: {
    books: (author: Author) => books.filter(book => book.author.id === author.id),
  },
  Book: {
    author: (book: Book) => authors.find(author => author.id === book.author.id)!,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
};

main().catch(console.error);
