import classes from './Layout.module.scss';

const Layout = (props) => {
  const { children } = props;
  return (
    <div className={classes.layout}>
      <div className={classes.container}>{children}</div>
    </div>
  );
};

export default Layout;
