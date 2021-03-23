import { useCategoryPage } from '../pages/categoryPage/CategoryPageContext';

export default function Background() {
  const back = useCategoryPage();
  return (
    <div
      className='headImage'
      style={{
        backgroundImage: `url('${back.background}')`,
      }}></div>
  );
}
