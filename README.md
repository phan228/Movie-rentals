# Code Challenge: Movie rentals & Customer data

Consider a program to record customer movie rental information. Improvements made on this program includes:

- Adding a HTML version of the printed statement so that this can be displayed in a browser.
- Adding flexibility for the program so that users can make changes to movies' classifications and pricing/point systems.

Note: Install edit-json-file using `npm install --save edit-json-file` before running.

## HTML statement:

#### How to run: `npm run html-statement`

Note that `import { statement } from "./html-statement";` should be included in `index.ts` for the right script to run.


## Flexible statement:

#### How to run: `npm run flexible-statement -- <arguments>`

\<arguments\> can be one of the cases below:
  
  - To delete movie classification(s): -- *delete <movie classification 1> <movie classification 2> ...* (Example: *npm run flexible-statement -- delete childrens*    will set childrens' deleted variable to true and prevent renters from renting from this category in the future - TODO)
  - To add a movie classification: -- *add \<movie classification\> \<price\> \<baseprice\> \<point\>* (Example: *npm run flexible-statement -- add PG13 2 1 1*    will add PG13 with price $2, baseprice $1, and 1 renter point to the database)
  - To make changes to a movie classification price/baseprice/point: -- *change <movie classification> <price/baseprice/point> \<value\>*
