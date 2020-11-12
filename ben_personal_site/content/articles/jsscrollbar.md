---
title: "Horizontal scrollbars"
date: 2020-02-08T15:31:11Z
author: Ben McLaren
draft: false
excerpt: "Making a horizontal scrollbar with JQuery"
---

We are going to make a scrollbar that will scroll horizontally as the user scrolls vertically down the page. This is a nice feature to have especially on longer pages as you can quickly display to the user how far through an article they are.

We need to use JQuery for this so make sure that you have imported the JQuery library. See this site as a demonstration of what we are going to build. [Example Site](https://interior-weekly-237.superhi.com/)


**To start, let's set out our HTML**

We only require two divs.

```HTML
<div class="progress">
  <div class="bar">
  </div>
</div>
```

The div with the class `progress` will be fixed to the top of our screen and will always be visible as we scroll. Inside of this we have a div with the class `bar`. This is going to be for the actual bar itself which we will move as we scroll.

**Set up our CSS**

For our first `progress` div we need to fix its position to the top of the page using `position: fixed;` and `top: 0;`, `left: 0;`. Then we need to give it a width of 100% so that it stretches across the page.

```CSS
.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
```

The `bar` div is the one we will modify and therefore we need to position it at the top of our page but this time give it a width of 0 as this is what we will change with javascript. We also need to give it a height and a color so that we can see it.

```CSS
.bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: blue;
}
```

1. We start by defining a function that says, on scroll, run the following code. We can do this by using the `$` sign to select the `document` then say on scroll perform the function.

Inside our function we can set a variable called `pixelsFromTop`. This is equal to us calling the `scrollTop` method on the entire document. The scrollTop method gives us back a pixel value for how far it is to the top from our current scroll position.

We also need to set the `documentHeight` and `windowHeight` so that our scroll bar has some measurements to use. We can again use the `$` to select the document and window respectively and use the method `.height` to find their heights. The document refers to the entire webpage where as the window refers to the viewable area at that current time.

```javascript
$(document).on('scroll', function() {
  var pixelsFromTop = $(document).scrollTop()

  var documentHeight = $(document).height()
  var windowHeight = $(window).height()    
})  
```

2. Now we need to figure out how far down the page we have scrolled. To do this we need to make some calculations.

We can add in two more variables. The first is the difference. This is equal to the the result of subtracting the document height from the window height.

Next, we need to get a percentage value so that we can adjust the width of the scroll bar accordingly. To do this we can divide the amount of pixels we are from the top of our document by the height of the current window. This is then multiplied to achieve a percentage value.

```javascript
$(document).on('scroll', function() {

  var pixelsFromTop = $(document).scrollTop()

  var documentHeight = $(document).height()
  var windowHeight = $(window).height()          

  var difference = documentHeight - windowHeight

  var percentage = 100 * pixelsFromTop / difference
})
```

3. The final step is to add in some code to actually alter our width value on the progress bar. We can select the class of `.bar` and then tell it to find a css property called `width` (using .css). Then we say change the width to be our `percentage` value. However, we need to add in a `+ '%'`. This is in order to tell it to use a percentage value and not a pixel value which it assumes you are using by default.

```javascript
  $('.bar').css('width', percentage + '%')  
```

The full code below

```javascript
$(document).on('scroll', function() {

  var pixelsFromTop = $(document).scrollTop()

  var documentHeight = $(document).height()
  var windowHeight = $(window).height()          

  var difference = documentHeight - windowHeight

  var percentage = 100 * pixelsFromTop / difference


  $('.bar').css('width', percentage + '%')  
})  
```

And that's it! You now have a beautiful scroll bar at the top of your page.
