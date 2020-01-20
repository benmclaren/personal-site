---
title: "Translation"
date: 2020-01-19T16:36:01Z
author: Ben McLaren
draft: false
excerpt: "Notes on the Le Wagon Regular Expressions A Translation Story exercise"
---

We are going to build a simple tool that will be able handle translations by checking to see if they are stored in the hash.

```ruby
STRINGS = {
  home: {
    intro: {
      en: 'Welcome on Le Wagon',
      fr: 'Bienvenue sur Le Wagon',
      de: 'Wilkommen aus Le Wagon'
    },
    content: {
      explanation: {
        en: 'This is an interesting exercise',
        fr: 'C\'est un exercice interessant',
        de: 'Es ist eine interesante Übung'
      },
      goodbye: {
        en: 'Goodbye',
        fr: 'Au revoir',
        de: 'Tchüss'
      }
    }
  }
}
```

Here, we have our method `translation` which takes two arguments.

```ruby
def translation(a_string, a_language = :en)
  #code here
end
```

The first argument is a string that describes the path through the keys separated by a dot (we assume no dots in keys), and the second argument is the language, which falls back to 'en' as a default if one is either not provided or does not exist.

```ruby
translation('home.intro', 'fr') # => 'Bienvenue sur Le Wagon'
```

Here is our method which is able to return the correct translation from the hash.

```ruby
def translation(a_string, a_language = :en)
  keys = a_string.split(".")
  translation = STRINGS
  keys.each do |key|
    translation = translation[key.to_sym]
    return "" if translation.nil?
  end
  return translation[a_language.to_sym] || translation[:en]
end
```

1. We start with calling `.split(".")` on the `a_string` passed in as an argument. The result of this is assigned to `keys`. This will give us an array of strings which have been seperated on the ".".

2. Next we assign our hash of srtings to the variable `translation`

3. We can now iterate over our new created array, `keys` using `.each`. For each `key` we say `translation` (our hash) is equal to adding a key to the hash and calling `.to_sym` to transform it into a symbol. We return `""` if `translation` is not found. In other words, it does not have a relevant key.

4. Finally, we return one of two options. Option one being it was able to find a translation for the key. Or we return option 2 which is no key was found and therefore it will revert back to english.
















