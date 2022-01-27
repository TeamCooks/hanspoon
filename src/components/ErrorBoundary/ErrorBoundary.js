import { Component } from 'react';
import * as Sentry from '@sentry/browser';
import { Heading, Header } from '..';
import { Wrapper } from '../../pages/Layout/Wrapper';
import { Link } from 'react-router-dom';
import styles from './ErrorBoundary.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error, { extra: info });
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props.router.location !== nextProps.router.location) {
      this.setState({
        hasError: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Header />
          <Wrapper className="main">
            <Heading as="h2" className={styles.errorHeading}>
              Something went wrong...
            </Heading>
            <Link to="/" className={styles.link}>
              Go back to main page?
            </Link>
          </Wrapper>
        </>
      );
    }
    return this.props.children;
  }
}

export const ErrorBoundaryWithRouter = withRouter(ErrorBoundary);
