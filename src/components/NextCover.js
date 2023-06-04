const NextCover = ({ height, cover, title }) => {
  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
      }}
    >
      <img style={{ width: '100%' }} src={cover} alt={title} />
    </div>
  );
};

export default NextCover;
