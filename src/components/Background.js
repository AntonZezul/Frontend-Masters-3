export default function Background(props) {
    return (
      <div
        id="headImage"
        style={{
          backgroundImage: `url('${props.background}')`,
        }}
      ></div>
    );
  }