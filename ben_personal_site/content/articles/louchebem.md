---
title: "How to make a translator for parisian slang Louchebem"
date: 2020-01-13T15:00:56Z
draft: false
excerpt: "Notes on the Le Wagon Iterators & BLocks Louchebem exercise"
---

**Notes on the Le Wagon Iterators & BLocks Louchebem exercise**

Louchébem is a type of French slang that was originally spoken by Parisian butchers. Very simply, you take a normal French word like “PATRON”. You take the first consonant group (letters before the first vowel), and replace it with an “L”. Then, you put that first consonant group at the end of the word, followed by one of the louchebem suffixes, e.g. -EM. So “PATRON” becomes “LATRONPEM”.

We want to make a 'translator' that will be able to translate a word into louchebem.

These are the constraints that it has:

**constraint:** any one-letter words like “a” should not be translated

**constraint:** for words beginning with consonants (“chat”, “trou”), you’ll have to take the first

**consonant:** group (all the letters before the first vowel) and put it at the end, add an l to the start of the word and add a suffix at the end (“chat” should give “latchem”, or “latchoc”)

**constraint:** words beginning with a vowel are not changed but you should still add an l to the start of the word and a suffix at the end (“atout” should give “latoutoc” or “latoutic”)

**constraint:** the random suffix should be one of these: ["em", "é", "ji", "oc", "ic", "uche", "ès"]

**enhancement:** ideally your program should be able to translate any complicated sentence, regardless of punctuation

For solving this question from scratch what you want to do is first figure out what the “rules” are. The clue in the question is that you need to find the first vowel in a word. We know we want to split the sentence up into words and then those words up into characters and then within those words you want to find the character that is the first vowel. This is the basic idea and what we must follow.

It can be overwhelming at first but once you break it down it becomes much easier to get your head around.

1. We start by telling the program what a vowel is. This is the most important part of louchebem.

Lets write a method called `vowel` which takes one parameter of 'letter'

```ruby
def vowel?(letter)
  %w[a e i o u].include? letter
end
```
`%w` simply means that we are writing an array and using spaces between elements instead of commas. We then call `.include?` which will return a true or false if letter contains one of these letters (vowels).

2. Then write a method where we define the different suffixes and also tell it to not translate one letter words. It takes one parameter, `word`.


```ruby
def louchebemize_word(word)
  random_suffix = %w[em é ji oc ic uche ès].sample
  return word if word.size == 1 # do not translate one-letter word

  if vowel? word[0]
    # word beginning with vowel
    "l#{word}#{random_suffix}" # word beginning with vowel
end
```

- Set the suffixes that will be appended to the ends of words. We do this by storing them in an array and then callling `.sample` on the which will pick a random element from the array.

- Return the word if the word size is equal to one. `.size` will check the length of the word

- We now have an if statement which says that if the first letter is a vowel then we will add an `l` to the beginning and a suffix to the end. This is done by calling the `vowel?` on the first index position in word. This will return true and then we return a string with an l at the front and we interpolate the `#{word}` and then add `#{random_suffix}`.

- Our else statement needs to find where the first vowel is. Say the beginning is from [0] to the first vowel and the end is the first vowel to the total word length. Then it must return a string with all the variables together.

```ruby
else
  first_vowel_index = word.chars.index { |letter| vowel? letter }
  beginning = word[0...first_vowel_index]
  ending = word[first_vowel_index...word.size]
  "l#{ending}#{beginning}#{random_suffix}"
  end
```

  - For the `first_vowel_index` we call `.chars` on `word`. This will split up the word into individual elements. `.index` will then assign each letter an index. We can then use a block to say check if the letter is a vowel on each letter by calling the method `vowel?`.

  - We then define the beginning as the first letter in `word` to the `first_vowel_index`. This is done by using the `...`.

  - We then define ending as the `first_vowel_index` to the end of the word. We do this by calling `word.size` which will find the total length of the word.

  -From here we can use interpolation to build the string.

  `"l#{ending}#{beginning}#{random_suffix}"`

  Attach an `l` to the front and interpolate the ending, then beginning, then suffix.

Here is the full method below

```ruby
def louchebemize_word(word)
  random_suffix = %w[em é ji oc ic uche ès].sample
  return word if word.size == 1 # do not translate one-letter word

  if vowel? word[0]
    # word beginning with vowel
    "l#{word}#{random_suffix}" # word beginning with vowel
  else
    # word beginning with 1 or more consonants
    first_vowel_index = word.chars.index { |letter| vowel? letter }
    beginning = word[0...first_vowel_index]
    ending = word[first_vowel_index...word.size]
    "l#{ending}#{beginning}#{random_suffix}"
  end
end
```

It is important to remember that the test file only uses one method when it runs the test and that will be our final method `louchebemize`. In the test file it `requires louchebemize` This allows it to access this method.

```ruby
def louchebemize(sentence)
  result_elements = []
  words = sentence.split(/\b/)
  words.each do |word|
    if word =~ /\W/
      result_elements << word
    else
      result_elements << louchebemize_word(word)
    end
  end
  return result_elements.join
end
```
This method takes one parameter and thats (sentence).

- We begin by defining an empty array of `results_elements`

- Next, we call `.split` on `sentence`. `/\b/` means that it wil split after whole words.

- We can iterate over words and then say that if the word is equal to any non word character then append the word into the `results_elements`. `=~`is Ruby's basic pattern-matching operator. When one operand is a regular expression and the other is a string then the regular expression is used as a pattern to match against the string. `/\W/` stands for any non word character.

- Our else statement says that all other words will have the louchembemize method called on them and appended into `result_elements`

- We can then return the `result_elements.join`. `.join` builds the sentence by joining words with a space in between.
















