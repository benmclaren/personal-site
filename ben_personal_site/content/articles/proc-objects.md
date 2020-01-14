---
title: "What are Proc Objects? and how they are used"
date: 2020-01-14T11:23:38Z
author: Ben McLaren
draft: false
excerpt: "Notes on the Le Wagon Iteratros & Blocks Proc objects exercise"
---

**Notes on the Le Wagon Iteratros & Blocks Proc objects exercise**

A **Proc Object** is an encapsulation of a block of code which can be stored in a variable. In other words you can call them, pass them to other methods and pass them to other proc objects. It differs to `yield` in the sense that it can be called later as it has stored the block information. A method that it is called on may also call another method and therfore this block needs to be transferred to the sub method.

To create a Proc Object you can prefix the last argument in a method with **&**. This will create a Proc Object from the information given in any block passed in.

**Here is an example:**

```ruby
def tell(who, &message_blk)
  "#{who}, #{message_blk.call}!"
end
```

In this method we give it two arguments, `who` and `&message_blk`. The **&** creates a Proc Object meaning that it will now store the infromation of a block passed to it. The method returns a string with the who interpolated as well as the block of code which has been called using the `.call` method.


```ruby
def tell_mum(&message_blk)
  tell("mum", &message_blk)
end
```

This second method `tell_mum` takes one parameter of `&message_blk`. The method calls the our previous `tell` method and passes in the two arguments it requires. "mum" and the block. This means that the `tell` method can recieve and use the block specified in the other method and perform the desired action.

**Lets expand on this**

```ruby
def tell_with_proc(who, message_blk)
  "#{who}, #{message_blk.call}!"
end
```
The message is now passed as a block as has been previously defined and subseqneutly it can return a string by calling `.call` on `message_block`


```ruby
def tell_mum_with_proc(message_blk)
  tell_with_proc("mum", message_blk)
end
```
This final method takes the single `message_block` parameter and calls the `tell_with_proc` method. It passes in the two required arguments "mum" and the block defined by `message_block`.















