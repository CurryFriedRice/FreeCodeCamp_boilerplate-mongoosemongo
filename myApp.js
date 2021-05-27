require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mySecret = process.env['MONGO_URI'];

let Person;

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });


const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number, 
  favoriteFoods : [String]
});

Person = mongoose.model("Person", personSchema);



const createAndSavePerson = (done) => {
   //done(null /*, data*/);
  var NewPerson = new Person({
    name: "Edward",
    age: 43, 
    favoriteFoods : ["Red Hot Chilly Peppers"]
  });
  
  NewPerson.save(function(err, data) {
    if(err) return console.error(err);
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(err, people){
    if(err) return console.error(err);
    done(null, people);
  });
 
};

const findPeopleByName = (personName, done) => {
 
  Person.find({name : personName}, function(err, people){
    if(err) return console.error(err);
    done(null, people)
  });
  
  //done(null, Person.find(personName));
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, function(err, people){
      if(err) return console.error(err);
      if(people.favoriteFoods.includes(food))done(null, people);
  });
  //done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById({_id : personId}, function(err, people){
  if(err) return console.error(err);
  done(null, people);
  });
  
    //done(null, /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id : personId}, function(err, people){
    if(err) return console.error(err);
    people.favoriteFoods.push(foodToAdd);
    people.save(function(err, updatedPerson){
      if(err) console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, function(err, updatedPerson){
      if(err) return console.error(err);
      done(null, updatedPerson);
  });
  
  //done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, successful){
    if(err) return console.error(err);
    done(null, successful);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove( {name: nameToRemove}, function(err, successful){
    if(err) return console.error(err);
    done(null, successful);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : foodToSearch})
  .sort({name : 1 })
  .limit(2)
  .select({age : 0})
  .exec(function(err, people){ 
    if(err) return console.error(err);
    done( null, people)});
  //done(null /*, data*/);
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
