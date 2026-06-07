# FitSphere Styling Guide

## Color Palette

### Primary Colors
```css
Primary Orange: #FF6B35
Accent Gold: #F77F00
```

### Secondary Colors
```css
Deep Blue: #004E89
Dark Gray: #1a1a1a
Darker Gray: #0f0f0f
```

### Neutral Colors
```css
White: #FFFFFF
Light Gray: #E8E8E8
Gray: #A9A9A9
Dark Gray: #4A4A4A
```

### Semantic Colors
```css
Success Green: #10B981
Warning Yellow: #F59E0B
Danger Red: #EF4444
Info Blue: #3B82F6
```

---

## Tailwind CSS Custom Classes

### Pre-built Button Classes

#### Primary Button
```html
<button class="btn-primary">Click me</button>
```
**Styling**: Orange background, hover effect, shadow, white text

#### Secondary Button
```html
<button class="btn-secondary">Click me</button>
```
**Styling**: Blue background, hover to primary, shadow

#### Outline Button
```html
<button class="btn-outline">Click me</button>
```
**Styling**: Bordered primary color, hover fill

---

### Form Input Fields

#### Standard Input
```html
<input class="input-field" placeholder="Enter text..." />
```
**Styling**: Dark background, gray border, focus on primary color

#### Textarea
```html
<textarea class="input-field" placeholder="Enter text..."></textarea>
```
**Styling**: Same as input field

#### Select
```html
<select class="input-field">
  <option>Option 1</option>
</select>
```
**Styling**: Same as input field

---

### Card Component

#### Standard Card
```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```
**Styling**: Dark background, border, rounded corners, shadow, hover effect

---

### Typography

#### Gradient Text
```html
<h1 class="gradient-text">FitSphere</h1>
```
**Styling**: Orange to gold gradient text

#### Headings
```html
<h1 class="text-4xl font-bold">Heading 1</h1>
<h2 class="text-3xl font-bold">Heading 2</h2>
<h3 class="text-2xl font-bold">Heading 3</h3>
<h4 class="text-xl font-bold">Heading 4</h4>
<h5 class="text-lg font-bold">Heading 5</h5>
<h6 class="text-base font-bold">Heading 6</h6>
```

#### Text Sizes
```html
<p class="text-xs">Extra Small (12px)</p>
<p class="text-sm">Small (14px)</p>
<p class="text-base">Base (16px)</p>
<p class="text-lg">Large (18px)</p>
<p class="text-xl">X-Large (20px)</p>
<p class="text-2xl">2X-Large (24px)</p>
<p class="text-3xl">3X-Large (30px)</p>
<p class="text-4xl">4X-Large (36px)</p>
```

---

## Responsive Design Breakpoints

### Tailwind Breakpoints
```css
mobile:    < 768px
tablet:    768px to 1024px
desktop:   > 1024px
```

### Usage Examples
```html
<!-- Stack on mobile, 2 columns on tablet, 3 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

<!-- Hidden on mobile, visible on tablet -->
<div class="hidden md:block">Desktop Menu</div>

<!-- Full width on mobile, half on desktop -->
<input class="w-full md:w-1/2" />
```

---

## Spacing System

### Margins & Padding
```css
p-0  = 0px      mb-0 = 0px margin-bottom
p-1  = 0.25rem  mb-1 = 0.25rem margin-bottom
p-2  = 0.5rem   mb-2 = 0.5rem margin-bottom
p-3  = 0.75rem  mb-3 = 0.75rem margin-bottom
p-4  = 1rem     mb-4 = 1rem margin-bottom
p-6  = 1.5rem   mb-6 = 1.5rem margin-bottom
p-8  = 2rem     mb-8 = 2rem margin-bottom
```

---

## Shadow Effects

### Standard Shadows
```html
<div class="shadow">Subtle shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">X-Large shadow</div>
```

### Usage
```css
shadow   = 0 1px 2px rgba(0, 0, 0, 0.05)
shadow-lg = 0 10px 15px rgba(0, 0, 0, 0.1)
shadow-xl = 0 20px 25px rgba(0, 0, 0, 0.1)
```

---

## Border & Rounded Corners

### Border Radius
```html
<div class="rounded">4px radius</div>
<div class="rounded-lg">8px radius</div>
<div class="rounded-xl">12px radius</div>
<div class="rounded-full">50% (circle)</div>
```

### Borders
```html
<div class="border">1px border</div>
<div class="border-2">2px border</div>
<div class="border-primary">Orange border</div>
<div class="border-gray-700">Dark gray border</div>
```

---

## Common Layout Patterns

### Flex Layout
```html
<!-- Centered content -->
<div class="flex items-center justify-center">
  Content
</div>

<!-- Space between -->
<div class="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Vertical stack -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Grid Layout
```html
<!-- 3 column grid -->
<div class="grid grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Color Usage

### Text Colors
```html
<p class="text-white">White text</p>
<p class="text-gray-300">Light gray text</p>
<p class="text-gray-400">Medium gray text</p>
<p class="text-gray-500">Dark gray text</p>
<p class="text-primary">Orange text (primary)</p>
<p class="text-red-400">Error red text</p>
```

### Background Colors
```html
<div class="bg-dark">Dark background</div>
<div class="bg-darker">Darker background</div>
<div class="bg-primary">Primary orange</div>
<div class="bg-red-500/10">Semi-transparent red</div>
<div class="bg-gray-700">Gray background</div>
```

### Opacity
```html
<div class="bg-primary/50">50% opacity</div>
<div class="bg-primary/25">25% opacity</div>
<div class="opacity-50">50% element opacity</div>
```

---

## Transitions & Animations

### Hover Effects
```html
<!-- Color transition on hover -->
<button class="hover:bg-accent transition-colors">
  Hover me
</button>

<!-- Shadow transition -->
<div class="shadow-lg hover:shadow-xl transition-shadow">
  Hover me
</div>

<!-- Scale animation -->
<div class="hover:scale-105 transition-transform">
  Hover me
</div>
```

### Transitions
```css
transition-all       /* All properties */
transition-colors    /* Color changes */
transition-transform /* Scale, rotate, translate */
transition-opacity   /* Opacity changes */
duration-300         /* 300ms duration */
```

---

## Icon Usage (Lucide React)

### Common Icons
```jsx
import { Heart, Zap, Users, Trophy, Settings, LogOut } from 'lucide-react'

// Usage
<Heart className="w-6 h-6 text-primary" />
<Zap className="w-8 h-8 text-accent" />
<Users className="w-4 h-4 text-gray-400" />
```

### Icon Sizing
```jsx
w-4 h-4    = 16x16px (small)
w-5 h-5    = 20x20px (medium)
w-6 h-6    = 24x24px (large)
w-8 h-8    = 32x32px (x-large)
```

---

## Best Practices

1. **Always use custom classes** for consistency
   ```html
   <!-- ✅ Good -->
   <button class="btn-primary">Click</button>
   
   <!-- ❌ Avoid -->
   <button class="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-lg text-white">
     Click
   </button>
   ```

2. **Use semantic colors**
   ```html
   <!-- ✅ Good -->
   <div class="bg-green-500/10 border border-green-500/50 text-green-300">
     Success
   </div>
   
   <!-- ✅ Also good -->
   <div class="bg-red-500/10 border border-red-500/50 text-red-300">
     Error
   </div>
   ```

3. **Mobile-first responsive design**
   ```html
   <!-- ✅ Good -->
   <div class="w-full md:w-1/2 lg:w-1/3">
     Responsive
   </div>
   ```

4. **Group related styles**
   ```html
   <!-- ✅ Good -->
   <div class="flex items-center justify-between gap-4 p-4 bg-dark rounded-lg border border-gray-700">
     Content
   </div>
   ```

---

## Dark Mode Considerations

- All text defaults to white (`text-white`)
- All backgrounds use dark shades (`bg-dark`, `bg-darker`)
- Use gray-700 for borders
- Use opacity for subtle backgrounds (opacity-10, opacity-20)
- High contrast for accessibility

---

## Accessibility Guidelines

1. **Color Contrast**
   - Main text: WCAG AA compliant
   - Minimum 4.5:1 ratio for text

2. **Focus States**
   ```html
   <button class="focus:ring-2 focus:ring-primary focus:outline-none">
     Accessible button
   </button>
   ```

3. **Semantic HTML**
   ```html
   <!-- ✅ Good -->
   <button>Click me</button>
   <input aria-label="Search" />
   
   <!-- ❌ Avoid -->
   <div onClick={handler}>Click me</div>
   ```

4. **Screen Readers**
   - Use `alt` text for images
   - Use semantic labels for forms
   - Use `aria-*` attributes when needed

---

## Component Style Examples

### Form Field with Label and Error
```jsx
<div>
  <label className="block text-sm font-medium text-gray-300 mb-2">
    Email Address
  </label>
  <input className="input-field" placeholder="you@example.com" />
  {error && (
    <p className="text-red-400 text-xs mt-1">{error}</p>
  )}
</div>
```

### Card with Hover Effect
```jsx
<div className="card group hover:border-primary transition-all">
  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
    Title
  </h3>
  <p className="text-gray-400">Description</p>
</div>
```

### Loading State Button
```jsx
<button className="btn-primary disabled:opacity-50" disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</button>
```

---

**Maintain consistency by using these styles throughout the application!**
