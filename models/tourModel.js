const mongoose = require('mongoose');  // used for writing MongoDB validation, casting and business logic boilerplate is a drag.
const slugify = require('slugify'); //Slugifies strings, even when they contain Unicode 
// const validator = require('validator');
//methods object directly to save an instance method.
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,  //Unique String 
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],  //maximum string length accepted is 40
      minlength: [10, 'A tour name must have more or equal then 10 characters']   ////minimum string length accepted is 10
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {  //duration of thye tour 
      type: Number, // number data type 
      required: [true, 'A tour must have a duration']  // pops up this message if not provided
    },
    maxGroupSize: {  //size of the group 
      type: Number,
      required: [true, 'A tour must have a group size'] // pops up this message if not provided
    },
//     difficulty: {   //travel difficulty 
//       type: String,
//       required: [true, 'A tour must have a difficulty'],
//       enum: {
//         values: ['easy', 'medium', 'difficult'],
//         message: 'Difficulty is either: easy, medium, difficult'
//       }
    },
    ratingsAverage: {  //rating average 
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],   // should be greater than 1
      max: [5, 'Rating must be below 5.0']    // should be lesser than 5
    },
    ratingsQuantity: {
      type: Number,  //data type number 
      default: 0
    },
    price: {
      type: Number,  //data type number 
      required: [true, 'A tour must have a price']  // pops up this message if not provided
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {   //to specify a parse and format function
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    summary: { 
      type: String,  //datatype: string 
      trim: true,
      required: [true, 'A tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },  //jump to the JSON
    toObject: { virtuals: true }  //jump to the object
  }
);

tourSchema.virtual('durationWeeks').get(function() {  //returns a VirtualType object
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function(next) {  //executed one after another 
  this.slug = slugify(this.name, { lower: true }); //Generate a unique slug for mongoose.
  next();
});

// tourSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
tourSchema.pre(/^find/, function(next) {  //executed one after another
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) { //executed after the hooked method
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } }); //adds new items

  console.log(this.pipeline()); //display this pipeline 
  next();
});

const Tour = mongoose.model('Tour', tourSchema); //return to function 

module.exports = Tour;
