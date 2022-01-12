import { Card } from '../Card/Card';
import { Button } from '../Button/Button';

export function RandomRecipe() {
  return (
    <div>
      <h2>RandomRecipe</h2>
      <Button />
      <Card type={'wide'} background={'white'} summary={true} headingPosition={'bottomLeft'} />
    </div>
  );
}
