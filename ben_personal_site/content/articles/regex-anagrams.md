---
title: "How to check anagrams using regex"
date: 2020-01-18T18:50:03Z
author: Ben McLaren
draft: false
excerpt: "Notes on Le Wagon Regular Expressions Anagrams exercise"
---

**Notes on Le Wagon Regular Expressions Anagrams exercise**

For this exercise we want to write a method that will check if two strings are anagrams.

```ruby
def anagrams?(a_string, another_string)
  a_string = a_string.downcase.chars.sort.join.gsub(/\s+/, "").gsub(/[^0-9a-zA-Z]/, "")
  another_string = another_string.downcase.chars.sort.join.gsub(/\s+/, "").gsub(/[^0-9a-zA-Z]/, "")
  return a_string == another_string
end
```

For this first method we start out with creating two variables. These are called `a_string` and `another_string` respectivley. We apply the same logic to both of the given arguments.

We start by calling:

- `.downcase` which will change all uppercase letters to lowercase

- `.chars` which will return an array of characters from the string. In other words, splits up the word into seperate letters

- `.sort` which will sort the letters into alphabetical order

- `.join` which will join the seperate letters together. `[ "a", "b", "c" ].join #=> "abc"`

- `.gsub` will sub out the characters given as the first argument and replace them with the characters given in the second argument. In our example we will sub out any number of whitespace characters and replace them with nothing. This is denoted by the `\s` standing for whitespace character and `+` which means that there can be one or more whitespaces. We also call `.gsub` again and this time we say to sub out any character **except** numbers 0-9, lowercase letters a-z and uppercased letters A-Z. The `^` denotes the exception.

Now we can return true if `a_string` is equal to `another_string`

To demonstrate how this works lets take the example of the word POST and the word SPOT

`POST -> ['p', 'o', 's', 't'] -> ['o', 'p', 's', 't'] -> "opst"
 SPOT -> ['s', 'p', 'o', 't'] -> ['o', 'p', 's', 't'] -> "opst"`

This is am anagram because both results have returned in the same order.


**What if we wanted to make our method faster by improving its Time Complexity?** (Time taken to complete a method)

To do this we might want to use a `hash`. Lets create a method that will create our hash which we can use to store data inside.


```ruby
def create_hash(word)
  word = word.downcase.chars.sort.join.gsub(/\s+/, "").gsub(/[^0-9a-zA-Z]/, "")
  new_hash = {}
  word.each_char do |char|
    if new_hash.key?(char)
      new_hash[char] += 1
    else
      new_hash[char] = 1
    end
  end
  return new_hash.values
end
```

This array takes one argument of `word`. We can then create a new variable which will be equivilent to downcasing the word and substituting any characters other than letters and numbers. We also set our `new_hash` to empty `{}`.

- Iterate over `word` with `.each_char`. This is just going to pass each character of the word to the block.

- Then we say if our `new_hash` contains the key of `char` we can add 1 to this value stored in our `new_hash`

- Else, we create a new key of `char` in our hash.

Finally we return the `new_hash.values`. This gives us a new array which is populated by groups of values from the hash.

We need to modify our first method so that we can take advantage of the hash we just created.

```ruby
def anagrams_on_steroids?(a_string, another_string)
  a_hash = create_hash(a_string)
  another_hash = create_hash(another_string)
  return a_hash == another_hash
end
```

Here, we are setting up two variables and calling our `create_hash` method inside each of them. We give it the required arguments of `a_string` and `another_string` respectively. We then return true or false depending on if the `a_hash` and `another_hash` variables are the same.

The flow of this can be confusing so to recap:

- If we give the word 'POST' as an argument into `create_hash` then as its  run for the first time it will reach the `if` statement and will not be able to find a key of `post` as the hash is currently empty. It will therefore create a new key of `opst`. However when `create_hash` is run a second time with the word `SPOT` then it will see that there is in fact a key of opst in the hash and it therfore increments its value by 1.

- When `new_hash.values` is called then it will display an array with the group of values.















