import { MovieCode } from "./Movie";

export const statement = (customer: any, movies: any): string => {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n<ul>\n`;

    for (let r of customer.rentals) {
        let movie = movies[r.movieID];
        let thisAmount = 0;

        switch (movie.code) {
        case MovieCode.REGULAR:
            thisAmount = 2;
            if (r.days > 2) {
            thisAmount += (r.days - 2) * 1.5;
            }
            break;
        case MovieCode.NEW:
            thisAmount = r.days * 3;
            break;
        case MovieCode.CHILDRENS:
            thisAmount = 1.5;
            if (r.days > 3) {
            thisAmount += (r.days - 3) * 1.5;
            }
            break;
        }

        frequentRenterPoints++;
        if (movie.code === MovieCode.NEW && r.days > 2) frequentRenterPoints++;

        result += `\t<li>${movie.title}\t${thisAmount}</li>\n`;
        totalAmount += thisAmount;
    }
    result += `</ul>\n<p>Amount owed is <em>${totalAmount}</em></p>\n`;
    result += `<p>You earned <em>${frequentRenterPoints}</em> frequent renter points</p>\n`;

    return result;
};