---
title: "Making a basic MVC terminal application"
date: 2020-04-16T15:09:41+01:00
author: Ben McLaren
draft: false
excerpt: "Notes on Le Wagon cookbook day 1"
---
 For this challenge we first want to begin with setting up our model. This should always be the first thing we do when making these sorts of programs. For our cookbook we are storing recipes so it makes sense for our model to be a Recipe model

### Step 1:

 ```ruby
 class Recipe
  attr_reader :name, :description

  def initialize(name, description)
    @name = name
    @description = description
  end
end
```
Here we have defined our class `Recipe` and we have initialized it with two instance variables. This is the `name` and the `description`. This means that in order to create a new instance of Recipe we will need to provide two pieces of information. A name and a description. We add the attribute reader for name and description so that we can actually access these methods.

### Step 2:

We are storing the recipes we make inside a csv file so that we can access theirs data even after closing the program, otherwise the data would be lost each time. This acts as a sort of database, our repository. In this file we need to define a new class called `Cookbook` as this is effectively the actual cookbook. Then we need to write some code that allows it to read the csv file and add and remove data.

``` ruby
require 'csv'
require_relative 'recipe'

class Cookbook

  def initialize(csv_file)
    @csv_file = csv_file
    @recipes = []
    load_csv()
  end

  def add_recipe(recipe)
    @recipes << recipe
    save_csv()
  end

  def all
    return @recipes
  end

  def remove_recipe(index)
    @recipes.delete_at(index)
    save_csv()
  end
end
```

As we are going to use Ruby's built in csv library we firstly need to `require 'csv'`. We also need to `require_relative 'recipe'` which allows us to access the local information in our recipe model.

We make an `initialize` method where we have two instance variables. `@csv_file` equal to the csv_file and `@recipes` equal to an empty array which is where we will store the recipes. We then also call a method `load_csv` which we will make later and this will simply load the csv file.

Next we write the three methods needed for the csv file do that we can add a recipe, delete a recipe and list the recipes.

For adding a recipe we can define a method `add_recipe`, give it a parameter of (recipe) and in this method we will append the given recipe into our array of `@recipes`. We can then save it to the csv file with `save_csv` which we will make later.

For deleting a recipe we can define a method `remove_recipe`, give it a parameter of (index) and in this method we will use `delete_at` the given index before we save it to the csv file with `save_csv`.

For listing the recipes we can simply have a method of `all` and return `@recipes`

Now, we can make the `load_csv` and `save_csv` methods

``` ruby
private

def load_csv
  CSV.foreach(@csv_file) do |row|
    @recipes << Recipe.new(row[0], row[1])
  end
end

def save_csv
  CSV.open(@csv_file, 'wb') do |csv|
    @recipes.each do |recipe|
      csv << [recipe.name, recipe.description]
    end
  end
end
```

These are private methods which means that they are only used within this class.

`load_csv` uses the Ruby syntax for loading a csv file by iterating over the csv file with `foreach` and then appending an instance of the Recipe class into each row of the csv file. As we are giving it both a name and  description we need to say that the name should go in position 0 and description in position 1.

`save_csv` allows us to save information and we follow the ruby syntax for doing this. We `.open` on CSV to open the csv file and then within this iteration we iterate using `.each` and append the recipe name and description into the csv file.

### Step: 3

Now that our model is set up and we have a repository that can access and change data in the csv file we can start working on the controller.

```ruby
require_relative 'view'
require_relative 'recipe'

class Controller
  def initialize(cookbook)
    @cookbook = cookbook
    @view = View.new
  end

  def list
    recipes = @cookbook.all
    @view.display_recipes(recipes)
  end

  def create
    name = @view.ask_user_for_stuff('name')
    description = @view.ask_user_for_stuff('description')
    recipe = Recipe.new(name, description)
    @cookbook.add_recipe(recipe)
  end

  def destroy
    list()
    index = @view.ask_user_for_index
    @cookbook.remove_recipe(index)
  end
end
```

We need to start off by `require_relative` for both the view and recipe. This is so the controller can access the information in both.

We initialize our controller with `@cookbook` equal to cookbook anf `@view` equal to `View.new`. This  instantiates the class and then calls the method `initialize`.

We now need a method to list the recipes, add recipes and delete recipes.

`list` method assigns a variable `recipes` to calling our `.all` method in the repository on the `@cookbook`
Then we call the view with @view and use the method `display_recipes` which is in our view. WE give this a value of `recipes`

`create` method assigns two variables of `name` and `description` to the value of accesing the view with `@view` and using the `ask_user_for_stuff` method. The parameter is then either `name` or `description`. We then have this information and can make a new instance of Recipe with `Recipe.new`, giving it the name and description from the user. This is equal to the variable recipe. Finally we can use our `.add_recipe` method in the repository to add it to the csv file.

`destroy` method first of all calls the `list` method so the user can see all their recipes. Then it call sthe `ask_user_for_index` method from the view and assigns this to the variable index. Finally it uses the `.remove_recipe` on `@cookbook` which it gives index as a parameter.

That is our controller complete. We can now make our view so that we can get the user input.

### Step 4:

``` Ruby
class View
  def display_recipes(recipes)
    recipes.each_with_index do |recipe, index|
      puts "#{index + 1} - #{recipe.name}: #{recipe.description}"
    end
  end

  def ask_user_for_stuff(stuff)
    puts "What is the #{stuff} of the recipe?"
    print "> "
    gets.chomp
  end

  def ask_user_for_index
    puts "enter a recipe number"
    print "> "
    gets.chomp.to_i - 1
  end
end
```

We define our class View. We do not need an initialize method as we do not need to save any instance variables when we do `.new`

The first method we can define is `display_recipes`. This is called with the parameter of recipes. Then we need to iterate over this with `.each_with_index`. Then we can puts to the user the index number of the recipe with a +1 to account for the way programming indexes work with a - and then the recipe name and the description of the recipe. We can call `.name` and `.description` because these are instance variables of the Recipe class.

Next we can `ask_user_for_stuff`. We give it the parameter of `stuff` which will either be `name` or `description`. Then we ask the user for the information and interpolate the variable of stuff. WE grab the user input with `gets.chomp`.

We can do the same when we `ask_user_for_index` but this time we will need t convert the users input to an integer with `.to_i` and then -1 to account for the index values in arrays.

We now have a working terminal application
