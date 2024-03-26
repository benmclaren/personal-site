---
title: 'Using blocks with yield'
date: 2020-01-13T12:07:53Z
author: Ben McLaren
draft: true
excerpt: 'Notes on the Le Wagon Iteratros & Blocks About Blocks exercise'
---

**Notes on the Le Wagon Iteratros & Blocks About Blocks exercise**

Intoduction to blocks and using yield.

# Timer

Yield is a Ruby keyword executing the block. It tells the method to execute a block now.

Lets start with a timer method which will simply return the time taken to execute a given block.

```ruby
def timer_for
  start_time = Time.now
  yield
  end_time = Time.now
  time_taken = end_time - start_time
  return time_taken
end
```

1. We start by setting start_time to the current time by using `Time.now`.

2. Use the keyword 'Yield' to tell the method to run the block now

3. Set end_time to `Time.now`

4. Assign the calculation of end_time - start_time to time_taken and return it to get the total time taken.

# Achieving `.map` behaviour without using `.map`

```ruby
def my_map(array)
  new_array = []
  array.each do |name|
    new_array << yield(name)
  end
  return new_array
end
```

'.map' will create a new array for us. However, if we are not using `.map` then we must create this new array ourselves by setting `new_array` to an empty array.

We then iterate over the array with `.each`. We can then use `yield` to call the block this time giving it a parameter so that it will call the block and insert the parameter of `name`.

You can then return the new array.

# Building HTML tags around content in a block

```ruby
def tag(tag_name, attributes = nil)
  attr_name = attributes.nil? ? nil : attributes.first
  attr_value = attributes.nil? ? nil : attributes.last

  open_tag = attributes.nil? ? tag_name : "#{tag_name} #{attr_name}=\"#{attr_value}\""
  content = yield
  "<#{open_tag}>#{content}</#{tag_name}>"
end
```

This method takes two parameters `tag_name` and `attributes`. `= nil` means that if no parameter is given then it will assign it to nil. You can think of it as being an optionl parameter.

We start by calling `nil?` on atrributes to check if it is nil or if a parameter has been given. It returns a boolean value. We use a ternary operator which says if the value is true ( meaning it is nil) then keep it as nil otherwise grab the first element. The same logic is applied to `attr_value` but we take the last element instead.

Then we define an `open_tag` which also makes use of a ternary operator. It states that if the attribute is nil then return the `tag_name` only but if not then build the following:

```ruby
"#{tag_name} #{attr_name}=\"#{attr_value}\""
```

We have interploated the tag name and then the attirbute (for example "style"). Then we have an `=` and an interpolation of the attibute value (for example "color: red"). We require the use of the \ in order to use " in the middle of the string. It just means it ignores the character and does not treat it as the end of the string.

Then we say that content is = to running the block (yield). Finally we build our HTML code.

```ruby
"<#{open_tag}>#{content}</#{tag_name}>"
```

We interpoloate each part to make the HTML code, adding in essential characters where needed.This is returned as a string.
