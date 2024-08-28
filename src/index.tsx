import ReactDom  from 'react-dom/client'
import App from './App'

import"./Assets/global.css";
ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(<App/>)