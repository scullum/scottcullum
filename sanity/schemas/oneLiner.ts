/**
 * Schema for one-liners used in the rotating text component
 */
export const oneLiner = {
  name: "oneLiner",
  title: "One-Liner",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Professional", value: "professional" },
          { title: "Personal", value: "personal" },
          { title: "Humorous", value: "humorous" },
          { title: "Technical", value: "technical" },
        ],
      },
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Whether this one-liner should be displayed",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "category",
    },
  },
}
