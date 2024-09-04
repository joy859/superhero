import ReactDom  from 'react-dom/client'
import App from './App';
import{Provider} from "react-redux";
import {store} from'./Redux/store';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify"
import"./Assets/global.css";

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
<Provider store={store}>
    <App/>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light" 
        />
    </Provider>
    );