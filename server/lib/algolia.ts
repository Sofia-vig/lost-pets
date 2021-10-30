import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_CLIENT,
  process.env.ALGOLIA_KEY
);

const indexUsers = client.initIndex("users");
const indexPets = client.initIndex("pets");

export { indexUsers, indexPets };
