export default function Loading() {
  return (
    <div className='text-center'>
      <div
        className='spinner-border'
        style={{
          color: '#52778D',
          width: '3rem',
          height: '3rem',
        }}
        role='status'>
        <span className='visually-hidden'></span>
      </div>
    </div>
  );
}
