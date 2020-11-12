---
title: "Making a terminal based shopping cart application"
date: 2020-01-14T16:56:57Z
author: Ben McLaren
draft: true
excerpt: "Notes on the Le Wagon Hash & Symbols Shopping Cart exercise"
---

**Notes on the Le Wagon Symbols & Hash Shopping Cart exercise**

For this exercise we want to build a terminal based app that will allow us to views items in a store, add them to a list and then then return our list with the calculated prices.

# The Interface

```ruby
require_relative 'store'
require_relative 'cart'


cart = []

puts 'Here are the available products:'
puts store_items_to_s


loop do

  puts 'What do you want to buy?'
  product = gets.chomp.downcase


  break if product == ''

  if product_in_store?(product)
    add_to_cart(cart, product)
  else

    puts "We don't have any #{product} in store, sorry!"
  end
end


puts 'Here is your order:'

puts cart_to_s(cart)

total = cart_total_price(cart, store_items)
puts "Total price: #{total}€"
```

The interface has been given to us. All we need to do is to initalize `cart` as an empty an array so we can push items into it.

We have two `puts` statements which talk to our users and also display the available store items by calling the method `store_items_to_s`

We next have a loop which will ask what product they want and get the user answer using `gets.chomp`. It will break if the answer is empty.

An if statement checks to see if the product is in store and if it is it adds it to cart otherwise it `puts` an error message.

It then displays the cart and total price by calling the `cart_total_price(cart, store_items)` method and passing in the correct arguments.

# Cart

```ruby
def add_to_cart(cart, product)

  cart << product
end

def cart_to_s(cart)

  cart.join(', ')
end

def cart_total_price(cart, store_items)

  total = 0
  cart.each do |cart_item|
    total += store_items[cart_item] if store_items[cart_item]
  end
  return total
end
```

Here we have the three methods which are called.

- `add_to_cart` = simpy adds the product into the cart with the << (append) opperator.

- `cart_to_s` = joins the items in the cart and seperates them with a comma.

- `cart_total_price` = We set the total to 0. Then we iterate with `.each` and add and reassign to `total` the result of reading the `cart_item` in the `store_items` hash but only if it's true that the `store_items` contain the `cart_item`.

The `total` is then returned.

# Store

*This file contains methods related to your store and its supplies.*
*You should complete it according to the instructions in the TODO comments*

```ruby
def store_items
  store = {
    'meat'        => 7,
    'potatoes'    => 2,
    'rice'        => 1,
    'vegetables'  => 5,
    'yogurts'     => 2
  }

  return store
end

def product_in_store?(product)
  store_items.key?(product)
end

def price_of_product(product)
  store_items[product]
end

def store_items_to_s
  items = []
  store_items.each do |store_item, price|
    items << "- #{store_item}: #{price} €"
  end

  items.join("\n")
end
```
- `store_items` is a method that will simply return the items in the store and their prices. It is stored as a hash. This is called in the interface when it lists the items out.

- `product_in_store?` takes one parameter of product, being the item the user types in. It then checks this against the hash to see if it exists. This is done with the `.key?` method.

- `price_of_product` takes one parameter of product, being the item the user types in. It grabs the value of the product from the hash with the notation `store_items[product]`. (Check in the 'store_items' to find it and get its price).

- `store_items_to_s` does not take a parameter. It sets an empty array of items and interates over `store_items` with `.each`. It then appends the individual item and its associated price to the items array, using the append (`<<`) opperator.

Finally the items array has `.join` called on it which joins the items together and includeds a line break after each one which is denoted by `("\n")`.
