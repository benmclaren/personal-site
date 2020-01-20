---
title: "How to iterate over a text file and return specific information"
date: 2020-01-19T12:47:29Z
author: Ben McLaren
draft: false
excerpt: "Notes on the Le Wagon Regular Expressions Word Frequency exercise"
---

**Notes on the Le Wagon Regular Expressions Word Frequency exercise**

For this challenge we are going to be working with text files and building a text analyzer using Hash.

We want to implement a `most_common_words` method that returns the number of occurrences of most frequent words in a text file.

To begin with we need to write a method to load our `stop_words` file. This is a file which contains all the words that you do noy want to be included. There is no set list of stop words but they are often very common words such as “a”, “the”, “is” etc.

```ruby
def load_stop_words(stop_words_filename)
  File.open(stop_words_filename, "r").reduce([]) do |stop_words, line|
    stop_words << line.chomp
  end
end
```
1. To begin with we define our method which takes one parameter which is `stop_words_filename`, the name of the file we want to read through.

2. Next, we can use `File.open(stop_words_filename, "r")`. This is going to simply allow the method to read this file and access the data inside. `"r"` stands for 'read'. We also call `.reduce` on this, passing it an `[]` as an argument. It then takes two parameters of `stop_words, line`. Lets go ove how this works as it can be confusing.

-  `.reduce` requires an inital value and will take two arguments in the block. The `[]` in `.reduce([])` sets the initial value. If we do not set a value, it defaults to zero. After that, we have two parameters in the method `|stop_words, line|`. The first parameter, which we call `stop_words` is the total that will eventually be returned. The second parameter, which we call `line` is the current number as we iterate through the document line by line. In other words `stop_words` is representing our empty array and `line` is each line in the file that its iterating over.

3. This block then simply adds each line to the array with `.chomp` cutting off unnecessary characters such as white space and line breaks.

Now, we can write our method to analyize our text.

```ruby
def most_common_words(filename, stop_words_filename, number_of_word)
  counter = Hash.new(0)

  stop_words = load_stop_words(stop_words_filename)

  File.open(filename, "r").each_line do |line|
    line.chomp.downcase.split(/\W+/).each do |word|
      counter[word] += 1 unless stop_words.include? word
    end
  end

  Hash[counter.sort_by { |_, v| v }.reverse[0..(number_of_word - 1)]]
end
```
1. We begin with defining our method with three arguments. `filename, stop_words_filename, number_of_word`.

2. We set a variable of `counter`. This is equal to creating a new hash with `Hash.new`. The default value of any key in this hash is set to `0`.

3. Next, we create a new variable of `stop_words` and this is equal to calling our `load_stop_words` method with its required argument of `stop_words_filename`.

4. Now we can open our file which is passed in by the user and iterate over it with `.each_line`. This will simply iterate over each individual line in the file.

5. Then we say for each line lets remove any whitespace with `.chomp`, change the words on the line to lowercase with `.downcase` and then split the line on any non word character with `.split(/\W+/)`. Finally we iterate over this using `.each`.

6. Here, we say make a new key of `word` inside our hash called `counter`. This means a new key will be created inside hash for each new word it finds. Then we add 1 to this key unless the word is contained within the `stop_words` file.

7. Lastly, we can use the notation `Hash[]` which will generate a new hash. Only if it has an array of arrays as an argument. We then call `.sort_by` on `counter`. This takes two arguments but we only need the second argument. The `_` says that we don't care what this is is. Then we say for each element reverse the order from 0 to the last position.














