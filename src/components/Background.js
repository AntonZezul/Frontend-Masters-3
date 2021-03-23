export default function Background(props) {
  return (
    <div
      className='headImage'
      style={{
        backgroundImage: `url('${props.background}')`,
      }}></div>
  );
}
