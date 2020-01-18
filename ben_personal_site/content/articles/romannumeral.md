---
title: "How to translate a Roman Numeral into its letter"
date: 2020-01-14T14:09:27Z
author: Ben McLaren
draft: false
excerpt: "Notes on the Le Wagon Hash & Symbols Roman to Integer exercise"
---

**Notes on the Le Wagon Hash & Symbols Roman to Integer exercise**

Lets write a method that will take a Roman numeral and transform it into its integer.

First let us start with writing out a hash that contains the infromation needed to construct Roman Numerals.

```ruby
ROMAN_TO_INT = {
  "I" => 1,
  "IV" => 4,
  "V" => 5,
  "IX" => 9,
  "X" => 10,
  "XL" => 40,
  "L" => 50,
  "XC" => 90,
  "C" => 100,
  "CD" => 400,
  "D" => 500,
  "CM" => 900,
  "M" => 1000
}
```
Lets define our method and give it one parameter. We can also initalise our number by setting it to 0. We then duplicate the given string so that we can use destructive methods on it. This is done using the method `.dup`.

```ruby
def roman_to_integer(roman_string)
  number =0
  str = roman_string.dup
end
```

Now we need to create an `until` loop which will say until the string size returns zero we need to run an `if` statement.

```ruby
  until str.size.zero?
    last_two_characters = str.slice(-2, 2)
    if ROMAN_TO_INT.key?(last_two_characters)
      number += ROMAN_TO_INT[last_two_characters]
      str.chop!
    else
      number += ROMAN_TO_INT[str.slice(-1)]
    end
    str.chop!
  end
```
1. Find the last two characters of the string by calling `.slice(-2, 2)` on to the string. This means that it will look back two characters from the end and then slice 2 characters forwards. Essentially slicing the last two characters. This will return a new string which we store in `last_two_characters`.

2. Then we say if the hash `ROMAN_TO_INT` contains a key with the `last_two_characters` then take `number` and add and resasign its value to the result of selecting the key's relating to `last_two_characters`. We then call `.chop!` on the string which removes the last character as we do not need it.

3. Our else statement says that for numerals containing one letter we can just look in the hash and grab the key which relates to the last chracter in the given string.

4. Finally we can call `.chop!` on the string to remove the final character.

```ruby
def roman_to_integer(roman_string)
  number = 0
  str = roman_string.dup
  until str.size.zero?
    last_two_characters = str.slice(-2, 2)
    if ROMAN_TO_INT.key?(last_two_characters)
      number += ROMAN_TO_INT[last_two_characters]
      str.chop!
    else
      number += ROMAN_TO_INT[str.slice(-1)]
    end
    str.chop!
  end
  number
end
```
We finish it off by returning number.















