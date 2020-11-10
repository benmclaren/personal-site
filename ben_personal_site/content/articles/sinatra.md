---
title: "Sinatra"
date: 2020-07-20T14:24:01+01:00
author: Ben McLaren
draft: false
---

We are going to build out a basic MVC application using the Sinatra framework. Sinatra is a Domain Specific Language (DSL) for creating web apps in Ruby. It follows the MVC pattern although in Sinatra's case there is an `app.rb` file which acts as the controller. The routing is handled by the framework itself. We can write routes in this `app.rb` file which allows Sinatra to map the URL in the browser to the correct method in the `app.rb` file.

###So how does Sinatra work in practice?

Let's assume that you have a basic project started which displays posts and has the ability to add a post. There are two models. A Post model and a User Model. The user model will have many posts and posts will belong to a user. We also have a database with some posts for us to display.

###Adding first routes to `app.rb`

Inside of the `app.rb` file we can start writing our first route. We want to display all the posts on our homepage. Firstly, we can set up a new method which will be a `get` request which is used to request data. We want to set its path to the route of the site, so the route can be left as simply a `/`. We then need to grab all the posts from our database and can do this by using the `.all` method on our Post class. This is what we end up with:

```Ruby
get '/' do
  # 1. fetch posts from database
  posts = Post.all
  # 2. Store these posts in an instance variable
  @posts = posts
  erb :posts # Do not remove this line
end
```

Now, that we have set up the correct method in the `app.rb` file we need to actually display them on our page.

For this, we can create a `posts.erb` file inside our views.

This is the homepage of our site and where we need to display the posts. To do this we need to iterate over our `@posts` variable which we made in the controller method and then display what bots of data we want.

```Ruby
<ul>
  <% @posts.each do |post| %>
    <li>
      <a href="<%= post.url %>" target="_blank"><%= post.name %></a>
    </li>
  <% end %>
</ul>
```

We create an unordered list so that we can show them nicely. We iterate over our posts using `.each` and then on each line of our list we take the post url and the post name and display them. In this case they are also been made as a link.

####What if we wanted to reorder our posts so that they were shown in order of how many votes they have?

We can use something called scopes to do this. There is no need to worry about the most technical definition of scopes as often they are complicated. In simpler terms, all a scope is, is a method which you specify in the model and then you can call this method on instances of your model. For example, we want a method to reorder our posts.

In our Post model we can say:

`scope :by_most_popular, -> { order(votes: :desc) }`

We define that we are writing a scope and then we give the method a name, in this case `by_most_popular`. Next, we have a comma followed by an arrow. Now, we say what this method does. We are going to order something so we use the word order, which ruby understands. Then we say what we want to order. We want to order our `votes` by a descending order. It knows about votes as this is specified in the schema and `:desc` is built in to ruby and its how we say 'descending order'.

Now that we have made our scope we can add this into our method we just made. You can see that we can simply chain it with other methods, so now it grabs all posts and then orders them using our `by_most_popular` method.

```Ruby
get '/' do
  # 1. fetch posts from database
  # Calling the scope method defined in the model to order then in descending order
  posts = Post.all.by_most_popular
  # 2. Store these posts in an instance variable
  @posts = posts

  erb :posts # Do not remove this line
end
```

### Adding in complexity

In order to add in the ability to create a post, we need to add in a new route to `app.rb`. We are still on the homepage so we the route of our post can remain as `/`, exactly like the last method. However, this time, we are making a post request. This is what we use when we want to send data to a server.

Ultimately we will have a form on the homepage where the user can input the details of the post they want to add and then in our method we will grab these details and use them to create a new post.

Let's start with the method.

We define a new instance variable equal `@post` which is equal to creating a new post with `Post.new`

Then we target the name of the new post with `@post.name` and assign this to `params[:name]`. Params is something which we will have access to once the input types the data in the form. The params are contained inside a hash and they will have a name and a url in them as this is whats required to make a new post. Therefore we can grab the url by doing the same as we did for the name but switching out the word name for url.

The post also needs a user so we will assign it to the first user in our database.

Lastly, we save it, using the `.save` method.

```Ruby
  post '/' do
    @post = Post.new
    @post.name = params[:name]
    @post.url = params[:url]
    @post.user = User.first
    @post.save
  end
```
We have grabbed all the data and saved the post but we need to do something with this post.

Still inside the method, we can write an if statement.

```Ruby
  if @post.save
    redirect to('/')
  else
    erb :new_post
  end
```
This says if the post successfully saves then redirect to the homepage. If it does not save then redirect to another page. This other page could just be a page where you show the error as to why it did not work.

The method is now set up but we need to add the form in on the homepage to be able to add a post.

```Ruby
  <form action="/" method="POST">
    <label for="name">Post name</label>
    <input type="text" name="name" value="<%= params[:name] %>"/>

    <label for="url">URL</label>
    <input type="text" name="url" value="<%= params[:url] %>"/>

    <input type="submit" value="Add"/>
  </form>
```

We create an HTML form on our homepage.

The action of the form is the path where the submit button is going to go to.
we also define the method type which is a POST

Once the user has entered the values we have access to them in the params
and we can grab the name and the url from the params and assign that as the value.

The last thing to do to allow our post to be created is to add a line to our home get method.

`@post = Post.new`

This should be added at the bottom of our get method so that once the data is collected by the form, a new post is generated by the post method then the get method can use that instance variable `@post` and create a new post with it.

#### Adding ability to vote

The final feature we will introduce is the ability to upvote a post. Much like submitting a post, we will need to write a new method to handle what happens when a user clicks on vote and will also need to introduce something into our view which the user can interact with.

Let's start by writing out the method in the `app.rb` file.

This time we want to use a PUT method. 
