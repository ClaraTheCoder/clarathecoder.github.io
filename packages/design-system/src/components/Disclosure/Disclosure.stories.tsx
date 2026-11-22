import preview from '../../../.storybook/preview';
import { Disclosure, DisclosureList } from './Disclosure';
import { Text } from '../Text';

const meta = preview.meta({
  title: 'Components/Disclosure',
  component: Disclosure,
  parameters: { fullWidth: true },
});

export const List = meta.story({
  render: () => (
    <DisclosureList>
      <Disclosure title="Nam libero tempore cum soluta" open>
        <Text>Soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.</Text>
      </Disclosure>
      <Disclosure title="Itaque earum rerum hic tenetur">
        <Text>Tenetur a sapiente delectus reiciendis voluptatibus maiores alias consequatur.</Text>
      </Disclosure>
    </DisclosureList>
  ),
});
