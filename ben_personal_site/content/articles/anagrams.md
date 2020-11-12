---
title: "Converting an array of strings into grouped arrays "
date: 2020-01-14T16:31:45Z
author: Ben McLaren
draft: true
excerpt: "Notes on the Le Wagon Hash & Symbols Combine Anagrams exercise"
---

**Notes on the Le Wagon Hash & Symbols Combine Anagrams exercise**

An anagram is a word obtained by rearranging the letters of another word. For example, “SPOT”, “OPTS”, “POTS” and “POST” are an anagram group because they are made up of the same letters.

If we have an array of strings we want to turn them into multiple grouped arrays. We need to write a method that groups them into anagram groups and returns the array of groups.

1. First lets define a method which takes one parameter which we will call words.

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

3. We now iterate over the argument, words using `.each`. Next, set a variable of `crash_word` which is equal to downcasing the word, splitting it into seperate characters (`.chars`), sorting them alphabetically (`.sort`) and then joining them together (`.join`).

4. Our if statement says that if groups contains the `crash_word` then add `word` into the hash using the `<<` opperator. Else, reassign `crash_word` to the array `word`.

5. `groups.values` will return a new array which is populated by groups of values from the hash.
