/**
 * Schema for about page content
 */
export const about = {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "intro",
      title: "Introduction",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text" }],
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "photo",
          title: "Photo",
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "experience",
      title: "Experience",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "positions",
          title: "Positions",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "company",
                  title: "Company",
                  type: "string",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                },
                {
                  name: "duration",
                  title: "Duration",
                  type: "object",
                  fields: [
                    {
                      name: "startDate",
                      title: "Start Date",
                      type: "string",
                    },
                    {
                      name: "endDate",
                      title: "End Date",
                      type: "string",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
