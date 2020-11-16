---
title: "Making responsive text"
date: 2019-01-29T11:35:33Z
author: Ben McLaren
draft: false
excerpt: "Websites need to look good across a multitude of screens and therefore it is essential that a site is responsive so that a user's experience is not affected by their choice of screen size."
---

Websites need to look good across a multitude of screens and therfore it is essential that a site is responsive so that a user's experience is not affected by their choice of screen size. I encountered a problem whilst building this site that was causing some of my headers to be cut off of the page when the browser size was reduced. I had previously tried using margins and padding to try and fix this issue however, some research led me to media queries.

### Building mobile first

One of the key principles I follow when building websites is to design for mobile first. I find that it is a lot easier to scale a website up rather than scale it down.

```css
.hero-intro  h2 {
  font-family: freight-sans-pro, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  padding-top: 50px;
  padding-bottom: 25px;
  max-width: 960px;
  color: #262626;
  line-height: 70px;
}

```

Here is the **original** CSS code for my sub-heading on the home page.

The key part here is my `font-size: 70px;`. Once the browser was reduced in size to lower than 440px it was causing some letters to be cut off. In order to fix this, I would need to use a media query. The basic premise is that we want to design the text so that starts smaller and can then grow in size as the scale of the browser window is increased.

#### Syntax

```css
@media device type and (rule) {
  .target class {
    styling you want to apply;
  }
}

```


This is the basic syntax for a media query.

1. Start off with `@media` <br>
2. Next specify which device it is. This could be 'screen', 'tv' etc.. (it is likely in most cases to just specify 'screen')<br>
3. You must have the keyword **and**<br>
4. Then apply the rule<br>
5. Specify the class you are targeting<br>
6. Indicate the styling that will be applied when the rule is met

Now that you have a basic understanding of the media query syntax, we can apply it to a real example.

```css
@media only screen and (min-width: 440px) {
  .hero-intro h2 {
    font-size: 70px;
  }
}

```

This is the media query in order to allow my text to reduce in size as the browser window does.

As you can see, I specified the device type as 'screen'. I have indentified the condition for when I want my `min-width` style to be applied. This means that my style will be applied to all screens that are larger than the given value of 440px. I have then targeted the class of `.hero-intro 2` and written my style `font-size: 70px;`.

**To summarise:** The font-size of 70px is now only being applied to the text when it is displayed on a screen size higher than 440px.

You may have noticed that the two font-sizes are the same. We simply now change the standard font size to a size that we want, in this case 65px.

```css
.hero-intro  h2 {
  font-family: freight-sans-pro, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 65px;
  padding-top: 50px;
  padding-bottom: 25px;
  max-width: 960px;
  color: #262626;
  line-height: 70px;
}

@media only screen and (min-width: 440px) {
  .hero-intro h2 {
    font-size: 70px;
  }
}
```


The full code is above. The starting font size is now 65px and it will now apply the style of `font-size: 70px;` once the threshold of 440px is crossed.

A simple way to look at a media query is to think about how a computer is reading it.

You are saying: 'Here is the code **BUT** if this condition is met then apply this style. Otherwise, just apply the original styling'.
