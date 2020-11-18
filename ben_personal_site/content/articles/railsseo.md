---
title: "SEO in Rails"
date: 2020-02-04T17:48:45Z
author: Ben McLaren
draft: false
excerpt: "Some pointers for better SEO with Rails"
---

SEO is an important but often overlooked aspect of web development. It is essential in ensuring the maximum exposure for your website and good SEO can really improve traffic to your sites.

### Dynamic page titles

Imagine that we have a review website. We might want to have the title of our webpage change depending on which page of our website the user is on.

Rails has a helper method called `content_for` that allows us to do just that.

We start off by going to our `application.html.erb` file where we will find the `head` of our webpage. This contains our title. We can add the `content_for` helper in using embed Ruby tags. We can choose what we call it but it makes sense to call it `:page_title` as this is what the content is for.

The syntax looks like this. The first part is the helper method and the second part is what we want to refer to it as or in other words what content are we targeting. This needs to be written as a symbol as it is something that will be used across the site and won't change.

`content-for, :page_title`

We can then drop it into our `title` tag like this:

```Ruby
<title> <%= content_for :page_title %> - Bien Reviews </title>
```

Now we can go to our views and extract the information that we want from there to be used in the title.

At the top of your view we need another erb (embed ruby) tag. Note that we do not want the `=` present this time as we are not displaying this content in the view, simply extracting information from it.

```Ruby
<% content_for :page_title, @review.title %>
```

Then we have our helper of `content_for :page_title` which we wrote earlier followed by a comma. This is where we put what is is we want the title to be. In our case, in our review website we have a title for each review so we want to display this. We can say `@review.title.` This is relating to our model of `Review` and we are grabbing the `title` information for this particular page. Of course this needs to be adapted depending on what content it is you are displaying. Now, each of our review pages will have a title of the specific review in the tab.


### Improved URL's

Have a look at these two urls for two different music review sites. One is a lot clearer than the other.

`http://drownedinsound.com/releases/20498/reviews/4152162`

This first url is not that clear as to what the page is about, you get it might be review but the numbers are ultimately meaningless to the user.

`https://pitchfork.com/reviews/albums/eminem-music-to-be-murdered-by/`

Take this second url. It is immediately clear as to what it is. It's a review of an album by eninem called music-to-be-murdered-by.

In our model we can override the default URL with a thing called `to_param`. This is deep within rails but we are going to take it out and change it.

To do this we can define the method `to_param` and give it new instructions.

```Ruby
def to_param
  #code to override will go here
end
```
In our example of the review website we can take the `id` of the review and convert it to a string so that we can use it in the url.

Next, we want to add some information. We can do this by using a '+' sign and we are going to have a "-" here. Then we can have the title of the page we are on. We can get this using the word `title` which we are able to access as we are inside the model.

Now, as it stands the url will change to include the title but the spaces will be filled with '%' and it does not look that great. To change this we can change it into a parameter by using  `.parameterize` on the title. What this will do is get rid of the spaces, uppercased letters, slashes etc which makes the URL hard to read and will convert it into a much more friendly and cleaner URL.

```Ruby
def to_param
  id.to_s + "-" + title.parameterize
end
```

These small improvements are relatively simple to implement and make a big difference to any website.
