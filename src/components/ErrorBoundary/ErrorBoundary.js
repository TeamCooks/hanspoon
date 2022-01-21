import { Component } from 'react';
import { Heading, Header } from '..';
import { Wrapper } from '../../pages/Layout/Wrapper';
import { Link } from 'react-router-dom';
import styles from './ErrorBoundary.module.scss';
export class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Header />
          <Wrapper className="main">
            <Heading as="h2" className={styles.errorHeading}>Something went wrong...</Heading>
            <Link to="/" className={styles.link}>Go back to main page?</Link>
          </Wrapper>
        </>
      );
    }
    return this.props.children;
  }
}
