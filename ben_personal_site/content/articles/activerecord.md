---
title: "Working with Active Record"
date: 2020-01-31T16:23:47Z
author: Ben McLaren
draft: false
excerpt: "Notes on the Le Wagon Active Record Basics Models challenge"
---
**Notes on the Le Wagon Active Record Basics Models challenge**

We will go through how a small terminal application links together with active record. For this, please refer to the challenge above.

Active Record is simply a pattern found in software that stores data (Database). It features various functions such as `save` and `destroy` as well as instance variables. These are variables which represent columns in the database.

We have three things that enable this app to work. A **model**, a **controller** and a **view**

The model is simply where you keep the data and is as simple as defining our class and telling it to use ActiveRecord.

```ruby
class Post < ActiveRecord::Base
end
```
The controller is what connects the views to the model. The controller know about the model and knows which views to display. The controller will take information from the view which it gets from the user and then be able to update the database. It acts as the middle man between the views (user) and the model (database).

The views is how the user interacts with the application and where information from the database is displayed.

Now, we have already set up our model with active record. It is important that we set up our database by running the following commands in the terminal.

`rake de: create`
`rake db: migrate`

**View**

```ruby
class PostsView
  def display(posts)
    posts.each do |post|
      puts "#{post.id}. #{post.title} - #{post.votes.nil? ? "0" : post.votes} votes - #{post.url}"
    end
  end

  def ask_for(label)
    puts "#{label}?"
    puts ">"
    gets.chomp
  end
end
```

Here, we have our view where we have two methods which are contained inside a class called PostsView. This is so that it can link to our model of `Post` and that it knows it is the view.

Our first method is called `display` and takes one parameter. In this method we take posts and use a `.each` iterator to look over the posts. We then display a message to our user which says take the id of the post then put a '.' then have the post title and a '-'. Next we have a ternary operator which says; if the post votes are nil then display a '0' but if not then find the correct amount of votes and display that number. The word 'votes' is printed and a '-' which shows the url of the post. This is all data that the user has inputted and its able to find in the database under the table names.

The second method is called 'ask_for'. This also takes one parameter of 'label'. Here we simply puts the 'label' to the user. Then a '>' and finally the users input is taken and saved.

These methods will make more sense once the controller actions have been implemented and real data is given to them.

**Controller**

This class of PostsController contains all the methods that we need in order for our application to run. We also must include the line `require_relative "../views/posts_view"` as this allows it to access the information in the view. We give it the path to this file so that it can find it.

1. This first method `initialize` is given to the router and it allows it to create a new view for the user.

```ruby
require_relative "../views/posts_view"
class PostsController
  def initialize
    @view = PostsView.new
  end
```

2. This next method called `index` is what allows it to display all of the posts contained within the model. We define a variable called posts and set this as equal to gathering all the posts with `Post.all`. We can then use an instance variable of view `@view` and call our method of `.display` which we defined in our view. We give it the variable of posts which it uses to display all the posts in the format specified in the `display` method.

```ruby
def index
  posts = Post.all
  @view.display(posts)
end
```

3. The `create` method allows us to create a new post. We begin by setting two variables of `title` and `url`. The title is equal to going to the view then calling the `ask_for` method and giving it the parameter of `:title` which is specified in the table. The variable `url` is equal to the same as `title` but this time grabbing the `url` information.

We then set `post` as being equal to creating a new post with `Post.new` and then giving it two parameters. Title is equal to the title given by the user and specified in our variable `title`. The `url` is the url given by the user as specified in our variable of `url`.

Lastly we save this post to the database with `Post.save.`

```ruby
def create
  title = @view.ask_for(:title)
  url = @view.ask_for(:url)

  post = Post.new(title: title, url: url)
  post.save
end
```

4. The update method allows us to update a post. We begin by assigning `id` to the result of grabbing the `id` from the view using the `ask_for` method. We convert this to an integer with `.to_i`.

Next, we assign `post` to finding the relevant post using its id.

`title` is equal to our `ask_for` method and this time grabbing the title.

`url` is equal to our `ask_for` method and grabbing the `url`/

Then we assign the `post.title` to the title which is provided by the user.

`post.url` is then assigned to the user provided url.

Finally, we save the post to the database with post.save

```ruby
def update
  id = @view.ask_for(:id).to_i

  post = Post.find(id)
  title = @view.ask_for(:title)
  url = @view.ask_for(:url)
  post.title = title
  post.url = url
  post.save
end
```

5. The destroy method is used for removing a post from our database. We begin by finding our id as we did in the update method. Then we assign `post` to finding a specific post in the Post model with `Post.find` we pass it the id so that it can find the relevant post. Then we can call `.destroy` which removes the post from the database.

```ruby
def destroy
  id = @view.ask_for(:id).to_i
  post = Post.find(id)
  post.destroy
end
```

6. The upvote method is used for allowing us to add a vote to a particular post which increments by one each time we call this method.

Again, we can find the `id` and `post` as we have done in the previous two methods.

We can say that if the current amount of posts is equal to nil then `post.votes` should equal 1. However, if votes is not equal to 1 then take `posts.votes` and add 1 to it. We can then save our post with `post.save`

```ruby
def upvote
  id = @view.ask_for(:id).to_i
  post = Post.find(id)
  if post.votes.nil?
    post.votes = 1
  else
    post.votes += 1
  end
  post.save
end
```

That is all the methods we need in the controller for this small app to work.

Our controller code in full below

```ruby
require_relative "../views/posts_view"

class PostsController
  def initialize
    @view = PostsView.new
  end

  def index
    posts = Post.all
    @view.display(posts)
  end

  def create
    title = @view.ask_for(:title)
    url = @view.ask_for(:url)

    post = Post.new(title: title, url: url)
    post.save
  end

  def update
    id = @view.ask_for(:id).to_

    post = Post.find(id)
    title = @view.ask_for(:title)
    url = @view.ask_for(:url)
    post.title = title
    post.url = url
    post.save
  end

  def destroy
    id = @view.ask_for(:id).to_
    post = Post.find(id)
    post.destroy
  end

  def upvote
    id = @view.ask_for(:id).to_
    post = Post.find(id)
    if post.votes.nil?
      post.votes = 1
    else
      post.votes += 1
    end
    post.save
  end
end
```

Our view code in full below.

```ruby
class PostsView
  def display(posts)
    posts.each do |post|
      puts "#{post.id}. #{post.title} - #{post.votes.nil? ? "0" : post.votes} votes - #{post.url}"
    end
  end

  def ask_for(label)
    puts "#{label}?"
    puts ">"
    gets.chomp
  end
end
```

We could do a small amount of refactoring to this code. That would be to include a method in the controller for finding commonly required items. For example when we require the id we could write a method to do this to avoid repeating ourself.

```ruby
def ask_for_id
  @view.ask_for(:id).to_i
end
```

This would be placed at the bottom of the controller under a `private` method. This basically means that it is not accessible from outside the object. Having a method to find the id is not essential but helps to stick to the convention of not repeating yourself.
