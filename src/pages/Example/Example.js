import { IconButton, Button, Badge } from '../../components';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

export default function Example() {
  return (
    <div>
      <div
        style={{
          backgroundColor: 'gray',
          display: 'flex',
          gap: '10px',
          padding: '30px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
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
        <Button
          style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}
          shape="round"
          variant="outlined"
          color="orange"
          type="button"
        >
          <GiPerspectiveDiceSixFacesRandom style={{ fontSize: '25px' }} />
          REROLL
        </Button>
        <Button style={{ padding: '16px 24%' }} shape="round" variant="filled" color="green" type="button">
          SignIn
        </Button>
      </div>

      <ul
        style={{
          backgroundColor: 'gray',
          display: 'flex',
          gap: '10px',
          padding: '30px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <li>
          <Badge state="dairyFree" size="large" />
        </li>
        <li>
          <Badge state="lactoOvo" size="large" />
        </li>
        <li>
          <Badge state="vegetarian" size="large" />
        </li>
        <li>
          <Badge state="vegan" size="large" />
        </li>
        <li>
          <Badge state="glutenFree" size="large" />
        </li>
        <li>
          <Badge state="popular" size="large" />
        </li>
        <li>
          <Badge state="paleo" size="large" />
        </li>
        <li>
          <Badge state="primal" size="large" />
        </li>
        <li>
          <Badge state="healthy" size="large" />
        </li>
        <li>
          <Badge state="healthy" size="small" />
        </li>
        <li>
          <Badge state="pescetarian" size="large" />
        </li>
      </ul>
    </div>
  );
}
