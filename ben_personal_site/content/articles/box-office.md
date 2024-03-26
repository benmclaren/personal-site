---
title: 'Iterating over a CSV file to return specific information'
date: 2020-01-20T19:17:57Z
author: Ben McLaren
draft: true
Excerpt: 'Notes on the Le Wagon Parsing CSV Parsing exercise'
---

For this challenge we want to implement a `most_successful` method that returns the movies (a certain number passed as a parameter) published prior to a given year and with their associated earnings. The returned list should be an array of movies. Each movie should be represented by a hash with keys: name, year and earnings. Ex: `{ name: "Avatar", year: 2009, earnings: 760505847 }`

We have been given a CSV file containing the data that we need.

We need to put `require 'csv'` at the top of file. This makes Ruby’s CSV library available to your program so that you can then use the class `CSV`.

We start by writing a method that will allow us to access the data from the csv file.

```ruby
def load_movies(file_path, max_year)
  movies = []

  CSV.foreach(file_path) do |row|
    year = row[1].to_i
    next if year >= max_year

    movies << { name: row[0], year: year, earnings: row[2].to_i }
  end

  movies
end
```

1. Our method `load_movies` takes two parameters of `file_path` and `max_year`

2. We begin by initialising an empty array which we will use to store our data. Here we have called it `movies`.

3. Next, we can use the class `CSV` and use a `.foreach` loop which we pass `file_path` as an argument. This will iterate over each row in the csv file.

4.

- Inside our block we are creating a new variable called `year`. This is equal to targetting the row and specifically the element in the 2nd position (`row[1]`) which is our year. We then call `.to_i` on this to transform it from a string to an integer.

- We then have a `next if` statement. This simply means move on and skip this iteration if this condition is not met. The condition we give it is if the `year` is greater than or equal to the `max_year`.

- The last thing to do in this block is append this data into our currently empty `movies` array. We can do this by giving the csv file some headers which will make it easier to read and access data from. This is what this everything inside these brackets means `{}`. We have `name: row[0]` which means that the element in the first position in the row is called name. We have `year: year` which is equal to our variable of year which we created earlier. Finaly we have `earnings: row[2].to_i` which is equal to the element in the final position in the row converted to an integer.

5. To finish off we simply return `movies`.

Now that we have written a method to get all this data we can write our method that will actually do something with it. Here, we have a method that takes three arguments. The `number`, `max_year` and `file_path`.

```ruby
def most_successful(number, max_year, file_path)
  all_movies = load_movies(file_path, max_year)
  all_movies.max_by(number) { |movie| movie[:earnings] }
end
```

1. We start by creating a new variable called `all_movies`. This is equal to calling the `load_movies` method with its required arguments.

2. We can now use the method `.max_by`. This method will return the the object with the maximum value that is specified in the block. We say for every `movie` grab the earnings using the notation `movie[:earnings]`.
