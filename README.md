# GraphQL Server Example

A simple GraphQL server implementation with author and book data management.

## Features

- Author management (create, read)
- Book management (create, read)
- GraphQL API with queries and mutations

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/graphql-server-example.git
cd graphql-server-example
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open GraphQL playground at [http://localhost:4000](http://localhost:4000)

## Usage Examples

### Add an Author

```graphql
mutation Add($name: String!) {
  addAuthor(name: $name) {
    name
    books {
      title
    }
  }
}
```

Variables:
```json
{
  "name": "harshit rajput"
}
```

### Add an Author with a Book

```graphql
mutation Add($name: String!, $bookTitle: String!) {
  addAuthor(name: $name, bookTitle: $bookTitle) {
    name
    books {
      title
    }
  }
}
```

Variables:
```json
{
  "name": "harshit rajput",
  "bookTitle": "Nextjs 15"
}
```

## Project Structure

```
graphql-server-example/
├── src/
│   ├── schema/
│   ├── resolvers/
│   └── models/
├── node_modules/
├── .gitignore
├── package.json
└── README.md
```

## License

MIT 