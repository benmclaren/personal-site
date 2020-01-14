---
title: "Anagrams"
date: 2020-01-14T16:31:45Z
author: Ben McLaren
draft: false
---

**Notes on the Le Wagon Hash & Symbols Array to Hash exercise**

We might want to convert an array into a hash.

Here are the constraints that it has:

- If no block is given, then the hash keys should just be integer indexes of elements in the array, converted as Strings.

- If a block is given, call it passing the array index and use what’s returned as the hash key.

1. First lets define an array which takes one parameter which we will call words.

```ruby
def group_anagrams(words)
  groups = {}
  words.each do |word|
    crash_word = word.downcase.chars.sort.join
    if groups[crash_word]
      groups[crash_word] << word
    else
      groups[crash_word] = [word]
    end
  end
  groups.values
end
```
2. Next, we create our hash, `groups` which has no content inside.

3. We now iterate over the argument, words using `.each`. Next, set a variable of `crash_word` which is equal to downcasing the word, splitting it into seperate characters, sorting them alphabetically and then joining them together.

4. Our if statement says that if groups contains the `crash_word` then add `word` into the hash using the `<<` opperator. Else, reassign `crash_word` to the array `word`.

5. groups.values will return a new array which is populated by groups of values from the hash.
