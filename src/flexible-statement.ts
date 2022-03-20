import { Dictionary, MovieCode, Movies, PriceAndPoint } from "./Movie";
import * as data from "./data/movieData.json";
import { writeFileSync } from 'fs'

export const statement = (customer: any, movies: any, json: any): string => {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = `Rental Record for ${customer.name}\n`;
    //let jsonObject = {};

    // read from json files
    let movieData = json(`${__dirname}/data/movieData.json`);
    let priceData = json(`${__dirname}/data/prices.json`);
    let pointData = json(`${__dirname}/data/points.json`);
    let deletedData = json(`${__dirname}/data/deleted.json`);
    let initialPriceData = json(`${__dirname}/data/initialPrice.json`);
    let daysAfter = json(`${__dirname}/data/days.json`);

    //json to Maps
    let priceMap = new Map<string, number>(Object.entries(priceData.data));
    let pointMap = new Map<string, number>(Object.entries(pointData.data));
    let deletedMap = new Map<string, boolean>(Object.entries(deletedData.data));
    let initialPriceMap = new Map<string, number>(Object.entries(initialPriceData.data));
    let daysAfterMap = new Map<string, number>(Object.entries(daysAfter.data));

    const myArgs = process.argv.slice(3);

    if (myArgs.length > 0) {
        let cmd = myArgs[0];
        switch (cmd) {
            case 'delete':      // delete a movie classification
                let ToDelete = myArgs.slice(1,);
                if (ToDelete.length < 1) {
                    return `Please use format -- delete <classification 1> < classification 2> ...`;
                }

                for (let item of ToDelete) {
                    if (deletedMap.has(item)) {
                        deletedMap.set(item, true);
                    }
                }
                break;
            case 'add':         // add a movie classification
                let toAdd = myArgs.slice(1,);
                if (toAdd.length != 3) {
                    return `Please use format -- add <movie classification> <price> <point>`;
                }

                let Classification = toAdd[0];
                let pr = parseInt(toAdd[1]);
                let pnt = parseInt(toAdd[2]);

                if (!deletedMap.has(Classification)) {                    
                    priceMap.set(Classification, pr);
                    pointMap.set(Classification, pnt);
                }
                deletedMap.set(Classification, false);                
                break;
            case 'change':          // change a movie pricing or point    
                let toChange = myArgs.slice(1, );
                if (toChange.length != 3) {
                    return `Please use format -- change <movie classification> <price/point/baseprice> <value>`;
                }

                let classification = toChange[0];
                let key = toChange[1];
                let value = parseInt(toChange[2]);

                if (priceMap.has(classification)) {
                    if (key === 'price') {
                        priceMap.set(classification, value);
                    }
                    else if (key === 'point') {
                        pointMap.set(classification, value);
                    }
                    else if (key === 'baseprice') {
                        initialPriceMap.set(classification, value);
                    }
                    else {
                        return `Invalid! Available changes: price, point, baseprice`;
                    }
                }
                else {
                    return `Movie classification '${classification}' does not exist!`;
                }
                break;
        }
    }

    //console.log(movieData.data);

    for (let r of customer.rentals) {
        let movie = movies[r.movieID];
        let thisAmount = 0;

        thisAmount = initialPriceMap.get(movie.code)!;
        if (r.days > daysAfterMap.get(movie.code)!) {
            thisAmount += (r.days - daysAfterMap.get(movie.code)!) * priceMap.get(movie.code)!;
        }

        frequentRenterPoints += pointMap.get(movie.code)!;
        if (movie.code === 'new' && r.days > 2) frequentRenterPoints+= pointMap.get(movie.code)!

        result += `\t${movie.title}\t${thisAmount}\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${frequentRenterPoints} frequent renter points\n`;

    // Maps to json
    let priceJson = Object.fromEntries(priceMap);
    let pointJson = Object.fromEntries(pointMap);
    let deletedJson = Object.fromEntries(deletedMap);
    let initialPriceJson = Object.fromEntries(initialPriceMap);
    let daysJson = Object.fromEntries(daysAfterMap);
    console.log(priceJson);
    
    // write to json files
    const fs = require('fs');
    fs.writeFile("./data/prices.json", JSON.stringify(priceJson), function(err:string){});
    fs.writeFile("./data/points.json", JSON.stringify(pointJson), function(err:string){});
    fs.writeFile("./data/deleted.json", JSON.stringify(deletedJson), function(err:string){});
    fs.writeFile("./data/initialPrice.json", JSON.stringify(initialPriceJson), function(err:string){});
    fs.writeFile("./data/days.json", JSON.stringify(daysJson), function(err:string){});

    //save json files
    priceData.save();
    pointData.save();
    deletedData.save();
    initialPriceData.save();
    daysAfter.save();

    return result;
};

    //movieData.save();
    
    /*function mapToJson(m: Map<string, PriceAndPoint>) {
        let jsonObject = {};
        for (let [k, v] of m) {
            if (v instanceof Map) {
                jsonObject[k] = mapToJson(v);
            }
            else {
                jsonObject[k] = v;
            }
        }
        return jsonObject;
    }*/


    /*if (Movies.has(item)) {
        Movies.set(item, {price: Movies.get(item)?.price!, point: Movies.get(item)?.point!, deleted: true});
    }
    if (data.hasOwnProperty(item)) {
        delete movieData[item];
        //movieData.set(movieData[item].deleted!, true);
        //movieData.item.deleted! = true;
        //console.log(movieData.data);
        movieData.save();
    }*/


    /*if (!Movies.has(item)) {
        Movies.set(item, {price: 0, point: 0, deleted: false});
    }
    else if (Movies.has(item) && Movies.get(item)?.deleted === true) {
        Movies.set(item, {price: Movies.get(item)?.price!, point: Movies.get(item)?.point!, deleted: false});
    }

    if (!data.hasOwnProperty(item)) {
        let updatedObj = {
            item: {
                "price": 0,
                "point": 0,
                "deleted": false
            }
        }
        const fs = require('fs');
        fs.writeFile("./data/movieData.json", JSON.stringify(updatedObj), function(err:string){});
    }*/
