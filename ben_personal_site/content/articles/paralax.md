---
title: "How to make a Paralax effect"
date: 2019-02-19T11:00:16Z
author: Ben McLaren
draft: false
excerpt: "A Paralax effect is an interesting but effective way of displaying content and is quite easy to achieve."
---

**Paralax effect (CSS Only)**

A Paralax effect is an interesting but effective way of displaying content and is quite easy to achieve.

In order to explain how to implement this effect I think it is easiet to apply it to a real use case site.

<a class="email" href="https://sallyhartportfolio.superhi.com/" target="_blank">Click here</a> to see an example site.

The effect we are trying to achieve is actually in fact very simple. It is only one line of code that we need. In order to properly understand, it is important to see how the site is built and how you can achieve the same effect.

**Below** we can see the HTML code for the four images displayed on the website.

``` html
<section class=" image-1"> </section>
<section class=" image-2"> </section>
<section class=" image-3"> </section>
<section class=" image-4"> </section>
```

Now here is the CSS code. You can see that the section has been targeted. The key part here is the `background-attachment: fixed;`. This means that the background images are no longer fixed to the section and instead it is fixed to the viewport. This means that as the page is scrolled, the background image is scrolled away with the first pages viewport and replaced by the image attached to Page 2's viewport. This creates the Paralax effect.

``` css
section {
 height: 100vh;
 background-image: url(sally_1.jpg);
 background-size: cover;
 background-attachment:  fixed;
}
```
