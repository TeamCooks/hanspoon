import styles from './Detail.module.scss';
import Accordion from '../Accordion/Accordion';

export function Detail(props) {
  return (
    <article>
      <h1 className={`${styles.heading}`}>Roasted Sea Bream With Anchoiade</h1>
      <figure className={`${styles.foodImageContainer}`}>
        <img
          className={`${styles.foodImage}`}
          src="https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Roasted Sea Bream With Anchoiade"
        />
        <figcaption className={`${styles.creditsText}`}>
          Image © Foodista.com – The Cooking Encyclopedia Everyone Can Edit
        </figcaption>
      </figure>
      <button>Like Button: Button 컴포넌트</button>
      <div>dairy-free: Badge 컴포넌트</div>
      <p>Ready in 45 minutes</p>
      <p>15 saved</p>

      <Accordion />
    </article>
  );
}
