---
title: "Provider"
date: 2020-01-19T14:58:14Z
author: Ben McLaren
draft: false
excerpt: "Notes on the Le Wagon Regular Expressions Provider Grouping exercise"
---

**Notes on the Le Wagon Regular Expressions Provider Grouping exercise**

Let’s say you have a user database with thousands of emails, and you want to analyze them according to their provider.

We can write a method which will group differnent emails by provider and also a method that will return emails of a certain provider.

```ruby
MAIL_REGEX = /@(?<domain>[^\.]+)\./

def group_mails(emails)
  # TODO: group email by provider
  emails.select do |email|
    MAIL_REGEX.match(email)
  end
  emails.group_by do |email|
    MAIL_REGEX.match(email)[:domain]
  end
end
```
1. To start we need to make a regex that will check to see if the email is valid. We have also specified a goup name of `<domain>`. This refers to the group inside the `()`. This will match any string with `@` then any characters and a `.`.

2. We define a method of `group_mails` which takes one parameter of `emails`.

3. Now, we can iterate over the emails given to us as an argument using `.select`. This will return an array containing all the elements which match the criteria. In this case we call `.match` on `MAIL_REGEX` and pass it an argument of `email` This will check to see if email matches with the regex.

4. We then perform a second iteration using `.group_by`. This will return a hash where the keys are the result from executing the block and the values are arrays of elements that correspond to each key. In other words the keys will be the domain names and the values are the array of elements which match the domain name.

```ruby
def provider?(email, provider)
  # TODO: return true if email is of given provider
  match = MAIL_REGEX.match(email)
  if match[:domain] == provider
    return true
  else
    return false
  end
end
```
To return true if an email is of a given provider, we can define a new method of `provider?` and this willtake two arguments; an `email` and a `provider`

1. Firstly, we assign the result of calling `.match` on the `MAIL_REGEX` to the variable `match`.

2. We can then say if its true that the domain part of the regex matches the provider then return true. However, if not then it returns false.
















