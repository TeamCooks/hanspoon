import { IconButton, Button } from '../../components';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

export default function Example() {
  return (
    <div style={{ backgroundColor: 'gray', display: 'flex', gap: '10px', padding: '30px', flexWrap: 'wrap' }}>
      <IconButton
        variant="filled"
        type="button"
        state="cart"
        ariaLabel="cart"
        color="green"
        size="large"
        shape="circle"
      />
      <IconButton
        variant="filled"
        type="button"
        state="heart"
        ariaLabel="search"
        color="green"
        size="large"
        shape="circle"
      />
      <IconButton
        variant="default"
        color="white"
        type="button"
        state="close"
        ariaLabel="close"
        size="large"
        shape="circle"
      />
      <Button style={{ padding: '0 30px' }} shape="round" variant="outlined" color="orange" type="button">
        <GiPerspectiveDiceSixFacesRandom />
        REROLL
      </Button>
      <Button style={{ padding: '16px 24%' }} shape="round" variant="filled" color="green" type="button">
        SignIn
      </Button>
    </div>
  );
}
