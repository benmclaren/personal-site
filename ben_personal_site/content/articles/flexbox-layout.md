---
title: 'Flexbox grid layouts'
date: 2019-02-14T10:56:16Z
author: Ben McLaren
draft: false
excerpt: 'Flexbox is a very powerful tool and it is one that can be used to create layouts as well as responsive navigation bars.'
---

Flexbox is a very powerful tool and it is one that can be used to create many different layouts.

Let's say that you wish to lay out a selection of images on a page in a grid style. In the past this would have been difficult to achieve inlvolving developers needing to 'hack' their way around it using floats. However, with only a few lines of code flexbox is able to create a grid.

<a class="email" href="https://boycefolio.superhi.com/" target="_blank">Click here</a> to see an example site.

Firstly, ensure that all the images you wish to be formatted this way are grouped together in a `<section>`.

Now we can target the photos with a few key properties.

```css
display: flex;
flex-wrap: wrap;
align-items: center;
```

`display: Flex;`: Specifies that we are using Flexbox and the children become flex items. This will place all the images next to each other on one row across the page.

`flex-wrap: wrap;`: This is required in order to achieve the grid. The property means that the items will now wrap onto a new line once they run out of space on the row.

`justify-content; center:` This will align the grid in the center of the page. Of course you can choose any value for this.

You can use `padding` or `margin` to create a gap around each image.

This is very quick and easy way to achieve grid layouts which work well in showcasing images for a portfolio.
