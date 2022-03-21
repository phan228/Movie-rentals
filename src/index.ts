#!/usr/bin/env node

import { Customer } from "./Customer";
import { MovieCollection } from "./Movie";

import { Command } from "commander";
//import { statement } from "./html-statement";
import { statement } from "./flexible-statement";

const program: Command = require("commander");
const version: string = require("../package.json").version;
const json = require("edit-json-file");

const customer: Customer = require("./data/customer.json");
const movies: MovieCollection = require("./data/movies.json");

program
  .version(version)
  .description("A CLI for generating customer statements");

program
  .command("statement")
  .description("Prints out a plain-text statement for the customer")
  //.action(() => console.log(statement(customer, movies)));				// for html-statement
  .action(() => console.log(statement(customer, movies, json)));		// for flexible-statement

program.parse(process.argv);
