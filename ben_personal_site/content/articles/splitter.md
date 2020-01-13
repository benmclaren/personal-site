---
title: "Splitter"
date: 2020-01-13T14:16:58Z
author: Ben McLaren
draft: false
---

**Notes on the Le Wagon Iteratros & Blocks splitter exercise**

We want to create a splitter method which will take an array and divide it into two groups according to an arbitrary rule. You might want to split by age if we’re talking about a group of people.

Lets implement a method `size_splitter`which takes two parameters: an array, and a integer (the size). We will assume that the array only contains words, e.g. Strings, and that the arbitrary rule is to form two groups: the first one with words of the given size (second parameter of the method), and the other group with all the other words.

The size_splitter method should return an array of two arrays - the two groups defined above - with the contents sorted alphabetically.

``` ruby
  def size_splitter(array, size)
  size_array = array.select do |word|
    word.length == size
  end
  other_array = array.reject do |word|
    word.length == size
  end
  combined_array = []
  combined_array.push(size_array.sort, other_array.sort)
  return combined_array
end
```

We start by calling the method `.select` on to the array. The block then check to see if each word in the array is of the length size and if it is it is added to the `size_array`.

The other array uses to `.reject` to add words not equal to the length of size to the array. It bascially rejects words that are equal to size.

We then set the combined array to empty and use the ruby methid `.push` to add in each array along with the `.sort` method which orders them alphabetically.


In the previous exercise, the abritrary rule was fixed. What if we wanted to let the method caller choose which rule to apply? We can do so with the power of blocks and yield.


```ruby
def block_splitter(array)
  true_array = array.select do |word|
    yield(word) == true && word.start_with?("a")
  end
  other_array = array.reject do |word|
    yield(word) == true
  end
  new_array = []
  new_array.push(true_array, other_array)
  return new_array
end
```
This is the same concept although here we use yield with the parameter of `word` which allows the user to customzie the rule. This is then checked against whether it is equal to true and also equal to the word starting with an "a". The second array then rejects anything which is not true.

The new_array is created and set to empty and we use `.push` to both the `true_array` and the
`other_array`.

We then return the `new_array`.











