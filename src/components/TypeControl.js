import classes from './TypeControl.module.css';

const TypeControl = (props) => {
  const { clikedHandler } = props;
  const typeList = [
    { label: 'Following', value: 'following' },
    { label: 'For You', value: 'forYou' },
  ];
  return (
    <div className={classes.control}>
      {typeList.map((type) => (
        <span
          key={type.value}
          className={classes.item}
          onClick={() => clikedHandler(type.value)}
        >
          {type.label}
        </span>
      ))}
    </div>
  );
};

export default TypeControl;
