//MATH OBJECT FUNCTIONS

Math.randomDec = function (low, high) {
    //RETURN A RANDOM DECIMAL BETWEEN LOW (Inclusive) and HIGH (exclusive)
    return Math.random () * (high-low) + low;
}

Math.randomInt = function(low, high) {
    //REtURN A RANDOM INTEGER BETWEEN LOW (inclusive) and high (exclusive)
    return Math.floor(Math.randomDec(low, high));
}

Math.roundTo = function(num, numPlaces) {
    //ROUND NUM OFF TO THE NEAREST NUMPLACES
    num = num*10 ** numPlaces;
    num = Math.round(num);
    return num / 10 ** numPlacecs;
}