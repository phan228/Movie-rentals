# Code Challenge: Movie rentals & Customer data

Consider a program to record customer movie rental information. Improvements made on this program includes:

- Adding a HTML version of the printed statement so that this can be displayed in a browser.
- Adding flexibility for the program so that users can make changes to movies' classifications and pricing/point systems.

Note: Install edit-json-file using `npm install --save edit-json-file` before running.

## HTML statement:

#### How to run: `npm run html-statement`

Note: un-comment `import { statement } from "./html-statement";` and `.action(() => console.log(statement(customer, movies)));` in `index.ts` for the right script to run.


## Flexible statement:

#### How to run: `npm run flexible-statement -- <arguments>`

\<arguments\> can be one of the cases below:
  
  - To delete movie classification(s): -- *delete <movie classification 1> <movie classification 2> ...* (Example: *npm run flexible-statement -- delete childrens*    will set childrens' deleted variable to true and prevent renters from renting from this category in the future - TODO)
  - To add a movie classification: -- *add \<movie classification\> \<price\> \<baseprice\> \<point\>* (Example: *npm run flexible-statement -- add PG13 2 1 1*    will add PG13 with price $2, baseprice $1, and 1 renter point to the database)
  - To make changes to a movie classification price/baseprice/point/day to start charging: -- *change <movie classification> <price/baseprice/point/day> \<value\>*
  
## Tradeoffs and future improvements:
  
- No longer use enum MovieCode due to the inflexibility of adding/deleting enums dynamically during runtime.
- Currently, the program has separate json files for price/point/baseprice/etc in a key-value pair format with the movie classifications as keys. This is for ease of access at the moment due to my limited knowledge of reading from/writing to nested json files. I'd like to have one nested json file with all information related to movie classifications in the future.
- When a movie classification is deleted, instead of deleting whole record, its deleted flag is set to true to prevent incorrectly calculating the total amount owed. For future development, I'd like to add a feature where users will not be able to rent movies from any deleted classifications.
  

*Estimated time spent on this project: 6 hours*
