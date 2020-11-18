---
title: "Image Overlays"
date: 2019-02-17T10:58:45Z
author: Ben McLaren
draft: false
excerpt: "An overlay seems like it would be something difficult to achieve however, it is actually relatively simple and it can be done with just CSS."
---

An overlay seems like it would be something difficult to achieve however, it is actually relatively simple and it can be done with just CSS.

For this example, let's assume that you wish to overlay text on an image when you hover over it. To do this let's first take a look at some HTML.

``` html
<section>
  <div class="photo"
    <div class="overlay">
      <h2>
        some text
      </h2>
    </div>
      <img src="my-image.jpg">
  </div>
</section>
```

Above is some simple HTML code for an image contained in a section. As you can see we have two `<div>` tags. One has a class of `.photo` applied to both the image and the text. Within that we have a class of `.overlay` which targets the text we wish to overlay. That is all the HTML we need.

### Applying CSS

Now, here is where it gets slightly more complicated.
Firstly we must apply `position: relative;` to our `.photo` class. This means that our overlay will be positioned in relation to the parent photo element.

Next, we must target the `.overlay`

1. Apply a `position: absolute;`
-This allows us to position anywhere on the page in relation to the parent element which, in this case is our image.

2. We then apply a `width: 100%` and `height:100%`. This means that the overlay will fill the whole space of the image when you hover over it.

3. Next, we set what we actually want to happen. In this case let's set a `background-color`.

4. Set the `opacity: 0;` so that it is hidden from view. If you like, you can add a `transition` to make the effect more subtle.

5. We wish to center our text in the middle of the image. To do this we would apply `display: flex;` `justify-content: center;` and `align-items: center;`. If you do not want the text centered in the middle you can simply offset it by using `top: left: bottom: right:` values.

6. Set the `z-index: 2;` to place the overlay on top.

```
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(32, 58, 143, 0.85);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
```

*^Full code* *(Please note `background-color` is using rgba values and has an opacity of 85%)*

Now that the overlay has been specified, we just need to add the CSS to activate the hover effect. See below:

```
.photo:hover .overlay {
  opacity: 1;
}
```

The only thing to do from here is to style your text however you wish.

When you hover over the image, you should now have an overlay of text and colour.
