---
title: "Refactoring code"
date: 2020-01-15T15:30:03Z
author: Ben McLaren
draft: false
excerpt: "Notes on the Le Wagon Iterators & Blocks Cleaning your Mess exercise"
---

**Notes on the Le Wagon Iterators & Blocks Cleaning your Mess exercise**

```ruby
def hop_hop_hop(number_of_exercises)
  for i in (1..number_of_exercises) do
    counter = 0
    until counter == i
      print "hop! "
      counter += 1
    end
    unless counter != i

      print 'One more time...' + "\n"
    end

    counter = 0
  end
end

hop_hop_hop(5)
```
This is a piece of ruby code which simply prints out the word 'hop!' and 'One more time...'. However, it is not the most efficient as it can be simplified into a much more readable state.

The current code uses a `for` loop to look through the `number_of_exercises` for a given range of 1  to the total number of exercises.  It then sets a counter at 0 and says until the counter is equal to the total times specified then it will print out the word "hop!" and increment the counter by 1. There is also an unless loop inside the 'for' loop which which checks to see if counter is equal to the total number and will continue to print "one more time..." until is is. The counter is then resent to 0 for the next exercise

This can be massively simplifed like this

```ruby
def hop_hop_hop(number_of_exercises)
  1.upto(number_of_exercises) do |number|
    print "hop! " * number
    puts 'One more time...'
  end
end

hop_hop_hop(5)
```
Here, we can use the method, `.upto`. This Iterates the given block, passing in integer values from the initial given value up to and including limit. This is called on an integer, in this case `1` and we give it an argument of `number_of_exercises` which refers to the amount of times the code will run. We also call it with a block which instructs it to print "hop!" the amount of times it is given. This is done by multiplying "hop" by number. It then puts 'One more time...' and the loop ends.

Difference between `puts` and `print`: Both will convert anything to a string and puts will display each item on a new line.






















