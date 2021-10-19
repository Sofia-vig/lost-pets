import algoliasearch from "algoliasearch";

const client = algoliasearch("0UE5CAIWZS", "0e457674481462a143776a96da183cd5");
const index = client.initIndex("products");

export { index };
