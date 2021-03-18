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
        label: "Email",
        validate: "email"
      },
      {
        field_id: "text_display",
        label: "This is a Text Display"
      },
      {
        "mask": "social",
        "name": "applicant__ssn",
        "type": "tel",
        "label": "SSN",
        "value": '',
        "field_id": "ssn",
        "required": true,
        "validate": "digits:9",
        "placeholder": ""
      },

      {
        "mask": "phone",
        "name": "contact_information__phone",
        "type": "tel",
        "label": "Phone",
        "value": "",
        "field_id": "phone",
        "required": true,
        "validate": "required|numeric|max:9|min:5",
        "placeholder": "",
        "autocomplete": "tel"
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
      },
      // {
      //   name: "date",
      //   value: "",
      //   field_id: "date",
      //   label: "Date"
      // },
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
      model: {},
      invalid: false
    }
  },

  template: `
<div>
<VuetifyFormGenerator :schema="schema" :model.sync="model"></VuetifyFormGenerator>

<p>{{model}}</p>

</div>

`
}))
