$(document).ready(function(event){

  function Customer(name, preferences) {
    this.name = name;
    this.preferences = [];
  }

  function Ingredient(name, type) {
    this.name = name;
    this.type = type;
  }

  function Drink(name, ingredients) {
    this.name = name;
    this.ingredients = ingredients;
  }

  function Pantry() {
    this.ingredients = {};
  }

  Pantry.prototype.addIngredient = function(ingredient) {
    if (this.ingredients[ingredient.type]) {
      this.ingredients[ingredient.type].push(ingredient.name);
    } else {
      this.ingredients[ingredient.type] = [ingredient.name];
    };
  };

  Pantry.prototype.getIngredient = function(ingredients) {
    if (this.ingredients[type]) {
      var random = Math.floor(Math.random * ingredients[type].length)
      return ingredients[type][random];
    };
  };

  function Question(question, property) {
    this.question = question;
    this.property = property;
  };

  function Bartender() {
    this.questions = [];
  };

  // Bartender.prototype.greet = function(){"Welcome to the Tavern, " + this.name}; //NOT WORKING

  Bartender.prototype.addQuestion = function(question) {
    this.questions.push(question);
  };

  //create a pantry
  var pantry = new Pantry();

  //add the following ingredients to the pantry
  //strong ingredients
  var newIngredient = new Ingredient("glum of rum", "strong");
  pantry.addIngredient(newIngredient);
  var newIngredient = new Ingredient("slug of whisky", "strong");
  pantry.addIngredient(newIngredient);
  var newIngredient = new Ingredient("splash of gin", "strong");
  pantry.addIngredient(newIngredient);

  //salty ingredients
  var newIngredient = new Ingredient("olive on a stick", "salty");
  pantry.addIngredient(newIngredient);
  var newIngredient = new Ingredient("salt-dusted rim", "salty");
  pantry.addIngredient(newIngredient);
  var newIngredient = new Ingredient("grasher of bacon", "salty");
  pantry.addIngredient(newIngredient);

  //bitter ingredients
  var newIngredient = new Ingredient("shake of bitters", "bitter");
  pantry.addIngredient(newIngredient);
  var newIngredient = new Ingredient("splash of tonic", "bitter");
  pantry.addIngredient(newIngredient);
  var newIngredient = new Ingredient("twist of lemon peel", "bitter");
  pantry.addIngredient(newIngredient);

  //sweet ingredients
  var newIngredient = new Ingredient("sugar cube", "sweet");
  pantry.addIngredient(newIngredient);
  var newIngredient = new Ingredient("spoonful of honey", "sweet");
  pantry.addIngredient(newIngredient);
  var newIngredient = new Ingredient("splash of cola", "sweet");
  pantry.addIngredient(newIngredient);

  //fruity ingredients
  var newIngredient = new Ingredient("slice of orange", "fruity");
  pantry.addIngredient(newIngredient);
  var newIngredient = new Ingredient("dash of cassis", "fruity");
  pantry.addIngredient(newIngredient);
  var newIngredient = new Ingredient("cherry on top", "fruity");
  pantry.addIngredient(newIngredient);

  console.log(pantry);

  // create bartender and questions
  var bartender = new Bartender();
  var newQuestion = new Question("Do ye like yer drinks strong?", "strong");
  bartender.addQuestion(newQuestion);
  var newQuestion = new Question("Do ye like it with a salty tang?", "salty");
  bartender.addQuestion(newQuestion);
  var newQuestion = new Question("Are ye a lubber who likes it bitter?", "bitter");
  bartender.addQuestion(newQuestion);
  var newQuestion = new Question("Are ye one for a fruity finish?", "fruity");
  bartender.addQuestion(newQuestion);
  console.log(bartender);


//BEGIN JQUERY
  function getCustomerName() {
    // if input box is already hidden, return
    if ($(".inputName").hasClass("hidden")){
      return;
    } else {
      customer = new Customer($(".name").val());
      console.log(customer);
      $(".choices").removeClass("hidden"); //show bartender question
      $(".inputName").addClass("hidden"); //hide name input box
      showNextQuestion(); // show first question
    };
  };
  var customer;
  var currentQuestion = 0;
  function showNextQuestion() {
    $(".questions").empty();
    console.log(currentQuestion);
    if (currentQuestion > bartender.questions.length - 1) {
      $(".choices").addClass("hidden");
    } else {
      $(".questions").append("<h5>" + bartender.questions[currentQuestion].question + "</h5>");
    };
  };

  $(".inputName").one('submit', function(event) {
    event.preventDefault();
    getCustomerName();
  });

  $(".choices").submit(function(event) {
    event.preventDefault();
    if($(".choice option:selected").text() === "Yes") {
      customer.preferences.push(bartender.questions[currentQuestion].property)
      console.log(customer.preferences);
    };
    currentQuestion += 1;
    showNextQuestion();


  });
});
