import { html, TemplateResult } from 'lit';
import '../src/lit-demo.js';

export default {
  title: 'lit-demo',
  component: 'lit-demo',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({
  title,
  backgroundColor = 'white',
}: ArgTypes) => html`
  <lit-demo
    style="--lit-demo-background-color: ${backgroundColor}"
    .title=${title}
  ></lit-demo>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
