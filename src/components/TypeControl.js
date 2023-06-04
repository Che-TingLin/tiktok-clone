import classes from './TypeControl.module.scss';
import { typeList } from 'utils';

const TypeControl = (props) => {
  const { type, clikedHandler } = props;

  const classNameHandler = (value) => {
    return value === type
      ? [classes.item, classes.active].join(' ')
      : classes.item;
  };
  return (
    <div className={classes.control}>
      {typeList.map((type) => (
        <span
          key={type.value}
          className={classNameHandler(type.value)}
          onClick={() => clikedHandler(type.value)}
        >
          {type.label}
        </span>
      ))}
    </div>
  );
};

export default TypeControl;
