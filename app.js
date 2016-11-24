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

  Bartender.prototype.greet = function(name) {
    var name = name.charAt(0).toUpperCase() + name.slice(1); //capitalize Name
     $(".container").prepend("<h2 class='greet'>Welcome to the Pirate Cantine, " + name + "! Let me fix ye a drink!</h2>");
    //  $(".greet").animate({height:'toggle'}, 1500);
  };

  Bartender.prototype.addCustomer = function(customer) {
    this.customers[customer.name] = customer;
  };

  //if customer is known, dont ask questions, give him his preferred drink
  Bartender.prototype.checkCustomer = function(name) {
    if (this.customers[name]) {
      $(".container").append("<h2 class='greet'>Welcome back " + name + "!</h2>");
      var myDrink = this.customers[name].drink;
      $(".showDrink").remove();
      $(".container").append("<div class='showDrink'>" +
                             "<h2>Here you go, " + name + "! This is your " + myDrink.name + "! " + "It's made from a " + formatedIngredients(customer) +  ".</h2><div>");
      $(".showDrink").append("<h2>Would you like another drink?</h2>");
      $(".showDrink").append("<input class='moreDrinks' type='submit' value='Yes'>" +
                             "<input class='noMoreDrinks' type='submit' value='No'>");
      bartender.askMoreDrinks();
    } else {
        this.greet(name);
        customer = new Customer(name);
        this.addCustomer(customer); //remember customer
        $(".choices").removeClass("hidden"); //show bartender question
        $(".inputName").addClass("hidden"); //hide name input box
        currentQuestion = 0;
        bartender.askQuestion(); //begin asking questions
      };
    };

  Bartender.prototype.addQuestion = function(question) {
    this.questions.push(question);
  };

  var currentQuestion = 0;
  Bartender.prototype.askQuestion = function() {
    $(".question").empty();
    if (currentQuestion > this.questions.length - 1) {
      $(".choices").addClass("hidden");
      bartender.giveDrink();
    } else {
      $(".question").append("<h2>" + this.questions[currentQuestion].question + "</h2>");
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

  Bartender.prototype.nameDrink = function() {
    var adjectives = ["Angry", "Wild", "Vicious", "Buried", "Captain's", "Bloody", "Foul", "Stinky", "Nautical", "White", "Red", "Sea", "Skinny", "Tropical", "Fuzzy", "Blackbeard's", "Frothy", "Wrecked", "Broken", "Helm's"];
    var nouns = ["Pirate", "Parrot", "Wooden Leg", "Eye Patch", "Sail", "Barrel", "Treasure", "Table", "Booty", "Ghost", "Plank", "Float", "Skull", "Flag", "Skeleton", "Kraken", "Boat", "Bones", "Witch", "Song"];
    var random = Math.floor(Math.random() * adjectives.length);
    var adjective = adjectives[random];
    var noun = nouns[random];
    return adjective + " " + noun;
  };

  Bartender.prototype.giveDrink = function() {
    var myDrink = bartender.makeDrink(pantry, customer.preferences);
    customer.drink = myDrink;
    $(".container").append("<div class='showDrink'>" +
                           "<h2>Here you go, " + customer.name + "! This is your " + customer.drink.name + "! " + "It's made from a " + formatedIngredients(customer) +  ".</h2><div>");
    $(".showDrink").append("<h2>Would you like another drink?</h2>" +
                           "<input class='moreDrinks' type='submit' value='Yes'>" +
                           "<input class='noMoreDrinks' type='submit' value='No'>");
    bartender.askMoreDrinks();
  };

  Bartender.prototype.askMoreDrinks = function() {
    $('.moreDrinks').click(function() {
      $(".showDrink").remove();
      bartender.giveDrink();
    });
    $('.noMoreDrinks').click(function() {
      $(".showDrink").remove();
      $(".greet").remove();
      $(".inputName").addClass("hidden");
      $(".container").append("<h2 class='goodbye'>Thank you for stopping by, now get out...</h2>");
      $(".container").append("<input id='restart' type='submit' value='Restart'>");
      $('#restart').click(function() {
        $(".showDrink").empty();
        $("#restart").remove();
        $(".goodbye").remove();
        $(".inputName").find("input[type=text], textarea").val("");
        $(".inputName").removeClass("hidden");
      });
    });
  };

function formatedIngredients(customer) {
  var ingredientsList = [customer.drink.ingredients.slice(0,-1).join(", "), customer.drink.ingredients.slice(-1)[0]].join(customer.drink.ingredients.length < 2 ? "" : ", and ");
  return ingredientsList;
}
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

  var customer;
  $(".inputName").submit(function(event) {
    $(".inputName").addClass("hidden  ");
    event.preventDefault();
    var name = $(".name").val();
    bartender.checkCustomer(name);
  });

  $(".choices").submit(function(event) {
    event.preventDefault();
    $(".greet").hide(500);

    if($(".choice option:selected").text() === "Yes") {
      customer.addPreference(bartender.questions[currentQuestion].property);
    };
    currentQuestion += 1;
    bartender.askQuestion();
  });
});
