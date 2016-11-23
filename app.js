$(document).ready(function(event){

  function Customer(name, preferences) {
    this.name = name;
    this.preferences = [];
    this.drink;
  }
  Customer.prototype.addPreference = function(preference) {
    this.preferences.push(preference);
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

  Pantry.prototype.getIngredient = function(type) {
    if (this.ingredients[type]) {
      var random = Math.floor(Math.random() * this.ingredients[type].length);
      return this.ingredients[type][random];
    };
  };

  function Question(question, property) {
    this.question = question;
    this.property = property;
  };

  function Bartender() {
    this.customers = {};
    this.questions = [];
  };

  Bartender.prototype.addCustomer = function(customer) {
    this.customers[customer.name] = customer;
  };

  Bartender.prototype.checkCustomer = function(name) {
    if (this.customers[name]) {
      $(".container").append("<h5>Welcome back " + name + "!</h5>");
        this.customers[name].drink.name;
      $(".showDrink").remove();
      $(".container").append("<div class='showDrink'>" +
                             "<h5>Here you go, " + name + "! This is your " + this.customers[name].drink.name + "! " + "It's made from a " + this.customers[name].drink.ingredients +  ".</h5><div>");
      $(".showDrink").append("<h5>Would you like another drink, " + name + " ?</h5>");
      $(".showDrink").append("<input id='moreDrinks' type='submit' value='Yes'>" +
                             "<input id='noMoreDrinks' type='submit' value='No'>");

    } else {
      this.greet(name);
      customer = new Customer(name);
      this.addCustomer(customer); //remember customer
      $(".choices").removeClass("hidden"); //show bartender question
      $(".inputName").addClass("hidden"); //hide name input box
    };
  };

  Bartender.prototype.addQuestion = function(question) {
    this.questions.push(question);
  };

  var currentQuestion = 0;
  Bartender.prototype.askQuestion = function() {
    $(".questions").empty();
    if (currentQuestion > this.questions.length - 1) {
      $(".choices").addClass("hidden");
      giveDrink();
    } else {
      $(".questions").append("<h5>" + this.questions[currentQuestion].question + "</h5>");
    };
  };

  Bartender.prototype.makeDrink = function(pantry, preferences) {
    var ingredients = [];
    for (let i = 0; i < preferences.length; i++) {
      ingredients.push(pantry.getIngredient(preferences[i]));
    }
    var name = this.nameDrink();
    var drink = new Drink(name, ingredients);
    return drink;
  }

  Bartender.prototype.greet = function(name) {
     $(".container").prepend("<h5 class='greet'>Welcome to the Tavern, " + name + "!</h5>");
  };

  Bartender.prototype.nameDrink = function() {
    var adjectives = ["Angry", "Wild", "Vicious", "Buried", "Captain's", "Bloody", "Foul", "Stinky", "Nautical", "White", "Red", "Sea", "Skinny", "Tropical", "Fuzzy", "Blackbeard's", "Gay", "Wrecked", "Broken", "Helm's"];
    var nouns = ["Pirate", "Parrot", "Wooden Leg", "Eye Patch", "Sail", "Barrel", "Treasure", "Table", "Booty", "Ghost", "Plank", "Float", "Skull", "Flag", "Skeleton", "Kraken", "Boat", "Bones", "Witch", "Song"];
    var random = Math.floor(Math.random() * adjectives.length);
    var adjective = adjectives[random];
    var noun = nouns[random];
    return adjective + " " + noun;
  };

  Bartender.prototype.askMoreDrinks = function() {
    $('.moreDrinks').click(function() { ///use jquery
      $(".showDrink").remove();
      giveDrink();
    });
    $('.noMoreDrinks').click(function() { ///use jquery
      $(".showDrink").remove();
      $(".container").append("<h5 class='goodbye'>Thank you for stopping by, now get out...</h5>");
      $(".container").append("<input id='restart' type='submit' value='Restart'>");
      $('#restart').click(function() {
        $("#restart").remove();
        $(".goodbye").remove();
        $(".inputName").removeClass("hidden");
      });
    });
  };

  //create pantry and add the following ingredients to the pantry
  //strong ingredients
  var pantry = new Pantry();
  pantry.addIngredient(new Ingredient("glum of rum", "strong"));
  pantry.addIngredient(new Ingredient("slug of whisky", "strong"));
  pantry.addIngredient(new Ingredient("splash of gin", "strong"));

  //salty ingredients
  pantry.addIngredient(new Ingredient("olive on a stick", "salty"));
  pantry.addIngredient(new Ingredient("salt-dusted rim", "salty"));
  pantry.addIngredient(new Ingredient("grasher of bacon", "salty"));

  //bitter ingredients
  pantry.addIngredient(new Ingredient("shake of bitters", "bitter"));
  pantry.addIngredient(new Ingredient("splash of tonic", "bitter"));
  pantry.addIngredient(new Ingredient("twist of lemon peel", "bitter"));

  //sweet ingredients
  pantry.addIngredient(new Ingredient("sugar cube", "sweet"));
  pantry.addIngredient(new Ingredient("spoonful of honey", "sweet"));
  pantry.addIngredient(new Ingredient("splash of cola", "sweet"));

  //fruity ingredients
  pantry.addIngredient(new Ingredient("slice of orange", "fruity"));
  pantry.addIngredient(new Ingredient("dash of cassis", "fruity"));
  pantry.addIngredient(new Ingredient("cherry on top", "fruity"));

  // create bartender and questions
  var bartender = new Bartender();
  bartender.addQuestion(new Question("Do ye like yer drinks strong?", "strong"));
  bartender.addQuestion(new Question("Do ye like it with a salty tang?", "salty"));
  bartender.addQuestion(new Question("Are ye a lubber who likes it bitter?", "bitter"));
  bartender.addQuestion(new Question("Are ye one for a fruity finish?", "fruity"));
  console.log(bartender);

//BEGIN JQUERY
  // function getCustomerName() {
  //   //if bartender knows customer, get him his favorite drink, otherwise greet new customer
  //
  //     showNextQuestion(); // show first question
  // };

  function giveDrink() { /////////
    var myDrink = bartender.makeDrink(pantry, customer.preferences);
    customer.drink = myDrink;
    var ingredientsList = customer.drink.ingredients;
    ingredientsList = [ingredientsList.slice(0,-1).join(", "), ingredientsList.slice(-1)[0]].join(ingredientsList.length < 2 ? "" : " and ");
    console.log(customer);
    console.log(bartender);
    $(".container").append("<div class='showDrink'>" +
                           "<h5>Here you go, " + customer.name + "! This is your " + customer.drink.name + "! " + "It's made from a " + ingredientsList +  ".</h5><div>");
    $(".showDrink").append("<h5>Would you like another drink, " + customer.name + " ?</h5>");
    $(".showDrink").append("<input class='moreDrinks' type='submit' value='Yes'>" +
                           "<input class='noMoreDrinks' type='submit' value='No'>");
    bartender.askMoreDrinks(); ////////
  };

  var customer;
  $(".inputName").submit(function(event) {
    event.preventDefault();
    var name = $(".name").val();
    bartender.checkCustomer(name);
    if ($(".container").hasClass("questions")) {
      bartender.askQuestion();
    } else {
      $(".container").prepend("<div class='questions'></div>");
      bartender.askQuestion();
    };
  });

  $(".choices").submit(function(event) {
    event.preventDefault();
    if($(".choice option:selected").text() === "Yes") {
      customer.addPreference(bartender.questions[currentQuestion].property);
    };
    currentQuestion += 1;
    bartender.askQuestion();
  });
});
