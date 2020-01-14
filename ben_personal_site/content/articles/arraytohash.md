---
title: "Arraytohash"
date: 2020-01-14T10:19:32Z
author: Ben McLaren
draft: false
---

**Notes on the Le Wagon Hash & Symbols Array to Hash exercise**

We want to write a method that takes an array as an argument and will convert it into a hash.

Our method should do the following:

- If no block is given, then the hash keys should just be integer indexes of elements in the array, converted as Strings.
- If a block is given, call it passing the array index and use what’s returned as the hash key.

This the code that we would need to perform this.
```ruby
def array_to_hash(array)
  hash = {}                                        *create empty hash*
  array.each_with_index do |item, index|           *loop over array*
    key = block_given? ? yield(index) : index.to_s *ternary to set the key in both cases*
    hash[key] = item                               *set the new key/value pair*
  end
  return hash                                      *return built hash*
end
```
Lets go through it step by step.

1. Firstly we define our method `array_to_hash` which takes one parameter, an array.

2. We create our hash variable and set it to an empty hash with the `{}`

3. Next, we loop over the array using `.each_with_index`. This takes two arguments, the individual item and will also assign each item an index value.

4.We use a ternary to set the key in both cases. Each case reffering to if a block has been given or not. `block_given?` simply means that it will return true if a block has been given and will subsequently call the block using yield and giving yield the parameter of index. If
`block_given?` returns false then then index will be converted to a string by calling `.to_s`.

For example:

```ruby
array_to_hash([1,2,3]) do
  # code here
end
```

Here we have called `array_to_hash` with a block so it will return true

However, if we do not call it with a block and instead just give an array as the argument then it will return false.

```ruby
array_to_hash([1,2,3])
```

The results of this are then assigned to the variable `key`.

5. Finally, we can update our hash with the new content. This is done by selecting our current empty hash, selecting all of the keys using the [] notation and then assigning them to the various items that we have.

`hash[key] = item`

We then return the hash.









