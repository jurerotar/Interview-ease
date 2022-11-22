- ### Explain the difference between slots and scoped slots.
  > A slot is a placeholder in a child component that is filled with content passed from the parent. Content of a regular slot is compiled in the parent’s scope and then passed to the child component.
  > Thus you can’t use child component properties in a slot’s content. But scoped slots allow you to pass child component data to the parent scope and then use that data in slot content.
