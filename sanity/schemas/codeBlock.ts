/**
 * Schema for code blocks in blog posts
 */
export const codeBlock = {
  name: "codeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "TypeScript", value: "typescript" },
          { title: "JavaScript", value: "javascript" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "JSON", value: "json" },
          { title: "Bash", value: "bash" },
          { title: "Markdown", value: "markdown" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "filename",
      title: "Filename",
      type: "string",
      description: "Optional filename to display above the code block",
    },
    {
      name: "code",
      title: "Code",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "language",
      subtitle: "filename",
    },
  },
};
