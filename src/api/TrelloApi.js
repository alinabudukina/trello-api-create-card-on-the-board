import axios from "axios";

const key = "";
const token = "";
const trelloUrlApi =
  "https://api.trello.com/1/cards?key=" + key + "&token=" + token;
let TrelloApi = axios.create({
  baseURL: trelloUrlApi,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default TrelloApi;
