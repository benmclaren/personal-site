---
title: "Terminal games"
date: 2020-01-20T21:02:01Z
author: Ben McLaren
draft: false
excerpt: "Notes on the Le Wagon Parsing Numbers and Letters exercise"
---

**Notes on the Le Wagon Parsing Numbers and Letters exercise**

The goal of this challenge is to write a simplified version of the game 'countdown' from the terminal where:

- You are given a random set of letters.
- You have to enter the longest english word you can find using only letters in the grid.
- After typing your answer, you get your score combined with the time you took, and eventually an error message if you failed.

This exercise is easily seen as being overwhelming at first but if we break it down into stages it will become much clearer.

We have two files for this. The first file is our file 'longest_word.rb' where we will define all our methods needed to build this mini game. Our second file is our `interface.rb`. This is where we will interact with the user and get their input.

As we go through this challenge we will write a method and then introduce the code required in the interface asscoiated with the method.

**Set up**

To start with we need to put these at the start of our `longest_word.rb` file

- `require 'open-uri'` -> Allows it to open an http, https or ftp URL as though it were a file.
- `require 'json'` -> It provides an API for parsing JSON

We need a `require_relative "longest_word"` at the top of our `interface.rb` file so that it can access the methods in the `longest_word.rb` file.

**Generating the sample of numbers**

Lets write a method which will create the list of letters that our user is able to pick from.

```ruby
def generate_grid(grid_size)
   Array.new(grid_size) { ('A'..'Z').to_a.sample }
end
```

Here, we create a new array with `Array.new`. We give it an argument of `grid_size` and pass it a block to populate the array with. In this block we give it a range of capital letters from A-Z which we call `.to_a` on in order to transform it into an array. We also call `.sample` which will take a sample of `grid_size` letters from this range. In other words whatever number is given as the `grid_size` correlates to the amount of letters it will sample.

We can now implement our first `interface.rb` logic which will interract with this method.

```ruby
puts "******** Welcome to the longest word-game!********"
puts "Here is your grid:"
grid = generate_grid(9)
puts grid.join(" ")
puts "*****************************************************"
```

Here, we simply `puts` a few statements to speak to our user. We then create a variable `grid`. This is equal to calling our `generate_grid` method and passing it the value of 9. Therefore the method will provide a sample of 9 letters.

We have an important `puts` statement here of `grid.join(" ")`. This will simply join the sample of letters together with a space between all on one line. If we did not have this `.join` method they would display vertically in the terminal.

**Checking to see if guess is included**

```ruby
def included?(guess, grid)
  guess.chars.all? { |letter| guess.count(letter) <= grid.count(letter) }
end
```

This method `included?` takes two parameters of `guess` and `grid`.

We call `.chars` on `guess` which will split the guess up into seperate characters. We also call `.all?` which will pass each element to the given block.

In our block we call `.count(letter)` on `guess` with an argument of `letter`. This will count the amount of elements in the array which are equal to `letter`. We check to see if this is less than or equal to (<=) the amount of times `letter` appears in `grid`.

**Working out the score**

```ruby
def compute_score(attempt, time_taken)
  time_taken > 60.0 ? 0 : attempt.size * (1.0 - time_taken / 60.0)
end
```

This method `compute_score` takes two parameters of `attempt` and `time_taken`.

Using a ternary operator here, we say is `time_taken` greater than 60 seconds. If it is then the score will be equal to 0. However, if it is, then perform this calculation. We say the size of the attempt (how many letters the user picked) multiplied by the sum of doing `(1.0 - time_taken / 60.0)`.

**Checking to see if it is an english word**

```ruby
def english_word?(word)
  response = open("https://wagon-dictionary.herokuapp.com/#{word}")
  json = JSON.parse(response.read)
  return json['found']
end
```

This method `english_word?` takes one parameter of `word`.

We create a variable of `reponse`. This is equal to opening the given site with the `word` interpolated at the end. We use the `open` command for this.

We create another variable called `json`. This is how we will use the JSON API. It allows us to recieve the data from the website. We give it an argument of `response.read`. This allows it to read the infomration but nothing else.

We then return `json['found']`. This will return true or false depening on if the word was found in the dictionary or not.

**Getting the user inputs for time and attempt**

```ruby
puts "What's your best shot?"
start_time = Time.now
attempt = gets.chomp
end_time = Time.now
```

We start with a `puts` statement which ask the user a question

We then make three variables

- `start_time` which is equal to the time this starts

- `attempt` which is equal to the input entered by the user

- `end_time` which is equal to the time after this process has finished.


**Check to see if letters are included and if its an english word**

```ruby
def score_and_message(attempt, grid, time)
  if included?(attempt.upcase, grid)
    if english_word?(attempt)
      score = compute_score(attempt, time)
      [score, "well done"]
    else
      [0, "not an english word"]
    end
  else
    [0, "not in the grid"]
  end
end
```

This method `score_and_message` this takes three parameters of `attempt`, `grid` and `time`.

We start with an `if` statement which runs the method we wrote earlier `included?`. It passes it the required two variables of `attempt` and `grid`. We call `.upcase` on `attempt` in order to ensure the letters are all in capitals.

Inside this `if` statement we check to see if it is an english word by calling the `english_word?`method and giving it the argument of `attempt` (the users guess). We then create a variable called `score` which is equal to running the `compute_score` method. We give it the arguments of `attempt` and `time`. From this we generate an array. Inside this array we have the score in the first position and the message "well done" in the last position. Our else statement (If its not an english word) generates an array with `0` as the score and `"not an english word"` as the message.

The else statement for if it is inside the grid or not also generates an array which contains a `0` as the score and `"not in the grid"` as the message.

**Final method to run the game**

Our final method is the method that brings everything together so that we can play our game.

```ruby
def run_game(attempt, grid, start_time, end_time)
  result = { time: end_time - start_time }

  score_and_message = score_and_message(attempt, grid, result[:time])
  result[:score] = score_and_message.first
  result[:message] = score_and_message.last

  result
end
```

This method of `run_game` takes three parameters of `attempt`, `grid`, `start_time` and `end_time`

We start by creating a hash called `result`. Inside this hash we have one key of `time:` and its value of `end_time - start_time`.

We then add a new key into our hash which is called `result[:score]`. This is equal to running the `score_and_message` method and selecting the first element in the returned array (the score).

We add another key into our hash which is called `result[:message]`. This is equal to his is equal to running the `score_and_message` method and selecting the last element in the returned array (the message).

We end by returning result which included all this data.

**Displaying result to the user**

Our last thing needed for the interface is how we display this information to the user.

```ruby
puts "******** Now your result ********"

result = run_game(attempt, grid, start_time, end_time)

puts "Your word: #{attempt}"
puts "Time Taken to answer: #{result[:time]}"
puts "Your score: #{result[:score]}"
puts "Message: #{result[:message]}"

puts "*****************************************************"
```
We set `result` as equal to running the `run_game` method and passing in the required variables.

We lastly have four `puts` statements which return the information from `result` by interpolating the arguments and selecting the relevant keys.


**Final code for `longest_word.rb`**

```ruby
require 'open-uri'
require 'json'

# 1
def generate_grid(grid_size)
  Array.new(grid_size) { ('A'..'Z').to_a.sample }
end

# 2
def included?(guess, grid)
  guess.chars.all? { |letter| guess.count(letter) <= grid.count(letter) }
end

# 3
def compute_score(attempt, time_taken)
  time_taken > 60.0 ? 0 : attempt.size * (1.0 - time_taken / 60.0)
end

# 4
def english_word?(word)
  response = open("https://wagon-dictionary.herokuapp.com/#{word}")
  json = JSON.parse(response.read)
  puts json['found']
end

# 5
def score_and_message(attempt, grid, time)
  if included?(attempt.upcase, grid)
    if english_word?(attempt)
      score = compute_score(attempt, time)
      [score, "well done"]
    else
      [0, "not an english word"]
    end
  else
    [0, "not in the grid"]
  end
end

# 6
def run_game(attempt, gsrid, start_time, end_time)
  result = { time: end_time - start_time }

  score_and_message = score_and_message(attempt, grid, result[:time])
  result[:score] = score_and_message.first
  result[:message] = score_and_message.last

  result
end
```

**Final code for `interface.rb`**

```ruby
require_relative "longest_word"

puts "******** Welcome to the longest word-game!********"
puts "Here is your grid:"
grid = generate_grid(9)
puts grid.join(" ")
puts "*****************************************************"

puts "What's your best shot?"
start_time = Time.now
attempt = gets.chomp
end_time = Time.now

puts "******** Now your result ********"

result = run_game(attempt, grid, start_time, end_time)

puts "Your word: #{attempt}"
puts "Time Taken to answer: #{result[:time]}"
puts "Your score: #{result[:score]}"
puts "Message: #{result[:message]}"

puts "*****************************************************"
```
