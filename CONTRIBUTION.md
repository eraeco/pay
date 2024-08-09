# Contributing Guidelines

Thank you for your interest in contributing to our project. Please follow these guidelines to ensure consistency and maintainability of our codebase.

## JavaScript Guidelines

1. Use ES5 JavaScript, with limited exceptions:
    - `await` and `?.` are allowed
    - Arrow functions `() => foo` are acceptable for single-line expressions
    - Avoid ES6+ features like template literals, `const`, and destructuring

2. Variable Naming:
    - Use single, short word variable names
    - Avoid `snake_case`, `foo_bar`, or `foo__bar` naming conventions
    - For related variables, use nested objects or function properties:
      ```javascript
      var timer = {};
      timer.at = x;
      timer.end = 1000;
      timer.on = function() { /* ... */ };
      ```

3. DOM Manipulation:
    - Prefer jQuery for consistency
    - Avoid mixing jQuery with native DOM methods unless absolutely necessary

4. Code Structure:
    - Keep logically atomic operations on a single line, even if it wraps
    - Maintain "flat" function structures with early returns for conditions
    - Group declarations at the beginning of functions

5. HTML and Attributes:
    - Keep HTML attributes on a single line, except for logic handlers
    - Place SVG path data at the bottom of the file and reference it in the markup

## CSS Guidelines

1. Avoid rigid sizing:
    - Use `min-width` instead of `width` when setting constraints
    - Be cautious with `overflow: hidden` on the `body`

2. Responsive Design:
    - Ensure layouts work well across different browser window sizes
    - Use flexible units and responsive techniques

## General Guidelines

1. Maintain consistent indentation and formatting
2. Write clear, concise comments for complex logic
3. Optimize for readability and maintainability
4. Test thoroughly across different devices and browsers

## Third-Party Libraries

- We're open to trying AlpineJS, but implementation should be carefully considered

Remember, these guidelines are meant to improve code quality and consistency. If you have any questions or suggestions, please don't hesitate to reach out to the project maintainers.