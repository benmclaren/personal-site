---
title: "Making an inline navigation bar with Flexbox"
date: 2020-01-05T12:38:34Z
author: Ben McLaren
draft: false
excerpt: "One of the key components on my site is the responsive navigation bar. Initially, I had attempted to create this using floats however, I quickly realised that this was not an effective way of constructing this element."
---

One of the key components on my site is the navigation bar. Initially, I had attempted to create this using floats however, I quickly realised that this was not an effective way of constructing this element. It was at this point that I researched Flexbox and how it can be used to make a responsive component.
<br>
<br>
### Setting out the HTML
<br>
<br>
```html
<header class="header">
    <ul class="nav">
      <li class="nav-link">
        <a href="work.html">Work</a>
      </li>
      <li class="nav-link">
        <a href="articles.html">articles</a>
      </li>
      <li class="nav-link">
        <a href="contact.html">Contact</a>
      </li>
    </ul>
</header>
```

<br>
Above you can see the HTML for the navigation bar. In order to create it, we need to start with an unordered list `<ul>`. I chose to give this the class name of "nav" but of course you can use any name that you wish. This will allow us to target the list as a whole when it comes to the styling.
<br>
<br>
The next step is to create the list items `<li>`. As you can see I have three links in my nav bar to my 'work', 'articles' and 'contact'. I have given each of these `<li>` items the class name of "nav-link".
<br>
<br>
This is all wrapped up in the `<header>` tag with the simple class name of "header". Thats it! As long as the items are direct children of the parent container they will then turn into flex items.
<br>
<br>
### Adding the CSS to enable Flexbox
<br>
<br>
```css
.nav {
  display: flex;
  justify-content: center;
  flex: 1;
}

```

<br>
Above is the CSS code. The only part we are interested in for now is the `display: flex;`. This has given the `.nav` class the flex property. We are now able to justify the content in whichever position we like. I have placed it in the center using `justify-content: center;`. You can also justify the content to the start and end of the container by using `justify-content: flex-start/end`.
<br>
<br>
By default, Flexbox will align the list items horizontally and therfore, we do not need to specify the direction. However, if you do want the list items aligned vertically you could simply input `flex-direction: column;`.
<br>
<br>
The bar becomes responsive with the property of `flex: 1;`. This means that the list items will fill up their container and will shrink and grow with the browser window. Ajdusting the flex value will cause them to grow and shrink at different rates. `flex: 1;` is shorthand for `flex-grow:` `flex-shrink:` and `flex-basis:`. The grow and shrink properties allow you to adjust the rate at which items grow and shrink. Flex-basis is a way of setting the base width of an item and it will not grow beyond this width.
<br>
<br>
```css
.nav {
  display: flex;
  justify-content: center;
  flex: 1;
  font-size: 20px;
  padding: 0px;
  padding-bottom: 20px;
  border-bottom-style: solid;
  border-bottom-width: thin;
}
```

<br>
Once you have added the flex properties to your nav bar, you can then add the CSS styling of your choice, as shown above.
<br>
<br>
### Conclusion
<br>

Flexbox sounds as if it is a complex process however, as demonstrated it is actually relatively simple. As long as you follow these steps and your code is laid out in an organised way, then you will be able to use this knowledge across your websites.
