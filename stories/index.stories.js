import { storiesOf } from "@storybook/vue"
import { VuetifyFormGenerator } from "../src/index"

export const model = {
  id: 1,
  name: "John Doe",
  password: "J0hnD03!x4",
  age: 35,
  skills: ["Javascript", "VueJS"],
  email: "john.doe@gmail.com",
  status: true
}

export const schema = [
  {
    label: "Section1",
    fields: [
      {
        name: "field1",
        value: "danleyb2@gmail.com",
        field_id: "email",
        label: "Email"
      },
      {
        field_id: "text_display",
        label: "This is a Text Display"
      },
      {
        field_id: "choice",
        label: "Skills",
        name: "skills",
        value: "",
        multi: true,
        required: true,
        multiSelect: true,
        choices: [
          { label: "HTML5", value: "l1" },
          { label: "Javascript", value: "g1" },
          { label: "CSS3", value: "1h" },
          { label: "CoffeeScript", value: "1b" },
          { label: "AngularJS", value: "1c" },
          { label: "VueJS", value: "1g" }
        ]
      }
    ]
  },
  {
    label: "Section2",
    fields: [
      {
        name: "date",
        value: "",
        field_id: "date",
        label: "Date"
      },
      {
        name: "date2",
        value: "",
        field_id: "date_of_birth",
        label: "Date of Birth"
      }
    ]
  }
]

// Add more stories here to live develop your components
storiesOf("VuetifyFormGenerator", module).add("Default", () => ({
  components: { VuetifyFormGenerator },
  data() {
    return {
      schema: schema,
      model: model,
      invalid: false
    }
  },

  template: `

<VuetifyFormGenerator :schema="schema" :model="model"></VuetifyFormGenerator>


`
}))
