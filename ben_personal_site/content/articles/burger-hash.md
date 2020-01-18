---
title: "Accessing data and using methods with Hashes"
date: 2020-01-13T11:25:35Z
author: Ben McLaren
draft: false
excerpt: "Notes on the Le Wagon Hash & Symbols Burger Hash exercise"
---

**Notes on the Le Wagon Hash & Symbols Burger Hash exercise**

Hashes can be confusing at first but once you get your head around them they are relatively straight forward.

For this exercise we want to build a counter that will add up the amount of calories there are in different items of food.

To start with we will store the information in a hash which is a more readable way of storing data and works as a sort of database. We store this in a constant as the data will not change and this is denoted by capital letters.

``` ruby
DISHES_CALORIES = {
  "Hamburger" => 250,
  "Cheese Burger" => 300,
  "Big Mac" => 540,
  "McChicken" => 350,
  "French Fries" => 230,
  "Salad" => 15,
  "Coca Cola" => 150,
  "Sprite" => 150
}
```

We have assigned this hash to a constant of `DISHES_CALORIES`. The **key** is written as a string and the 'hash rocket' (=>) shows us which **value** is associated with each key.

Lets write a method that will take some parameters and return to us the total amount of calories in the dishes we give it.

``` ruby
def basic_calories_counter(burger, side, beverage)
  DISHES_CALORIES[burger] + DISHES_CALORIES[side] + DISHES_CALORIES[beverage]
end
```
Here, we have defined a method which takes three parameters which we have given the names 'burger, side and beverage' although they could just as easily be called 'x, y, z'. This is simply a placeholder name.

The method contains our calculation or concatination for displaying the total amount of calories. We start by targetting the hash `DISHES_CALORIES` then giving it each parameter using the `[]`. This is saying look inside the `DISHES_CALORIES` hash and find the key corresponding with the argument given. We add each item together with the + and this returns the total number of calories. Remember a block will automatically return the last line so there is no need to explicilty write return.

Lets make this more complex by introducing a second hash but this time it contains meals instead.

``` ruby
MEALS = {
  "Happy Meal" => ["Cheese Burger", "French Fries", "Coca Cola"],
  "Best Of Big Mac" => ["Big Mac", "French Fries", "Coca Cola"],
  "Best Of Royal Cheese" => ["McChicken", "Salad", "Sprite"]
}
```

This hash `MEALS` is storing meal names as a key and an array of items from the other hash `DISHES_CALORIES` as the value. We would like to be able to give 'Happy Meal' as a parameter and have it return the correct amount of calories in a happy meal.

Start by writing a new method.

``` ruby
def calories_counter(orders)
  counter = 0
  orders.each do |order|
    if DISHES_CALORIES.key?(order)
      counter += DISHES_CALORIES[order]
    else
      counter +=basic_calories_counter(MEALS[order][0], MEALS[order][1], MEALS[order][2])
    end
  end
  return counter
end
```
Lets go through this step by step.

1. Method name of calories_counter which takes one parameter (orders)

2. Initalize the counter at 0

3. Iterate over the parameter 'orders' using `.each`. We will use `order` as our placeholder which represents each individual item given in `orders`.

4. An `if` statement where we check to see if `DISHES_CALORIES` contains a key which it found when it iterated over the `orders` parameter. We do this by calling the ruby method `.key?` on the hash name and giving it the parameter of order (representing the individual items in orders.) If this returns true it will add and reasign it to our variable `counter`. The notation `DISHES_CALORIES[order]` is us saying look inside the hash and give us the value for each order that we want.

5. The `else` statement is for any keys that are not contained within `DISHES_CALORIES`. Here we call the method `basic_calories_counter` and give it the three parameters it requires. The parameters `MEALS[order][0]` tell it to look inside MEALS and find the order matching the order it has been given. For example it has been given Happy Meal so it will look like this:

``` ruby
def basic_calories_counter(burger, side, beverage)
  DISHES_CALORIES(MEALS[Happy Meal][0] + DISHES_CALORIES(MEALS[Happy Meal][1] + DISHES_CALORIES(MEALS[Happy Meal][2]
end
```
The method can now see that it must go to `MEALS` and find the order and then simply select each item at the given indexes 0, 1 and 2 which refer to items 1, 2 and 3. It is able to access the data for each item because `DISHES_CALORIES` holds that information.

6. We can then return the counter with the total amlunt of calories.






