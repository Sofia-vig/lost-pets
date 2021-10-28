import algoliasearch from "algoliasearch";

const client = algoliasearch("0UE5CAIWZS", "0e457674481462a143776a96da183cd5");
const indexUsers = client.initIndex("users");
const indexPets = client.initIndex("pets");

export { indexUsers, indexPets };
