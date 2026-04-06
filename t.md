# 🧪 Markdown Feature Test

## 1. Headings

# H1

## H2

### H3

#### H4

##### H5

###### H6

---

## 2. Text Formatting

**Bold text**  
_Italic text_  
**_Bold + Italic_**  
~~Strikethrough~~

Inline code: `const x = 10;`

---

## 3. Blockquotes

> This is a blockquote
>
> > Nested blockquote
> >
> > > Triple nested

---

## 4. Lists

### Unordered

- Item 1
- Item 2
    - Nested Item
        - Deep Nested Item

### Ordered

1. First
2. Second
    1. Sub-item
    2. Sub-item

### Task List

- [x] Completed
- [ ] Not completed

---

## 5. Links

[OpenAI](https://openai.com)

Reference-style:
[Google][1]

[1]: https://google.com

---

## 6. Images

![Sample Image](https://github.com/abdallah-moh1/amethyst/raw/main/screenshots/screenshot-dark.png)

---

## 7. Code Blocks

### Fenced Code Block (JavaScript)

```javascript
function greet(name) {
    console.log(`Hello, ${name}!`);
}
greet('World');
```

### Fenced Code Block (Python)

```python
def add(a, b):
    return a + b

print(add(2, 3))
```

---

## 8. Tables

| Name    | Age | City     |
| ------- | --- | -------- |
| Alice   | 25  | New York |
| Bob     | 30  | London   |
| Charlie | 35  | Paris    |

---

## 9. Horizontal Rule

---

---

---

---

## 10. Escaping Characters

\*Not italic\*  
\# Not a heading

---

## 11. HTML Support

<div style="color: red;">
  This is raw HTML
</div>

---

## 12. Footnotes

Here is a footnote reference[^1].

[^1]: This is the footnote.

---

## 13. Definition List (if supported)

Term 1
: Definition 1

Term 2
: Definition 2

---

## 14. Emoji

😀 😎 🚀 🔥 💡

---

## 15. Math (if supported)

Inline: $E = mc^2$

Block:

$$
\int_0^1 x^2 dx
$$

---

## 16. Nested Elements

> - List inside blockquote
>     - Nested list
>         ```js
>         console.log('Code inside quote');
>         ```

---

## 17. Mixed Formatting

**Bold _italic `code` text_**

---

## 18. Long Paragraph

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

---

## 19. Line Breaks

Line one
Line two (two spaces above)

Line three (blank line above)

---

## 20. Collapsible Section (if supported)

<details>
<summary>Click to expand</summary>

Hidden content here!

</details>

---

## 21. Highlight (if supported)

==Highlighted text==

---

## 22. Superscript / Subscript (if supported)

X^2^  
H~2~O

---

## 23. Auto Links

https://example.com

---

## 24. Comments (hidden)

<!-- This should not be visible -->

---

## ✅ End of Test File
