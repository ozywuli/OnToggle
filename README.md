# OnToggleJS

# Getting Started

You need a toggle element and a element that you want to toggle.

Toggle element:

```html
<a 
    href="#" 
    class="js-toggle" 
    data-toggle-target="js-menu"
>
    Toggler 1
</a>
```

Element that is toggled:

```html
<div class="menu js-toggle-target js-menu">I am a menu</div>
```

Now instantiate the OnToggle constructor:

```js
let myOnToggle = new OnToggle();
```

